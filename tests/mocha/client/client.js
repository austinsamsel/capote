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
      before(function(done){
        $('[name="goal"]').val(1);
        $('[name="goal"]').keyup();
        $('[name="title"]').val('a new post');
        $('[name="content"]').val('a new sample post');
        $('[name="content"]').keyup();
        setTimeout(function(){
          $('[type="submit"]').click();
        }, 500)
        done();
      });
      after(function(done){
        setTimeout(function(){
          $('.title:contains("a new post")')
            .siblings('.deletePost').first().click();
        }, 500);
        done();
      });
      it("creates a post when I fill in the fields", function(){
        Meteor.flush();
        setTimeout(function(){
          chai.assert.equal($(".title:eq(0)").html(), "a new post");
        }, 500);
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
      after(function(done){
        setTimeout(function(){
          $('.title:contains("delete me")')
            .siblings('.deletePost')
            .first()
            .click();
        }, 500);
        done();
      });
      it("deletes when I tell it to delete", function(){
        Meteor.flush();
        $('.title:contains("delete me")')
          .siblings('.deletePost')
          .first()
          .click();
        setTimeout(function(){
            chai.assert.equal($(".title:eq(0)").html(), "Neutra messenger bag");
        }, 500);
      });
    });

    describe("wordcount", function() {
      before(function(done){
        setTimeout(function(){
          $('[name="content"]').val('a new');
          $('[name="content"]').keyup();
          done();
        }, 500);
      });
      it("displays the wordcount when the user types in the form", function(){
        Meteor.flush();
        setTimeout(function(){
          chai.assert.equal($('span.wordcount-num').text(), "2")
        }, 500);
      });
    });

    describe("change daily words goal", function(){
      after(function(done){
        $('[name="goal"]').val('');
        done();
      });
      it("user can change their goal", function(){
        Meteor.flush();
        $('[name="goal"]').val(2);
        chai.assert.equal($('[name="goal"]').val(), 2)
      });
    });

  });
}
