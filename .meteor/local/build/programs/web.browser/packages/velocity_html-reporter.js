//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var ECMAScript = Package.ecmascript.ECMAScript;
var _ = Package.underscore._;
var Template = Package.templating.Template;
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;
var Session = Package.session.Session;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var babelHelpers = Package['babel-runtime'].babelHelpers;
var Promise = Package.promise.Promise;
var Map = Package['ecmascript-collections'].Map;
var Set = Package['ecmascript-collections'].Set;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var reamplify, suiteHasFailed, frameworkStatus;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/velocity_html-reporter/lib/reamplify.js                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
// A reactive version of amplify.store(). This object acts a little like the Session object, but                     //
// the key/value store is persisted on the client using amplify, so it survives page refresh                         //
// and retains its values between sessions.                                                                          //
                                                                                                                     //
reamplify = {                                                                                                        // 5
  deps: {},                                                                                                          // 6
  store: function (key, value) {                                                                                     // 7
    var self = this;                                                                                                 // 8
    if (value === null) {                                                                                            // 9
      //delete key                                                                                                   //
      if (self.deps[key]) delete self.deps[key];                                                                     // 11
      return amplify.store(key, null);                                                                               // 13
    } else if (value !== undefined) {                                                                                //
      //add/update                                                                                                   //
      var previousValue = amplify.store(key);                                                                        // 17
      if (self.deps[key] && value !== previousValue) {                                                               // 18
        self.deps[key].changed();                                                                                    // 19
      }                                                                                                              //
      return amplify.store(key, value);                                                                              // 21
    } else if (key) {                                                                                                //
      // get value of key                                                                                            //
      var result;                                                                                                    // 25
      result = amplify.store(key);                                                                                   // 26
      if (!self.deps[key]) self.deps[key] = new Tracker.Dependency();                                                // 27
      self.deps[key].depend();                                                                                       // 29
      return result;                                                                                                 // 30
    } else {                                                                                                         //
      //not implemented                                                                                              //
      throw new Error('reAmplify cannot reactively return the entire amplify store. ' + 'Use amplify.store() instead');
    }                                                                                                                //
  }                                                                                                                  //
};                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/velocity_html-reporter/lib/velocity.js                                                                   //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
// Make Velocity globals available in this package                                                                   //
var packageContext = this;                                                                                           // 2
_.forEach(Package['velocity:core'], function (globalValue, globalName) {                                             // 3
  packageContext[globalName] = globalValue;                                                                          // 4
});                                                                                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/velocity_html-reporter/lib/template.client-report.js                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
                                                                                                                     // 1
Template.body.addContent((function() {                                                                               // 2
  var view = this;                                                                                                   // 3
  return Spacebars.include(view.lookupTemplate("velocity"));                                                         // 4
}));                                                                                                                 // 5
Meteor.startup(Template.body.renderToDocument);                                                                      // 6
                                                                                                                     // 7
