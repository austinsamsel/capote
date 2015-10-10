(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var _ = Package.underscore._;

/* Package-scope variables */
var setupGlobals, wrappedFunc, boundWrappedFunction;

(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                      //
// packages/mike_mocha-core/packages/mike_mocha-core.js                                                 //
//                                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                        //
(function () {                                                                                          // 1
                                                                                                        // 2
///////////////////////////////////////////////////////////////////////////////////////////////////     // 3
//                                                                                               //     // 4
// packages/mike:mocha-core/server.js                                                            //     // 5
//                                                                                               //     // 6
///////////////////////////////////////////////////////////////////////////////////////////////////     // 7
                                                                                                 //     // 8
var Mocha = Npm.require("mocha");                                                                // 1   // 9
var Fiber = Npm.require("fibers");                                                               // 2   // 10
                                                                                                 // 3   // 11
setupGlobals = function(mocha){                                                                  // 4   // 12
  //basically a direct copy from meteor/packages/meteor/dynamics_nodejs.js                       // 5   // 13
  //except the wrapped function has an argument (mocha distinguishes                             // 6   // 14
  //asynchronous tests from synchronous ones by the "length" of the                              // 7   // 15
  //function passed into it, before, etc.)                                                       // 8   // 16
  var moddedBindEnvironment = function (func, onException, _this) {                              // 9   // 17
    Meteor._nodeCodeMustBeInFiber();                                                             // 10  // 18
                                                                                                 // 11  // 19
    var boundValues = _.clone(Fiber.current._meteor_dynamics || []);                             // 12  // 20
                                                                                                 // 13  // 21
    if (!onException || typeof(onException) === 'string') {                                      // 14  // 22
      var description = onException || "callback of async function";                             // 15  // 23
      onException = function (error) {                                                           // 16  // 24
        Meteor._debug(                                                                           // 17  // 25
          "Exception in " + description + ":",                                                   // 18  // 26
          error && error.stack || error                                                          // 19  // 27
        );                                                                                       // 20  // 28
      };                                                                                         // 21  // 29
    }                                                                                            // 22  // 30
                                                                                                 // 23  // 31
    //IMPORTANT note the callback variable present here, for                                     // 24  // 32
    //Metoer.bindEnvironment this is ` return function (/* arguments */) {`                      // 25  // 33
    return function (callback) {                                                                 // 26  // 34
      var args = _.toArray(arguments);                                                           // 27  // 35
                                                                                                 // 28  // 36
      var runWithEnvironment = function () {                                                     // 29  // 37
        var savedValues = Fiber.current._meteor_dynamics;                                        // 30  // 38
        try {                                                                                    // 31  // 39
          // Need to clone boundValues in case two fibers invoke this                            // 32  // 40
          // function at the same time                                                           // 33  // 41
          Fiber.current._meteor_dynamics = _.clone(boundValues);                                 // 34  // 42
          var ret = func.apply(_this, args);                                                     // 35  // 43
        } catch (e) {                                                                            // 36  // 44
          onException(e);                                                                        // 37  // 45
        } finally {                                                                              // 38  // 46
          Fiber.current._meteor_dynamics = savedValues;                                          // 39  // 47
        }                                                                                        // 40  // 48
        return ret;                                                                              // 41  // 49
      };                                                                                         // 42  // 50
                                                                                                 // 43  // 51
      if (Fiber.current)                                                                         // 44  // 52
        return runWithEnvironment();                                                             // 45  // 53
      Fiber(runWithEnvironment).run();                                                           // 46  // 54
    };                                                                                           // 47  // 55
  };                                                                                             // 48  // 56
                                                                                                 // 49  // 57
                                                                                                 // 50  // 58
  var mochaExports = {};                                                                         // 51  // 59
  mocha.suite.emit("pre-require", mochaExports, undefined, mocha);                               // 52  // 60
  //console.log(mochaExports);                                                                   // 53  // 61
                                                                                                 // 54  // 62
  // 1. patch up describe function so it plays nice w/ fibers                                    // 55  // 63
  // 2. trick to allow binding the suite instance as `this` value                                // 56  // 64
  // inside of describe blocks, to allow e.g. to set custom timeouts.                            // 57  // 65
  function wrapRunnable(func) {                                                                  // 58  // 66
    return function() {                                                                          // 59  // 67
      // `this` will be bound to the suite instance, as of Mocha's `describe` implementation     // 60  // 68
      Meteor.bindEnvironment(func.bind(this), function(err) { throw err; })();                   // 61  // 69
    }                                                                                            // 62  // 70
  }                                                                                              // 63  // 71
                                                                                                 // 64  // 72
  global.describe = function (name, func){                                                       // 65  // 73
    return mochaExports.describe(name, wrapRunnable(func));                                      // 66  // 74
  };                                                                                             // 67  // 75
  global.describe.skip = mochaExports.describe.skip;                                             // 68  // 76
  global.describe.only = function(name, func) {                                                  // 69  // 77
    mochaExports.describe.only(name, Meteor.bindEnvironment(func, function(err){ throw err; })); // 70  // 78
  };                                                                                             // 71  // 79
                                                                                                 // 72  // 80
  //In Meteor, these blocks will all be invoking Meteor code and must                            // 73  // 81
  //run within a fiber. We must therefore wrap each with something like                          // 74  // 82
  //bindEnvironment. The function passed off to mocha must have length                           // 75  // 83
  //greater than zero if we want mocha to run it asynchronously. That's                          // 76  // 84
  //why it uses the moddedBindEnivronment function described above instead                       // 77  // 85
                                                                                                 // 78  // 86
  //We're actually having mocha run all tests asynchronously. This                               // 79  // 87
  //is because mocha cannot tell when a synchronous fiber test has                               // 80  // 88
  //finished, because the test runner runs outside a fiber.                                      // 81  // 89
                                                                                                 // 82  // 90
  //It is possible that the mocha test runner could be run from within a                         // 83  // 91
  //fiber, but it was unclear to me how that could be done without                               // 84  // 92
  //forking mocha itself.                                                                        // 85  // 93
                                                                                                 // 86  // 94
  global['it'] = function (name, func){                                                          // 87  // 95
    wrappedFunc = function(callback){                                                            // 88  // 96
      if (func.length == 0){                                                                     // 89  // 97
        func();                                                                                  // 90  // 98
        callback();                                                                              // 91  // 99
      }                                                                                          // 92  // 100
      else {                                                                                     // 93  // 101
        func(callback);                                                                          // 94  // 102
      }                                                                                          // 95  // 103
    }                                                                                            // 96  // 104
                                                                                                 // 97  // 105
    boundWrappedFunction = moddedBindEnvironment(wrappedFunc, function(err){                     // 98  // 106
      throw err;                                                                                 // 99  // 107
    });                                                                                          // 100
                                                                                                 // 101
    mochaExports['it'](name, boundWrappedFunction);                                              // 102
  };                                                                                             // 103
  global.it.skip = mochaExports.it.skip;                                                         // 104
  global.it.only = function(name, func) {                                                        // 105
    mochaExports.it.only(name, Meteor.bindEnvironment(func, function(err){ throw err; }));       // 106
  };                                                                                             // 107
                                                                                                 // 108
  ["before", "beforeEach", "after", "afterEach"].forEach(function(testFunctionName){             // 109
    global[testFunctionName] = function (func){                                                  // 110
      wrappedFunc = function(callback){                                                          // 111
        if (func.length == 0){                                                                   // 112
          func();                                                                                // 113
          callback();                                                                            // 114
        }                                                                                        // 115
        else {                                                                                   // 116
          func(callback);                                                                        // 117
        }                                                                                        // 118
      }                                                                                          // 119
                                                                                                 // 120
      boundWrappedFunction = moddedBindEnvironment(wrappedFunc, function(err){                   // 121
        throw err;                                                                               // 122
      });                                                                                        // 123
      mochaExports[testFunctionName](boundWrappedFunction);                                      // 124
    }                                                                                            // 125
  });                                                                                            // 126
}                                                                                                // 127
                                                                                                 // 128
///////////////////////////////////////////////////////////////////////////////////////////////////     // 137
                                                                                                        // 138
}).call(this);                                                                                          // 139
                                                                                                        // 140
//////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['mike:mocha-core'] = {
  setupGlobals: setupGlobals
};

})();

//# sourceMappingURL=mike_mocha-core.js.map
