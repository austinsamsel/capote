if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    describe("Server initialization", function(){
      it("should insert posts into the database after server start", function(){
        chai.assert(Posts.find().count() > 0);
      });
    });

    describe("save daily words goal in database", function(){
      before(function(done){
        var goalSaved = Goals.findOne()._id;
        Goals.update({_id: goalSaved}, {$set: {dailyGoal: 1}});
        done();
      });
      it("saves the goal in the database", function(){
        Meteor.flush();
        //chai.assert.equal($('[name="goal"]').val(), 1)
        chai.assert(Goals.findOne().dailyGoal == 1);
      });
    });
  });
}
