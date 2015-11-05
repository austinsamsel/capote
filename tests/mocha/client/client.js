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
        chai.assert.equal($(".timestamp:contains('01-03-2015')").html(), "01-03-2015");
      });
      it("should show a wordcount", function(){
        chai.assert.equal($(".wordcount:contains('33')").first().text(), "33");
      });
    });

    describe("Creating Posts", function(){
      // this isnt predictable... doesnt find my latest one...
      after(function(done){
      //   var latestId = Posts.findOne({}, {sort: {createdAt: -1}})._id;
      //   Meteor.autorun(function(){
      //     if (latestId){
      //       Posts.remove(latestId);
      //       done();
      //     }
      //   });
        var post = $(".title:contains('a new post')").find('.deletePost').first()
        $(post).click();
        done();
      });
      it("creates a post when I fill in the fields", function(){
        Meteor.flush();
        $('[name="title"]').val('a new post');
        $('[name="content"]').val('a new sample post');
        $('[name="content"]').keyup();
        Session.set('wordcount', 4);
        setTimeout(function(){
          $('[type="submit"]').click();
          setTimeout(function(){
            chai.assert.equal($(".title:contains('a new post')").html(), "a new post");
          }, 500);
        }, 500);
      });
    });

    // describe("deleting posts", function(){
    //   before(function(done){
    //     Posts.insert({
    //       title: "delete me",
    //       content: "please delete me",
    //       createdAt: new Date()
    //     });
    //     done();
    //   });
    //   it("deletes when I tell it to delete", function(){
    //     Meteor.flush();
    //     $(".deletePost").first().click();
    //     chai.assert.equal($(".title:eq(0)").html(), "Neutra messenger bag");
    //   });
    // });

    describe("wordcount", function() {
      before(function(done){
        // Session.set('wordcount', 2); // set session.
         $('[name="content"]').val('a new');
         $('[name="content"]').keyup();
        done();
      });
      it("displays the wordcount when the user types in the form", function(){
        Meteor.flush();
        setTimeout(function(){
          chai.assert.equal($('span.wordcount-num').text(), "2")
        }, 500);
      });
    });

    describe("change daily words goal", function(){
      before(function(done){
        $('[name="goal"]').val(2);
        $('[name="goal"]').keyup();
        done();
      })
      it("user can change their goal", function(){
        Meteor.flush();
        chai.assert.equal(Goals.findOne().dailyGoal, 2);
      });
    });

  });
}
