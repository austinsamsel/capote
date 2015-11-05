(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/app.js                                                       //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
if (Meteor.isServer) {                                                 // 1
                                                                       //
  Meteor.methods({                                                     // 3
    'getWordcount': (function () {                                     // 4
      function getWordcount(words) {                                   // 4
        check(words, String);                                          // 5
        var wordcount = Meteor.npmRequire('wordcount');                // 6
        return wordcount(words);                                       // 7
      }                                                                //
                                                                       //
      return getWordcount;                                             //
    })()                                                               //
  });                                                                  //
                                                                       //
  Meteor.call('getWordcount', 'hows it going world?', function (err, results) {
    if (err) {                                                         // 12
      console.error(err);                                              // 13
    } else {                                                           //
      console.log('HEY! it worked, it was ' + results + ' words!');    // 16
    }                                                                  //
  });                                                                  //
                                                                       //
  Meteor.startup(function () {                                         // 21
    if (Posts.find().count() === 0) {                                  // 22
      Posts.insert({                                                   // 23
        title: "Neutra messenger bag",                                 // 24
        content: "Tousled forage trust fund readymade Neutra messenger bag. Drinking vinegar chia Marfa, vegan messenger bag disrupt Wes Anderson try-hard. Small batch scenester raw denim synth cronut cornhole, iPhone try-hard single-origin.",
        createdAt: new Date(2015, 0, 4),                               // 26
        wordCount: 33                                                  // 27
      });                                                              //
      Posts.insert({                                                   // 29
        title: "fatback filet mignon",                                 // 30
        content: "Bacon ipsum dolor amet alcatra turkey shank cupim corned beef brisket chuck boudin tri-tip t-bone kevin fatback filet mignon. Short loin tongue short ribs.",
        createdAt: new Date(2015, 0, 3),                               // 32
        wordCount: 26                                                  // 33
      });                                                              //
      Posts.insert({                                                   // 35
        title: "know what I'm sayin'",                                 // 36
        content: "You see? It's curious. Ted did figure it out - time travel. And when we get back, we gonna tell everyone. How it's possible, how it's done, what the dangers are. But then why fifty years in the future when the spacecraft encounters a black hole does the computer call it an 'unknown entry event'?",
        createdAt: new Date(2015, 0, 1),                               // 38
        wordCount: 54                                                  // 39
      });                                                              //
    }                                                                  //
  });                                                                  //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=app.js.map
