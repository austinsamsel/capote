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
    }                                                                  //
  });                                                                  //
                                                                       //
  Template.post.events({                                               // 26
    'click .deletePost': function (e) {                                // 27
      e.preventDefault();                                              // 28
      var thisPostId = this._id;                                       // 29
      Posts.remove(thisPostId);                                        // 30
    }                                                                  //
  });                                                                  //
                                                                       //
  Template.wordcount.onRendered(function () {                          // 34
    Session.set('wordcount', 0);                                       // 35
  });                                                                  //
  Template.wordcount.helpers({                                         // 37
    wordcount: function () {                                           // 38
      return Session.get('wordcount');                                 // 39
    }                                                                  //
  });                                                                  //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=posts.js.map
