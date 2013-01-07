---
layout: blog
title: Deploying a Site via DNS - "That was Easy!"
---

I launched a site today for [Northpoint Horizons][1], and it was seriously one of the simplest deployments I've ever experienced.

We've been working on the site for months on the future (now current) production server. We've used it for the client to review the site, to perform testing, everything you'd do with you traditional development environment. All the meanwhile, the DNS for northpointhorizons.com has been pointing at some sandbox with an "under construction" banner. So after rigorously reviewing the "staged" site with the client and completely approving it for launch, we just flicked a switch pointing the DNS right to our environment and everything just worked.

I can't imagine deploying a website, at least v1.0, any other way.

[1]: http://www.northpointhorizons.com
