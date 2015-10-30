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
    },                                                                 //
    'keyup [name=content]': function (e) {                             // 24
      var wordsToCount = $('[name="content"]').val();                  // 25
      Meteor.call('getWordcount', wordsToCount, function (err, results) {
        if (err) {                                                     // 27
          console.error(err);                                          // 28
        } else {                                                       //
          Session.set('wordcount', results);                           // 31
        }                                                              //
      });                                                              //
    }                                                                  //
  });                                                                  //
                                                                       //
  Template.post.events({                                               // 37
    'click .deletePost': function (e) {                                // 38
      e.preventDefault();                                              // 39
      var thisPostId = this._id;                                       // 40
      Posts.remove(thisPostId);                                        // 41
    }                                                                  //
  });                                                                  //
                                                                       //
  Template.wordcount.onRendered(function () {                          // 45
    Session.set('wordcount', 0);                                       // 46
  });                                                                  //
  Template.wordcount.helpers({                                         // 48
    wordcount: function () {                                           // 49
      return Session.get('wordcount');                                 // 50
    }                                                                  //
  });                                                                  //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=posts.js.map
