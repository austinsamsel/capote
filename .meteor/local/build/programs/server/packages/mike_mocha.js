(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var _ = Package.underscore._;
var chai = Package['practicalmeteor:chai'].chai;
var assert = Package['practicalmeteor:chai'].assert;
var expect = Package['practicalmeteor:chai'].expect;
var should = Package['practicalmeteor:chai'].should;
var loglevel = Package['practicalmeteor:loglevel'].loglevel;
var ObjectLogger = Package['practicalmeteor:loglevel'].ObjectLogger;

/* Package-scope variables */
var MochaWeb, ddpParentConnection, runServerTests, mirrorPort, opt;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
// packages/mike_mocha/reporter.js                                                            //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                              //
MochaWeb = this.MochaWeb = {};                                                                // 1
                                                                                              // 2
if (Meteor.isServer)                                                                          // 3
  var Base = Npm.require("mocha/lib/reporters").Base;                                         // 4
else                                                                                          // 5
  Base = Mocha.reporters.Base                                                                 // 6
                                                                                              // 7
function getAncestors(testObject, ancestors){                                                 // 8
  if (!ancestors)                                                                             // 9
    ancestors = []                                                                            // 10
  if (testObject.parent && testObject.parent.title !== ""){                                   // 11
    ancestors.push(testObject.parent.title)                                                   // 12
    return getAncestors(testObject.parent, ancestors);                                        // 13
  }                                                                                           // 14
  else{                                                                                       // 15
    return ancestors;                                                                         // 16
  }                                                                                           // 17
};                                                                                            // 18
                                                                                              // 19
MochaWeb.MeteorCollectionTestReporter = function(runner){                                     // 20
  Base.call(this, runner);                                                                    // 21
  var self = this;                                                                            // 22
                                                                                              // 23
  function saveTestResult(test){                                                              // 24
    if (test.state === "failed"){                                                             // 25
      console.log(test.err.message);                                                          // 26
      console.log(test.err.stack);                                                            // 27
    }                                                                                         // 28
                                                                                              // 29
    // console.log("SAVE TEST RESULT", test);                                                 // 30
                                                                                              // 31
    var ancestors = getAncestors(test);                                                       // 32
    var result = {                                                                            // 33
      id: "mocha:" + ancestors.join(":") + ":" + test.title,                                  // 34
      async: !!test.async,                                                                    // 35
      framework: "mocha",                                                                     // 36
      name: test.title,                                                                       // 37
      pending: test.pending,                                                                  // 38
      result: test.state,                                                                     // 39
      duration: test.duration,                                                                // 40
      timeOut: test._timeout,                                                                 // 41
      timedOut: test.timedOut,                                                                // 42
      ancestors: ancestors,                                                                   // 43
      isClient: Meteor.isClient,                                                              // 44
      isServer: Meteor.isServer,                                                              // 45
      timestamp: new Date()                                                                   // 46
    };                                                                                        // 47
    if (typeof test.state === "undefined" && test.pending === true) {                         // 48
      result.result = "pending";                                                              // 49
    }                                                                                         // 50
    if (test.err){                                                                            // 51
      result.failureMessage = test.err.message;                                               // 52
      result.failureStackTrace = test.err.stack;                                              // 53
    }                                                                                         // 54
    // console.log("POSTING RESULT", result);                                                 // 55
                                                                                              // 56
    ddpParentConnection.call("velocity/reports/submit", result, function(error, result){      // 57
      if (error){                                                                             // 58
        console.error("ERROR WRITING TEST", error);                                           // 59
      }                                                                                       // 60
    });                                                                                       // 61
  }                                                                                           // 62
                                                                                              // 63
  runner.on("start", Meteor.bindEnvironment(                                                  // 64
    function(){                                                                               // 65
      //TODO tell testRunner that mocha tests have started                                    // 66
    },                                                                                        // 67
    function(err){                                                                            // 68
      throw err;                                                                              // 69
    }                                                                                         // 70
  ));                                                                                         // 71
                                                                                              // 72
  ["pass", "fail", "pending"].forEach(function(testEvent){                                    // 73
    runner.on(testEvent, Meteor.bindEnvironment(                                              // 74
      function(test){                                                                         // 75
        saveTestResult(test);                                                                 // 76
      },                                                                                      // 77
      function(err){                                                                          // 78
        throw err;                                                                            // 79
      }                                                                                       // 80
    ));                                                                                       // 81
  });                                                                                         // 82
                                                                                              // 83
  runner.on('end', Meteor.bindEnvironment(function(){                                         // 84
    //TODO tell testRunner all mocha web tests have finished                                  // 85
  }, function(err){                                                                           // 86
    throw err;                                                                                // 87
  }));                                                                                        // 88
};                                                                                            // 89
                                                                                              // 90
////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
// packages/mike_mocha/server.js                                                              //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                              //
// Do not run tests if Velocity is not enabled                                                // 1
if (process.env.VELOCITY === "0") {                                                           // 2
  return;                                                                                     // 3
}                                                                                             // 4
                                                                                              // 5
//register the testing framework if this is the main app (not a mirror)                       // 6
if (!process.env.IS_MIRROR){                                                                  // 7
  Velocity.registerTestingFramework("mocha", {                                                // 8
    regex: '^tests/mocha/.*$',                                                                // 9
    sampleTestGenerator: function(){                                                          // 10
      return [                                                                                // 11
        { path: "mocha/client/sampleClientTest.js",                                           // 12
          contents: Assets.getText("sample-tests/client.js")                                  // 13
        },                                                                                    // 14
        { path: "mocha/server/sampleServerTest.js",                                           // 15
          contents: Assets.getText("sample-tests/server.js")}                                 // 16
      ];                                                                                      // 17
    }                                                                                         // 18
  });                                                                                         // 19
}                                                                                             // 20
                                                                                              // 21
var clientTestsComplete = false;                                                              // 22
var serverTestsComplete = false;                                                              // 23
                                                                                              // 24
var Mocha = Npm.require("mocha");                                                             // 25
var childProcess = Npm.require('child_process');                                              // 26
var path = Npm.require('path');                                                               // 27
var mkdirp = Npm.require("mkdirp");                                                           // 28
                                                                                              // 29
ddpParentConnection = null;                                                                   // 30
var parentUrl = null;                                                                         // 31
                                                                                              // 32
Meteor.startup(function(){                                                                    // 33
  if (process.env.IS_MIRROR) {                                                                // 34
    console.log("MOCHA MIRROR LISTENING AT", process.env.ROOT_URL);                           // 35
    parentUrl = process.env.PARENT_URL;                                                       // 36
    ddpParentConnection = DDP.connect(parentUrl);                                             // 37
                                                                                              // 38
    runServerTests = Meteor.bindEnvironment(function() {                                      // 39
      console.log("Running mocha server tests");                                              // 40
      mocha.run(Meteor.bindEnvironment(function(err){                                         // 41
        if (err){                                                                             // 42
          console.log("Error running server tests", err);                                     // 43
        }                                                                                     // 44
        markTestsComplete();                                                                  // 45
      }));                                                                                    // 46
    });                                                                                       // 47
  } else {                                                                                    // 48
    mirrorPort = process.env.MOCHA_MIRROR_PORT;                                               // 49
    opt = {                                                                                   // 50
      framework: 'mocha',                                                                     // 51
      testsPath: "mocha",                                                                     // 52
      rootUrlPath: '?mocha=true',                                                             // 53
    }                                                                                         // 54
    if(mirrorPort) {                                                                          // 55
      opt['port'] = parseInt(mirrorPort);                                                     // 56
    }                                                                                         // 57
                                                                                              // 58
    Meteor.call("velocity/mirrors/request", opt, function(err, msg){                          // 59
      if (err){                                                                               // 60
        console.log("error requesting mirror", err);                                          // 61
      }                                                                                       // 62
    });                                                                                       // 63
  }                                                                                           // 64
});                                                                                           // 65
                                                                                              // 66
var markTestsComplete = function(){                                                           // 67
  ddpParentConnection.call("velocity/reports/completed", {framework: "mocha"}, function(err){
    if (err){                                                                                 // 69
      console.error("error calling testsComplete function", err);                             // 70
    }                                                                                         // 71
  });                                                                                         // 72
};                                                                                            // 73
                                                                                              // 74
Meteor.methods({                                                                              // 75
  "mirrorInfo": function(){                                                                   // 76
    return {                                                                                  // 77
      isMirror: process.env.IS_MIRROR,                                                        // 78
      parentUrl: process.env.PARENT_URL                                                       // 79
    };                                                                                        // 80
  },                                                                                          // 81
  "clientTestsComplete": function(){                                                          // 82
    runServerTests();                                                                         // 83
  }                                                                                           // 84
});                                                                                           // 85
                                                                                              // 86
//if not a mirror don't do anything                                                           // 87
MochaWeb.testOnly = function(callback){                                                       // 88
  // console.log("NO OP", mirror.isMirror);                                                   // 89
};                                                                                            // 90
                                                                                              // 91
function setupMocha(){                                                                        // 92
  if (! process.env.IS_MIRROR)                                                                // 93
    return;                                                                                   // 94
                                                                                              // 95
  MochaWeb.testOnly = function(callback){                                                     // 96
    callback();                                                                               // 97
  }                                                                                           // 98
                                                                                              // 99
  global.chai = Package['practicalmeteor:chai'].chai;                                         // 100
  global.mocha = new Mocha({ui: "bdd", reporter: MochaWeb.MeteorCollectionTestReporter});     // 101
  Package['mike:mocha-core'].setupGlobals(mocha);                                             // 102
}                                                                                             // 103
setupMocha();                                                                                 // 104
                                                                                              // 105
////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['mike:mocha'] = {
  MochaWeb: MochaWeb
};

})();

//# sourceMappingURL=mike_mocha.js.map
