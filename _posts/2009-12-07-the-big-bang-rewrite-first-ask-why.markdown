---
layout: blog
title: "The Big Bang Rewrite: First Ask Why"
---
When it comes to building something, be it a building, a car, or software, there are always imperfections. The first iteration is usually something simple, but eventually as features are added and requirements made more complex, the system starts to become bloated. Even with great agility and the most stubborn resistance to scope creep, technology changes so rapidly that immediately, often even before its conception, a product is out of date. It's a fact of product development; it's a fact of life. Change is the only constant.

This frustrating realization means that a _tabula rasa_ is a rare find indeed. Realistically, the majority of our time is spent just making sure that progress doesn't break what already works. This curve is exponential, such that eventually the smallest of alterations is painful, time consuming, and dangerous. The alternative, a rebuild, does not offer a much better promise as it consumes massive amounts of resources, with little front facing change.

So, when do you know to start over?

At Fave, I was faced with this same question with the development of getfave.com. The product, architecture and design requirements are simple but, when handling massive amounts of data, represent unique technological challenges. The site has also seen an enormous growth in traffic, straining the application to its limits. However, the application was weakest in the face of the company's own desire to innovate. We wanted to push the envelope farther than our competition and offer more value to the consumer. The current product just wasn't good enough.

We had to ameliorate the situation and it came down to a tough call: start from scratch, or plow on with what we had? This decision hinged on how we defined "better." If the current site was deficient, what was it missing and what did it need to be complete? Initially, these answers were elusive - amazingly, you can ride out "better" for a while. We continued with the old application, deploying changes iteratively in the pursuit of minor progress. Frustrations mounted and eventually we pushed against the stakeholders hard enough to solidify a tangible goal. We finally could sum up it with two words: better data.

Although Fave relies on outside vendors for the bulk of our data, we've come to realize that its integrity is of utmost priority. We wanted to open our arms to as much of it as possible, but know that it is the most accurate in our market. This meant a major refactor to our data model - every core structure had to drastically change. This also meant exposing the data model to outside vendors in the form of an API. With the greater exposure would also come the need for tighter security. Each action on the site had to be locked down to specific roles. We of course, had much of this support already, but it left much to be desired. If our data was going to be accurate, we would have to have fine control over who was changing it. Better data also meant we had to track changes to businesses over time with a versioning system and human review process. Finally, if we had great data we had to be able to find it - our search engine, too, fell in the cross hairs.

As we filled a whiteboard with requirements, it started to become apparent that we were standing in the shadow of an enormous endeavor. Everything hinged on many very invasive changes to the structure of the data which represented huge risks to the stability of the site. It was no longer a technical change, but a much more fundamental change in focus for the whole company. With a clear goal of superior data, we start shedding extraneous features. Soon the concept of starting from scratch became manageable.

Read [part two][1].

[1]: /2009/12/13/the-big-bang-rewrite-part-2-api-first.html
