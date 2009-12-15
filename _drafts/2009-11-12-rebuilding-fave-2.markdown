---
layout: blog
title: "Rebuilding Fave (Part 3): Authentication, Authorization, and Tests"
---
One of the biggest deficiencies in the old application was being able to lock down access to the site based on users. Originally, there were two special users, Admin and Guest. The former had complete control, the later had none. Anyone else was a normal user and had the same level of access.

Since we have an opportunity to build this right from the ground up, we explored 3 levels of access control:

1. Authentication: Actions behind this layer of protection, first, require a user to be authenticated.
2. Authorization: These actions assume a user has been authenticated but determine whether they have access to perform the requested actions.
3. Permissions: Assuming the first two layers pass, does the current user have permission to perform that action to that object?

I'll go into the details of each section, then describe our testing strategy.

## Authentication

Step one: plug in Authlogic. This did a huge majority of the heavy lifting for us to ensure that a user session was persisted request to request.

Let's take a look at some of the helpers in our base controller, ApplicationController:

{% highlight ruby %}
protected

  def require_authentication
    raise Exceptions::Security::AuthenticationRequired unless authenticated?
  end

private

  def authenticated?
    !current_user.nil?
  end
{% endhighlight %}

Our custom exception <code>Exceptions::Security::AuthenticationRequired</code> is systematically caught and returns a HTTP 401. Piece of cake. To lock down a controller now, we simply add a <code>before_filter</code> to the actions we'd like restricted to users that are logged in.

## Authorization

Authentication was easy, but now that we know we have a user, should they be able to hit that action? To the end user, or a business analyst these may seem like the same question, but as a developer I think it makes sense to separate the concerns.

Because we followed REST conventions in this application, the abstraction for authorization was self apparent: restrict access on a controller/action basis. So we created roles which stored sets of controller action pairs. Then add another <code>before_filter</code> just like only a bit different than our authentication layer.

{% highlight ruby %}
protected

  def require_authorization
    raise Exceptions::Security::AuthorizationRequired unless authorized?
  end

private

  def authorized?
    # authorized_for just checks to see if that key value pair exists for that user based on their role
    current_user.authorized_for?(self.controller_name, self.action_name)
  end
{% endhighlight %}

Just like authentication, we add a <code>before_filter</code> and catch the AuthorizationRequired exception, returning a HTTP 403 response to the client.

## Permissions



## Testing

My feelings on testing are a subject for another discussion, but in a nutshell, I believe it's crucially important to test permissions. I think the reasons are obvious. But testing permissions can be a real pain in the neck.

We use Shoulda to assist our testing process for two reasons. Firstly, we enjoy the dry-ness and organization of contexts. Beyond organization, however, the macros allow your tests to be very expressive while staying super clean - this is especially true of controllers. As you can see in the samples below, however, we avoid the stresses surrounding assertion readability with breadcrumbs (e.g. a User unit test might read, "validations > first_name").

As discussed above, each user belongs to a role. To satisfy our authorization layer, a role then specifies which controllers and actions may be accessed. So we need to be able to systematically hit all the controllers and actions that require authorization with each role and assert the appropriate behavior.

This could easily get out of hand:

{% highlight ruby %}
class UsersControllerTest < ActionController::TestCase
  context 'GET to show >'
    context 'as an admin >' do
      setup do
        login_as :admin
        get :show
      end
      
      should_do_all_sorts_of_great_stuff
    end
    
    context 'as a business owner >' do
      setup do
        login_as :business_owner
        get :show
      end
      
      should_do_all_sorts_of_great_stuff
    end
  end
end
{% endhighlight %}

There's a few issues here. First of all, there's a lot of duplication. More importantly, we duplicate the <code>get</code>, which is really a common procedure to all these tests. Secondly, we're retesting that this action <code>should_do_all_sorts_of_great_stuff</code> and binding those assertions to the setup of the test. Gross.

[Shoulda controller macros](http://dev.thoughtbot.com/shoulda/classes/Shoulda/ActionController/Macros.html) encourage you to avoid duplicating the setup block over and over again, so I dove into creating a custom macro. I knew that if I followed the macro pattern, I was going to be able to figure out a way to get the implementation just the way I wanted. So I defined that first.

{% highlight ruby %}
class UsersControllerTest < ActionController::TestCase
  context 'GET to show >'
    setup do
      login
      get :show
    end
    
    should_authenticate
    should_authorize :admin, :business_owner
    should_do_all_sorts_of_great_stuff
  end
end
{% endhighlight %}

So, much better! But how to make that work?

{% highlight ruby %}
class ActionController::TestCase
  def self.should_authenticate
    should 'authenticate', :before => lambda { logout } do
      assert_response :unauthorized
    end
  end
  
  def self.should_authorize(*role_names)
    role_names.each do |role_name|
      should "authorize #{role_name}", :before => lambda { login(role_name) } do
        assert @response.response_code != :forbidden
      end
    end
  end
end
{% endhighlight %}

Very cool, but if you've been paying close attention there's one more method I haven't touched on yet, <code>login</code>. Let's take a look at the test_helper.

{% highlight ruby %}
def login(arg = nil)
  if arg.nil?
    unless @skip_next_login
      @controller.expects(:require_authentication).returns(true)
      @controller.expects(:require_authorization).returns(true)
    end
  elsif arg.is_a?(String) || arg.is_a?(Symbol)
    @controller.stubs(:current_user).returns(Factory(:user, :role_name => arg.to_s))
    @skip_next_login = true
  end
end
{% endhighlight %}

This helper is probably the most robust part of the entire test. If you pass nothing in, as we do in the <code>setup</code> block, it will simply fake it. This is great because the assertions become oblivious to the authorization mechanism. Sweet. But the authentication and authorization assertions do care, so we give ourselves the option to login as a specified role. Our <code>should</code> blocks utilize the <code>:before</code> option to perform the login before anything else happens. Importantly, though, it sets a flag so the second <code>login</code> call (the one in the original <code>setup</code> block) doesn't then screw things up.

Make sense?
