if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){

    describe("Posts", function(){
      it("shows a post", function(){
        Meteor.flush();
        chai.assert.typeOf($(".title:eq(0)"), 'object');
      })
      it("should show my latest post, first.", function(){
        Meteor.flush();
        chai.assert.equal($(".title:eq(0)").html(), "Neutra messenger bag");
      });
      it("should show a clean timestamp", function(){
        chai.assert.equal($(".timestamp:eq(1)").html(), "01-03-2015");
      });
      it("should show a wordcount", function(){
        chai.assert.equal($('.wordcount:eq(0)').html(), "33");
      });
    });

    describe("Creating Posts", function(){
      after(function(done){
        var latestPost = Posts.findOne({}, {sort: {createdAt: -1}});
        var latestId = latestPost._id
        Meteor.autorun(function(){
          if (latestId){
            Posts.remove(latestId);
            done();
          }
        });
      });
      it("creates a post when I fill in the fields", function(){
        Meteor.flush();
        $('[name="title"]').val('a new post');
        $('[name="content"]').val('a new sample post');
        $('[type="submit"]').click();
        chai.assert.equal($(".title:eq(0)").html(), "a new post");
      });
    });

    describe("deleting posts", function(){
      before(function(done){
        Posts.insert({
          title: "delete me",
          content: "please delete me",
          createdAt: new Date()
        });
        done();
      });
      it("deletes when I tell it to delete", function(){
        Meteor.flush();
        $(".deletePost").first().click();
        chai.assert.equal($(".title:eq(0)").html(), "Neutra messenger bag");
      });
    });

    describe("wordcount", function() {
      before(function(done){
        $('[name="content"]').val('a new');
        $('[name="content"]').keyup();
        Session.set('wordcount', 0); // clears the session.
        done();
      });
      it("displays the wordcount when the user types in the form", function(){
        Meteor.flush();
        setTimeout(function(){
          chai.assert.equal($('span.wordcount-num').text(), "2")
        }, 500);
      });
    });

  });
}