Template.__checkName("velocity");                                                                                    // 8
Template["velocity"] = new Template("Template.velocity", (function() {                                               // 9
  var view = this;                                                                                                   // 10
  return Blaze.If(function() {                                                                                       // 11
    return Spacebars.call(view.lookup("showVelocity"));                                                              // 12
  }, function() {                                                                                                    // 13
    return [ "\n      ", HTML.DIV({                                                                                  // 14
      id: "velocityOverlay",                                                                                         // 15
      "class": function() {                                                                                          // 16
        return [ Blaze.If(function() {                                                                               // 17
          return Spacebars.call(view.lookup("overlayIsVisible"));                                                    // 18
        }, function() {                                                                                              // 19
          return "visible";                                                                                          // 20
        }), " ", Spacebars.mustache(view.lookup("statusWidgetClass")) ];                                             // 21
      },                                                                                                             // 22
      "aria-hidden": function() {                                                                                    // 23
        return Blaze.If(function() {                                                                                 // 24
          return Spacebars.call(view.lookup("overlayIsVisible"));                                                    // 25
        }, function() {                                                                                              // 26
          return "false";                                                                                            // 27
        }, function() {                                                                                              // 28
          return "true";                                                                                             // 29
        });                                                                                                          // 30
      }                                                                                                              // 31
    }, "\n          ", HTML.BUTTON({                                                                                 // 32
      "class": "velocity-btn-close display-toggle",                                                                  // 33
      "data-target": "velocityOverlay"                                                                               // 34
    }), "\n\n          ", HTML.DIV({                                                                                 // 35
      "class": "velocity-logo"                                                                                       // 36
    }, "\n            Velocity\n            ", HTML.I({                                                              // 37
      "class": "velocity-icon-status"                                                                                // 38
    }), "\n          "), "\n\n        ", Blaze.If(function() {                                                       // 39
      return Spacebars.call(view.lookup("resetting"));                                                               // 40
    }, function() {                                                                                                  // 41
      return [ "\n          ", Spacebars.include(view.lookupTemplate("velocityResetNotification")), "\n        " ];  // 42
    }), "\n\n        ", Spacebars.include(view.lookupTemplate("velocitySummary")), "\n\n        ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("frameworks"));                                                              // 44
    }, function() {                                                                                                  // 45
      return [ "\n          ", Spacebars.include(view.lookupTemplate("velocityReports")), "\n        " ];            // 46
    }), "\n\n          ", Spacebars.include(view.lookupTemplate("velocityControlPanel")), "\n\n        ", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("active"), "showLogs");                                              // 48
    }, function() {                                                                                                  // 49
      return [ "\n            ", HTML.DIV({                                                                          // 50
        "class": "velocity-section-header"                                                                           // 51
      }, "\n                ", HTML.SPAN({                                                                           // 52
        "class": "velocity-section-name"                                                                             // 53
      }, "Logs"), "\n            "), "\n          ", Spacebars.include(view.lookupTemplate("velocityLogs")), "\n        " ];
    }), "\n\n        ", Blaze.If(function() {                                                                        // 55
      return Spacebars.dataMustache(view.lookup("active"), "showFiles");                                             // 56
    }, function() {                                                                                                  // 57
      return [ "\n            ", HTML.DIV({                                                                          // 58
        "class": "velocity-section-header"                                                                           // 59
      }, "\n                ", HTML.SPAN({                                                                           // 60
        "class": "velocity-section-name"                                                                             // 61
      }, "Test files"), "\n            "), "\n          ", Spacebars.include(view.lookupTemplate("velocityTestFiles")), "\n        " ];
    }), "\n\n        ", Blaze.If(function() {                                                                        // 63
      return Spacebars.call(view.lookup("mochaPresent"));                                                            // 64
    }, function() {                                                                                                  // 65
      return [ "\n            ", HTML.DIV({                                                                          // 66
        "class": function() {                                                                                        // 67
          return [ "velocity-iframe ", Blaze.If(function() {                                                         // 68
            return Spacebars.dataMustache(view.lookup("active"), "showMochaIframe");                                 // 69
          }, function() {                                                                                            // 70
            return "visible";                                                                                        // 71
          }) ];                                                                                                      // 72
        }                                                                                                            // 73
      }, "\n                ", HTML.DIV({                                                                            // 74
        "class": "velocity-section-header"                                                                           // 75
      }, "\n                    ", HTML.SPAN({                                                                       // 76
        "class": "velocity-section-name"                                                                             // 77
      }, "Mocha iframe"), "\n                "), "\n              ", Spacebars.include(view.lookupTemplate("mochaweb")), "\n            "), "\n        " ];
    }), "\n      "), "\n\n      ", HTML.DIV({                                                                        // 79
      tabindex: function() {                                                                                         // 80
        return Spacebars.mustache(view.lookup("statusWidgetTabIndex"));                                              // 81
      },                                                                                                             // 82
      id: "velocity-status-widget",                                                                                  // 83
      "aria-label": function() {                                                                                     // 84
        return [ Spacebars.mustache(view.lookup("statusWidgetClass")), " " ];                                        // 85
      },                                                                                                             // 86
      "class": function() {                                                                                          // 87
        return [ Spacebars.mustache(view.lookup("statusWidgetPosition")), " ", Spacebars.mustache(view.lookup("statusWidgetClass")), " display-toggle" ];
      },                                                                                                             // 89
      "data-target": "velocityOverlay",                                                                              // 90
      title: "Show test results"                                                                                     // 91
    }, "\n          ", HTML.I({                                                                                      // 92
      "class": "velocity-icon-status"                                                                                // 93
    }), "\n      "), "\n  " ];                                                                                       // 94
  });                                                                                                                // 95
}));                                                                                                                 // 96
                                                                                                                     // 97
Template.__checkName("velocitySummary");                                                                             // 98
Template["velocitySummary"] = new Template("Template.velocitySummary", (function() {                                 // 99
  var view = this;                                                                                                   // 100
  return HTML.DIV({                                                                                                  // 101
    "class": "velocity-summary-text"                                                                                 // 102
  }, "\n      ", Blaze.If(function() {                                                                               // 103
    return Spacebars.call(view.lookup("anyFailed"));                                                                 // 104
  }, function() {                                                                                                    // 105
    return [ "\n        ", Blaze.View("lookup:totalFailedTestCount", function() {                                    // 106
      return Spacebars.mustache(view.lookup("totalFailedTestCount"));                                                // 107
    }), " ", Blaze.View("lookup:regularPlural", function() {                                                         // 108
      return Spacebars.mustache(view.lookup("regularPlural"), view.lookup("totalFailedTestCount"), "test", "s");     // 109
    }), " failed\n      " ];                                                                                         // 110
  }, function() {                                                                                                    // 111
    return [ "\n        ", Blaze.View("lookup:totalPassedTestCount", function() {                                    // 112
      return Spacebars.mustache(view.lookup("totalPassedTestCount"));                                                // 113
    }), " ", Blaze.View("lookup:regularPlural", function() {                                                         // 114
      return Spacebars.mustache(view.lookup("regularPlural"), view.lookup("totalPassedTestCount"), "test", "s");     // 115
    }), " passed in ", Blaze.View("lookup:totalTime", function() {                                                   // 116
      return Spacebars.mustache(view.lookup("totalTime"));                                                           // 117
    }), "\n      " ];                                                                                                // 118
  }), "\n    ");                                                                                                     // 119
}));                                                                                                                 // 120
                                                                                                                     // 121
