Goals = new Mongo.Collection('goals');

if (Meteor.isClient) {
  Meteor.subscribe('goals');

  Template.dailyGoal.helpers({
    dailyGoal: function() {
      var theGoal = Goals.findOne().dailyGoal;
      return theGoal
    }
  });

  Template.dailyGoal.events({
    'keyup [name=goal]': function(e){
      e.preventDefault();

      var mostRecent = Goals.findOne();
      var documentId = mostRecent._id;
      var goal = $('[name="goal"]').val();
      Goals.update(
        { _id: documentId },
        {$set: { dailyGoal: goal }
      });
    },
    'keyup [name=content]': function(e){
      var wordsToCount = $('[name="content"]').val();
      Meteor.call('getWordcount', wordsToCount, function(err, results){
        if(err) console.error(err);
        else    Session.set('wordCountResult', results);
      });
    }
  })
}
