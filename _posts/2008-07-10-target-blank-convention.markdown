---
layout: blog
title: target="_blank" Convention
---
I've been building websites for a while now, and each time I do it, I run into a couple areas where I sit back in my chair for a second, scratch my head, and ponder conventions. One great thing about [Ruby on Rails](http://www.rubyonrails.org) is the way it enforces convention in many areas, but yet there are still a number of things up for debate. The target="_blank" is one such convention that has yet to be settled it seems.

I guess it's a two sided issue. When do you use target="_blank", and how do you indicate that behavior to the user?

I think the first one is fairly simple. One obvious rule I follow, is whenever you're changing domain's the target should be in a new window. Just because someone want's to read a little background behind a hyperlink, shouldn't mean their done reading the rest of the text on this page. And I usually extend that same principle to other areas, too. For example, I recently built a site that had an editing form, and you could just repeatedly save changes as you went on. I added a 'View' link that targeted a new window so that if you wanted to see the changes you've made, you could, without being taken away from editing. So as far as I'm concerned this issue is pretty straight forward.

This one isn't: giving the user feedback that the link is actually opening in a new window. I can't seem to find anything that is blatantly obvious. I've tried appending '(opens in a new window)', to the link, but that messes up the design. I thought about changing the color of the link, or using a dashed underline, instead of a solid one, but your basic web user isn't going to pick up something that subtle. I was also suggested by a colleague to just put text in the title. But the chances of someone waiting that long before their finger slams the mouse is slim. And using JavaScript to load something more instantly, seems bloated.

The most obvious technique I've found, I saw for the first time with [Mantis](http://www.mantisbt.org/), a bug tracking system, which was to append a '[^]' to the end of every link. The link, itself would always open in the same window, but if you clicked on that little character, it would open in a new window. But then, why not just right click and let your browser handle it ("Open in a New Window," or "Open in a New Tab", Ctrl + Click, etc.).

Ultimately I think the best solution would be totally default settings that the browser could pick up. Just like a link default is by default blue and underlined. Even then, I suppose it's a browser setting, but we'd be closer to a consistent solution. Or everyone could just agree to something, which I suppose I'd be OK with...

...as long as I'm part of the conversation.