Template.__checkName("velocityControlPanel");                                                                        // 122
Template["velocityControlPanel"] = new Template("Template.velocityControlPanel", (function() {                       // 123
  var view = this;                                                                                                   // 124
  return HTML.DIV({                                                                                                  // 125
    "class": "velocity-options"                                                                                      // 126
  }, "\n        ", HTML.BUTTON({                                                                                     // 127
    "aria-label": "Show passing tests",                                                                              // 128
    id: "showSuccessful",                                                                                            // 129
    "class": function() {                                                                                            // 130
      return [ "btn-velocity control-toggle ", Spacebars.mustache(view.lookup("showActive"), "showSuccessful") ];    // 131
    }                                                                                                                // 132
  }, "Show passing tests"), "\n        ", HTML.BUTTON({                                                              // 133
    "aria-label": "Show files",                                                                                      // 134
    id: "showFiles",                                                                                                 // 135
    "class": function() {                                                                                            // 136
      return [ "btn-velocity control-toggle ", Spacebars.mustache(view.lookup("showActive"), "showFiles") ];         // 137
    }                                                                                                                // 138
  }, "Show files"), "\n      ", Blaze.If(function() {                                                                // 139
    return Spacebars.call(view.lookup("mochaPresent"));                                                              // 140
  }, function() {                                                                                                    // 141
    return [ "\n          ", HTML.BUTTON({                                                                           // 142
      "aria-label": "Show mocha iframe",                                                                             // 143
      id: "showMochaIframe",                                                                                         // 144
      "class": function() {                                                                                          // 145
        return [ "btn-velocity control-toggle ", Spacebars.mustache(view.lookup("showActive"), "showMochaIframe") ];
      }                                                                                                              // 147
    }, "Show mocha iframe"), "\n      " ];                                                                           // 148
  }), "\n        ", Blaze.If(function() {                                                                            // 149
    return Spacebars.call(view.lookup("nightwatchPresent"));                                                         // 150
  }, function() {                                                                                                    // 151
    return [ "\n            ", HTML.BUTTON({                                                                         // 152
      "aria-label": "Run nightwatch tests",                                                                          // 153
      id: "runNightwatchTests",                                                                                      // 154
      "class": "btn-velocity"                                                                                        // 155
    }, "Run nightwatch tests"), "\n        " ];                                                                      // 156
  }), "\n        ", Blaze.If(function() {                                                                            // 157
    return Spacebars.call(view.lookup("cucumberPresent"));                                                           // 158
  }, function() {                                                                                                    // 159
    return [ "\n            ", HTML.BUTTON({                                                                         // 160
      "aria-label": "Full Cucumber Run",                                                                             // 161
      id: "runCucumber",                                                                                             // 162
      "class": "btn-velocity"                                                                                        // 163
    }, "Full Cucumber Run"), "\n        " ];                                                                         // 164
  }), "\n    ");                                                                                                     // 165
}));                                                                                                                 // 166
                                                                                                                     // 167
Template.__checkName("velocityReports");                                                                             // 168
Template["velocityReports"] = new Template("Template.velocityReports", (function() {                                 // 169
  var view = this;                                                                                                   // 170
  return HTML.SECTION({                                                                                              // 171
    "class": function() {                                                                                            // 172
      return [ "velocity-report ", Spacebars.mustache(view.lookup("frameworkStatus")) ];                             // 173
    }                                                                                                                // 174
  }, "\n        ", HTML.DIV({                                                                                        // 175
    "class": "velocity-section-header"                                                                               // 176
  }, "\n            ", HTML.SPAN({                                                                                   // 177
    "class": "velocity-section-name"                                                                                 // 178
  }, HTML.A({                                                                                                        // 179
    href: function() {                                                                                               // 180
      return Spacebars.mustache(view.lookup("mirrorUrl"));                                                           // 181
    },                                                                                                               // 182
    target: "_blank"                                                                                                 // 183
  }, Blaze.View("lookup:name", function() {                                                                          // 184
    return Spacebars.mustache(view.lookup("name"));                                                                  // 185
  }), " - mirror ", Blaze.View("lookup:mirrorStatus", function() {                                                   // 186
    return Spacebars.mustache(view.lookup("mirrorStatus"));                                                          // 187
  })), " "), "\n        "), "\n\n      ", Blaze.If(function() {                                                      // 188
    return Spacebars.dataMustache(view.lookup("isPassed"), view.lookup("frameworkStatus"));                          // 189
  }, function() {                                                                                                    // 190
    return [ "\n          ", HTML.I({                                                                                // 191
      "class": "velocity-icon-status"                                                                                // 192
    }), "\n      " ];                                                                                                // 193
  }), "\n\n      ", Blaze.Unless(function() {                                                                        // 194
    return Spacebars.call(view.lookup("frameworkTotalTestCount"));                                                   // 195
  }, function() {                                                                                                    // 196
    return [ "\n        ", Blaze.If(function() {                                                                     // 197
      return Spacebars.call(view.lookup("noFrameworkFiles"));                                                        // 198
    }, function() {                                                                                                  // 199
      return [ "\n            ", HTML.DIV({                                                                          // 200
        "class": "velocity-notice-inline"                                                                            // 201
      }, "\n                ", HTML.P("It appears that you don't have any tests for this framework. Would you like to add some?"), "\n                ", HTML.BUTTON({
        "aria-label": "Add sample tests",                                                                            // 203
        "class": "btn-velocity copy-sample-tests"                                                                    // 204
      }, "Add ", Blaze.View("lookup:name", function() {                                                              // 205
        return Spacebars.mustache(view.lookup("name"));                                                              // 206
      }), " sample tests"), "\n            "), "\n        " ];                                                       // 207
    }, function() {                                                                                                  // 208
      return [ "\n            ", HTML.DIV({                                                                          // 209
        "class": "velocity-loading"                                                                                  // 210
      }, "\n                ", HTML.I({                                                                              // 211
        "class": "velocity-icon-loading"                                                                             // 212
      }), "\n            "), "\n        " ];                                                                         // 213
    }), "\n      " ];                                                                                                // 214
  }), "\n\n      ", Blaze.Each(function() {                                                                          // 215
    return Spacebars.call(view.lookup("suites"));                                                                    // 216
  }, function() {                                                                                                    // 217
    return [ "\n        ", Blaze.If(function() {                                                                     // 218
      return Spacebars.call(view.lookup("suiteNotHidden"));                                                          // 219
    }, function() {                                                                                                  // 220
      return [ "\n            ", HTML.DIV({                                                                          // 221
        "class": function() {                                                                                        // 222
          return [ "velocity-suite ", Spacebars.mustache(view.lookup("suiteStatus")) ];                              // 223
        }                                                                                                            // 224
      }, "\n                ", HTML.DIV({                                                                            // 225
        "class": function() {                                                                                        // 226
          return [ "velocity-suite-header ", Spacebars.mustache(view.lookup("suiteStatus")) ];                       // 227
        }                                                                                                            // 228
      }, "\n                  ", Blaze.View("lookup:suite", function() {                                             // 229
        return Spacebars.mustache(view.lookup("suite"));                                                             // 230
      }), "\n                "), "\n                ", HTML.TABLE({                                                  // 231
        "class": "velocity-result-table"                                                                             // 232
      }, "\n                    ", HTML.TBODY("\n                    ", Blaze.Each(function() {                      // 233
        return Spacebars.call(view.lookup("reports"));                                                               // 234
      }, function() {                                                                                                // 235
        return [ "\n                      ", Spacebars.include(view.lookupTemplate("velocityTestReport")), "\n                    " ];
      }), "\n                    "), "\n                "), "\n            "), "\n        " ];                       // 237
    }), "\n      " ];                                                                                                // 238
  }), "\n    ");                                                                                                     // 239
}));                                                                                                                 // 240
                                                                                                                     // 241
