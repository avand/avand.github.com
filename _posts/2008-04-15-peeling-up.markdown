---
layout: blog
title: Peeling Up
---
I'm not sure when exactly it happened, but drop shadows and rounded corners struck the web with a vengeance. Then it was the reflections. It seems like those persnickety designers are looking for anyway to make our lives as developers harder. But they have a fairly noble goal, anyway - to give a 2D fairly boring web page _depth_. I'm a big fan.

But at the same time, I find it very frustrating. Both rounded corners and drop shadows make dynamic widths a nightmare. Then there's the issue of a drop shadow spanning two background colors with full translucency support. Solving any of these problems elegantly is a challenge. So recently I've been looking for _simple_ ways to evoke the same illusion of depth. I think I've found two, but I'll talk about one here.

Every since I signed up for [LinkedIn](http://www.linkedin.com/), I've been dying for them to do a redesign. After logging in I felt totally inundated with information, and found it very challenging to navigate. Aside from the fact that a few months back they totally overhauled the design, they added a really slick design paradigm I've never seen before and I was really impressed. I'm referring to this:

![LinkedIn Peeling Up Screenshot](http://farm3.static.flickr.com/2562/4169458440_fcd4a28052_o.png)

Do you see what I'm referring to? It's the peeling up effect below the "Add Connections" button. It doesn't solve _all_ the problems, but it definitely makes it easier than extending a drop shadow all the way up one side of that floating box. They actually call the class on that div "sticky-box" which I think embodies that "peel up" perfectly. Bravo LinkedIn!
