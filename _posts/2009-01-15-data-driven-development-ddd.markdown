---
layout: blog
title: Data Driven Development (DDD)
---

In the world of software, methodologies rule. It isn't about the code, it's all about the process. And when it comes to processes, there's a lot to choose from; developers have a habit of over thinking this stuff. So as one, I figured I'd throw in my two cents, too.

Test Driven Development has been a buzz word in the Rails community for a some time. It certainly deserves the credit, too. The peace of mind that comes with a solid test framework is unparalleled. But there's a component of testing that I think is ignored. To write a good test, you need good test data.

You have a couple options when it comes to data:

1. Fixtures: In Rails, you can use static YAML files to represent the data in your database. Once your migrated, just load the fixtures and you've got some data to work with. The downside here is that to get a lot of data, you have to do a lot of typing. Additionally, as your data becomes more and more complex, it becomes really tough to keep track of the dependencies and associations between objects.
2. SQL: Aa SQL dump from another machine or production is a great fast way to get tons of data, but is incredibly fragile. As your database changes, the migrations and schema may deviate machine to machine, and it only takes one change to invalidate an entire SQL dump. They're a pain to work with as most text editors crash on such large files.

Recently, however, another option has become available: generate it! I was really inspired after watching the [Populator Railscast by Ryan Bates][1], in which he demonstrates using Ruby to spin up a few hundred database rows in a few minutes. With simple models, it's a totally painless process. So what happens when you outgrow the out of the box Rails application?

Well, I say you stay disciplined. When you embrace TDD, it becomes weird not to write the test cases first. Same thing here, for what I'm calling Data Driven Development. Write the tests, migration, model, and a data generator in one process. Change your model? Change the data, and change the test. Every model should have tests. Every model should have a data generator.

Using the [populator][2] and [faker][3] gems was a great way to get started. In a few places you have to do some work directly with ActiveRecord, when relationships become complicated, but it's relatively painless. I wrote the following method that I call at the beginning of each generator to deal with dependency issues that helped me quite a bit:

{% highlight ruby %}
# Given a set of class names, will require objects of those types to
# have been populated.
# Usage: depends_on(User, Post, Comment)
def depends_on(*args)
  if args.any? { |a| a.count.zero? }
    dependencies = args.map{ |a| a.name.pluralize }
    raise "Depends on #{dependencies.to_sentence.downcase} to populate data." 
  end

  args.each { |a| eval "@#{a.name.underscore.pluralize} = #{a}.all" }
end
{% endhighlight %}

This not only helped declaratively define my dependencies, but also sets up whatever instance variables (i.e. `@users`) to help you out with the generator.

As far as testing goes, factories come in really handy. It's just like using a generator, but knowing that the output will be the same each time. For my tests I completely rely on [factory_girl][4]. Not only can they run much faster as many tests don't even need to hit the database, they allow each test to declaratively set up exactly the conditions you need.

Ultimately, the approach gives you more peace of mind. Loose your database? No problem: migrate, then generate. Need more data? Generate millions of fake records while you grab a cup of coffee. Good deal.

[1]: http://railscasts.com/episodes/126-populating-a-database
[2]: http://populator.rubyforge.org
[3]: http://faker.rubyforge.org
[4]: http://github.com/thoughtbot/factory_girl/tree/master