Template.__checkName("velocityTestReport");                                                                          // 242
Template["velocityTestReport"] = new Template("Template.velocityTestReport", (function() {                           // 243
  var view = this;                                                                                                   // 244
  return Blaze.If(function() {                                                                                       // 245
    return Spacebars.call(view.lookup("reportNotHidden"));                                                           // 246
  }, function() {                                                                                                    // 247
    return [ "\n      ", HTML.TR({                                                                                   // 248
      "class": function() {                                                                                          // 249
        return [ "velocity-test ", Blaze.If(function() {                                                             // 250
          return Spacebars.call(view.lookup("failed"));                                                              // 251
        }, function() {                                                                                              // 252
          return "failed";                                                                                           // 253
        }, function() {                                                                                              // 254
          return "passed";                                                                                           // 255
        }) ];                                                                                                        // 256
      }                                                                                                              // 257
    }, "\n          ", HTML.TD({                                                                                     // 258
      "class": "velocity-test-name"                                                                                  // 259
    }, Blaze.View("lookup:name", function() {                                                                        // 260
      return Spacebars.makeRaw(Spacebars.mustache(view.lookup("name")));                                             // 261
    })), " \n          ", HTML.TD({                                                                                  // 262
      "class": "velocity-test-time"                                                                                  // 263
    }, Blaze.If(function() {                                                                                         // 264
      return Spacebars.call(view.lookup("failed"));                                                                  // 265
    }, function() {                                                                                                  // 266
      return "Fail";                                                                                                 // 267
    }, function() {                                                                                                  // 268
      return [ Blaze.View("lookup:duration", function() {                                                            // 269
        return Spacebars.mustache(view.lookup("duration"));                                                          // 270
      }), " ms" ];                                                                                                   // 271
    })), "\n      "), "\n    ", Blaze.If(function() {                                                                // 272
      return Spacebars.call(view.lookup("failed"));                                                                  // 273
    }, function() {                                                                                                  // 274
      return [ "\n        ", HTML.TR("\n            ", HTML.TD({                                                     // 275
        "class": "velocity-fail-msg",                                                                                // 276
        colspan: "2"                                                                                                 // 277
      }, "\n                ", Blaze.View("lookup:failureMessage", function() {                                      // 278
        return Spacebars.mustache(view.lookup("failureMessage"));                                                    // 279
      }), "\n            "), "\n        "), "\n        ", HTML.TR("\n            ", HTML.TD({                        // 280
        colspan: "2"                                                                                                 // 281
      }, "\n              ", Blaze.If(function() {                                                                   // 282
        return Spacebars.call(view.lookup("failureStackTrace"));                                                     // 283
      }, function() {                                                                                                // 284
        return [ "\n                  ", HTML.PRE({                                                                  // 285
          "class": "velocity-stack-trace"                                                                            // 286
        }, Blaze.View("lookup:failureStackTrace", function() {                                                       // 287
          return Spacebars.mustache(view.lookup("failureStackTrace"));                                               // 288
        })), "\n              " ];                                                                                   // 289
      }), "\n            "), "\n        "), "\n    " ];                                                              // 290
    }), "\n  " ];                                                                                                    // 291
  });                                                                                                                // 292
}));                                                                                                                 // 293
                                                                                                                     // 294
Template.__checkName("velocityLogs");                                                                                // 295
Template["velocityLogs"] = new Template("Template.velocityLogs", (function() {                                       // 296
  var view = this;                                                                                                   // 297
  return HTML.DIV({                                                                                                  // 298
    "class": "velocity-table-box"                                                                                    // 299
  }, "\n        ", HTML.TABLE({                                                                                      // 300
    id: "velocityLogs",                                                                                              // 301
    "class": "velocity-table"                                                                                        // 302
  }, "\n            ", HTML.THEAD("\n            ", HTML.TR("\n                ", HTML.TH("Timestamp"), "\n                ", HTML.TH("Level"), "\n                ", HTML.TH("Message"), "\n                ", HTML.TH("Framework"), "\n            "), "\n            "), "\n            ", HTML.TBODY("\n            ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("logs"));                                                                      // 304
  }, function() {                                                                                                    // 305
    return [ "\n              ", Spacebars.include(view.lookupTemplate("velocityLog")), "\n            " ];          // 306
  }), "\n            "), "\n        "), "\n    ");                                                                   // 307
}));                                                                                                                 // 308
                                                                                                                     // 309
