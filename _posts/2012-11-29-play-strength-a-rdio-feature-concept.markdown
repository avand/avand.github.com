---
layout: blog
title: Play Strength, a Rdio Feature Concept
hacker_news_link: http://news.ycombinator.com/item?id=4844406
---

Music can make or break a party. And picking good music to play is hard. I think it should be easy.

Here, I take a closer look at creating a great setlist with Rdio. I start with some back story about why I started thinking about this problem and why I think it's important. Then I explore 10 potential design concepts, three of which have mockups. Finally, I'll dive deep into one concept I'm calling Play Strength.

Above all else, this is a design exercise to showcase how I think about problems and approach solving them. It should take about 10 minutes to read.

* * *

## Back Story

[Daft Punk Is Playing At My House][daft-punk] was stuck in my head as soon as the bartender told me she had seen [LCD Soundsystem][lcd-sound] at [The Orpheum][orpheum] in Boston. It must have woken the dormant DJ inside me because as soon as the party came home, it was queued up. And the jams didn't stop there. Three hours of hitting Play Later left us with an [eclectic ambient mix][dirty-harry]. My favorites soon became my friends' favorites, and the next day I used History to build a playlist, which I shared to our guests and on Facebook.

Playing DJ for a night got me thinking. The mechanics of the Queue worked out fantastically. I would go searching for a few songs in Collection, rearrange the order, let the songs play out, and repeat. Rdio got out of my way and allowed me to focus on the music. But finding good music to play was still hard. I'd only find two or three new songs for every song that played. I was having a blast, so I wasn't watching the clock, but I must have spent about a third of the night at my computer.

**Is there an easier way to build a great setlist?**

* * *

## Ten Different Perspectives

Apple follows a [10-3-1 design process][10-3-1], where designers rigorously explore three options from 10 concepts before settling on one strong decision. I fall in love easily, especially with my own ideas, so I force myself to follow this process.

Here are 10 different ways to think about creating better setlists.

### 1. Radio Station

Perhaps hand-selecting music is entirely unnecessary. I played music from Collection, so a station made up of that music is a great start. For more variety, the Heavy Rotation station would have introduced new music to the mix. But I was actually looking to keep to a theme. For example, [deadmau5][deadmau5] is in my library but was a bad fit that night. With a radio station, the only control you have is to skip to the next track. And you can't skip a song without breaking the groove.

### 2. Radio Station with Smoother Cuts

Introducing smoother transitions between track cuts might cut down on interruptions. But doing it well is difficult and seems beyond the scope of Rdio; better suited for [Serato][serato] maybe. A simple cross-fade might help but, no matter what, skipping a track is still an auditory interruption.

### 3. Radio Station with Better Suggestions

Identify a theme by choosing a song, genre, or artist, and a Pandora-like radio station might be able to keep that vibe going. Each song is a gamble and "channel surfing" is still an interruption. But training the station with likes and dislikes does give users some control beyond just skipping the track.

### 4. Radio Station with More Control

Manipulate a generated playlist based on your Collection or Heavy Rotation. When it gets close to the end, Rdio could add a handful of new tracks automatically.

Now the DJ has more variety, can reorder tracks, and remove unwanted music before it plays. But it's a subtractive process, which means less satisfaction for hand-selecting the next great track.

This auto-generated-never-ending playlist could exist as a new section under Browse and/or Your Music in the left-column navigation. It shares some similarities to an iTunes Smart Playlist.

### 5. Remote Control

I enjoyed the selection process but had to get off the couch to keep the tunes flowing. With better synchronization between devices, I could have added and rearranged music right from my phone. Great for convenience, terrible for social etiquette.

Take this one step further and friends could add music to the queue from their phones.

For what it's worth, I started this exercise before version 2.0.0 of the Rdio iPhone app had been released.

### 6. Play Indicators

When you hear a song, you're less likely to want to hear it again, especially at a party. The interface could indicate when a song has been played. I attempted unsuccessfully to achieve this with icons. Hourglasses were much too hard to read when scaled down and any other simple indicator, like a read/unread dot, lacked sufficient context. I used an opacity reduction instead. To avoid visual clutter, songs that are played together as part of a set would also fade in together. Because songs are tightly grouped by album, this opacity change could bubble up to the album level too. It's a clever implementation but the opacity change still lacks context. Manipulating opacity is always a nuanced design choice and I don't think it works well here.

<p>
  <a href="http://cloud.avandamiri.com/image/0f2t143k3C0B" title="Rdio Play Indicator Mockup" target="_blank">
    <img src="http://f.cl.ly/items/0X2j2D070z1t0N0I1s0f/Play%20and%20Fade.png" title="Rdio Play Indicator Mockup" width="849" />
  </a>
</p>

### 7. Last Played

Most music libraries on the market today have a column for when a song was last played. But when sorting thousands of songs, the signal-to-noise ratio is low. For example, it's hard to know why a song hasn't been played in a while. Or you may play a song on your ride to work and want to hear it again at happy hour.

### 8. Popularity

While I was browsing more unfamiliar albums, it was hard to know which song to pick. I knew, for example, that I wanted to hear something off [Shrines][shrines] by [Purity Ring][purity-ring], but I didn't know which track. In this case, I'd be happy to default to the most popular option. Spotify does this in some places ([screenshot][spotify-pop]) but it's less useful outside the context of an album.

### 9. Stars

