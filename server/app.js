if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Posts.find().count() === 0) {
      Posts.insert({
        title: "Neutra messenger bag",
        content: "Tousled forage trust fund readymade Neutra messenger bag. Drinking vinegar chia Marfa, vegan messenger bag disrupt Wes Anderson try-hard. Small batch scenester raw denim synth cronut cornhole, iPhone try-hard single-origin.",
        createdAt: new Date(2015,0,4)
      });
      Posts.insert({
        title: "fatback filet mignon",
        content: "Bacon ipsum dolor amet alcatra turkey shank cupim corned beef brisket chuck boudin tri-tip t-bone kevin fatback filet mignon. Short loin tongue short ribs.",
        createdAt: new Date(2015,0,3)
      });
      Posts.insert({
        title: "know what I'm sayin'",
        content: "You see? It's curious. Ted did figure it out - time travel. And when we get back, we gonna tell everyone. How it's possible, how it's done, what the dangers are. But then why fifty years in the future when the spacecraft encounters a black hole does the computer call it an 'unknown entry event'?",
        createdAt: new Date(2015,0,1)
      });
    }
  });
}