Template.__checkName("velocityLog");                                                                                 // 310
Template["velocityLog"] = new Template("Template.velocityLog", (function() {                                         // 311
  var view = this;                                                                                                   // 312
  return HTML.TR({                                                                                                   // 313
    "class": function() {                                                                                            // 314
      return Spacebars.mustache(view.lookup("result"));                                                              // 315
    }                                                                                                                // 316
  }, "\n        ", HTML.TD(Blaze.View("lookup:timestamp", function() {                                               // 317
    return Spacebars.mustache(view.lookup("timestamp"));                                                             // 318
  })), "\n        ", HTML.TD(Blaze.View("lookup:level", function() {                                                 // 319
    return Spacebars.mustache(view.lookup("level"));                                                                 // 320
  })), "\n        ", HTML.TD(Blaze.View("lookup:message", function() {                                               // 321
    return Spacebars.mustache(view.lookup("message"));                                                               // 322
  })), "\n        ", HTML.TD(Blaze.View("lookup:framework", function() {                                             // 323
    return Spacebars.mustache(view.lookup("framework"));                                                             // 324
  })), "\n    ");                                                                                                    // 325
}));                                                                                                                 // 326
                                                                                                                     // 327
Template.__checkName("velocityTestFiles");                                                                           // 328
Template["velocityTestFiles"] = new Template("Template.velocityTestFiles", (function() {                             // 329
  var view = this;                                                                                                   // 330
  return HTML.DIV({                                                                                                  // 331
    "class": "velocity-table-box"                                                                                    // 332
  }, "\n        ", HTML.TABLE({                                                                                      // 333
    id: "velocityTestFiles",                                                                                         // 334
    "class": "velocity-table"                                                                                        // 335
  }, "\n            ", HTML.THEAD("\n            ", HTML.TR("\n                ", HTML.TH("ID"), "\n                ", HTML.TH("Relative Path"), "\n                ", HTML.TH("Target Framework"), "\n                ", HTML.TH("Last Modified"), "\n            "), "\n            "), "\n            ", HTML.TBODY("\n            ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("testFiles"));                                                                 // 337
  }, function() {                                                                                                    // 338
    return [ "\n              ", Spacebars.include(view.lookupTemplate("velocityTestFile")), "\n            " ];     // 339
  }), "\n            "), "\n        "), "\n    ");                                                                   // 340
}));                                                                                                                 // 341
                                                                                                                     // 342
Template.__checkName("velocityTestFile");                                                                            // 343
Template["velocityTestFile"] = new Template("Template.velocityTestFile", (function() {                               // 344
  var view = this;                                                                                                   // 345
  return HTML.TR({                                                                                                   // 346
    "class": function() {                                                                                            // 347
      return Spacebars.mustache(view.lookup("result"));                                                              // 348
    }                                                                                                                // 349
  }, "\n        ", HTML.TD(Blaze.View("lookup:_id", function() {                                                     // 350
    return Spacebars.mustache(view.lookup("_id"));                                                                   // 351
  })), "\n        ", HTML.TD(Blaze.View("lookup:relativePath", function() {                                          // 352
    return Spacebars.mustache(view.lookup("relativePath"));                                                          // 353
  })), "\n        ", HTML.TD(Blaze.View("lookup:targetFramework", function() {                                       // 354
    return Spacebars.mustache(view.lookup("targetFramework"));                                                       // 355
  })), "\n        ", HTML.TD(Blaze.View("lookup:lastModified", function() {                                          // 356
    return Spacebars.mustache(view.lookup("lastModified"));                                                          // 357
  })), "\n    ");                                                                                                    // 358
}));                                                                                                                 // 359
                                                                                                                     // 360
Template.__checkName("velocityResetNotification");                                                                   // 361
Template["velocityResetNotification"] = new Template("Template.velocityResetNotification", (function() {             // 362
  var view = this;                                                                                                   // 363
  return HTML.Raw('<div id="velocityResetNotification">\n        <div class="velocity-notice-inline">\n            <div class="velocity-section-header">\n                <span class="velocity-section-name">Please wait</span>\n            </div>\n            <p>Velocity is updating your files.</p>\n        </div>\n    </div>');
}));                                                                                                                 // 365
                                                                                                                     // 366
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/velocity_html-reporter/lib/client-report.js                                                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
suiteHasFailed = function (suite) {                                                                                  // 1
  return !!VelocityTestReports.findOne({                                                                             // 2
    framework: suite.framework,                                                                                      // 3
    ancestors: suite.ancestors,                                                                                      // 4
    result: "failed"                                                                                                 // 5
  });                                                                                                                //
};                                                                                                                   //
                                                                                                                     //
frameworkStatus = function (name) {                                                                                  // 9
  var hasTests = VelocityTestReports.find({ framework: name }).count() > 0;                                          // 10
  if (!hasTests) return "empty";                                                                                     // 11
                                                                                                                     //
  var frameworkExecStatus = VelocityAggregateReports.findOne({ name: name });                                        // 13
  var isComplete = frameworkExecStatus && frameworkExecStatus.result === "completed";                                // 14
  var hasFailed = !!VelocityTestReports.findOne({ framework: name, result: "failed" });                              // 15
                                                                                                                     //
  if (hasFailed) return "failed";else if (isComplete) return "passed";else return "pending";                         // 17
};                                                                                                                   //
                                                                                                                     //
