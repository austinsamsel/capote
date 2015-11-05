(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/app.js                                                       //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
if (Meteor.isServer) {                                                 // 1
                                                                       //
  Meteor.publish("posts", function () {                                // 3
    return Posts.find();                                               // 4
  });                                                                  //
                                                                       //
  Meteor.publish("goals", function () {                                // 7
    return Goals.find();                                               // 8
  });                                                                  //
                                                                       //
  Meteor.methods({                                                     // 11
    'getWordcount': (function () {                                     // 12
      function getWordcount(words) {                                   // 12
        check(words, String);                                          // 13
        var wordcount = Meteor.npmRequire('wordcount');                // 14
        return wordcount(words);                                       // 15
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
  Meteor.startup(function () {                                         // 28
    if (Goals.find().count() === 0) {                                  // 29
      Goals.insert({                                                   // 30
        dailyGoal: 1,                                                  // 31
        createdAt: new Date()                                          // 32
      });                                                              //
    };                                                                 //
    if (Posts.find().count() === 0) {                                  // 35
      Posts.insert({                                                   // 36
        title: "Neutra messenger bag",                                 // 37
        content: "Tousled forage trust fund readymade Neutra messenger bag. Drinking vinegar chia Marfa, vegan messenger bag disrupt Wes Anderson try-hard. Small batch scenester raw denim synth cronut cornhole, iPhone try-hard single-origin.",
        createdAt: new Date(2015, 0, 4),                               // 39
        wordCount: 33                                                  // 40
      });                                                              //
      Posts.insert({                                                   // 42
        title: "fatback filet mignon",                                 // 43
        content: "Bacon ipsum dolor amet alcatra turkey shank cupim corned beef brisket chuck boudin tri-tip t-bone kevin fatback filet mignon. Short loin tongue short ribs.",
        createdAt: new Date(2015, 0, 3),                               // 45
        wordCount: 26                                                  // 46
      });                                                              //
      Posts.insert({                                                   // 48
        title: "know what I'm sayin'",                                 // 49
        content: "You see? It's curious. Ted did figure it out - time travel. And when we get back, we gonna tell everyone. How it's possible, how it's done, what the dangers are. But then why fifty years in the future when the spacecraft encounters a black hole does the computer call it an 'unknown entry event'?",
        createdAt: new Date(2015, 0, 1),                               // 51
        wordCount: 54                                                  // 52
      });                                                              //
    }                                                                  //
  });                                                                  //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=app.js.map