Starring serves the same utility as popularity but gives me more control. For example, I just re-listened to [The 2nd Law][2nd-law] by [Muse][muse] and [Unsustainable][unsustainable] stood out as a token dubstep track. I'll definitely be hunting it down again soon. It would be nice to call it out from the other songs on that album. On the other hand, stars add clutter and in other applications, like Gmail, they're predominantly underutilized.

<p>
  <a href="http://cloud.avandamiri.com/image/3q0e2M1T3D46" title="Rdio Stars Mockup" target="_blank">
    <img src="http://f.cl.ly/items/1F350z270I463A3W0C36/Stars.png" title="Rdio Stars Mockup" width="849" />
  </a>
</p>

### 10. Play Strength

Perhaps the solution is more holistic. A great setlist takes into account when a song was played last, its popularity, how it relates to friends' musical tastes, and similarity to music that's currently playing. Rdio could compute a compound index, Play Strength, and expose it in the interface to help suggest the next tracks. You don't have to explain how you computed the index, but the mechanics are interesting. Pandora does this when they explain why you're hearing a particular song and it adds to the experience.

* * *

## Play Strength Deep Dive

<p>
  <a href="http://cloud.avandamiri.com/image/2T1B0e2J0Z0V" title="Rdio Play Strength Mockup" target="_blank">
    <img src="http://f.cl.ly/items/2E3U3h2U340w0v0z0X39/Play%20Strength.png" title="Rdio Play Strength Mockup" width="849" />
  </a>
</p>

Play Strength is a compound index computed for each song for each user based on:

* Number of times the user has played the song
* When the user last played the song
* Number of friends that have recently listened to the song
* Popularity of the song in the community
* Similarity of the song to other songs in the current setlist

### Play Count & Last Played

In every music library, plays are distributed over time organically based on the owner's tastes. Every song's play count  and last played will fall within some standard deviation of the library's average. You may be able to tell if a song is being over or under played based on the standard deviation for these two values.

![Over and Underplayed Songs Based on Standard Deviation][standard-deviation-image]

In my mockup, I simply print last played and play count but it might be more interesting to actually tell the user, "you over/underplay this song" or "you have (not) played this song recently."

It's also important to note that an overplayed song may actually be a great addition to a setlist. Songs with abnormally high play counts are probably the songs you like the most. In these cases, the Play Strength should get a big boost. But if the song was already included in the current set, the Play Strength should drop dramatically.

### Friends

Rdio already does an awesome job of leveraging my friends' musical tastes to help me discover new music. But once music is in my library, it's up to me to rediscover it. The more friends I have that are listening to a song, the higher its Play Strength should be. This is especially useful when my friends are listening to particular songs on an album more than others. And if you knew which Rdio users were listening to the current mix, Play Strength could be taken to a whole new level.

### Popularity & Similarity

While building my setlist Saturday night, there were a few times where I knew what album or artist I wanted to hear but I had no idea which song to play. Albums can have a huge variance in tempo and mood so it's easy to choose… [poorly][holy-grail].

Knowing which songs are popular across the entire music community is really helpful. [Next Big Sound][nbs] has done some really interesting work in this area but it centers around artists. I imagine Rdio already has the data required to know which songs are being played more than others by album or artist across the ecosystem.

A setlist is also bound to share acoustic themes. Songs that sound like what you're currently playing should have a higher Play Strength. But knowing which songs sound like other songs programmatically is hard. [The Echo Nest][echo-nest] out of Boston has some API's that could help but song similarity is part of a much larger music discovery problem.

Songs within a genre share similar sounds, especially when they're released around the same time. Rdio could boost the Play Strength for any song in a genre currently represented by the setlist.

## Closing Remarks

Play Strength is a hard technical problem but is a simple solution for the end user. I think the last radio variant concept, i.e. the auto-generated-never-ending playlist, is also really interesting but it's a specialized feature. Play Strength stays out of your way and consistently adds to the experience of browsing music.

I also like Play Strength because it lends itself to iteration. The bar-style strength indicator, inspired by [AngelList][angel], is not an invasive addition. At first, the callout that explains how Play Strength is computed could be left out. As the rules for computing Play Strength change, the callout evolves organically. This gives the feature a lot of room to grow.

Finally, I like Play Strength because it's comprehensive. It's the type of feature I might grow to love and is hard to copy.

Looking forward to your feedback in the comments.

[daft-punk]:     http://rd.io/x/QD73K2EuYA
[lcd-sound]:     http://rd.io/x/QD73LUI1MQ
[dirty-harry]:   http://rd.io/x/QD73L1qYDg
[deadmau5]:      http://rd.io/x/QD73LUIQFg
[shrines]:       http://rd.io/x/QD73PlnfZw
[purity-ring]:   http://rd.io/x/QD73LVdS-w
[2nd-law]:       http://rd.io/x/QD73Pl0efQ
[unsustainable]: http://rd.io/x/QD73K0Iav8Q
[muse]:          http://rd.io/x/QD73Ldht
[spotify-pop]:   http://cloud.avandamiri.com/image/0T1d1P2x1b2V
[holy-grail]:    http://www.youtube.com/watch?v=Ubw5N8iVDHI
[nbs]:           http://nextbigsound.com
[echo-nest]:     http://the.echonest.com
[10-3-1]:        http://buswk.co/ddUj6I
[serato]:        http://serato.com
[angel]:         http://angel.co
[orpheum]:       http://www.orpheumtheatreboston.com

[standard-deviation-image]: http://f.cl.ly/items/1h33270t2w0430050B2e/Standard%20Deviation.jpg