function mochaPresent() {                                                                                            // 25
  //XXX hard-coding mocha iframe support for now                                                                     //
  return !!VelocityAggregateReports.findOne({ 'name': 'mocha' });                                                    // 27
}                                                                                                                    //
function nightwatchPresent() {                                                                                       // 29
  return !!VelocityAggregateReports.findOne({ 'name': 'nightwatch' });                                               // 30
}                                                                                                                    //
function cucumberPresent() {                                                                                         // 32
  return !!VelocityAggregateReports.findOne({ 'name': 'cucumber' });                                                 // 33
}                                                                                                                    //
                                                                                                                     //
Template.velocity.created = function () {                                                                            // 36
  // Only show widget when we know we are NOT running in a Velocity Mirror                                           //
  Session.setDefault('velocity.isMirror', true);                                                                     // 38
  // Determine if user has disabled velocity                                                                         //
  Meteor.call('velocity/isEnabled', function (error, result) {                                                       // 40
    if (error) {                                                                                                     // 41
      // Log error. HTML Reporter will not be shown                                                                  //
      console.error(error);                                                                                          // 43
    } else {                                                                                                         //
      Session.set('velocity.isEnabled', result);                                                                     // 45
    }                                                                                                                //
  });                                                                                                                //
                                                                                                                     //
  // Determine if session is running in a Velocity mirror or not                                                     //
  Meteor.call('velocity/isMirror', function (error, result) {                                                        // 50
    if (error) {                                                                                                     // 51
      // Log error. HTML Reporter will not be shown                                                                  //
      console.error(error);                                                                                          // 53
    } else {                                                                                                         //
      Session.set('velocity.isMirror', result);                                                                      // 55
    }                                                                                                                //
  });                                                                                                                //
};                                                                                                                   //
                                                                                                                     //
Template.velocity.helpers({                                                                                          // 60
  statusWidgetClass: function () {                                                                                   // 61
    var aggregateResult = VelocityAggregateReports.findOne({ name: 'aggregateResult' });                             // 62
    if (aggregateResult && aggregateResult.result === 'failed') {                                                    // 63
      return 'failed';                                                                                               // 64
    }                                                                                                                //
                                                                                                                     //
    var aggregateComplete = VelocityAggregateReports.findOne({ name: 'aggregateComplete' });                         // 67
    if (aggregateComplete && aggregateResult && aggregateResult.result === 'passed' && aggregateComplete.result === 'completed') {
      return 'passed';                                                                                               // 70
    }                                                                                                                //
    return 'pending';                                                                                                // 72
  },                                                                                                                 //
  statusWidgetPosition: function () {                                                                                // 74
    var defaultPosition = "top right";                                                                               // 75
    if (Meteor.settings && Meteor.settings["public"] && Meteor.settings["public"]['velocity:html-reporter']) {       // 76
      return Meteor.settings["public"]['velocity:html-reporter'].position || defaultPosition;                        // 77
    }                                                                                                                //
    return defaultPosition;                                                                                          // 79
  },                                                                                                                 //
  statusWidgetTabIndex: function () {                                                                                // 81
    var defaultIndex = "1";                                                                                          // 82
    if (Meteor.settings && Meteor.settings["public"] && Meteor.settings["public"]['velocity:html-reporter']) {       // 83
      return Meteor.settings["public"]['velocity:html-reporter']['tab-index'] || defaultIndex;                       // 84
    }                                                                                                                //
    return defaultIndex;                                                                                             // 86
  },                                                                                                                 //
  resetting: function () {                                                                                           // 88
    return Session.get('resettingVelocity');                                                                         // 89
  },                                                                                                                 //
  testReports: function () {                                                                                         // 91
    return VelocityTestReports.find();                                                                               // 92
  },                                                                                                                 //
  frameworks: function () {                                                                                          // 94
    return VelocityAggregateReports.find({ name: { $nin: ["aggregateResult", "aggregateComplete"] } });              // 95
  },                                                                                                                 //
  active: function (id) {                                                                                            // 97
    return reamplify.store(id);                                                                                      // 98
  },                                                                                                                 //
  overlayIsVisible: function () {                                                                                    // 100
    return amplify.store('velocityOverlayIsVisible');                                                                // 101
  },                                                                                                                 //
  showVelocity: function () {                                                                                        // 103
    // This causes the html reporter to remain hidden if running in a Velocity mirror                                //
    return Session.equals('velocity.isEnabled', true) && Session.equals('velocity.isMirror', false);                 // 105
  },                                                                                                                 //
  mochaPresent: mochaPresent,                                                                                        // 107
  nightwatchPresent: nightwatchPresent                                                                               // 108
});                                                                                                                  //
                                                                                                                     //
