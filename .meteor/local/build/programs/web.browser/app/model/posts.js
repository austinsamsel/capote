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
  Template.body.helpers({                                              // 4
    posts: function () {                                               // 5
      return Posts.find({}, { sort: { createdAt: -1 } });              // 6
    }                                                                  //
  });                                                                  //
                                                                       //
  Template.createPost.events({                                         // 10
    'submit form': function (e) {                                      // 11
      e.preventDefault();                                              // 12
      var title = $('[name="title"]').val();                           // 13
      var content = $('[name="content"]').val();                       // 14
                                                                       //
      Posts.insert({                                                   // 16
        title: title,                                                  // 17
        content: content,                                              // 18
        createdAt: new Date()                                          // 19
      });                                                              //
      $('[name=title]').val('');                                       // 21
      $('[name=content]').val('');                                     // 22
      Session.set('wordcount', 0);                                     // 23
    },                                                                 //
    'keyup [name=content]': function (e) {                             // 25
      var wordsToCount = $('[name="content"]').val();                  // 26
      Meteor.call('getWordcount', wordsToCount, function (err, results) {
        if (err) {                                                     // 28
          console.error(err);                                          // 29
        } else {                                                       //
          Session.set('wordcount', results);                           // 32
        }                                                              //
      });                                                              //
    }                                                                  //
  });                                                                  //
                                                                       //
  Template.post.events({                                               // 38
    'click .deletePost': function (e) {                                // 39
      e.preventDefault();                                              // 40
      var thisPostId = this._id;                                       // 41
      Posts.remove(thisPostId);                                        // 42
    }                                                                  //
  });                                                                  //
                                                                       //
  Template.wordcount.onRendered(function () {                          // 46
    Session.set('wordcount', 0);                                       // 47
  });                                                                  //
                                                                       //
  Template.wordcount.helpers({                                         // 50
    wordcount: function () {                                           // 51
      return Session.get('wordcount');                                 // 52
    }                                                                  //
  });                                                                  //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);
