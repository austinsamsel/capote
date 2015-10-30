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
  // Meteor.call('getWordcount', 'hows it going world?', function(err, results){
  //   if(err){                                                        //
  //     console.error(err);                                           //
  //   }                                                               //
  //   else{                                                           //
  //     console.log('HEY! it worked, it was ' + results + ' words!');
  //   }                                                               //
  // });                                                               //
                                                                       //
  Meteor.startup(function () {                                         // 20
    if (Posts.find().count() === 0) {                                  // 21
      Posts.insert({                                                   // 22
        title: "Neutra messenger bag",                                 // 23
        content: "Tousled forage trust fund readymade Neutra messenger bag. Drinking vinegar chia Marfa, vegan messenger bag disrupt Wes Anderson try-hard. Small batch scenester raw denim synth cronut cornhole, iPhone try-hard single-origin.",
        createdAt: new Date(2015, 0, 4),                               // 25
        wordCount: 33                                                  // 26
      });                                                              //
      Posts.insert({                                                   // 28
        title: "fatback filet mignon",                                 // 29
        content: "Bacon ipsum dolor amet alcatra turkey shank cupim corned beef brisket chuck boudin tri-tip t-bone kevin fatback filet mignon. Short loin tongue short ribs.",
        createdAt: new Date(2015, 0, 3),                               // 31
        wordCount: 26                                                  // 32
      });                                                              //
      Posts.insert({                                                   // 34
        title: "know what I'm sayin'",                                 // 35
        content: "You see? It's curious. Ted did figure it out - time travel. And when we get back, we gonna tell everyone. How it's possible, how it's done, what the dangers are. But then why fifty years in the future when the spacecraft encounters a black hole does the computer call it an 'unknown entry event'?",
        createdAt: new Date(2015, 0, 1),                               // 37
        wordCount: 54                                                  // 38
      });                                                              //
    }                                                                  //
  });                                                                  //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=app.js.map