Template.velocityReports.helpers({                                                                                   // 111
  frameworkStatus: function () {                                                                                     // 112
    return frameworkStatus(this.name);                                                                               // 113
  },                                                                                                                 //
  mirrorStatus: function () {                                                                                        // 115
    var mirror = VelocityMirrors.findOne({ framework: this.name });                                                  // 116
                                                                                                                     //
    return mirror && mirror.state.trim();                                                                            // 118
  },                                                                                                                 //
  mirrorUrl: function () {                                                                                           // 120
    var mirror = VelocityMirrors.findOne({ framework: this.name });                                                  // 121
                                                                                                                     //
    return mirror && mirror.rootUrl;                                                                                 // 123
  },                                                                                                                 //
  isPassed: function (status) {                                                                                      // 125
    return status === 'passed';                                                                                      // 126
  },                                                                                                                 //
  frameworkTotalTestCount: function () {                                                                             // 128
    return VelocityTestReports.find({ framework: this.name }).count();                                               // 129
  },                                                                                                                 //
  frameworkPassedTestCount: function () {                                                                            // 131
    return VelocityTestReports.find({ framework: this.name, result: 'passed' }).count();                             // 132
  },                                                                                                                 //
  noFrameworkFiles: function () {                                                                                    // 134
    // XXX presence of VelocityAggregateReports is a stand-in for                                                    //
    // Velocity being loaded. This is a bit brittle. It breaks                                                       //
    // if you call the Velocity "reset" method.                                                                      //
    var velocityIsLoaded = !!VelocityAggregateReports;                                                               // 138
    return !velocityIsLoaded ? false : !VelocityTestFiles.findOne({ targetFramework: this.name });                   // 139
  },                                                                                                                 //
  suites: function () {                                                                                              // 141
    var result = [];                                                                                                 // 142
    var allReports = VelocityTestReports.find({ framework: this.name }).fetch();                                     // 143
    // XXX for now, ancestors get reduced to a single-tier suite                                                     //
    // Should we do fancier indenting, etc. for nested suites?                                                       //
    // If not, forcing packages to concatenate their own "suite" string                                              //
    // instead of ancestors array would clean this up.                                                               //
    if (allReports.length > 0) {                                                                                     // 148
                                                                                                                     //
      var reports = _.map(allReports, function (report) {                                                            // 150
        //must clone report.ancestors to not mutate report.ancestors with .reverse()                                 //
        var ancestors = report.ancestors ? _.clone(report.ancestors) : [];                                           // 152
        report.suite = ancestors.reverse().join(".");                                                                // 153
        return report;                                                                                               // 154
      });                                                                                                            //
                                                                                                                     //
      _.each(reports, function (report) {                                                                            // 157
        if (!_.findWhere(result, { suite: report.suite })) result.push({                                             // 158
          framework: report.framework,                                                                               // 160
          ancestors: report.ancestors, //needed for future queries                                                   // 161
          suite: report.suite                                                                                        // 162
        });                                                                                                          //
      });                                                                                                            //
                                                                                                                     //
      return result;                                                                                                 // 166
    }                                                                                                                //
  },                                                                                                                 //
  suiteStatus: function () {                                                                                         // 169
    return suiteHasFailed(this) ? 'failed' : 'passed';                                                               // 170
  },                                                                                                                 //
  suiteNotHidden: function () {                                                                                      // 172
    if (!reamplify.store('showSuccessful')) return suiteHasFailed(this);                                             // 173
    return true;                                                                                                     // 175
  },                                                                                                                 //
  reports: function () {                                                                                             // 177
    return VelocityTestReports.find({                                                                                // 178
      framework: this.framework,                                                                                     // 179
      ancestors: this.ancestors                                                                                      // 180
    });                                                                                                              //
  }                                                                                                                  //
});                                                                                                                  //
                                                                                                                     //
Template.velocitySummary.helpers({                                                                                   // 185
  anyFailed: function () {                                                                                           // 186
    var aggregateResult = VelocityAggregateReports.findOne({ name: 'aggregateResult' });                             // 187
    if (aggregateResult && aggregateResult.result === 'failed') {                                                    // 188
      return true;                                                                                                   // 189
    }                                                                                                                //
    return false;                                                                                                    // 191
  },                                                                                                                 //
  totalTime: function () {                                                                                           // 193
    var results = VelocityTestReports.find().fetch();                                                                // 194
                                                                                                                     //
    var firstTimeStamp, lastTimestamp, lastDuration;                                                                 // 196
    _.each(results, function (result) {                                                                              // 197
      if (!firstTimeStamp || firstTimeStamp > result.timestamp.getTime()) {                                          // 198
        firstTimeStamp = result.timestamp.getTime();                                                                 // 199
      }                                                                                                              //
      if (!lastTimestamp || lastTimestamp < result.timestamp.getTime()) {                                            // 201
        lastTimestamp = result.timestamp.getTime();                                                                  // 202
        lastDuration = result.duration;                                                                              // 203
      }                                                                                                              //
    });                                                                                                              //
                                                                                                                     //
    //var ms = results                                                                                               //
    //  .reduce(function (tot, i) { return tot + (i.duration || 0) }, 0);                                            //
                                                                                                                     //
    var ms = lastTimestamp + lastDuration - firstTimeStamp;                                                          // 210
                                                                                                                     //
    if (ms >= 1000) return Math.round(ms / 1000) + ' s';                                                             // 212
                                                                                                                     //
    return (ms ? ms : 0) + ' ms';                                                                                    // 214
  },                                                                                                                 //
  regularPlural: function (count, word, suffix) {                                                                    // 216
    if (count === 1) return word;                                                                                    // 217
    return word + suffix;                                                                                            // 218
  },                                                                                                                 //
  totalFailedTestCount: function () {                                                                                // 220
    return VelocityTestReports.find({ result: 'failed' }).count();                                                   // 221
  },                                                                                                                 //
  totalTestCount: function () {                                                                                      // 223
    return VelocityTestReports.find().count();                                                                       // 224
  },                                                                                                                 //
  totalPassedTestCount: function () {                                                                                // 226
    return VelocityTestReports.find({ result: 'passed' }).count();                                                   // 227
  }                                                                                                                  //
});                                                                                                                  //
                                                                                                                     //
