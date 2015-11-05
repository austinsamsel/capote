Posts = new Mongo.Collection('posts');

if (Meteor.isClient) {
  Template.body.helpers({
    posts: function () {
      return Posts.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.createPost.events({
    'submit form': function(e){
      e.preventDefault();
      var title = $('[name="title"]').val();
      var content = $('[name="content"]').val();

      Posts.insert({
        title: title,
        content: content,
        createdAt: new Date()
      });
      $('[name=title]').val('');
      $('[name=content]').val('');
    }
  });

  Template.post.events({
    'click .deletePost': function(e){
      e.preventDefault();
      var thisPostId = this._id;
      Posts.remove(thisPostId);
    }
  });

  Template.wordcount.onRendered(function(){
    Session.set('wordcount', 0);
  });
  Template.wordcount.helpers({
    wordcount: function(){
      return Session.get('wordcount');
    }
  });

}
