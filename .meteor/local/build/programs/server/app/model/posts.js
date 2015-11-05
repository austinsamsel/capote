(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// model/posts.js                                                      //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Posts = new Mongo.Collection('posts');                                 // 1
                                                                       //
if (Meteor.isClient) {                                                 // 3
                                                                       //
  // added this, but not incl in tutorial.                             //
  Meteor.subscribe('posts');                                           // 6
                                                                       //
  Template.body.helpers({                                              // 8
    posts: function () {                                               // 9
      return Posts.find({}, { sort: { createdAt: -1 } });              // 10
    }                                                                  //
  });                                                                  //
                                                                       //
  Template.createPost.events({                                         // 14
    'submit form': function (e) {                                      // 15
      e.preventDefault();                                              // 16
      var title = $('[name="title"]').val();                           // 17
      var content = $('[name="content"]').val();                       // 18
                                                                       //
      Posts.insert({                                                   // 20
        title: title,                                                  // 21
        content: content,                                              // 22
        createdAt: new Date()                                          // 23
      });                                                              //
      $('[name=title]').val('');                                       // 25
      $('[name=content]').val('');                                     // 26
      Session.set('wordcount', 0);                                     // 27
    },                                                                 //
    'keyup [name=content]': function (e) {                             // 29
      var wordsToCount = $('[name="content"]').val();                  // 30
      Meteor.call('getWordcount', wordsToCount, function (err, results) {
        if (err) {                                                     // 32
          console.error(err);                                          // 33
        } else {                                                       //
          Session.set('wordcount', results);                           // 36
        }                                                              //
      });                                                              //
    }                                                                  //
  });                                                                  //
                                                                       //
  Template.post.events({                                               // 42
    'click .deletePost': function (e) {                                // 43
      e.preventDefault();                                              // 44
      var thisPostId = this._id;                                       // 45
      Posts.remove(thisPostId);                                        // 46
    }                                                                  //
  });                                                                  //
                                                                       //
  Template.wordcount.onRendered(function () {                          // 50
    Session.set('wordcount', 0);                                       // 51
  });                                                                  //
                                                                       //
  Template.wordcount.helpers({                                         // 54
    wordcount: function () {                                           // 55
      return Session.get('wordcount');                                 // 56
    }                                                                  //
  });                                                                  //
                                                                       //
  Template.createPost.helpers({                                        // 60
    enoughWords: function () {                                         // 61
      var wordcount = Session.get('wordcount');                        // 62
      var theGoal = Goals.findOne().dailyGoal;                         // 63
      return wordcount >= theGoal;                                     // 64
    }                                                                  //
  });                                                                  //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=posts.js.map