Template.velocityControlPanel.helpers({                                                                              // 231
  mochaPresent: mochaPresent,                                                                                        // 232
  nightwatchPresent: nightwatchPresent,                                                                              // 233
  cucumberPresent: cucumberPresent,                                                                                  // 234
  showActive: function (self) {                                                                                      // 235
    return reamplify.store(self) ? 'active' : '';                                                                    // 236
  }                                                                                                                  //
});                                                                                                                  //
                                                                                                                     //
Template.velocityControlPanel.events({                                                                               // 240
  'click #runNightwatchTests': function () {                                                                         // 241
    Meteor.call('nightwatch/run');                                                                                   // 242
  },                                                                                                                 //
  'click #runCucumber': function () {                                                                                // 244
    Meteor.call('cucumber/run');                                                                                     // 245
  }                                                                                                                  //
});                                                                                                                  //
                                                                                                                     //
Template.velocityTestReport.helpers({                                                                                // 249
  reportNotHidden: function () {                                                                                     // 250
    if (this.result === "failed") return true;else {                                                                 // 251
      return reamplify.store('showSuccessful');                                                                      // 254
    }                                                                                                                //
  },                                                                                                                 //
  failed: function () {                                                                                              // 257
    return this.result === "failed";                                                                                 // 258
  }                                                                                                                  //
});                                                                                                                  //
                                                                                                                     //
Template.velocityTestFiles.helpers({                                                                                 // 262
  testFiles: function () {                                                                                           // 263
    return VelocityTestFiles.find();                                                                                 // 264
  },                                                                                                                 //
  isVisible: function () {                                                                                           // 266
    return amplify.store('velocityTestFilesIsVisible') ? 'block' : 'none';                                           // 267
  }                                                                                                                  //
});                                                                                                                  //
                                                                                                                     //
Template.velocityLogs.helpers({                                                                                      // 271
  logs: function () {                                                                                                // 272
    return VelocityLogs.find();                                                                                      // 273
  },                                                                                                                 //
  isVisible: function () {                                                                                           // 275
    return amplify.store('velocityLogsIsVisible') ? 'block' : 'none';                                                // 276
  }                                                                                                                  //
});                                                                                                                  //
                                                                                                                     //
Template.velocity.events({                                                                                           // 280
  'keypress .display-toggle, click .display-toggle': function (e) {                                                  // 281
    var targetId = $(e.currentTarget).data('target'),                                                                // 282
        $target = $('#' + targetId);                                                                                 //
    $target.toggleClass('visible');                                                                                  // 284
    $target.attr("aria-hidden", !$target.hasClass('visible'));                                                       // 285
    amplify.store(targetId + 'IsVisible', $target.hasClass('visible'));                                              // 286
  },                                                                                                                 //
  'change input:checkbox': function (e) {                                                                            // 288
    var targetId = e.target.id;                                                                                      // 289
    reamplify.store(e.target.id, e.target.checked);                                                                  // 290
  },                                                                                                                 //
  'click button.control-toggle': function (e) {                                                                      // 292
    var $target = $('#' + e.target.id);                                                                              // 293
    $target.toggleClass('active');                                                                                   // 294
    reamplify.store(e.target.id, $target.hasClass('active'));                                                        // 295
  },                                                                                                                 //
  'click .velocity-options-toggle': function (e, tpl) {                                                              // 297
    tpl.$('.velocity-options').toggleClass('visible');                                                               // 298
  }                                                                                                                  //
});                                                                                                                  //
                                                                                                                     //
Template.velocityReports.events({                                                                                    // 302
  'click .copy-sample-tests': function (e) {                                                                         // 303
    var self = this;                                                                                                 // 304
    Meteor.call('velocity/copySampleTests', { framework: self.name }, function () {                                  // 305
      // XXX This method for getting the new files to register is slow, but it                                       //
      // works. The reset method gets Velocity to see the new files.                                                 //
      // We then disconnect altogether to prevent flapping of reactive                                               //
      // template elements (& overlay a notification to show the user                                                //
      // what's happening). Then we simply reload. Is there a way to do this                                         //
      // with a lighter touch?                                                                                       //
                                                                                                                     //
      // make sure the user can see the demo tests, which generally pass.                                            //
      reamplify.store('showSuccessful', true);                                                                       // 314
      Session.set('resettingVelocity', true);                                                                        // 315
      Meteor.call('velocity/reset', self.name);                                                                      // 316
      Meteor.disconnect();                                                                                           // 317
      location.reload();                                                                                             // 318
    });                                                                                                              //
  }                                                                                                                  //
});                                                                                                                  //
                                                                                                                     //
Meteor.startup(function () {                                                                                         // 323
                                                                                                                     //
  if (_.isUndefined(amplify.store('velocityOverlayIsVisible'))) {                                                    // 325
    amplify.store('velocityOverlayIsVisible', true);                                                                 // 326
  }                                                                                                                  //
                                                                                                                     //
  $(document).keydown(function (e) {                                                                                 // 329
    if (e.keyCode === 86 && e.ctrlKey) {                                                                             // 330
      var state = Session.get('velocity.isEnabled');                                                                 // 331
      Session.set('velocity.isEnabled', !state);                                                                     // 332
    }                                                                                                                //
  });                                                                                                                //
});                                                                                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['velocity:html-reporter'] = {};

})();
