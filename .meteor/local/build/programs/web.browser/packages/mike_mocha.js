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
var _ = Package.underscore._;
var chai = Package['practicalmeteor:chai'].chai;
var assert = Package['practicalmeteor:chai'].assert;
var expect = Package['practicalmeteor:chai'].expect;
var should = Package['practicalmeteor:chai'].should;
var loglevel = Package['practicalmeteor:loglevel'].loglevel;
var ObjectLogger = Package['practicalmeteor:loglevel'].ObjectLogger;
var Template = Package.templating.Template;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var msg, global, MochaWeb, ddpParentConnection;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/mike_mocha/template.client.js                                                                             //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      // 1
Template.__checkName("mochaweb");                                                                                     // 2
Template["mochaweb"] = new Template("Template.mochaweb", (function() {                                                // 3
  var view = this;                                                                                                    // 4
  return HTML.IFRAME({                                                                                                // 5
    src: function() {                                                                                                 // 6
      return Spacebars.mustache(view.lookup("mochaWebIFrameURL"));                                                    // 7
    }                                                                                                                 // 8
  });                                                                                                                 // 9
}));                                                                                                                  // 10
                                                                                                                      // 11
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/mike_mocha/mocha.js                                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
;(function(){                                                                                                         // 1
                                                                                                                      // 2
// CommonJS require()                                                                                                 // 3
                                                                                                                      // 4
function require(p){                                                                                                  // 5
    var path = require.resolve(p)                                                                                     // 6
      , mod = require.modules[path];                                                                                  // 7
    if (!mod) throw new Error('failed to require "' + p + '"');                                                       // 8
    if (!mod.exports) {                                                                                               // 9
      mod.exports = {};                                                                                               // 10
      mod.call(mod.exports, mod, mod.exports, require.relative(path));                                                // 11
    }                                                                                                                 // 12
    return mod.exports;                                                                                               // 13
  }                                                                                                                   // 14
                                                                                                                      // 15
require.modules = {};                                                                                                 // 16
                                                                                                                      // 17
require.resolve = function (path){                                                                                    // 18
    var orig = path                                                                                                   // 19
      , reg = path + '.js'                                                                                            // 20
      , index = path + '/index.js';                                                                                   // 21
    return require.modules[reg] && reg                                                                                // 22
      || require.modules[index] && index                                                                              // 23
      || orig;                                                                                                        // 24
  };                                                                                                                  // 25
                                                                                                                      // 26
require.register = function (path, fn){                                                                               // 27
    require.modules[path] = fn;                                                                                       // 28
  };                                                                                                                  // 29
                                                                                                                      // 30
require.relative = function (parent) {                                                                                // 31
    return function(p){                                                                                               // 32
      if ('.' != p.charAt(0)) return require(p);                                                                      // 33
                                                                                                                      // 34
      var path = parent.split('/')                                                                                    // 35
        , segs = p.split('/');                                                                                        // 36
      path.pop();                                                                                                     // 37
                                                                                                                      // 38
      for (var i = 0; i < segs.length; i++) {                                                                         // 39
        var seg = segs[i];                                                                                            // 40
        if ('..' == seg) path.pop();                                                                                  // 41
        else if ('.' != seg) path.push(seg);                                                                          // 42
      }                                                                                                               // 43
                                                                                                                      // 44
      return require(path.join('/'));                                                                                 // 45
    };                                                                                                                // 46
  };                                                                                                                  // 47
                                                                                                                      // 48
                                                                                                                      // 49
require.register("browser/debug.js", function(module, exports, require){                                              // 50
                                                                                                                      // 51
module.exports = function(type){                                                                                      // 52
  return function(){                                                                                                  // 53
  }                                                                                                                   // 54
};                                                                                                                    // 55
                                                                                                                      // 56
}); // module: browser/debug.js                                                                                       // 57
                                                                                                                      // 58
require.register("browser/diff.js", function(module, exports, require){                                               // 59
/* See LICENSE file for terms of use */                                                                               // 60
                                                                                                                      // 61
/*                                                                                                                    // 62
 * Text diff implementation.                                                                                          // 63
 *                                                                                                                    // 64
 * This library supports the following APIS:                                                                          // 65
 * JsDiff.diffChars: Character by character diff                                                                      // 66
 * JsDiff.diffWords: Word (as defined by \b regex) diff which ignores whitespace                                      // 67
 * JsDiff.diffLines: Line based diff                                                                                  // 68
 *                                                                                                                    // 69
 * JsDiff.diffCss: Diff targeted at CSS content                                                                       // 70
 *                                                                                                                    // 71
 * These methods are based on the implementation proposed in                                                          // 72
 * "An O(ND) Difference Algorithm and its Variations" (Myers, 1986).                                                  // 73
 * http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.4.6927                                                     // 74
 */                                                                                                                   // 75
var JsDiff = (function() {                                                                                            // 76
  /*jshint maxparams: 5*/                                                                                             // 77
  function clonePath(path) {                                                                                          // 78
    return { newPos: path.newPos, components: path.components.slice(0) };                                             // 79
  }                                                                                                                   // 80
  function removeEmpty(array) {                                                                                       // 81
    var ret = [];                                                                                                     // 82
    for (var i = 0; i < array.length; i++) {                                                                          // 83
      if (array[i]) {                                                                                                 // 84
        ret.push(array[i]);                                                                                           // 85
      }                                                                                                               // 86
    }                                                                                                                 // 87
    return ret;                                                                                                       // 88
  }                                                                                                                   // 89
  function escapeHTML(s) {                                                                                            // 90
    var n = s;                                                                                                        // 91
    n = n.replace(/&/g, '&amp;');                                                                                     // 92
    n = n.replace(/</g, '&lt;');                                                                                      // 93
    n = n.replace(/>/g, '&gt;');                                                                                      // 94
    n = n.replace(/"/g, '&quot;');                                                                                    // 95
                                                                                                                      // 96
    return n;                                                                                                         // 97
  }                                                                                                                   // 98
                                                                                                                      // 99
  var Diff = function(ignoreWhitespace) {                                                                             // 100
    this.ignoreWhitespace = ignoreWhitespace;                                                                         // 101
  };                                                                                                                  // 102
  Diff.prototype = {                                                                                                  // 103
      diff: function(oldString, newString) {                                                                          // 104
        // Handle the identity case (this is due to unrolling editLength == 0                                         // 105
        if (newString === oldString) {                                                                                // 106
          return [{ value: newString }];                                                                              // 107
        }                                                                                                             // 108
        if (!newString) {                                                                                             // 109
          return [{ value: oldString, removed: true }];                                                               // 110
        }                                                                                                             // 111
        if (!oldString) {                                                                                             // 112
          return [{ value: newString, added: true }];                                                                 // 113
        }                                                                                                             // 114
                                                                                                                      // 115
        newString = this.tokenize(newString);                                                                         // 116
        oldString = this.tokenize(oldString);                                                                         // 117
                                                                                                                      // 118
        var newLen = newString.length, oldLen = oldString.length;                                                     // 119
        var maxEditLength = newLen + oldLen;                                                                          // 120
        var bestPath = [{ newPos: -1, components: [] }];                                                              // 121
                                                                                                                      // 122
        // Seed editLength = 0                                                                                        // 123
        var oldPos = this.extractCommon(bestPath[0], newString, oldString, 0);                                        // 124
        if (bestPath[0].newPos+1 >= newLen && oldPos+1 >= oldLen) {                                                   // 125
          return bestPath[0].components;                                                                              // 126
        }                                                                                                             // 127
                                                                                                                      // 128
        for (var editLength = 1; editLength <= maxEditLength; editLength++) {                                         // 129
          for (var diagonalPath = -1*editLength; diagonalPath <= editLength; diagonalPath+=2) {                       // 130
            var basePath;                                                                                             // 131
            var addPath = bestPath[diagonalPath-1],                                                                   // 132
                removePath = bestPath[diagonalPath+1];                                                                // 133
            oldPos = (removePath ? removePath.newPos : 0) - diagonalPath;                                             // 134
            if (addPath) {                                                                                            // 135
              // No one else is going to attempt to use this value, clear it                                          // 136
              bestPath[diagonalPath-1] = undefined;                                                                   // 137
            }                                                                                                         // 138
                                                                                                                      // 139
            var canAdd = addPath && addPath.newPos+1 < newLen;                                                        // 140
            var canRemove = removePath && 0 <= oldPos && oldPos < oldLen;                                             // 141
            if (!canAdd && !canRemove) {                                                                              // 142
              bestPath[diagonalPath] = undefined;                                                                     // 143
              continue;                                                                                               // 144
            }                                                                                                         // 145
                                                                                                                      // 146
            // Select the diagonal that we want to branch from. We select the prior                                   // 147
            // path whose position in the new string is the farthest from the origin                                  // 148
            // and does not pass the bounds of the diff graph                                                         // 149
            if (!canAdd || (canRemove && addPath.newPos < removePath.newPos)) {                                       // 150
              basePath = clonePath(removePath);                                                                       // 151
              this.pushComponent(basePath.components, oldString[oldPos], undefined, true);                            // 152
            } else {                                                                                                  // 153
              basePath = clonePath(addPath);                                                                          // 154
              basePath.newPos++;                                                                                      // 155
              this.pushComponent(basePath.components, newString[basePath.newPos], true, undefined);                   // 156
            }                                                                                                         // 157
                                                                                                                      // 158
            var oldPos = this.extractCommon(basePath, newString, oldString, diagonalPath);                            // 159
                                                                                                                      // 160
            if (basePath.newPos+1 >= newLen && oldPos+1 >= oldLen) {                                                  // 161
              return basePath.components;                                                                             // 162
            } else {                                                                                                  // 163
              bestPath[diagonalPath] = basePath;                                                                      // 164
            }                                                                                                         // 165
          }                                                                                                           // 166
        }                                                                                                             // 167
      },                                                                                                              // 168
                                                                                                                      // 169
      pushComponent: function(components, value, added, removed) {                                                    // 170
        var last = components[components.length-1];                                                                   // 171
        if (last && last.added === added && last.removed === removed) {                                               // 172
          // We need to clone here as the component clone operation is just                                           // 173
          // as shallow array clone                                                                                   // 174
          components[components.length-1] =                                                                           // 175
            {value: this.join(last.value, value), added: added, removed: removed };                                   // 176
        } else {                                                                                                      // 177
          components.push({value: value, added: added, removed: removed });                                           // 178
        }                                                                                                             // 179
      },                                                                                                              // 180
      extractCommon: function(basePath, newString, oldString, diagonalPath) {                                         // 181
        var newLen = newString.length,                                                                                // 182
            oldLen = oldString.length,                                                                                // 183
            newPos = basePath.newPos,                                                                                 // 184
            oldPos = newPos - diagonalPath;                                                                           // 185
        while (newPos+1 < newLen && oldPos+1 < oldLen && this.equals(newString[newPos+1], oldString[oldPos+1])) {     // 186
          newPos++;                                                                                                   // 187
          oldPos++;                                                                                                   // 188
                                                                                                                      // 189
          this.pushComponent(basePath.components, newString[newPos], undefined, undefined);                           // 190
        }                                                                                                             // 191
        basePath.newPos = newPos;                                                                                     // 192
        return oldPos;                                                                                                // 193
      },                                                                                                              // 194
                                                                                                                      // 195
      equals: function(left, right) {                                                                                 // 196
        var reWhitespace = /\S/;                                                                                      // 197
        if (this.ignoreWhitespace && !reWhitespace.test(left) && !reWhitespace.test(right)) {                         // 198
          return true;                                                                                                // 199
        } else {                                                                                                      // 200
          return left === right;                                                                                      // 201
        }                                                                                                             // 202
      },                                                                                                              // 203
      join: function(left, right) {                                                                                   // 204
        return left + right;                                                                                          // 205
      },                                                                                                              // 206
      tokenize: function(value) {                                                                                     // 207
        return value;                                                                                                 // 208
      }                                                                                                               // 209
  };                                                                                                                  // 210
                                                                                                                      // 211
  var CharDiff = new Diff();                                                                                          // 212
                                                                                                                      // 213
  var WordDiff = new Diff(true);                                                                                      // 214
  var WordWithSpaceDiff = new Diff();                                                                                 // 215
  WordDiff.tokenize = WordWithSpaceDiff.tokenize = function(value) {                                                  // 216
    return removeEmpty(value.split(/(\s+|\b)/));                                                                      // 217
  };                                                                                                                  // 218
                                                                                                                      // 219
  var CssDiff = new Diff(true);                                                                                       // 220
  CssDiff.tokenize = function(value) {                                                                                // 221
    return removeEmpty(value.split(/([{}:;,]|\s+)/));                                                                 // 222
  };                                                                                                                  // 223
                                                                                                                      // 224
  var LineDiff = new Diff();                                                                                          // 225
  LineDiff.tokenize = function(value) {                                                                               // 226
    return value.split(/^/m);                                                                                         // 227
  };                                                                                                                  // 228
                                                                                                                      // 229
  return {                                                                                                            // 230
    Diff: Diff,                                                                                                       // 231
                                                                                                                      // 232
    diffChars: function(oldStr, newStr) { return CharDiff.diff(oldStr, newStr); },                                    // 233
    diffWords: function(oldStr, newStr) { return WordDiff.diff(oldStr, newStr); },                                    // 234
    diffWordsWithSpace: function(oldStr, newStr) { return WordWithSpaceDiff.diff(oldStr, newStr); },                  // 235
    diffLines: function(oldStr, newStr) { return LineDiff.diff(oldStr, newStr); },                                    // 236
                                                                                                                      // 237
    diffCss: function(oldStr, newStr) { return CssDiff.diff(oldStr, newStr); },                                       // 238
                                                                                                                      // 239
    createPatch: function(fileName, oldStr, newStr, oldHeader, newHeader) {                                           // 240
      var ret = [];                                                                                                   // 241
                                                                                                                      // 242
      ret.push('Index: ' + fileName);                                                                                 // 243
      ret.push('===================================================================');                                // 244
      ret.push('--- ' + fileName + (typeof oldHeader === 'undefined' ? '' : '\t' + oldHeader));                       // 245
      ret.push('+++ ' + fileName + (typeof newHeader === 'undefined' ? '' : '\t' + newHeader));                       // 246
                                                                                                                      // 247
      var diff = LineDiff.diff(oldStr, newStr);                                                                       // 248
      if (!diff[diff.length-1].value) {                                                                               // 249
        diff.pop();   // Remove trailing newline add                                                                  // 250
      }                                                                                                               // 251
      diff.push({value: '', lines: []});   // Append an empty value to make cleanup easier                            // 252
                                                                                                                      // 253
      function contextLines(lines) {                                                                                  // 254
        return lines.map(function(entry) { return ' ' + entry; });                                                    // 255
      }                                                                                                               // 256
      function eofNL(curRange, i, current) {                                                                          // 257
        var last = diff[diff.length-2],                                                                               // 258
            isLast = i === diff.length-2,                                                                             // 259
            isLastOfType = i === diff.length-3 && (current.added !== last.added || current.removed !== last.removed);
                                                                                                                      // 261
        // Figure out if this is the last line for the given file and missing NL                                      // 262
        if (!/\n$/.test(current.value) && (isLast || isLastOfType)) {                                                 // 263
          curRange.push('\\ No newline at end of file');                                                              // 264
        }                                                                                                             // 265
      }                                                                                                               // 266
                                                                                                                      // 267
      var oldRangeStart = 0, newRangeStart = 0, curRange = [],                                                        // 268
          oldLine = 1, newLine = 1;                                                                                   // 269
      for (var i = 0; i < diff.length; i++) {                                                                         // 270
        var current = diff[i],                                                                                        // 271
            lines = current.lines || current.value.replace(/\n$/, '').split('\n');                                    // 272
        current.lines = lines;                                                                                        // 273
                                                                                                                      // 274
        if (current.added || current.removed) {                                                                       // 275
          if (!oldRangeStart) {                                                                                       // 276
            var prev = diff[i-1];                                                                                     // 277
            oldRangeStart = oldLine;                                                                                  // 278
            newRangeStart = newLine;                                                                                  // 279
                                                                                                                      // 280
            if (prev) {                                                                                               // 281
              curRange = contextLines(prev.lines.slice(-4));                                                          // 282
              oldRangeStart -= curRange.length;                                                                       // 283
              newRangeStart -= curRange.length;                                                                       // 284
            }                                                                                                         // 285
          }                                                                                                           // 286
          curRange.push.apply(curRange, lines.map(function(entry) { return (current.added?'+':'-') + entry; }));      // 287
          eofNL(curRange, i, current);                                                                                // 288
                                                                                                                      // 289
          if (current.added) {                                                                                        // 290
            newLine += lines.length;                                                                                  // 291
          } else {                                                                                                    // 292
            oldLine += lines.length;                                                                                  // 293
          }                                                                                                           // 294
        } else {                                                                                                      // 295
          if (oldRangeStart) {                                                                                        // 296
            // Close out any changes that have been output (or join overlapping)                                      // 297
            if (lines.length <= 8 && i < diff.length-2) {                                                             // 298
              // Overlapping                                                                                          // 299
              curRange.push.apply(curRange, contextLines(lines));                                                     // 300
            } else {                                                                                                  // 301
              // end the range and output                                                                             // 302
              var contextSize = Math.min(lines.length, 4);                                                            // 303
              ret.push(                                                                                               // 304
                  '@@ -' + oldRangeStart + ',' + (oldLine-oldRangeStart+contextSize)                                  // 305
                  + ' +' + newRangeStart + ',' + (newLine-newRangeStart+contextSize)                                  // 306
                  + ' @@');                                                                                           // 307
              ret.push.apply(ret, curRange);                                                                          // 308
              ret.push.apply(ret, contextLines(lines.slice(0, contextSize)));                                         // 309
              if (lines.length <= 4) {                                                                                // 310
                eofNL(ret, i, current);                                                                               // 311
              }                                                                                                       // 312
                                                                                                                      // 313
              oldRangeStart = 0;  newRangeStart = 0; curRange = [];                                                   // 314
            }                                                                                                         // 315
          }                                                                                                           // 316
          oldLine += lines.length;                                                                                    // 317
          newLine += lines.length;                                                                                    // 318
        }                                                                                                             // 319
      }                                                                                                               // 320
                                                                                                                      // 321
      return ret.join('\n') + '\n';                                                                                   // 322
    },                                                                                                                // 323
                                                                                                                      // 324
    applyPatch: function(oldStr, uniDiff) {                                                                           // 325
      var diffstr = uniDiff.split('\n');                                                                              // 326
      var diff = [];                                                                                                  // 327
      var remEOFNL = false,                                                                                           // 328
          addEOFNL = false;                                                                                           // 329
                                                                                                                      // 330
      for (var i = (diffstr[0][0]==='I'?4:0); i < diffstr.length; i++) {                                              // 331
        if(diffstr[i][0] === '@') {                                                                                   // 332
          var meh = diffstr[i].split(/@@ -(\d+),(\d+) \+(\d+),(\d+) @@/);                                             // 333
          diff.unshift({                                                                                              // 334
            start:meh[3],                                                                                             // 335
            oldlength:meh[2],                                                                                         // 336
            oldlines:[],                                                                                              // 337
            newlength:meh[4],                                                                                         // 338
            newlines:[]                                                                                               // 339
          });                                                                                                         // 340
        } else if(diffstr[i][0] === '+') {                                                                            // 341
          diff[0].newlines.push(diffstr[i].substr(1));                                                                // 342
        } else if(diffstr[i][0] === '-') {                                                                            // 343
          diff[0].oldlines.push(diffstr[i].substr(1));                                                                // 344
        } else if(diffstr[i][0] === ' ') {                                                                            // 345
          diff[0].newlines.push(diffstr[i].substr(1));                                                                // 346
          diff[0].oldlines.push(diffstr[i].substr(1));                                                                // 347
        } else if(diffstr[i][0] === '\\') {                                                                           // 348
          if (diffstr[i-1][0] === '+') {                                                                              // 349
            remEOFNL = true;                                                                                          // 350
          } else if(diffstr[i-1][0] === '-') {                                                                        // 351
            addEOFNL = true;                                                                                          // 352
          }                                                                                                           // 353
        }                                                                                                             // 354
      }                                                                                                               // 355
                                                                                                                      // 356
      var str = oldStr.split('\n');                                                                                   // 357
      for (var i = diff.length - 1; i >= 0; i--) {                                                                    // 358
        var d = diff[i];                                                                                              // 359
        for (var j = 0; j < d.oldlength; j++) {                                                                       // 360
          if(str[d.start-1+j] !== d.oldlines[j]) {                                                                    // 361
            return false;                                                                                             // 362
          }                                                                                                           // 363
        }                                                                                                             // 364
        Array.prototype.splice.apply(str,[d.start-1,+d.oldlength].concat(d.newlines));                                // 365
      }                                                                                                               // 366
                                                                                                                      // 367
      if (remEOFNL) {                                                                                                 // 368
        while (!str[str.length-1]) {                                                                                  // 369
          str.pop();                                                                                                  // 370
        }                                                                                                             // 371
      } else if (addEOFNL) {                                                                                          // 372
        str.push('');                                                                                                 // 373
      }                                                                                                               // 374
      return str.join('\n');                                                                                          // 375
    },                                                                                                                // 376
                                                                                                                      // 377
    convertChangesToXML: function(changes){                                                                           // 378
      var ret = [];                                                                                                   // 379
      for ( var i = 0; i < changes.length; i++) {                                                                     // 380
        var change = changes[i];                                                                                      // 381
        if (change.added) {                                                                                           // 382
          ret.push('<ins>');                                                                                          // 383
        } else if (change.removed) {                                                                                  // 384
          ret.push('<del>');                                                                                          // 385
        }                                                                                                             // 386
                                                                                                                      // 387
        ret.push(escapeHTML(change.value));                                                                           // 388
                                                                                                                      // 389
        if (change.added) {                                                                                           // 390
          ret.push('</ins>');                                                                                         // 391
        } else if (change.removed) {                                                                                  // 392
          ret.push('</del>');                                                                                         // 393
        }                                                                                                             // 394
      }                                                                                                               // 395
      return ret.join('');                                                                                            // 396
    },                                                                                                                // 397
                                                                                                                      // 398
    // See: http://code.google.com/p/google-diff-match-patch/wiki/API                                                 // 399
    convertChangesToDMP: function(changes){                                                                           // 400
      var ret = [], change;                                                                                           // 401
      for ( var i = 0; i < changes.length; i++) {                                                                     // 402
        change = changes[i];                                                                                          // 403
        ret.push([(change.added ? 1 : change.removed ? -1 : 0), change.value]);                                       // 404
      }                                                                                                               // 405
      return ret;                                                                                                     // 406
    }                                                                                                                 // 407
  };                                                                                                                  // 408
})();                                                                                                                 // 409
                                                                                                                      // 410
if (typeof module !== 'undefined') {                                                                                  // 411
    module.exports = JsDiff;                                                                                          // 412
}                                                                                                                     // 413
                                                                                                                      // 414
}); // module: browser/diff.js                                                                                        // 415
                                                                                                                      // 416
require.register("browser/events.js", function(module, exports, require){                                             // 417
                                                                                                                      // 418
/**                                                                                                                   // 419
 * Module exports.                                                                                                    // 420
 */                                                                                                                   // 421
                                                                                                                      // 422
exports.EventEmitter = EventEmitter;                                                                                  // 423
                                                                                                                      // 424
/**                                                                                                                   // 425
 * Check if `obj` is an array.                                                                                        // 426
 */                                                                                                                   // 427
                                                                                                                      // 428
function isArray(obj) {                                                                                               // 429
  return '[object Array]' == {}.toString.call(obj);                                                                   // 430
}                                                                                                                     // 431
                                                                                                                      // 432
/**                                                                                                                   // 433
 * Event emitter constructor.                                                                                         // 434
 *                                                                                                                    // 435
 * @api public                                                                                                        // 436
 */                                                                                                                   // 437
                                                                                                                      // 438
function EventEmitter(){};                                                                                            // 439
                                                                                                                      // 440
/**                                                                                                                   // 441
 * Adds a listener.                                                                                                   // 442
 *                                                                                                                    // 443
 * @api public                                                                                                        // 444
 */                                                                                                                   // 445
                                                                                                                      // 446
EventEmitter.prototype.on = function (name, fn) {                                                                     // 447
  if (!this.$events) {                                                                                                // 448
    this.$events = {};                                                                                                // 449
  }                                                                                                                   // 450
                                                                                                                      // 451
  if (!this.$events[name]) {                                                                                          // 452
    this.$events[name] = fn;                                                                                          // 453
  } else if (isArray(this.$events[name])) {                                                                           // 454
    this.$events[name].push(fn);                                                                                      // 455
  } else {                                                                                                            // 456
    this.$events[name] = [this.$events[name], fn];                                                                    // 457
  }                                                                                                                   // 458
                                                                                                                      // 459
  return this;                                                                                                        // 460
};                                                                                                                    // 461
                                                                                                                      // 462
EventEmitter.prototype.addListener = EventEmitter.prototype.on;                                                       // 463
                                                                                                                      // 464
/**                                                                                                                   // 465
 * Adds a volatile listener.                                                                                          // 466
 *                                                                                                                    // 467
 * @api public                                                                                                        // 468
 */                                                                                                                   // 469
                                                                                                                      // 470
EventEmitter.prototype.once = function (name, fn) {                                                                   // 471
  var self = this;                                                                                                    // 472
                                                                                                                      // 473
  function on () {                                                                                                    // 474
    self.removeListener(name, on);                                                                                    // 475
    fn.apply(this, arguments);                                                                                        // 476
  };                                                                                                                  // 477
                                                                                                                      // 478
  on.listener = fn;                                                                                                   // 479
  this.on(name, on);                                                                                                  // 480
                                                                                                                      // 481
  return this;                                                                                                        // 482
};                                                                                                                    // 483
                                                                                                                      // 484
/**                                                                                                                   // 485
 * Removes a listener.                                                                                                // 486
 *                                                                                                                    // 487
 * @api public                                                                                                        // 488
 */                                                                                                                   // 489
                                                                                                                      // 490
EventEmitter.prototype.removeListener = function (name, fn) {                                                         // 491
  if (this.$events && this.$events[name]) {                                                                           // 492
    var list = this.$events[name];                                                                                    // 493
                                                                                                                      // 494
    if (isArray(list)) {                                                                                              // 495
      var pos = -1;                                                                                                   // 496
                                                                                                                      // 497
      for (var i = 0, l = list.length; i < l; i++) {                                                                  // 498
        if (list[i] === fn || (list[i].listener && list[i].listener === fn)) {                                        // 499
          pos = i;                                                                                                    // 500
          break;                                                                                                      // 501
        }                                                                                                             // 502
      }                                                                                                               // 503
                                                                                                                      // 504
      if (pos < 0) {                                                                                                  // 505
        return this;                                                                                                  // 506
      }                                                                                                               // 507
                                                                                                                      // 508
      list.splice(pos, 1);                                                                                            // 509
                                                                                                                      // 510
      if (!list.length) {                                                                                             // 511
        delete this.$events[name];                                                                                    // 512
      }                                                                                                               // 513
    } else if (list === fn || (list.listener && list.listener === fn)) {                                              // 514
      delete this.$events[name];                                                                                      // 515
    }                                                                                                                 // 516
  }                                                                                                                   // 517
                                                                                                                      // 518
  return this;                                                                                                        // 519
};                                                                                                                    // 520
                                                                                                                      // 521
/**                                                                                                                   // 522
 * Removes all listeners for an event.                                                                                // 523
 *                                                                                                                    // 524
 * @api public                                                                                                        // 525
 */                                                                                                                   // 526
                                                                                                                      // 527
EventEmitter.prototype.removeAllListeners = function (name) {                                                         // 528
  if (name === undefined) {                                                                                           // 529
    this.$events = {};                                                                                                // 530
    return this;                                                                                                      // 531
  }                                                                                                                   // 532
                                                                                                                      // 533
  if (this.$events && this.$events[name]) {                                                                           // 534
    this.$events[name] = null;                                                                                        // 535
  }                                                                                                                   // 536
                                                                                                                      // 537
  return this;                                                                                                        // 538
};                                                                                                                    // 539
                                                                                                                      // 540
/**                                                                                                                   // 541
 * Gets all listeners for a certain event.                                                                            // 542
 *                                                                                                                    // 543
 * @api public                                                                                                        // 544
 */                                                                                                                   // 545
                                                                                                                      // 546
EventEmitter.prototype.listeners = function (name) {                                                                  // 547
  if (!this.$events) {                                                                                                // 548
    this.$events = {};                                                                                                // 549
  }                                                                                                                   // 550
                                                                                                                      // 551
  if (!this.$events[name]) {                                                                                          // 552
    this.$events[name] = [];                                                                                          // 553
  }                                                                                                                   // 554
                                                                                                                      // 555
  if (!isArray(this.$events[name])) {                                                                                 // 556
    this.$events[name] = [this.$events[name]];                                                                        // 557
  }                                                                                                                   // 558
                                                                                                                      // 559
  return this.$events[name];                                                                                          // 560
};                                                                                                                    // 561
                                                                                                                      // 562
/**                                                                                                                   // 563
 * Emits an event.                                                                                                    // 564
 *                                                                                                                    // 565
 * @api public                                                                                                        // 566
 */                                                                                                                   // 567
                                                                                                                      // 568
EventEmitter.prototype.emit = function (name) {                                                                       // 569
  if (!this.$events) {                                                                                                // 570
    return false;                                                                                                     // 571
  }                                                                                                                   // 572
                                                                                                                      // 573
  var handler = this.$events[name];                                                                                   // 574
                                                                                                                      // 575
  if (!handler) {                                                                                                     // 576
    return false;                                                                                                     // 577
  }                                                                                                                   // 578
                                                                                                                      // 579
  var args = [].slice.call(arguments, 1);                                                                             // 580
                                                                                                                      // 581
  if ('function' == typeof handler) {                                                                                 // 582
    handler.apply(this, args);                                                                                        // 583
  } else if (isArray(handler)) {                                                                                      // 584
    var listeners = handler.slice();                                                                                  // 585
                                                                                                                      // 586
    for (var i = 0, l = listeners.length; i < l; i++) {                                                               // 587
      listeners[i].apply(this, args);                                                                                 // 588
    }                                                                                                                 // 589
  } else {                                                                                                            // 590
    return false;                                                                                                     // 591
  }                                                                                                                   // 592
                                                                                                                      // 593
  return true;                                                                                                        // 594
};                                                                                                                    // 595
}); // module: browser/events.js                                                                                      // 596
                                                                                                                      // 597
require.register("browser/fs.js", function(module, exports, require){                                                 // 598
                                                                                                                      // 599
}); // module: browser/fs.js                                                                                          // 600
                                                                                                                      // 601
require.register("browser/path.js", function(module, exports, require){                                               // 602
                                                                                                                      // 603
}); // module: browser/path.js                                                                                        // 604
                                                                                                                      // 605
require.register("browser/progress.js", function(module, exports, require){                                           // 606
/**                                                                                                                   // 607
 * Expose `Progress`.                                                                                                 // 608
 */                                                                                                                   // 609
                                                                                                                      // 610
module.exports = Progress;                                                                                            // 611
                                                                                                                      // 612
/**                                                                                                                   // 613
 * Initialize a new `Progress` indicator.                                                                             // 614
 */                                                                                                                   // 615
                                                                                                                      // 616
function Progress() {                                                                                                 // 617
  this.percent = 0;                                                                                                   // 618
  this.size(0);                                                                                                       // 619
  this.fontSize(11);                                                                                                  // 620
  this.font('helvetica, arial, sans-serif');                                                                          // 621
}                                                                                                                     // 622
                                                                                                                      // 623
/**                                                                                                                   // 624
 * Set progress size to `n`.                                                                                          // 625
 *                                                                                                                    // 626
 * @param {Number} n                                                                                                  // 627
 * @return {Progress} for chaining                                                                                    // 628
 * @api public                                                                                                        // 629
 */                                                                                                                   // 630
                                                                                                                      // 631
Progress.prototype.size = function(n){                                                                                // 632
  this._size = n;                                                                                                     // 633
  return this;                                                                                                        // 634
};                                                                                                                    // 635
                                                                                                                      // 636
/**                                                                                                                   // 637
 * Set text to `str`.                                                                                                 // 638
 *                                                                                                                    // 639
 * @param {String} str                                                                                                // 640
 * @return {Progress} for chaining                                                                                    // 641
 * @api public                                                                                                        // 642
 */                                                                                                                   // 643
                                                                                                                      // 644
Progress.prototype.text = function(str){                                                                              // 645
  this._text = str;                                                                                                   // 646
  return this;                                                                                                        // 647
};                                                                                                                    // 648
                                                                                                                      // 649
/**                                                                                                                   // 650
 * Set font size to `n`.                                                                                              // 651
 *                                                                                                                    // 652
 * @param {Number} n                                                                                                  // 653
 * @return {Progress} for chaining                                                                                    // 654
 * @api public                                                                                                        // 655
 */                                                                                                                   // 656
                                                                                                                      // 657
Progress.prototype.fontSize = function(n){                                                                            // 658
  this._fontSize = n;                                                                                                 // 659
  return this;                                                                                                        // 660
};                                                                                                                    // 661
                                                                                                                      // 662
/**                                                                                                                   // 663
 * Set font `family`.                                                                                                 // 664
 *                                                                                                                    // 665
 * @param {String} family                                                                                             // 666
 * @return {Progress} for chaining                                                                                    // 667
 */                                                                                                                   // 668
                                                                                                                      // 669
Progress.prototype.font = function(family){                                                                           // 670
  this._font = family;                                                                                                // 671
  return this;                                                                                                        // 672
};                                                                                                                    // 673
                                                                                                                      // 674
/**                                                                                                                   // 675
 * Update percentage to `n`.                                                                                          // 676
 *                                                                                                                    // 677
 * @param {Number} n                                                                                                  // 678
 * @return {Progress} for chaining                                                                                    // 679
 */                                                                                                                   // 680
                                                                                                                      // 681
Progress.prototype.update = function(n){                                                                              // 682
  this.percent = n;                                                                                                   // 683
  return this;                                                                                                        // 684
};                                                                                                                    // 685
                                                                                                                      // 686
/**                                                                                                                   // 687
 * Draw on `ctx`.                                                                                                     // 688
 *                                                                                                                    // 689
 * @param {CanvasRenderingContext2d} ctx                                                                              // 690
 * @return {Progress} for chaining                                                                                    // 691
 */                                                                                                                   // 692
                                                                                                                      // 693
Progress.prototype.draw = function(ctx){                                                                              // 694
  try {                                                                                                               // 695
    var percent = Math.min(this.percent, 100)                                                                         // 696
      , size = this._size                                                                                             // 697
      , half = size / 2                                                                                               // 698
      , x = half                                                                                                      // 699
      , y = half                                                                                                      // 700
      , rad = half - 1                                                                                                // 701
      , fontSize = this._fontSize;                                                                                    // 702
                                                                                                                      // 703
    ctx.font = fontSize + 'px ' + this._font;                                                                         // 704
                                                                                                                      // 705
    var angle = Math.PI * 2 * (percent / 100);                                                                        // 706
    ctx.clearRect(0, 0, size, size);                                                                                  // 707
                                                                                                                      // 708
    // outer circle                                                                                                   // 709
    ctx.strokeStyle = '#9f9f9f';                                                                                      // 710
    ctx.beginPath();                                                                                                  // 711
    ctx.arc(x, y, rad, 0, angle, false);                                                                              // 712
    ctx.stroke();                                                                                                     // 713
                                                                                                                      // 714
    // inner circle                                                                                                   // 715
    ctx.strokeStyle = '#eee';                                                                                         // 716
    ctx.beginPath();                                                                                                  // 717
    ctx.arc(x, y, rad - 1, 0, angle, true);                                                                           // 718
    ctx.stroke();                                                                                                     // 719
                                                                                                                      // 720
    // text                                                                                                           // 721
    var text = this._text || (percent | 0) + '%'                                                                      // 722
      , w = ctx.measureText(text).width;                                                                              // 723
                                                                                                                      // 724
    ctx.fillText(                                                                                                     // 725
        text                                                                                                          // 726
      , x - w / 2 + 1                                                                                                 // 727
      , y + fontSize / 2 - 1);                                                                                        // 728
  } catch (ex) {} //don't fail if we can't render progress                                                            // 729
  return this;                                                                                                        // 730
};                                                                                                                    // 731
                                                                                                                      // 732
}); // module: browser/progress.js                                                                                    // 733
                                                                                                                      // 734
require.register("browser/tty.js", function(module, exports, require){                                                // 735
                                                                                                                      // 736
exports.isatty = function(){                                                                                          // 737
  return true;                                                                                                        // 738
};                                                                                                                    // 739
                                                                                                                      // 740
exports.getWindowSize = function(){                                                                                   // 741
  if ('innerHeight' in global) {                                                                                      // 742
    return [global.innerHeight, global.innerWidth];                                                                   // 743
  } else {                                                                                                            // 744
    // In a Web Worker, the DOM Window is not available.                                                              // 745
    return [640, 480];                                                                                                // 746
  }                                                                                                                   // 747
};                                                                                                                    // 748
                                                                                                                      // 749
}); // module: browser/tty.js                                                                                         // 750
                                                                                                                      // 751
require.register("context.js", function(module, exports, require){                                                    // 752
                                                                                                                      // 753
/**                                                                                                                   // 754
 * Expose `Context`.                                                                                                  // 755
 */                                                                                                                   // 756
                                                                                                                      // 757
module.exports = Context;                                                                                             // 758
                                                                                                                      // 759
/**                                                                                                                   // 760
 * Initialize a new `Context`.                                                                                        // 761
 *                                                                                                                    // 762
 * @api private                                                                                                       // 763
 */                                                                                                                   // 764
                                                                                                                      // 765
function Context(){}                                                                                                  // 766
                                                                                                                      // 767
/**                                                                                                                   // 768
 * Set or get the context `Runnable` to `runnable`.                                                                   // 769
 *                                                                                                                    // 770
 * @param {Runnable} runnable                                                                                         // 771
 * @return {Context}                                                                                                  // 772
 * @api private                                                                                                       // 773
 */                                                                                                                   // 774
                                                                                                                      // 775
Context.prototype.runnable = function(runnable){                                                                      // 776
  if (0 == arguments.length) return this._runnable;                                                                   // 777
  this.test = this._runnable = runnable;                                                                              // 778
  return this;                                                                                                        // 779
};                                                                                                                    // 780
                                                                                                                      // 781
/**                                                                                                                   // 782
 * Set test timeout `ms`.                                                                                             // 783
 *                                                                                                                    // 784
 * @param {Number} ms                                                                                                 // 785
 * @return {Context} self                                                                                             // 786
 * @api private                                                                                                       // 787
 */                                                                                                                   // 788
                                                                                                                      // 789
Context.prototype.timeout = function(ms){                                                                             // 790
  this.runnable().timeout(ms);                                                                                        // 791
  return this;                                                                                                        // 792
};                                                                                                                    // 793
                                                                                                                      // 794
/**                                                                                                                   // 795
 * Set test slowness threshold `ms`.                                                                                  // 796
 *                                                                                                                    // 797
 * @param {Number} ms                                                                                                 // 798
 * @return {Context} self                                                                                             // 799
 * @api private                                                                                                       // 800
 */                                                                                                                   // 801
                                                                                                                      // 802
Context.prototype.slow = function(ms){                                                                                // 803
  this.runnable().slow(ms);                                                                                           // 804
  return this;                                                                                                        // 805
};                                                                                                                    // 806
                                                                                                                      // 807
/**                                                                                                                   // 808
 * Inspect the context void of `._runnable`.                                                                          // 809
 *                                                                                                                    // 810
 * @return {String}                                                                                                   // 811
 * @api private                                                                                                       // 812
 */                                                                                                                   // 813
                                                                                                                      // 814
Context.prototype.inspect = function(){                                                                               // 815
  return JSON.stringify(this, function(key, val){                                                                     // 816
    if ('_runnable' == key) return;                                                                                   // 817
    if ('test' == key) return;                                                                                        // 818
    return val;                                                                                                       // 819
  }, 2);                                                                                                              // 820
};                                                                                                                    // 821
                                                                                                                      // 822
}); // module: context.js                                                                                             // 823
                                                                                                                      // 824
require.register("hook.js", function(module, exports, require){                                                       // 825
                                                                                                                      // 826
/**                                                                                                                   // 827
 * Module dependencies.                                                                                               // 828
 */                                                                                                                   // 829
                                                                                                                      // 830
var Runnable = require('./runnable');                                                                                 // 831
                                                                                                                      // 832
/**                                                                                                                   // 833
 * Expose `Hook`.                                                                                                     // 834
 */                                                                                                                   // 835
                                                                                                                      // 836
module.exports = Hook;                                                                                                // 837
                                                                                                                      // 838
/**                                                                                                                   // 839
 * Initialize a new `Hook` with the given `title` and callback `fn`.                                                  // 840
 *                                                                                                                    // 841
 * @param {String} title                                                                                              // 842
 * @param {Function} fn                                                                                               // 843
 * @api private                                                                                                       // 844
 */                                                                                                                   // 845
                                                                                                                      // 846
function Hook(title, fn) {                                                                                            // 847
  Runnable.call(this, title, fn);                                                                                     // 848
  this.type = 'hook';                                                                                                 // 849
}                                                                                                                     // 850
                                                                                                                      // 851
/**                                                                                                                   // 852
 * Inherit from `Runnable.prototype`.                                                                                 // 853
 */                                                                                                                   // 854
                                                                                                                      // 855
function F(){};                                                                                                       // 856
F.prototype = Runnable.prototype;                                                                                     // 857
Hook.prototype = new F;                                                                                               // 858
Hook.prototype.constructor = Hook;                                                                                    // 859
                                                                                                                      // 860
                                                                                                                      // 861
/**                                                                                                                   // 862
 * Get or set the test `err`.                                                                                         // 863
 *                                                                                                                    // 864
 * @param {Error} err                                                                                                 // 865
 * @return {Error}                                                                                                    // 866
 * @api public                                                                                                        // 867
 */                                                                                                                   // 868
                                                                                                                      // 869
Hook.prototype.error = function(err){                                                                                 // 870
  if (0 == arguments.length) {                                                                                        // 871
    var err = this._error;                                                                                            // 872
    this._error = null;                                                                                               // 873
    return err;                                                                                                       // 874
  }                                                                                                                   // 875
                                                                                                                      // 876
  this._error = err;                                                                                                  // 877
};                                                                                                                    // 878
                                                                                                                      // 879
}); // module: hook.js                                                                                                // 880
                                                                                                                      // 881
require.register("interfaces/bdd.js", function(module, exports, require){                                             // 882
                                                                                                                      // 883
/**                                                                                                                   // 884
 * Module dependencies.                                                                                               // 885
 */                                                                                                                   // 886
                                                                                                                      // 887
var Suite = require('../suite')                                                                                       // 888
  , Test = require('../test')                                                                                         // 889
  , utils = require('../utils');                                                                                      // 890
                                                                                                                      // 891
/**                                                                                                                   // 892
 * BDD-style interface:                                                                                               // 893
 *                                                                                                                    // 894
 *      describe('Array', function(){                                                                                 // 895
 *        describe('#indexOf()', function(){                                                                          // 896
 *          it('should return -1 when not present', function(){                                                       // 897
 *                                                                                                                    // 898
 *          });                                                                                                       // 899
 *                                                                                                                    // 900
 *          it('should return the index when present', function(){                                                    // 901
 *                                                                                                                    // 902
 *          });                                                                                                       // 903
 *        });                                                                                                         // 904
 *      });                                                                                                           // 905
 *                                                                                                                    // 906
 */                                                                                                                   // 907
                                                                                                                      // 908
module.exports = function(suite){                                                                                     // 909
  var suites = [suite];                                                                                               // 910
                                                                                                                      // 911
  suite.on('pre-require', function(context, file, mocha){                                                             // 912
                                                                                                                      // 913
    /**                                                                                                               // 914
     * Execute before running tests.                                                                                  // 915
     */                                                                                                               // 916
                                                                                                                      // 917
    context.before = function(fn){                                                                                    // 918
      suites[0].beforeAll(fn);                                                                                        // 919
    };                                                                                                                // 920
                                                                                                                      // 921
    /**                                                                                                               // 922
     * Execute after running tests.                                                                                   // 923
     */                                                                                                               // 924
                                                                                                                      // 925
    context.after = function(fn){                                                                                     // 926
      suites[0].afterAll(fn);                                                                                         // 927
    };                                                                                                                // 928
                                                                                                                      // 929
    /**                                                                                                               // 930
     * Execute before each test case.                                                                                 // 931
     */                                                                                                               // 932
                                                                                                                      // 933
    context.beforeEach = function(fn){                                                                                // 934
      suites[0].beforeEach(fn);                                                                                       // 935
    };                                                                                                                // 936
                                                                                                                      // 937
    /**                                                                                                               // 938
     * Execute after each test case.                                                                                  // 939
     */                                                                                                               // 940
                                                                                                                      // 941
    context.afterEach = function(fn){                                                                                 // 942
      suites[0].afterEach(fn);                                                                                        // 943
    };                                                                                                                // 944
                                                                                                                      // 945
    /**                                                                                                               // 946
     * Describe a "suite" with the given `title`                                                                      // 947
     * and callback `fn` containing nested suites                                                                     // 948
     * and/or tests.                                                                                                  // 949
     */                                                                                                               // 950
                                                                                                                      // 951
    context.describe = context.context = function(title, fn){                                                         // 952
      var suite = Suite.create(suites[0], title);                                                                     // 953
      suites.unshift(suite);                                                                                          // 954
      fn.call(suite);                                                                                                 // 955
      suites.shift();                                                                                                 // 956
      return suite;                                                                                                   // 957
    };                                                                                                                // 958
                                                                                                                      // 959
    /**                                                                                                               // 960
     * Pending describe.                                                                                              // 961
     */                                                                                                               // 962
                                                                                                                      // 963
    context.xdescribe =                                                                                               // 964
    context.xcontext =                                                                                                // 965
    context.describe.skip = function(title, fn){                                                                      // 966
      var suite = Suite.create(suites[0], title);                                                                     // 967
      suite.pending = true;                                                                                           // 968
      suites.unshift(suite);                                                                                          // 969
      fn.call(suite);                                                                                                 // 970
      suites.shift();                                                                                                 // 971
    };                                                                                                                // 972
                                                                                                                      // 973
    /**                                                                                                               // 974
     * Exclusive suite.                                                                                               // 975
     */                                                                                                               // 976
                                                                                                                      // 977
    context.describe.only = function(title, fn){                                                                      // 978
      var suite = context.describe(title, fn);                                                                        // 979
      mocha.grep(suite.fullTitle());                                                                                  // 980
      return suite;                                                                                                   // 981
    };                                                                                                                // 982
                                                                                                                      // 983
    /**                                                                                                               // 984
     * Describe a specification or test-case                                                                          // 985
     * with the given `title` and callback `fn`                                                                       // 986
     * acting as a thunk.                                                                                             // 987
     */                                                                                                               // 988
                                                                                                                      // 989
    context.it = context.specify = function(title, fn){                                                               // 990
      var suite = suites[0];                                                                                          // 991
      if (suite.pending) var fn = null;                                                                               // 992
      var test = new Test(title, fn);                                                                                 // 993
      suite.addTest(test);                                                                                            // 994
      return test;                                                                                                    // 995
    };                                                                                                                // 996
                                                                                                                      // 997
    /**                                                                                                               // 998
     * Exclusive test-case.                                                                                           // 999
     */                                                                                                               // 1000
                                                                                                                      // 1001
    context.it.only = function(title, fn){                                                                            // 1002
      var test = context.it(title, fn);                                                                               // 1003
      var reString = '^' + utils.escapeRegexp(test.fullTitle()) + '$';                                                // 1004
      mocha.grep(new RegExp(reString));                                                                               // 1005
      return test;                                                                                                    // 1006
    };                                                                                                                // 1007
                                                                                                                      // 1008
    /**                                                                                                               // 1009
     * Pending test case.                                                                                             // 1010
     */                                                                                                               // 1011
                                                                                                                      // 1012
    context.xit =                                                                                                     // 1013
    context.xspecify =                                                                                                // 1014
    context.it.skip = function(title){                                                                                // 1015
      context.it(title);                                                                                              // 1016
    };                                                                                                                // 1017
  });                                                                                                                 // 1018
};                                                                                                                    // 1019
                                                                                                                      // 1020
}); // module: interfaces/bdd.js                                                                                      // 1021
                                                                                                                      // 1022
require.register("interfaces/exports.js", function(module, exports, require){                                         // 1023
                                                                                                                      // 1024
/**                                                                                                                   // 1025
 * Module dependencies.                                                                                               // 1026
 */                                                                                                                   // 1027
                                                                                                                      // 1028
var Suite = require('../suite')                                                                                       // 1029
  , Test = require('../test');                                                                                        // 1030
                                                                                                                      // 1031
/**                                                                                                                   // 1032
 * TDD-style interface:                                                                                               // 1033
 *                                                                                                                    // 1034
 *     exports.Array = {                                                                                              // 1035
 *       '#indexOf()': {                                                                                              // 1036
 *         'should return -1 when the value is not present': function(){                                              // 1037
 *                                                                                                                    // 1038
 *         },                                                                                                         // 1039
 *                                                                                                                    // 1040
 *         'should return the correct index when the value is present': function(){                                   // 1041
 *                                                                                                                    // 1042
 *         }                                                                                                          // 1043
 *       }                                                                                                            // 1044
 *     };                                                                                                             // 1045
 *                                                                                                                    // 1046
 */                                                                                                                   // 1047
                                                                                                                      // 1048
module.exports = function(suite){                                                                                     // 1049
  var suites = [suite];                                                                                               // 1050
                                                                                                                      // 1051
  suite.on('require', visit);                                                                                         // 1052
                                                                                                                      // 1053
  function visit(obj) {                                                                                               // 1054
    var suite;                                                                                                        // 1055
    for (var key in obj) {                                                                                            // 1056
      if ('function' == typeof obj[key]) {                                                                            // 1057
        var fn = obj[key];                                                                                            // 1058
        switch (key) {                                                                                                // 1059
          case 'before':                                                                                              // 1060
            suites[0].beforeAll(fn);                                                                                  // 1061
            break;                                                                                                    // 1062
          case 'after':                                                                                               // 1063
            suites[0].afterAll(fn);                                                                                   // 1064
            break;                                                                                                    // 1065
          case 'beforeEach':                                                                                          // 1066
            suites[0].beforeEach(fn);                                                                                 // 1067
            break;                                                                                                    // 1068
          case 'afterEach':                                                                                           // 1069
            suites[0].afterEach(fn);                                                                                  // 1070
            break;                                                                                                    // 1071
          default:                                                                                                    // 1072
            suites[0].addTest(new Test(key, fn));                                                                     // 1073
        }                                                                                                             // 1074
      } else {                                                                                                        // 1075
        var suite = Suite.create(suites[0], key);                                                                     // 1076
        suites.unshift(suite);                                                                                        // 1077
        visit(obj[key]);                                                                                              // 1078
        suites.shift();                                                                                               // 1079
      }                                                                                                               // 1080
    }                                                                                                                 // 1081
  }                                                                                                                   // 1082
};                                                                                                                    // 1083
                                                                                                                      // 1084
}); // module: interfaces/exports.js                                                                                  // 1085
                                                                                                                      // 1086
require.register("interfaces/index.js", function(module, exports, require){                                           // 1087
                                                                                                                      // 1088
exports.bdd = require('./bdd');                                                                                       // 1089
exports.tdd = require('./tdd');                                                                                       // 1090
exports.qunit = require('./qunit');                                                                                   // 1091
exports.exports = require('./exports');                                                                               // 1092
                                                                                                                      // 1093
}); // module: interfaces/index.js                                                                                    // 1094
                                                                                                                      // 1095
require.register("interfaces/qunit.js", function(module, exports, require){                                           // 1096
                                                                                                                      // 1097
/**                                                                                                                   // 1098
 * Module dependencies.                                                                                               // 1099
 */                                                                                                                   // 1100
                                                                                                                      // 1101
var Suite = require('../suite')                                                                                       // 1102
  , Test = require('../test')                                                                                         // 1103
  , utils = require('../utils');                                                                                      // 1104
                                                                                                                      // 1105
/**                                                                                                                   // 1106
 * QUnit-style interface:                                                                                             // 1107
 *                                                                                                                    // 1108
 *     suite('Array');                                                                                                // 1109
 *                                                                                                                    // 1110
 *     test('#length', function(){                                                                                    // 1111
 *       var arr = [1,2,3];                                                                                           // 1112
 *       ok(arr.length == 3);                                                                                         // 1113
 *     });                                                                                                            // 1114
 *                                                                                                                    // 1115
 *     test('#indexOf()', function(){                                                                                 // 1116
 *       var arr = [1,2,3];                                                                                           // 1117
 *       ok(arr.indexOf(1) == 0);                                                                                     // 1118
 *       ok(arr.indexOf(2) == 1);                                                                                     // 1119
 *       ok(arr.indexOf(3) == 2);                                                                                     // 1120
 *     });                                                                                                            // 1121
 *                                                                                                                    // 1122
 *     suite('String');                                                                                               // 1123
 *                                                                                                                    // 1124
 *     test('#length', function(){                                                                                    // 1125
 *       ok('foo'.length == 3);                                                                                       // 1126
 *     });                                                                                                            // 1127
 *                                                                                                                    // 1128
 */                                                                                                                   // 1129
                                                                                                                      // 1130
module.exports = function(suite){                                                                                     // 1131
  var suites = [suite];                                                                                               // 1132
                                                                                                                      // 1133
  suite.on('pre-require', function(context, file, mocha){                                                             // 1134
                                                                                                                      // 1135
    /**                                                                                                               // 1136
     * Execute before running tests.                                                                                  // 1137
     */                                                                                                               // 1138
                                                                                                                      // 1139
    context.before = function(fn){                                                                                    // 1140
      suites[0].beforeAll(fn);                                                                                        // 1141
    };                                                                                                                // 1142
                                                                                                                      // 1143
    /**                                                                                                               // 1144
     * Execute after running tests.                                                                                   // 1145
     */                                                                                                               // 1146
                                                                                                                      // 1147
    context.after = function(fn){                                                                                     // 1148
      suites[0].afterAll(fn);                                                                                         // 1149
    };                                                                                                                // 1150
                                                                                                                      // 1151
    /**                                                                                                               // 1152
     * Execute before each test case.                                                                                 // 1153
     */                                                                                                               // 1154
                                                                                                                      // 1155
    context.beforeEach = function(fn){                                                                                // 1156
      suites[0].beforeEach(fn);                                                                                       // 1157
    };                                                                                                                // 1158
                                                                                                                      // 1159
    /**                                                                                                               // 1160
     * Execute after each test case.                                                                                  // 1161
     */                                                                                                               // 1162
                                                                                                                      // 1163
    context.afterEach = function(fn){                                                                                 // 1164
      suites[0].afterEach(fn);                                                                                        // 1165
    };                                                                                                                // 1166
                                                                                                                      // 1167
    /**                                                                                                               // 1168
     * Describe a "suite" with the given `title`.                                                                     // 1169
     */                                                                                                               // 1170
                                                                                                                      // 1171
    context.suite = function(title){                                                                                  // 1172
      if (suites.length > 1) suites.shift();                                                                          // 1173
      var suite = Suite.create(suites[0], title);                                                                     // 1174
      suites.unshift(suite);                                                                                          // 1175
      return suite;                                                                                                   // 1176
    };                                                                                                                // 1177
                                                                                                                      // 1178
    /**                                                                                                               // 1179
     * Exclusive test-case.                                                                                           // 1180
     */                                                                                                               // 1181
                                                                                                                      // 1182
    context.suite.only = function(title, fn){                                                                         // 1183
      var suite = context.suite(title, fn);                                                                           // 1184
      mocha.grep(suite.fullTitle());                                                                                  // 1185
    };                                                                                                                // 1186
                                                                                                                      // 1187
    /**                                                                                                               // 1188
     * Describe a specification or test-case                                                                          // 1189
     * with the given `title` and callback `fn`                                                                       // 1190
     * acting as a thunk.                                                                                             // 1191
     */                                                                                                               // 1192
                                                                                                                      // 1193
    context.test = function(title, fn){                                                                               // 1194
      var test = new Test(title, fn);                                                                                 // 1195
      suites[0].addTest(test);                                                                                        // 1196
      return test;                                                                                                    // 1197
    };                                                                                                                // 1198
                                                                                                                      // 1199
    /**                                                                                                               // 1200
     * Exclusive test-case.                                                                                           // 1201
     */                                                                                                               // 1202
                                                                                                                      // 1203
    context.test.only = function(title, fn){                                                                          // 1204
      var test = context.test(title, fn);                                                                             // 1205
      var reString = '^' + utils.escapeRegexp(test.fullTitle()) + '$';                                                // 1206
      mocha.grep(new RegExp(reString));                                                                               // 1207
    };                                                                                                                // 1208
                                                                                                                      // 1209
    /**                                                                                                               // 1210
     * Pending test case.                                                                                             // 1211
     */                                                                                                               // 1212
                                                                                                                      // 1213
    context.test.skip = function(title){                                                                              // 1214
      context.test(title);                                                                                            // 1215
    };                                                                                                                // 1216
  });                                                                                                                 // 1217
};                                                                                                                    // 1218
                                                                                                                      // 1219
}); // module: interfaces/qunit.js                                                                                    // 1220
                                                                                                                      // 1221
require.register("interfaces/tdd.js", function(module, exports, require){                                             // 1222
                                                                                                                      // 1223
/**                                                                                                                   // 1224
 * Module dependencies.                                                                                               // 1225
 */                                                                                                                   // 1226
                                                                                                                      // 1227
var Suite = require('../suite')                                                                                       // 1228
  , Test = require('../test')                                                                                         // 1229
  , utils = require('../utils');;                                                                                     // 1230
                                                                                                                      // 1231
/**                                                                                                                   // 1232
 * TDD-style interface:                                                                                               // 1233
 *                                                                                                                    // 1234
 *      suite('Array', function(){                                                                                    // 1235
 *        suite('#indexOf()', function(){                                                                             // 1236
 *          suiteSetup(function(){                                                                                    // 1237
 *                                                                                                                    // 1238
 *          });                                                                                                       // 1239
 *                                                                                                                    // 1240
 *          test('should return -1 when not present', function(){                                                     // 1241
 *                                                                                                                    // 1242
 *          });                                                                                                       // 1243
 *                                                                                                                    // 1244
 *          test('should return the index when present', function(){                                                  // 1245
 *                                                                                                                    // 1246
 *          });                                                                                                       // 1247
 *                                                                                                                    // 1248
 *          suiteTeardown(function(){                                                                                 // 1249
 *                                                                                                                    // 1250
 *          });                                                                                                       // 1251
 *        });                                                                                                         // 1252
 *      });                                                                                                           // 1253
 *                                                                                                                    // 1254
 */                                                                                                                   // 1255
                                                                                                                      // 1256
module.exports = function(suite){                                                                                     // 1257
  var suites = [suite];                                                                                               // 1258
                                                                                                                      // 1259
  suite.on('pre-require', function(context, file, mocha){                                                             // 1260
                                                                                                                      // 1261
    /**                                                                                                               // 1262
     * Execute before each test case.                                                                                 // 1263
     */                                                                                                               // 1264
                                                                                                                      // 1265
    context.setup = function(fn){                                                                                     // 1266
      suites[0].beforeEach(fn);                                                                                       // 1267
    };                                                                                                                // 1268
                                                                                                                      // 1269
    /**                                                                                                               // 1270
     * Execute after each test case.                                                                                  // 1271
     */                                                                                                               // 1272
                                                                                                                      // 1273
    context.teardown = function(fn){                                                                                  // 1274
      suites[0].afterEach(fn);                                                                                        // 1275
    };                                                                                                                // 1276
                                                                                                                      // 1277
    /**                                                                                                               // 1278
     * Execute before the suite.                                                                                      // 1279
     */                                                                                                               // 1280
                                                                                                                      // 1281
    context.suiteSetup = function(fn){                                                                                // 1282
      suites[0].beforeAll(fn);                                                                                        // 1283
    };                                                                                                                // 1284
                                                                                                                      // 1285
    /**                                                                                                               // 1286
     * Execute after the suite.                                                                                       // 1287
     */                                                                                                               // 1288
                                                                                                                      // 1289
    context.suiteTeardown = function(fn){                                                                             // 1290
      suites[0].afterAll(fn);                                                                                         // 1291
    };                                                                                                                // 1292
                                                                                                                      // 1293
    /**                                                                                                               // 1294
     * Describe a "suite" with the given `title`                                                                      // 1295
     * and callback `fn` containing nested suites                                                                     // 1296
     * and/or tests.                                                                                                  // 1297
     */                                                                                                               // 1298
                                                                                                                      // 1299
    context.suite = function(title, fn){                                                                              // 1300
      var suite = Suite.create(suites[0], title);                                                                     // 1301
      suites.unshift(suite);                                                                                          // 1302
      fn.call(suite);                                                                                                 // 1303
      suites.shift();                                                                                                 // 1304
      return suite;                                                                                                   // 1305
    };                                                                                                                // 1306
                                                                                                                      // 1307
    /**                                                                                                               // 1308
     * Pending suite.                                                                                                 // 1309
     */                                                                                                               // 1310
    context.suite.skip = function(title, fn) {                                                                        // 1311
      var suite = Suite.create(suites[0], title);                                                                     // 1312
      suite.pending = true;                                                                                           // 1313
      suites.unshift(suite);                                                                                          // 1314
      fn.call(suite);                                                                                                 // 1315
      suites.shift();                                                                                                 // 1316
    };                                                                                                                // 1317
                                                                                                                      // 1318
    /**                                                                                                               // 1319
     * Exclusive test-case.                                                                                           // 1320
     */                                                                                                               // 1321
                                                                                                                      // 1322
    context.suite.only = function(title, fn){                                                                         // 1323
      var suite = context.suite(title, fn);                                                                           // 1324
      mocha.grep(suite.fullTitle());                                                                                  // 1325
    };                                                                                                                // 1326
                                                                                                                      // 1327
    /**                                                                                                               // 1328
     * Describe a specification or test-case                                                                          // 1329
     * with the given `title` and callback `fn`                                                                       // 1330
     * acting as a thunk.                                                                                             // 1331
     */                                                                                                               // 1332
                                                                                                                      // 1333
    context.test = function(title, fn){                                                                               // 1334
      var suite = suites[0];                                                                                          // 1335
      if (suite.pending) var fn = null;                                                                               // 1336
      var test = new Test(title, fn);                                                                                 // 1337
      suite.addTest(test);                                                                                            // 1338
      return test;                                                                                                    // 1339
    };                                                                                                                // 1340
                                                                                                                      // 1341
    /**                                                                                                               // 1342
     * Exclusive test-case.                                                                                           // 1343
     */                                                                                                               // 1344
                                                                                                                      // 1345
    context.test.only = function(title, fn){                                                                          // 1346
      var test = context.test(title, fn);                                                                             // 1347
      var reString = '^' + utils.escapeRegexp(test.fullTitle()) + '$';                                                // 1348
      mocha.grep(new RegExp(reString));                                                                               // 1349
    };                                                                                                                // 1350
                                                                                                                      // 1351
    /**                                                                                                               // 1352
     * Pending test case.                                                                                             // 1353
     */                                                                                                               // 1354
                                                                                                                      // 1355
    context.test.skip = function(title){                                                                              // 1356
      context.test(title);                                                                                            // 1357
    };                                                                                                                // 1358
  });                                                                                                                 // 1359
};                                                                                                                    // 1360
                                                                                                                      // 1361
}); // module: interfaces/tdd.js                                                                                      // 1362
                                                                                                                      // 1363
require.register("mocha.js", function(module, exports, require){                                                      // 1364
/*!                                                                                                                   // 1365
 * mocha                                                                                                              // 1366
 * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>                                                              // 1367
 * MIT Licensed                                                                                                       // 1368
 */                                                                                                                   // 1369
                                                                                                                      // 1370
/**                                                                                                                   // 1371
 * Module dependencies.                                                                                               // 1372
 */                                                                                                                   // 1373
                                                                                                                      // 1374
var path = require('browser/path')                                                                                    // 1375
  , utils = require('./utils');                                                                                       // 1376
                                                                                                                      // 1377
/**                                                                                                                   // 1378
 * Expose `Mocha`.                                                                                                    // 1379
 */                                                                                                                   // 1380
                                                                                                                      // 1381
exports = module.exports = Mocha;                                                                                     // 1382
                                                                                                                      // 1383
/**                                                                                                                   // 1384
 * Expose internals.                                                                                                  // 1385
 */                                                                                                                   // 1386
                                                                                                                      // 1387
exports.utils = utils;                                                                                                // 1388
exports.interfaces = require('./interfaces');                                                                         // 1389
exports.reporters = require('./reporters');                                                                           // 1390
exports.Runnable = require('./runnable');                                                                             // 1391
exports.Context = require('./context');                                                                               // 1392
exports.Runner = require('./runner');                                                                                 // 1393
exports.Suite = require('./suite');                                                                                   // 1394
exports.Hook = require('./hook');                                                                                     // 1395
exports.Test = require('./test');                                                                                     // 1396
                                                                                                                      // 1397
/**                                                                                                                   // 1398
 * Return image `name` path.                                                                                          // 1399
 *                                                                                                                    // 1400
 * @param {String} name                                                                                               // 1401
 * @return {String}                                                                                                   // 1402
 * @api private                                                                                                       // 1403
 */                                                                                                                   // 1404
                                                                                                                      // 1405
function image(name) {                                                                                                // 1406
  return __dirname + '/../images/' + name + '.png';                                                                   // 1407
}                                                                                                                     // 1408
                                                                                                                      // 1409
/**                                                                                                                   // 1410
 * Setup mocha with `options`.                                                                                        // 1411
 *                                                                                                                    // 1412
 * Options:                                                                                                           // 1413
 *                                                                                                                    // 1414
 *   - `ui` name "bdd", "tdd", "exports" etc                                                                          // 1415
 *   - `reporter` reporter instance, defaults to `mocha.reporters.Dot`                                                // 1416
 *   - `globals` array of accepted globals                                                                            // 1417
 *   - `timeout` timeout in milliseconds                                                                              // 1418
 *   - `bail` bail on the first test failure                                                                          // 1419
 *   - `slow` milliseconds to wait before considering a test slow                                                     // 1420
 *   - `ignoreLeaks` ignore global leaks                                                                              // 1421
 *   - `grep` string or regexp to filter tests with                                                                   // 1422
 *                                                                                                                    // 1423
 * @param {Object} options                                                                                            // 1424
 * @api public                                                                                                        // 1425
 */                                                                                                                   // 1426
                                                                                                                      // 1427
function Mocha(options) {                                                                                             // 1428
  options = options || {};                                                                                            // 1429
  this.files = [];                                                                                                    // 1430
  this.options = options;                                                                                             // 1431
  this.grep(options.grep);                                                                                            // 1432
  this.suite = new exports.Suite('', new exports.Context);                                                            // 1433
  this.ui(options.ui);                                                                                                // 1434
  this.bail(options.bail);                                                                                            // 1435
  this.reporter(options.reporter);                                                                                    // 1436
  if (null != options.timeout) this.timeout(options.timeout);                                                         // 1437
  this.useColors(options.useColors)                                                                                   // 1438
  if (options.slow) this.slow(options.slow);                                                                          // 1439
                                                                                                                      // 1440
  this.suite.on('pre-require', function (context) {                                                                   // 1441
    exports.afterEach = context.afterEach || context.teardown;                                                        // 1442
    exports.after = context.after || context.suiteTeardown;                                                           // 1443
    exports.beforeEach = context.beforeEach || context.setup;                                                         // 1444
    exports.before = context.before || context.suiteSetup;                                                            // 1445
    exports.describe = context.describe || context.suite;                                                             // 1446
    exports.it = context.it || context.test;                                                                          // 1447
    exports.setup = context.setup || context.beforeEach;                                                              // 1448
    exports.suiteSetup = context.suiteSetup || context.before;                                                        // 1449
    exports.suiteTeardown = context.suiteTeardown || context.after;                                                   // 1450
    exports.suite = context.suite || context.describe;                                                                // 1451
    exports.teardown = context.teardown || context.afterEach;                                                         // 1452
    exports.test = context.test || context.it;                                                                        // 1453
  });                                                                                                                 // 1454
}                                                                                                                     // 1455
                                                                                                                      // 1456
/**                                                                                                                   // 1457
 * Enable or disable bailing on the first failure.                                                                    // 1458
 *                                                                                                                    // 1459
 * @param {Boolean} [bail]                                                                                            // 1460
 * @api public                                                                                                        // 1461
 */                                                                                                                   // 1462
                                                                                                                      // 1463
Mocha.prototype.bail = function(bail){                                                                                // 1464
  if (0 == arguments.length) bail = true;                                                                             // 1465
  this.suite.bail(bail);                                                                                              // 1466
  return this;                                                                                                        // 1467
};                                                                                                                    // 1468
                                                                                                                      // 1469
/**                                                                                                                   // 1470
 * Add test `file`.                                                                                                   // 1471
 *                                                                                                                    // 1472
 * @param {String} file                                                                                               // 1473
 * @api public                                                                                                        // 1474
 */                                                                                                                   // 1475
                                                                                                                      // 1476
Mocha.prototype.addFile = function(file){                                                                             // 1477
  this.files.push(file);                                                                                              // 1478
  return this;                                                                                                        // 1479
};                                                                                                                    // 1480
                                                                                                                      // 1481
/**                                                                                                                   // 1482
 * Set reporter to `reporter`, defaults to "dot".                                                                     // 1483
 *                                                                                                                    // 1484
 * @param {String|Function} reporter name or constructor                                                              // 1485
 * @api public                                                                                                        // 1486
 */                                                                                                                   // 1487
                                                                                                                      // 1488
Mocha.prototype.reporter = function(reporter){                                                                        // 1489
  if ('function' == typeof reporter) {                                                                                // 1490
    this._reporter = reporter;                                                                                        // 1491
  } else {                                                                                                            // 1492
    reporter = reporter || 'dot';                                                                                     // 1493
    var _reporter;                                                                                                    // 1494
    try { _reporter = require('./reporters/' + reporter); } catch (err) {};                                           // 1495
    if (!_reporter) try { _reporter = require(reporter); } catch (err) {};                                            // 1496
    if (!_reporter && reporter === 'teamcity')                                                                        // 1497
      console.warn('The Teamcity reporter was moved to a package named ' +                                            // 1498
        'mocha-teamcity-reporter ' +                                                                                  // 1499
        '(https://npmjs.org/package/mocha-teamcity-reporter).');                                                      // 1500
    if (!_reporter) throw new Error('invalid reporter "' + reporter + '"');                                           // 1501
    this._reporter = _reporter;                                                                                       // 1502
  }                                                                                                                   // 1503
  return this;                                                                                                        // 1504
};                                                                                                                    // 1505
                                                                                                                      // 1506
/**                                                                                                                   // 1507
 * Set test UI `name`, defaults to "bdd".                                                                             // 1508
 *                                                                                                                    // 1509
 * @param {String} bdd                                                                                                // 1510
 * @api public                                                                                                        // 1511
 */                                                                                                                   // 1512
                                                                                                                      // 1513
Mocha.prototype.ui = function(name){                                                                                  // 1514
  name = name || 'bdd';                                                                                               // 1515
  this._ui = exports.interfaces[name];                                                                                // 1516
  if (!this._ui) try { this._ui = require(name); } catch (err) {};                                                    // 1517
  if (!this._ui) throw new Error('invalid interface "' + name + '"');                                                 // 1518
  this._ui = this._ui(this.suite);                                                                                    // 1519
  return this;                                                                                                        // 1520
};                                                                                                                    // 1521
                                                                                                                      // 1522
/**                                                                                                                   // 1523
 * Load registered files.                                                                                             // 1524
 *                                                                                                                    // 1525
 * @api private                                                                                                       // 1526
 */                                                                                                                   // 1527
                                                                                                                      // 1528
Mocha.prototype.loadFiles = function(fn){                                                                             // 1529
  var self = this;                                                                                                    // 1530
  var suite = this.suite;                                                                                             // 1531
  var pending = this.files.length;                                                                                    // 1532
  this.files.forEach(function(file){                                                                                  // 1533
    file = path.resolve(file);                                                                                        // 1534
    suite.emit('pre-require', global, file, self);                                                                    // 1535
    suite.emit('require', require(file), file, self);                                                                 // 1536
    suite.emit('post-require', global, file, self);                                                                   // 1537
    --pending || (fn && fn());                                                                                        // 1538
  });                                                                                                                 // 1539
};                                                                                                                    // 1540
                                                                                                                      // 1541
/**                                                                                                                   // 1542
 * Enable growl support.                                                                                              // 1543
 *                                                                                                                    // 1544
 * @api private                                                                                                       // 1545
 */                                                                                                                   // 1546
                                                                                                                      // 1547
Mocha.prototype._growl = function(runner, reporter) {                                                                 // 1548
  var notify = require('growl');                                                                                      // 1549
                                                                                                                      // 1550
  runner.on('end', function(){                                                                                        // 1551
    var stats = reporter.stats;                                                                                       // 1552
    if (stats.failures) {                                                                                             // 1553
      var msg = stats.failures + ' of ' + runner.total + ' tests failed';                                             // 1554
      notify(msg, { name: 'mocha', title: 'Failed', image: image('error') });                                         // 1555
    } else {                                                                                                          // 1556
      notify(stats.passes + ' tests passed in ' + stats.duration + 'ms', {                                            // 1557
          name: 'mocha'                                                                                               // 1558
        , title: 'Passed'                                                                                             // 1559
        , image: image('ok')                                                                                          // 1560
      });                                                                                                             // 1561
    }                                                                                                                 // 1562
  });                                                                                                                 // 1563
};                                                                                                                    // 1564
                                                                                                                      // 1565
/**                                                                                                                   // 1566
 * Add regexp to grep, if `re` is a string it is escaped.                                                             // 1567
 *                                                                                                                    // 1568
 * @param {RegExp|String} re                                                                                          // 1569
 * @return {Mocha}                                                                                                    // 1570
 * @api public                                                                                                        // 1571
 */                                                                                                                   // 1572
                                                                                                                      // 1573
Mocha.prototype.grep = function(re){                                                                                  // 1574
  this.options.grep = 'string' == typeof re                                                                           // 1575
    ? new RegExp(utils.escapeRegexp(re))                                                                              // 1576
    : re;                                                                                                             // 1577
  return this;                                                                                                        // 1578
};                                                                                                                    // 1579
                                                                                                                      // 1580
/**                                                                                                                   // 1581
 * Invert `.grep()` matches.                                                                                          // 1582
 *                                                                                                                    // 1583
 * @return {Mocha}                                                                                                    // 1584
 * @api public                                                                                                        // 1585
 */                                                                                                                   // 1586
                                                                                                                      // 1587
Mocha.prototype.invert = function(){                                                                                  // 1588
  this.options.invert = true;                                                                                         // 1589
  return this;                                                                                                        // 1590
};                                                                                                                    // 1591
                                                                                                                      // 1592
/**                                                                                                                   // 1593
 * Ignore global leaks.                                                                                               // 1594
 *                                                                                                                    // 1595
 * @param {Boolean} ignore                                                                                            // 1596
 * @return {Mocha}                                                                                                    // 1597
 * @api public                                                                                                        // 1598
 */                                                                                                                   // 1599
                                                                                                                      // 1600
Mocha.prototype.ignoreLeaks = function(ignore){                                                                       // 1601
  this.options.ignoreLeaks = !!ignore;                                                                                // 1602
  return this;                                                                                                        // 1603
};                                                                                                                    // 1604
                                                                                                                      // 1605
/**                                                                                                                   // 1606
 * Enable global leak checking.                                                                                       // 1607
 *                                                                                                                    // 1608
 * @return {Mocha}                                                                                                    // 1609
 * @api public                                                                                                        // 1610
 */                                                                                                                   // 1611
                                                                                                                      // 1612
Mocha.prototype.checkLeaks = function(){                                                                              // 1613
  this.options.ignoreLeaks = false;                                                                                   // 1614
  return this;                                                                                                        // 1615
};                                                                                                                    // 1616
                                                                                                                      // 1617
/**                                                                                                                   // 1618
 * Enable growl support.                                                                                              // 1619
 *                                                                                                                    // 1620
 * @return {Mocha}                                                                                                    // 1621
 * @api public                                                                                                        // 1622
 */                                                                                                                   // 1623
                                                                                                                      // 1624
Mocha.prototype.growl = function(){                                                                                   // 1625
  this.options.growl = true;                                                                                          // 1626
  return this;                                                                                                        // 1627
};                                                                                                                    // 1628
                                                                                                                      // 1629
/**                                                                                                                   // 1630
 * Ignore `globals` array or string.                                                                                  // 1631
 *                                                                                                                    // 1632
 * @param {Array|String} globals                                                                                      // 1633
 * @return {Mocha}                                                                                                    // 1634
 * @api public                                                                                                        // 1635
 */                                                                                                                   // 1636
                                                                                                                      // 1637
Mocha.prototype.globals = function(globals){                                                                          // 1638
  this.options.globals = (this.options.globals || []).concat(globals);                                                // 1639
  return this;                                                                                                        // 1640
};                                                                                                                    // 1641
                                                                                                                      // 1642
/**                                                                                                                   // 1643
 * Emit color output.                                                                                                 // 1644
 *                                                                                                                    // 1645
 * @param {Boolean} colors                                                                                            // 1646
 * @return {Mocha}                                                                                                    // 1647
 * @api public                                                                                                        // 1648
 */                                                                                                                   // 1649
                                                                                                                      // 1650
Mocha.prototype.useColors = function(colors){                                                                         // 1651
  this.options.useColors = arguments.length && colors != undefined                                                    // 1652
    ? colors                                                                                                          // 1653
    : true;                                                                                                           // 1654
  return this;                                                                                                        // 1655
};                                                                                                                    // 1656
                                                                                                                      // 1657
/**                                                                                                                   // 1658
 * Use inline diffs rather than +/-.                                                                                  // 1659
 *                                                                                                                    // 1660
 * @param {Boolean} inlineDiffs                                                                                       // 1661
 * @return {Mocha}                                                                                                    // 1662
 * @api public                                                                                                        // 1663
 */                                                                                                                   // 1664
                                                                                                                      // 1665
Mocha.prototype.useInlineDiffs = function(inlineDiffs) {                                                              // 1666
  this.options.useInlineDiffs = arguments.length && inlineDiffs != undefined                                          // 1667
  ? inlineDiffs                                                                                                       // 1668
  : false;                                                                                                            // 1669
  return this;                                                                                                        // 1670
};                                                                                                                    // 1671
                                                                                                                      // 1672
/**                                                                                                                   // 1673
 * Set the timeout in milliseconds.                                                                                   // 1674
 *                                                                                                                    // 1675
 * @param {Number} timeout                                                                                            // 1676
 * @return {Mocha}                                                                                                    // 1677
 * @api public                                                                                                        // 1678
 */                                                                                                                   // 1679
                                                                                                                      // 1680
Mocha.prototype.timeout = function(timeout){                                                                          // 1681
  this.suite.timeout(timeout);                                                                                        // 1682
  return this;                                                                                                        // 1683
};                                                                                                                    // 1684
                                                                                                                      // 1685
/**                                                                                                                   // 1686
 * Set slowness threshold in milliseconds.                                                                            // 1687
 *                                                                                                                    // 1688
 * @param {Number} slow                                                                                               // 1689
 * @return {Mocha}                                                                                                    // 1690
 * @api public                                                                                                        // 1691
 */                                                                                                                   // 1692
                                                                                                                      // 1693
Mocha.prototype.slow = function(slow){                                                                                // 1694
  this.suite.slow(slow);                                                                                              // 1695
  return this;                                                                                                        // 1696
};                                                                                                                    // 1697
                                                                                                                      // 1698
/**                                                                                                                   // 1699
 * Makes all tests async (accepting a callback)                                                                       // 1700
 *                                                                                                                    // 1701
 * @return {Mocha}                                                                                                    // 1702
 * @api public                                                                                                        // 1703
 */                                                                                                                   // 1704
                                                                                                                      // 1705
Mocha.prototype.asyncOnly = function(){                                                                               // 1706
  this.options.asyncOnly = true;                                                                                      // 1707
  return this;                                                                                                        // 1708
};                                                                                                                    // 1709
                                                                                                                      // 1710
/**                                                                                                                   // 1711
 * Run tests and invoke `fn()` when complete.                                                                         // 1712
 *                                                                                                                    // 1713
 * @param {Function} fn                                                                                               // 1714
 * @return {Runner}                                                                                                   // 1715
 * @api public                                                                                                        // 1716
 */                                                                                                                   // 1717
                                                                                                                      // 1718
Mocha.prototype.run = function(fn){                                                                                   // 1719
  if (this.files.length) this.loadFiles();                                                                            // 1720
  var suite = this.suite;                                                                                             // 1721
  var options = this.options;                                                                                         // 1722
  var runner = new exports.Runner(suite);                                                                             // 1723
  var reporter = new this._reporter(runner);                                                                          // 1724
  runner.ignoreLeaks = false !== options.ignoreLeaks;                                                                 // 1725
  runner.asyncOnly = options.asyncOnly;                                                                               // 1726
  if (options.grep) runner.grep(options.grep, options.invert);                                                        // 1727
  if (options.globals) runner.globals(options.globals);                                                               // 1728
  if (options.growl) this._growl(runner, reporter);                                                                   // 1729
  exports.reporters.Base.useColors = options.useColors;                                                               // 1730
  exports.reporters.Base.inlineDiffs = options.useInlineDiffs;                                                        // 1731
  return runner.run(fn);                                                                                              // 1732
};                                                                                                                    // 1733
                                                                                                                      // 1734
}); // module: mocha.js                                                                                               // 1735
                                                                                                                      // 1736
require.register("ms.js", function(module, exports, require){                                                         // 1737
/**                                                                                                                   // 1738
 * Helpers.                                                                                                           // 1739
 */                                                                                                                   // 1740
                                                                                                                      // 1741
var s = 1000;                                                                                                         // 1742
var m = s * 60;                                                                                                       // 1743
var h = m * 60;                                                                                                       // 1744
var d = h * 24;                                                                                                       // 1745
var y = d * 365.25;                                                                                                   // 1746
                                                                                                                      // 1747
/**                                                                                                                   // 1748
 * Parse or format the given `val`.                                                                                   // 1749
 *                                                                                                                    // 1750
 * Options:                                                                                                           // 1751
 *                                                                                                                    // 1752
 *  - `long` verbose formatting [false]                                                                               // 1753
 *                                                                                                                    // 1754
 * @param {String|Number} val                                                                                         // 1755
 * @param {Object} options                                                                                            // 1756
 * @return {String|Number}                                                                                            // 1757
 * @api public                                                                                                        // 1758
 */                                                                                                                   // 1759
                                                                                                                      // 1760
module.exports = function(val, options){                                                                              // 1761
  options = options || {};                                                                                            // 1762
  if ('string' == typeof val) return parse(val);                                                                      // 1763
  return options.long ? longFormat(val) : shortFormat(val);                                                           // 1764
};                                                                                                                    // 1765
                                                                                                                      // 1766
/**                                                                                                                   // 1767
 * Parse the given `str` and return milliseconds.                                                                     // 1768
 *                                                                                                                    // 1769
 * @param {String} str                                                                                                // 1770
 * @return {Number}                                                                                                   // 1771
 * @api private                                                                                                       // 1772
 */                                                                                                                   // 1773
                                                                                                                      // 1774
function parse(str) {                                                                                                 // 1775
  var match = /^((?:\d+)?\.?\d+) *(ms|seconds?|s|minutes?|m|hours?|h|days?|d|years?|y)?$/i.exec(str);                 // 1776
  if (!match) return;                                                                                                 // 1777
  var n = parseFloat(match[1]);                                                                                       // 1778
  var type = (match[2] || 'ms').toLowerCase();                                                                        // 1779
  switch (type) {                                                                                                     // 1780
    case 'years':                                                                                                     // 1781
    case 'year':                                                                                                      // 1782
    case 'y':                                                                                                         // 1783
      return n * y;                                                                                                   // 1784
    case 'days':                                                                                                      // 1785
    case 'day':                                                                                                       // 1786
    case 'd':                                                                                                         // 1787
      return n * d;                                                                                                   // 1788
    case 'hours':                                                                                                     // 1789
    case 'hour':                                                                                                      // 1790
    case 'h':                                                                                                         // 1791
      return n * h;                                                                                                   // 1792
    case 'minutes':                                                                                                   // 1793
    case 'minute':                                                                                                    // 1794
    case 'm':                                                                                                         // 1795
      return n * m;                                                                                                   // 1796
    case 'seconds':                                                                                                   // 1797
    case 'second':                                                                                                    // 1798
    case 's':                                                                                                         // 1799
      return n * s;                                                                                                   // 1800
    case 'ms':                                                                                                        // 1801
      return n;                                                                                                       // 1802
  }                                                                                                                   // 1803
}                                                                                                                     // 1804
                                                                                                                      // 1805
/**                                                                                                                   // 1806
 * Short format for `ms`.                                                                                             // 1807
 *                                                                                                                    // 1808
 * @param {Number} ms                                                                                                 // 1809
 * @return {String}                                                                                                   // 1810
 * @api private                                                                                                       // 1811
 */                                                                                                                   // 1812
                                                                                                                      // 1813
function shortFormat(ms) {                                                                                            // 1814
  if (ms >= d) return Math.round(ms / d) + 'd';                                                                       // 1815
  if (ms >= h) return Math.round(ms / h) + 'h';                                                                       // 1816
  if (ms >= m) return Math.round(ms / m) + 'm';                                                                       // 1817
  if (ms >= s) return Math.round(ms / s) + 's';                                                                       // 1818
  return ms + 'ms';                                                                                                   // 1819
}                                                                                                                     // 1820
                                                                                                                      // 1821
/**                                                                                                                   // 1822
 * Long format for `ms`.                                                                                              // 1823
 *                                                                                                                    // 1824
 * @param {Number} ms                                                                                                 // 1825
 * @return {String}                                                                                                   // 1826
 * @api private                                                                                                       // 1827
 */                                                                                                                   // 1828
                                                                                                                      // 1829
function longFormat(ms) {                                                                                             // 1830
  return plural(ms, d, 'day')                                                                                         // 1831
    || plural(ms, h, 'hour')                                                                                          // 1832
    || plural(ms, m, 'minute')                                                                                        // 1833
    || plural(ms, s, 'second')                                                                                        // 1834
    || ms + ' ms';                                                                                                    // 1835
}                                                                                                                     // 1836
                                                                                                                      // 1837
/**                                                                                                                   // 1838
 * Pluralization helper.                                                                                              // 1839
 */                                                                                                                   // 1840
                                                                                                                      // 1841
function plural(ms, n, name) {                                                                                        // 1842
  if (ms < n) return;                                                                                                 // 1843
  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;                                                           // 1844
  return Math.ceil(ms / n) + ' ' + name + 's';                                                                        // 1845
}                                                                                                                     // 1846
                                                                                                                      // 1847
}); // module: ms.js                                                                                                  // 1848
                                                                                                                      // 1849
require.register("reporters/base.js", function(module, exports, require){                                             // 1850
                                                                                                                      // 1851
/**                                                                                                                   // 1852
 * Module dependencies.                                                                                               // 1853
 */                                                                                                                   // 1854
                                                                                                                      // 1855
var tty = require('browser/tty')                                                                                      // 1856
  , diff = require('browser/diff')                                                                                    // 1857
  , ms = require('../ms')                                                                                             // 1858
  , utils = require('../utils');                                                                                      // 1859
                                                                                                                      // 1860
/**                                                                                                                   // 1861
 * Save timer references to avoid Sinon interfering (see GH-237).                                                     // 1862
 */                                                                                                                   // 1863
                                                                                                                      // 1864
var Date = global.Date                                                                                                // 1865
  , setTimeout = global.setTimeout                                                                                    // 1866
  , setInterval = global.setInterval                                                                                  // 1867
  , clearTimeout = global.clearTimeout                                                                                // 1868
  , clearInterval = global.clearInterval;                                                                             // 1869
                                                                                                                      // 1870
/**                                                                                                                   // 1871
 * Check if both stdio streams are associated with a tty.                                                             // 1872
 */                                                                                                                   // 1873
                                                                                                                      // 1874
var isatty = tty.isatty(1) && tty.isatty(2);                                                                          // 1875
                                                                                                                      // 1876
/**                                                                                                                   // 1877
 * Expose `Base`.                                                                                                     // 1878
 */                                                                                                                   // 1879
                                                                                                                      // 1880
exports = module.exports = Base;                                                                                      // 1881
                                                                                                                      // 1882
/**                                                                                                                   // 1883
 * Enable coloring by default.                                                                                        // 1884
 */                                                                                                                   // 1885
                                                                                                                      // 1886
exports.useColors = isatty || (process.env.MOCHA_COLORS !== undefined);                                               // 1887
                                                                                                                      // 1888
/**                                                                                                                   // 1889
 * Inline diffs instead of +/-                                                                                        // 1890
 */                                                                                                                   // 1891
                                                                                                                      // 1892
exports.inlineDiffs = false;                                                                                          // 1893
                                                                                                                      // 1894
/**                                                                                                                   // 1895
 * Default color map.                                                                                                 // 1896
 */                                                                                                                   // 1897
                                                                                                                      // 1898
exports.colors = {                                                                                                    // 1899
    'pass': 90                                                                                                        // 1900
  , 'fail': 31                                                                                                        // 1901
  , 'bright pass': 92                                                                                                 // 1902
  , 'bright fail': 91                                                                                                 // 1903
  , 'bright yellow': 93                                                                                               // 1904
  , 'pending': 36                                                                                                     // 1905
  , 'suite': 0                                                                                                        // 1906
  , 'error title': 0                                                                                                  // 1907
  , 'error message': 31                                                                                               // 1908
  , 'error stack': 90                                                                                                 // 1909
  , 'checkmark': 32                                                                                                   // 1910
  , 'fast': 90                                                                                                        // 1911
  , 'medium': 33                                                                                                      // 1912
  , 'slow': 31                                                                                                        // 1913
  , 'green': 32                                                                                                       // 1914
  , 'light': 90                                                                                                       // 1915
  , 'diff gutter': 90                                                                                                 // 1916
  , 'diff added': 42                                                                                                  // 1917
  , 'diff removed': 41                                                                                                // 1918
};                                                                                                                    // 1919
                                                                                                                      // 1920
/**                                                                                                                   // 1921
 * Default symbol map.                                                                                                // 1922
 */                                                                                                                   // 1923
                                                                                                                      // 1924
exports.symbols = {                                                                                                   // 1925
  ok: '✓',                                                                                                            // 1926
  err: '✖',                                                                                                           // 1927
  dot: '․'                                                                                                            // 1928
};                                                                                                                    // 1929
                                                                                                                      // 1930
// With node.js on Windows: use symbols available in terminal default fonts                                           // 1931
if ('win32' == process.platform) {                                                                                    // 1932
  exports.symbols.ok = '\u221A';                                                                                      // 1933
  exports.symbols.err = '\u00D7';                                                                                     // 1934
  exports.symbols.dot = '.';                                                                                          // 1935
}                                                                                                                     // 1936
                                                                                                                      // 1937
/**                                                                                                                   // 1938
 * Color `str` with the given `type`,                                                                                 // 1939
 * allowing colors to be disabled,                                                                                    // 1940
 * as well as user-defined color                                                                                      // 1941
 * schemes.                                                                                                           // 1942
 *                                                                                                                    // 1943
 * @param {String} type                                                                                               // 1944
 * @param {String} str                                                                                                // 1945
 * @return {String}                                                                                                   // 1946
 * @api private                                                                                                       // 1947
 */                                                                                                                   // 1948
                                                                                                                      // 1949
var color = exports.color = function(type, str) {                                                                     // 1950
  if (!exports.useColors) return str;                                                                                 // 1951
  return '\u001b[' + exports.colors[type] + 'm' + str + '\u001b[0m';                                                  // 1952
};                                                                                                                    // 1953
                                                                                                                      // 1954
/**                                                                                                                   // 1955
 * Expose term window size, with some                                                                                 // 1956
 * defaults for when stderr is not a tty.                                                                             // 1957
 */                                                                                                                   // 1958
                                                                                                                      // 1959
exports.window = {                                                                                                    // 1960
  width: isatty                                                                                                       // 1961
    ? process.stdout.getWindowSize                                                                                    // 1962
      ? process.stdout.getWindowSize(1)[0]                                                                            // 1963
      : tty.getWindowSize()[1]                                                                                        // 1964
    : 75                                                                                                              // 1965
};                                                                                                                    // 1966
                                                                                                                      // 1967
/**                                                                                                                   // 1968
 * Expose some basic cursor interactions                                                                              // 1969
 * that are common among reporters.                                                                                   // 1970
 */                                                                                                                   // 1971
                                                                                                                      // 1972
exports.cursor = {                                                                                                    // 1973
  hide: function(){                                                                                                   // 1974
    isatty && process.stdout.write('\u001b[?25l');                                                                    // 1975
  },                                                                                                                  // 1976
                                                                                                                      // 1977
  show: function(){                                                                                                   // 1978
    isatty && process.stdout.write('\u001b[?25h');                                                                    // 1979
  },                                                                                                                  // 1980
                                                                                                                      // 1981
  deleteLine: function(){                                                                                             // 1982
    isatty && process.stdout.write('\u001b[2K');                                                                      // 1983
  },                                                                                                                  // 1984
                                                                                                                      // 1985
  beginningOfLine: function(){                                                                                        // 1986
    isatty && process.stdout.write('\u001b[0G');                                                                      // 1987
  },                                                                                                                  // 1988
                                                                                                                      // 1989
  CR: function(){                                                                                                     // 1990
    if (isatty) {                                                                                                     // 1991
      exports.cursor.deleteLine();                                                                                    // 1992
      exports.cursor.beginningOfLine();                                                                               // 1993
    } else {                                                                                                          // 1994
      process.stdout.write('\r');                                                                                     // 1995
    }                                                                                                                 // 1996
  }                                                                                                                   // 1997
};                                                                                                                    // 1998
                                                                                                                      // 1999
/**                                                                                                                   // 2000
 * Outut the given `failures` as a list.                                                                              // 2001
 *                                                                                                                    // 2002
 * @param {Array} failures                                                                                            // 2003
 * @api public                                                                                                        // 2004
 */                                                                                                                   // 2005
                                                                                                                      // 2006
exports.list = function(failures){                                                                                    // 2007
  console.error();                                                                                                    // 2008
  failures.forEach(function(test, i){                                                                                 // 2009
    // format                                                                                                         // 2010
    var fmt = color('error title', '  %s) %s:\n')                                                                     // 2011
      + color('error message', '     %s')                                                                             // 2012
      + color('error stack', '\n%s\n');                                                                               // 2013
                                                                                                                      // 2014
    // msg                                                                                                            // 2015
    var err = test.err                                                                                                // 2016
      , message = err.message || ''                                                                                   // 2017
      , stack = err.stack || message                                                                                  // 2018
      , index = stack.indexOf(message) + message.length                                                               // 2019
      , msg = stack.slice(0, index)                                                                                   // 2020
      , actual = err.actual                                                                                           // 2021
      , expected = err.expected                                                                                       // 2022
      , escape = true;                                                                                                // 2023
                                                                                                                      // 2024
    // uncaught                                                                                                       // 2025
    if (err.uncaught) {                                                                                               // 2026
      msg = 'Uncaught ' + msg;                                                                                        // 2027
    }                                                                                                                 // 2028
                                                                                                                      // 2029
    // explicitly show diff                                                                                           // 2030
    if (err.showDiff && sameType(actual, expected)) {                                                                 // 2031
      escape = false;                                                                                                 // 2032
      err.actual = actual = stringify(canonicalize(actual));                                                          // 2033
      err.expected = expected = stringify(canonicalize(expected));                                                    // 2034
    }                                                                                                                 // 2035
                                                                                                                      // 2036
    // actual / expected diff                                                                                         // 2037
    if ('string' == typeof actual && 'string' == typeof expected) {                                                   // 2038
      fmt = color('error title', '  %s) %s:\n%s') + color('error stack', '\n%s\n');                                   // 2039
      var match = message.match(/^([^:]+): expected/);                                                                // 2040
      msg = '\n      ' + color('error message', match ? match[1] : msg);                                              // 2041
                                                                                                                      // 2042
      if (exports.inlineDiffs) {                                                                                      // 2043
        msg += inlineDiff(err, escape);                                                                               // 2044
      } else {                                                                                                        // 2045
        msg += unifiedDiff(err, escape);                                                                              // 2046
      }                                                                                                               // 2047
    }                                                                                                                 // 2048
                                                                                                                      // 2049
    // indent stack trace without msg                                                                                 // 2050
    stack = stack.slice(index ? index + 1 : index)                                                                    // 2051
      .replace(/^/gm, '  ');                                                                                          // 2052
                                                                                                                      // 2053
    console.error(fmt, (i + 1), test.fullTitle(), msg, stack);                                                        // 2054
  });                                                                                                                 // 2055
};                                                                                                                    // 2056
                                                                                                                      // 2057
/**                                                                                                                   // 2058
 * Initialize a new `Base` reporter.                                                                                  // 2059
 *                                                                                                                    // 2060
 * All other reporters generally                                                                                      // 2061
 * inherit from this reporter, providing                                                                              // 2062
 * stats such as test duration, number                                                                                // 2063
 * of tests passed / failed etc.                                                                                      // 2064
 *                                                                                                                    // 2065
 * @param {Runner} runner                                                                                             // 2066
 * @api public                                                                                                        // 2067
 */                                                                                                                   // 2068
                                                                                                                      // 2069
function Base(runner) {                                                                                               // 2070
  var self = this                                                                                                     // 2071
    , stats = this.stats = { suites: 0, tests: 0, passes: 0, pending: 0, failures: 0 }                                // 2072
    , failures = this.failures = [];                                                                                  // 2073
                                                                                                                      // 2074
  if (!runner) return;                                                                                                // 2075
  this.runner = runner;                                                                                               // 2076
                                                                                                                      // 2077
  runner.stats = stats;                                                                                               // 2078
                                                                                                                      // 2079
  runner.on('start', function(){                                                                                      // 2080
    stats.start = new Date;                                                                                           // 2081
  });                                                                                                                 // 2082
                                                                                                                      // 2083
  runner.on('suite', function(suite){                                                                                 // 2084
    stats.suites = stats.suites || 0;                                                                                 // 2085
    suite.root || stats.suites++;                                                                                     // 2086
  });                                                                                                                 // 2087
                                                                                                                      // 2088
  runner.on('test end', function(test){                                                                               // 2089
    stats.tests = stats.tests || 0;                                                                                   // 2090
    stats.tests++;                                                                                                    // 2091
  });                                                                                                                 // 2092
                                                                                                                      // 2093
  runner.on('pass', function(test){                                                                                   // 2094
    stats.passes = stats.passes || 0;                                                                                 // 2095
                                                                                                                      // 2096
    var medium = test.slow() / 2;                                                                                     // 2097
    test.speed = test.duration > test.slow()                                                                          // 2098
      ? 'slow'                                                                                                        // 2099
      : test.duration > medium                                                                                        // 2100
        ? 'medium'                                                                                                    // 2101
        : 'fast';                                                                                                     // 2102
                                                                                                                      // 2103
    stats.passes++;                                                                                                   // 2104
  });                                                                                                                 // 2105
                                                                                                                      // 2106
  runner.on('fail', function(test, err){                                                                              // 2107
    stats.failures = stats.failures || 0;                                                                             // 2108
    stats.failures++;                                                                                                 // 2109
    test.err = err;                                                                                                   // 2110
    failures.push(test);                                                                                              // 2111
  });                                                                                                                 // 2112
                                                                                                                      // 2113
  runner.on('end', function(){                                                                                        // 2114
    stats.end = new Date;                                                                                             // 2115
    stats.duration = new Date - stats.start;                                                                          // 2116
  });                                                                                                                 // 2117
                                                                                                                      // 2118
  runner.on('pending', function(){                                                                                    // 2119
    stats.pending++;                                                                                                  // 2120
  });                                                                                                                 // 2121
}                                                                                                                     // 2122
                                                                                                                      // 2123
/**                                                                                                                   // 2124
 * Output common epilogue used by many of                                                                             // 2125
 * the bundled reporters.                                                                                             // 2126
 *                                                                                                                    // 2127
 * @api public                                                                                                        // 2128
 */                                                                                                                   // 2129
                                                                                                                      // 2130
Base.prototype.epilogue = function(){                                                                                 // 2131
  var stats = this.stats;                                                                                             // 2132
  var tests;                                                                                                          // 2133
  var fmt;                                                                                                            // 2134
                                                                                                                      // 2135
  console.log();                                                                                                      // 2136
                                                                                                                      // 2137
  // passes                                                                                                           // 2138
  fmt = color('bright pass', ' ')                                                                                     // 2139
    + color('green', ' %d passing')                                                                                   // 2140
    + color('light', ' (%s)');                                                                                        // 2141
                                                                                                                      // 2142
  console.log(fmt,                                                                                                    // 2143
    stats.passes || 0,                                                                                                // 2144
    ms(stats.duration));                                                                                              // 2145
                                                                                                                      // 2146
  // pending                                                                                                          // 2147
  if (stats.pending) {                                                                                                // 2148
    fmt = color('pending', ' ')                                                                                       // 2149
      + color('pending', ' %d pending');                                                                              // 2150
                                                                                                                      // 2151
    console.log(fmt, stats.pending);                                                                                  // 2152
  }                                                                                                                   // 2153
                                                                                                                      // 2154
  // failures                                                                                                         // 2155
  if (stats.failures) {                                                                                               // 2156
    fmt = color('fail', '  %d failing');                                                                              // 2157
                                                                                                                      // 2158
    console.error(fmt,                                                                                                // 2159
      stats.failures);                                                                                                // 2160
                                                                                                                      // 2161
    Base.list(this.failures);                                                                                         // 2162
    console.error();                                                                                                  // 2163
  }                                                                                                                   // 2164
                                                                                                                      // 2165
  console.log();                                                                                                      // 2166
};                                                                                                                    // 2167
                                                                                                                      // 2168
/**                                                                                                                   // 2169
 * Pad the given `str` to `len`.                                                                                      // 2170
 *                                                                                                                    // 2171
 * @param {String} str                                                                                                // 2172
 * @param {String} len                                                                                                // 2173
 * @return {String}                                                                                                   // 2174
 * @api private                                                                                                       // 2175
 */                                                                                                                   // 2176
                                                                                                                      // 2177
function pad(str, len) {                                                                                              // 2178
  str = String(str);                                                                                                  // 2179
  return Array(len - str.length + 1).join(' ') + str;                                                                 // 2180
}                                                                                                                     // 2181
                                                                                                                      // 2182
                                                                                                                      // 2183
/**                                                                                                                   // 2184
 * Returns an inline diff between 2 strings with coloured ANSI output                                                 // 2185
 *                                                                                                                    // 2186
 * @param {Error} Error with actual/expected                                                                          // 2187
 * @return {String} Diff                                                                                              // 2188
 * @api private                                                                                                       // 2189
 */                                                                                                                   // 2190
                                                                                                                      // 2191
function inlineDiff(err, escape) {                                                                                    // 2192
  var msg = errorDiff(err, 'WordsWithSpace', escape);                                                                 // 2193
                                                                                                                      // 2194
  // linenos                                                                                                          // 2195
  var lines = msg.split('\n');                                                                                        // 2196
  if (lines.length > 4) {                                                                                             // 2197
    var width = String(lines.length).length;                                                                          // 2198
    msg = lines.map(function(str, i){                                                                                 // 2199
      return pad(++i, width) + ' |' + ' ' + str;                                                                      // 2200
    }).join('\n');                                                                                                    // 2201
  }                                                                                                                   // 2202
                                                                                                                      // 2203
  // legend                                                                                                           // 2204
  msg = '\n'                                                                                                          // 2205
    + color('diff removed', 'actual')                                                                                 // 2206
    + ' '                                                                                                             // 2207
    + color('diff added', 'expected')                                                                                 // 2208
    + '\n\n'                                                                                                          // 2209
    + msg                                                                                                             // 2210
    + '\n';                                                                                                           // 2211
                                                                                                                      // 2212
  // indent                                                                                                           // 2213
  msg = msg.replace(/^/gm, '      ');                                                                                 // 2214
  return msg;                                                                                                         // 2215
}                                                                                                                     // 2216
                                                                                                                      // 2217
/**                                                                                                                   // 2218
 * Returns a unified diff between 2 strings                                                                           // 2219
 *                                                                                                                    // 2220
 * @param {Error} Error with actual/expected                                                                          // 2221
 * @return {String} Diff                                                                                              // 2222
 * @api private                                                                                                       // 2223
 */                                                                                                                   // 2224
                                                                                                                      // 2225
function unifiedDiff(err, escape) {                                                                                   // 2226
  var indent = '      ';                                                                                              // 2227
  function cleanUp(line) {                                                                                            // 2228
    if (escape) {                                                                                                     // 2229
      line = escapeInvisibles(line);                                                                                  // 2230
    }                                                                                                                 // 2231
    if (line[0] === '+') return indent + colorLines('diff added', line);                                              // 2232
    if (line[0] === '-') return indent + colorLines('diff removed', line);                                            // 2233
    if (line.match(/\@\@/)) return null;                                                                              // 2234
    if (line.match(/\\ No newline/)) return null;                                                                     // 2235
    else return indent + line;                                                                                        // 2236
  }                                                                                                                   // 2237
  function notBlank(line) {                                                                                           // 2238
    return line != null;                                                                                              // 2239
  }                                                                                                                   // 2240
  msg = diff.createPatch('string', err.actual, err.expected);                                                         // 2241
  var lines = msg.split('\n').splice(4);                                                                              // 2242
  return '\n      '                                                                                                   // 2243
         + colorLines('diff added',   '+ expected') + ' '                                                             // 2244
         + colorLines('diff removed', '- actual')                                                                     // 2245
         + '\n\n'                                                                                                     // 2246
         + lines.map(cleanUp).filter(notBlank).join('\n');                                                            // 2247
}                                                                                                                     // 2248
                                                                                                                      // 2249
/**                                                                                                                   // 2250
 * Return a character diff for `err`.                                                                                 // 2251
 *                                                                                                                    // 2252
 * @param {Error} err                                                                                                 // 2253
 * @return {String}                                                                                                   // 2254
 * @api private                                                                                                       // 2255
 */                                                                                                                   // 2256
                                                                                                                      // 2257
function errorDiff(err, type, escape) {                                                                               // 2258
  var actual   = escape ? escapeInvisibles(err.actual)   : err.actual;                                                // 2259
  var expected = escape ? escapeInvisibles(err.expected) : err.expected;                                              // 2260
  return diff['diff' + type](actual, expected).map(function(str){                                                     // 2261
    if (str.added) return colorLines('diff added', str.value);                                                        // 2262
    if (str.removed) return colorLines('diff removed', str.value);                                                    // 2263
    return str.value;                                                                                                 // 2264
  }).join('');                                                                                                        // 2265
}                                                                                                                     // 2266
                                                                                                                      // 2267
/**                                                                                                                   // 2268
 * Returns a string with all invisible characters in plain text                                                       // 2269
 *                                                                                                                    // 2270
 * @param {String} line                                                                                               // 2271
 * @return {String}                                                                                                   // 2272
 * @api private                                                                                                       // 2273
 */                                                                                                                   // 2274
function escapeInvisibles(line) {                                                                                     // 2275
    return line.replace(/\t/g, '<tab>')                                                                               // 2276
               .replace(/\r/g, '<CR>')                                                                                // 2277
               .replace(/\n/g, '<LF>\n');                                                                             // 2278
}                                                                                                                     // 2279
                                                                                                                      // 2280
/**                                                                                                                   // 2281
 * Color lines for `str`, using the color `name`.                                                                     // 2282
 *                                                                                                                    // 2283
 * @param {String} name                                                                                               // 2284
 * @param {String} str                                                                                                // 2285
 * @return {String}                                                                                                   // 2286
 * @api private                                                                                                       // 2287
 */                                                                                                                   // 2288
                                                                                                                      // 2289
function colorLines(name, str) {                                                                                      // 2290
  return str.split('\n').map(function(str){                                                                           // 2291
    return color(name, str);                                                                                          // 2292
  }).join('\n');                                                                                                      // 2293
}                                                                                                                     // 2294
                                                                                                                      // 2295
/**                                                                                                                   // 2296
 * Stringify `obj`.                                                                                                   // 2297
 *                                                                                                                    // 2298
 * @param {Object} obj                                                                                                // 2299
 * @return {String}                                                                                                   // 2300
 * @api private                                                                                                       // 2301
 */                                                                                                                   // 2302
                                                                                                                      // 2303
function stringify(obj) {                                                                                             // 2304
  if (obj instanceof RegExp) return obj.toString();                                                                   // 2305
  return JSON.stringify(obj, null, 2);                                                                                // 2306
}                                                                                                                     // 2307
                                                                                                                      // 2308
/**                                                                                                                   // 2309
 * Return a new object that has the keys in sorted order.                                                             // 2310
 * @param {Object} obj                                                                                                // 2311
 * @return {Object}                                                                                                   // 2312
 * @api private                                                                                                       // 2313
 */                                                                                                                   // 2314
                                                                                                                      // 2315
 function canonicalize(obj, stack) {                                                                                  // 2316
   stack = stack || [];                                                                                               // 2317
                                                                                                                      // 2318
   if (utils.indexOf(stack, obj) !== -1) return obj;                                                                  // 2319
                                                                                                                      // 2320
   var canonicalizedObj;                                                                                              // 2321
                                                                                                                      // 2322
   if ('[object Array]' == {}.toString.call(obj)) {                                                                   // 2323
     stack.push(obj);                                                                                                 // 2324
     canonicalizedObj = utils.map(obj, function(item) {                                                               // 2325
       return canonicalize(item, stack);                                                                              // 2326
     });                                                                                                              // 2327
     stack.pop();                                                                                                     // 2328
   } else if (typeof obj === 'object' && obj !== null) {                                                              // 2329
     stack.push(obj);                                                                                                 // 2330
     canonicalizedObj = {};                                                                                           // 2331
     utils.forEach(utils.keys(obj).sort(), function(key) {                                                            // 2332
       canonicalizedObj[key] = canonicalize(obj[key], stack);                                                         // 2333
     });                                                                                                              // 2334
     stack.pop();                                                                                                     // 2335
   } else {                                                                                                           // 2336
     canonicalizedObj = obj;                                                                                          // 2337
   }                                                                                                                  // 2338
                                                                                                                      // 2339
   return canonicalizedObj;                                                                                           // 2340
 }                                                                                                                    // 2341
                                                                                                                      // 2342
/**                                                                                                                   // 2343
 * Check that a / b have the same type.                                                                               // 2344
 *                                                                                                                    // 2345
 * @param {Object} a                                                                                                  // 2346
 * @param {Object} b                                                                                                  // 2347
 * @return {Boolean}                                                                                                  // 2348
 * @api private                                                                                                       // 2349
 */                                                                                                                   // 2350
                                                                                                                      // 2351
function sameType(a, b) {                                                                                             // 2352
  a = Object.prototype.toString.call(a);                                                                              // 2353
  b = Object.prototype.toString.call(b);                                                                              // 2354
  return a == b;                                                                                                      // 2355
}                                                                                                                     // 2356
                                                                                                                      // 2357
                                                                                                                      // 2358
}); // module: reporters/base.js                                                                                      // 2359
                                                                                                                      // 2360
require.register("reporters/doc.js", function(module, exports, require){                                              // 2361
                                                                                                                      // 2362
/**                                                                                                                   // 2363
 * Module dependencies.                                                                                               // 2364
 */                                                                                                                   // 2365
                                                                                                                      // 2366
var Base = require('./base')                                                                                          // 2367
  , utils = require('../utils');                                                                                      // 2368
                                                                                                                      // 2369
/**                                                                                                                   // 2370
 * Expose `Doc`.                                                                                                      // 2371
 */                                                                                                                   // 2372
                                                                                                                      // 2373
exports = module.exports = Doc;                                                                                       // 2374
                                                                                                                      // 2375
/**                                                                                                                   // 2376
 * Initialize a new `Doc` reporter.                                                                                   // 2377
 *                                                                                                                    // 2378
 * @param {Runner} runner                                                                                             // 2379
 * @api public                                                                                                        // 2380
 */                                                                                                                   // 2381
                                                                                                                      // 2382
function Doc(runner) {                                                                                                // 2383
  Base.call(this, runner);                                                                                            // 2384
                                                                                                                      // 2385
  var self = this                                                                                                     // 2386
    , stats = this.stats                                                                                              // 2387
    , total = runner.total                                                                                            // 2388
    , indents = 2;                                                                                                    // 2389
                                                                                                                      // 2390
  function indent() {                                                                                                 // 2391
    return Array(indents).join('  ');                                                                                 // 2392
  }                                                                                                                   // 2393
                                                                                                                      // 2394
  runner.on('suite', function(suite){                                                                                 // 2395
    if (suite.root) return;                                                                                           // 2396
    ++indents;                                                                                                        // 2397
    console.log('%s<section class="suite">', indent());                                                               // 2398
    ++indents;                                                                                                        // 2399
    console.log('%s<h1>%s</h1>', indent(), utils.escape(suite.title));                                                // 2400
    console.log('%s<dl>', indent());                                                                                  // 2401
  });                                                                                                                 // 2402
                                                                                                                      // 2403
  runner.on('suite end', function(suite){                                                                             // 2404
    if (suite.root) return;                                                                                           // 2405
    console.log('%s</dl>', indent());                                                                                 // 2406
    --indents;                                                                                                        // 2407
    console.log('%s</section>', indent());                                                                            // 2408
    --indents;                                                                                                        // 2409
  });                                                                                                                 // 2410
                                                                                                                      // 2411
  runner.on('pass', function(test){                                                                                   // 2412
    console.log('%s  <dt>%s</dt>', indent(), utils.escape(test.title));                                               // 2413
    var code = utils.escape(utils.clean(test.fn.toString()));                                                         // 2414
    console.log('%s  <dd><pre><code>%s</code></pre></dd>', indent(), code);                                           // 2415
  });                                                                                                                 // 2416
}                                                                                                                     // 2417
                                                                                                                      // 2418
}); // module: reporters/doc.js                                                                                       // 2419
                                                                                                                      // 2420
require.register("reporters/dot.js", function(module, exports, require){                                              // 2421
                                                                                                                      // 2422
/**                                                                                                                   // 2423
 * Module dependencies.                                                                                               // 2424
 */                                                                                                                   // 2425
                                                                                                                      // 2426
var Base = require('./base')                                                                                          // 2427
  , color = Base.color;                                                                                               // 2428
                                                                                                                      // 2429
/**                                                                                                                   // 2430
 * Expose `Dot`.                                                                                                      // 2431
 */                                                                                                                   // 2432
                                                                                                                      // 2433
exports = module.exports = Dot;                                                                                       // 2434
                                                                                                                      // 2435
/**                                                                                                                   // 2436
 * Initialize a new `Dot` matrix test reporter.                                                                       // 2437
 *                                                                                                                    // 2438
 * @param {Runner} runner                                                                                             // 2439
 * @api public                                                                                                        // 2440
 */                                                                                                                   // 2441
                                                                                                                      // 2442
function Dot(runner) {                                                                                                // 2443
  Base.call(this, runner);                                                                                            // 2444
                                                                                                                      // 2445
  var self = this                                                                                                     // 2446
    , stats = this.stats                                                                                              // 2447
    , width = Base.window.width * .75 | 0                                                                             // 2448
    , n = 0;                                                                                                          // 2449
                                                                                                                      // 2450
  runner.on('start', function(){                                                                                      // 2451
    process.stdout.write('\n  ');                                                                                     // 2452
  });                                                                                                                 // 2453
                                                                                                                      // 2454
  runner.on('pending', function(test){                                                                                // 2455
    process.stdout.write(color('pending', Base.symbols.dot));                                                         // 2456
  });                                                                                                                 // 2457
                                                                                                                      // 2458
  runner.on('pass', function(test){                                                                                   // 2459
    if (++n % width == 0) process.stdout.write('\n  ');                                                               // 2460
    if ('slow' == test.speed) {                                                                                       // 2461
      process.stdout.write(color('bright yellow', Base.symbols.dot));                                                 // 2462
    } else {                                                                                                          // 2463
      process.stdout.write(color(test.speed, Base.symbols.dot));                                                      // 2464
    }                                                                                                                 // 2465
  });                                                                                                                 // 2466
                                                                                                                      // 2467
  runner.on('fail', function(test, err){                                                                              // 2468
    if (++n % width == 0) process.stdout.write('\n  ');                                                               // 2469
    process.stdout.write(color('fail', Base.symbols.dot));                                                            // 2470
  });                                                                                                                 // 2471
                                                                                                                      // 2472
  runner.on('end', function(){                                                                                        // 2473
    console.log();                                                                                                    // 2474
    self.epilogue();                                                                                                  // 2475
  });                                                                                                                 // 2476
}                                                                                                                     // 2477
                                                                                                                      // 2478
/**                                                                                                                   // 2479
 * Inherit from `Base.prototype`.                                                                                     // 2480
 */                                                                                                                   // 2481
                                                                                                                      // 2482
function F(){};                                                                                                       // 2483
F.prototype = Base.prototype;                                                                                         // 2484
Dot.prototype = new F;                                                                                                // 2485
Dot.prototype.constructor = Dot;                                                                                      // 2486
                                                                                                                      // 2487
}); // module: reporters/dot.js                                                                                       // 2488
                                                                                                                      // 2489
require.register("reporters/html-cov.js", function(module, exports, require){                                         // 2490
                                                                                                                      // 2491
/**                                                                                                                   // 2492
 * Module dependencies.                                                                                               // 2493
 */                                                                                                                   // 2494
                                                                                                                      // 2495
var JSONCov = require('./json-cov')                                                                                   // 2496
  , fs = require('browser/fs');                                                                                       // 2497
                                                                                                                      // 2498
/**                                                                                                                   // 2499
 * Expose `HTMLCov`.                                                                                                  // 2500
 */                                                                                                                   // 2501
                                                                                                                      // 2502
exports = module.exports = HTMLCov;                                                                                   // 2503
                                                                                                                      // 2504
/**                                                                                                                   // 2505
 * Initialize a new `JsCoverage` reporter.                                                                            // 2506
 *                                                                                                                    // 2507
 * @param {Runner} runner                                                                                             // 2508
 * @api public                                                                                                        // 2509
 */                                                                                                                   // 2510
                                                                                                                      // 2511
function HTMLCov(runner) {                                                                                            // 2512
  var jade = require('jade')                                                                                          // 2513
    , file = __dirname + '/templates/coverage.jade'                                                                   // 2514
    , str = fs.readFileSync(file, 'utf8')                                                                             // 2515
    , fn = jade.compile(str, { filename: file })                                                                      // 2516
    , self = this;                                                                                                    // 2517
                                                                                                                      // 2518
  JSONCov.call(this, runner, false);                                                                                  // 2519
                                                                                                                      // 2520
  runner.on('end', function(){                                                                                        // 2521
    process.stdout.write(fn({                                                                                         // 2522
        cov: self.cov                                                                                                 // 2523
      , coverageClass: coverageClass                                                                                  // 2524
    }));                                                                                                              // 2525
  });                                                                                                                 // 2526
}                                                                                                                     // 2527
                                                                                                                      // 2528
/**                                                                                                                   // 2529
 * Return coverage class for `n`.                                                                                     // 2530
 *                                                                                                                    // 2531
 * @return {String}                                                                                                   // 2532
 * @api private                                                                                                       // 2533
 */                                                                                                                   // 2534
                                                                                                                      // 2535
function coverageClass(n) {                                                                                           // 2536
  if (n >= 75) return 'high';                                                                                         // 2537
  if (n >= 50) return 'medium';                                                                                       // 2538
  if (n >= 25) return 'low';                                                                                          // 2539
  return 'terrible';                                                                                                  // 2540
}                                                                                                                     // 2541
}); // module: reporters/html-cov.js                                                                                  // 2542
                                                                                                                      // 2543
require.register("reporters/html.js", function(module, exports, require){                                             // 2544
                                                                                                                      // 2545
/**                                                                                                                   // 2546
 * Module dependencies.                                                                                               // 2547
 */                                                                                                                   // 2548
                                                                                                                      // 2549
var Base = require('./base')                                                                                          // 2550
  , utils = require('../utils')                                                                                       // 2551
  , Progress = require('../browser/progress')                                                                         // 2552
  , escape = utils.escape;                                                                                            // 2553
                                                                                                                      // 2554
/**                                                                                                                   // 2555
 * Save timer references to avoid Sinon interfering (see GH-237).                                                     // 2556
 */                                                                                                                   // 2557
                                                                                                                      // 2558
var Date = global.Date                                                                                                // 2559
  , setTimeout = global.setTimeout                                                                                    // 2560
  , setInterval = global.setInterval                                                                                  // 2561
  , clearTimeout = global.clearTimeout                                                                                // 2562
  , clearInterval = global.clearInterval;                                                                             // 2563
                                                                                                                      // 2564
/**                                                                                                                   // 2565
 * Expose `HTML`.                                                                                                     // 2566
 */                                                                                                                   // 2567
                                                                                                                      // 2568
exports = module.exports = HTML;                                                                                      // 2569
                                                                                                                      // 2570
/**                                                                                                                   // 2571
 * Stats template.                                                                                                    // 2572
 */                                                                                                                   // 2573
                                                                                                                      // 2574
var statsTemplate = '<ul id="mocha-stats">'                                                                           // 2575
  + '<li class="progress"><canvas width="40" height="40"></canvas></li>'                                              // 2576
  + '<li class="passes"><a href="#">passes:</a> <em>0</em></li>'                                                      // 2577
  + '<li class="failures"><a href="#">failures:</a> <em>0</em></li>'                                                  // 2578
  + '<li class="duration">duration: <em>0</em>s</li>'                                                                 // 2579
  + '</ul>';                                                                                                          // 2580
                                                                                                                      // 2581
/**                                                                                                                   // 2582
 * Initialize a new `HTML` reporter.                                                                                  // 2583
 *                                                                                                                    // 2584
 * @param {Runner} runner                                                                                             // 2585
 * @api public                                                                                                        // 2586
 */                                                                                                                   // 2587
                                                                                                                      // 2588
function HTML(runner, root) {                                                                                         // 2589
  Base.call(this, runner);                                                                                            // 2590
                                                                                                                      // 2591
  var self = this                                                                                                     // 2592
    , stats = this.stats                                                                                              // 2593
    , total = runner.total                                                                                            // 2594
    , stat = fragment(statsTemplate)                                                                                  // 2595
    , items = stat.getElementsByTagName('li')                                                                         // 2596
    , passes = items[1].getElementsByTagName('em')[0]                                                                 // 2597
    , passesLink = items[1].getElementsByTagName('a')[0]                                                              // 2598
    , failures = items[2].getElementsByTagName('em')[0]                                                               // 2599
    , failuresLink = items[2].getElementsByTagName('a')[0]                                                            // 2600
    , duration = items[3].getElementsByTagName('em')[0]                                                               // 2601
    , canvas = stat.getElementsByTagName('canvas')[0]                                                                 // 2602
    , report = fragment('<ul id="mocha-report"></ul>')                                                                // 2603
    , stack = [report]                                                                                                // 2604
    , progress                                                                                                        // 2605
    , ctx                                                                                                             // 2606
                                                                                                                      // 2607
  root = root || document.getElementById('mocha');                                                                    // 2608
                                                                                                                      // 2609
  if (canvas.getContext) {                                                                                            // 2610
    var ratio = window.devicePixelRatio || 1;                                                                         // 2611
    canvas.style.width = canvas.width;                                                                                // 2612
    canvas.style.height = canvas.height;                                                                              // 2613
    canvas.width *= ratio;                                                                                            // 2614
    canvas.height *= ratio;                                                                                           // 2615
    ctx = canvas.getContext('2d');                                                                                    // 2616
    ctx.scale(ratio, ratio);                                                                                          // 2617
    progress = new Progress;                                                                                          // 2618
  }                                                                                                                   // 2619
                                                                                                                      // 2620
  if (!root) return error('#mocha div missing, add it to your document');                                             // 2621
                                                                                                                      // 2622
  // pass toggle                                                                                                      // 2623
  on(passesLink, 'click', function(){                                                                                 // 2624
    unhide();                                                                                                         // 2625
    var name = /pass/.test(report.className) ? '' : ' pass';                                                          // 2626
    report.className = report.className.replace(/fail|pass/g, '') + name;                                             // 2627
    if (report.className.trim()) hideSuitesWithout('test pass');                                                      // 2628
  });                                                                                                                 // 2629
                                                                                                                      // 2630
  // failure toggle                                                                                                   // 2631
  on(failuresLink, 'click', function(){                                                                               // 2632
    unhide();                                                                                                         // 2633
    var name = /fail/.test(report.className) ? '' : ' fail';                                                          // 2634
    report.className = report.className.replace(/fail|pass/g, '') + name;                                             // 2635
    if (report.className.trim()) hideSuitesWithout('test fail');                                                      // 2636
  });                                                                                                                 // 2637
                                                                                                                      // 2638
  root.appendChild(stat);                                                                                             // 2639
  root.appendChild(report);                                                                                           // 2640
                                                                                                                      // 2641
  if (progress) progress.size(40);                                                                                    // 2642
                                                                                                                      // 2643
  runner.on('suite', function(suite){                                                                                 // 2644
    if (suite.root) return;                                                                                           // 2645
                                                                                                                      // 2646
    // suite                                                                                                          // 2647
    var url = self.suiteURL(suite);                                                                                   // 2648
    var el = fragment('<li class="suite"><h1><a href="%s">%s</a></h1></li>', url, escape(suite.title));               // 2649
                                                                                                                      // 2650
    // container                                                                                                      // 2651
    stack[0].appendChild(el);                                                                                         // 2652
    stack.unshift(document.createElement('ul'));                                                                      // 2653
    el.appendChild(stack[0]);                                                                                         // 2654
  });                                                                                                                 // 2655
                                                                                                                      // 2656
  runner.on('suite end', function(suite){                                                                             // 2657
    if (suite.root) return;                                                                                           // 2658
    stack.shift();                                                                                                    // 2659
  });                                                                                                                 // 2660
                                                                                                                      // 2661
  runner.on('fail', function(test, err){                                                                              // 2662
    if ('hook' == test.type) runner.emit('test end', test);                                                           // 2663
  });                                                                                                                 // 2664
                                                                                                                      // 2665
  runner.on('test end', function(test){                                                                               // 2666
    // TODO: add to stats                                                                                             // 2667
    var percent = stats.tests / this.total * 100 | 0;                                                                 // 2668
    if (progress) progress.update(percent).draw(ctx);                                                                 // 2669
                                                                                                                      // 2670
    // update stats                                                                                                   // 2671
    var ms = new Date - stats.start;                                                                                  // 2672
    text(passes, stats.passes);                                                                                       // 2673
    text(failures, stats.failures);                                                                                   // 2674
    text(duration, (ms / 1000).toFixed(2));                                                                           // 2675
                                                                                                                      // 2676
    // test                                                                                                           // 2677
    if ('passed' == test.state) {                                                                                     // 2678
      var url = self.testURL(test);                                                                                   // 2679
      var el = fragment('<li class="test pass %e"><h2>%e<span class="duration">%ems</span> <a href="%s" class="replay">‣</a></h2></li>', test.speed, test.title, test.duration, url);
    } else if (test.pending) {                                                                                        // 2681
      var el = fragment('<li class="test pass pending"><h2>%e</h2></li>', test.title);                                // 2682
    } else {                                                                                                          // 2683
      var el = fragment('<li class="test fail"><h2>%e <a href="?grep=%e" class="replay">‣</a></h2></li>', test.title, encodeURIComponent(test.fullTitle()));
      var str = test.err.stack || test.err.toString();                                                                // 2685
                                                                                                                      // 2686
      // FF / Opera do not add the message                                                                            // 2687
      if (!~str.indexOf(test.err.message)) {                                                                          // 2688
        str = test.err.message + '\n' + str;                                                                          // 2689
      }                                                                                                               // 2690
                                                                                                                      // 2691
      // <=IE7 stringifies to [Object Error]. Since it can be overloaded, we                                          // 2692
      // check for the result of the stringifying.                                                                    // 2693
      if ('[object Error]' == str) str = test.err.message;                                                            // 2694
                                                                                                                      // 2695
      // Safari doesn't give you a stack. Let's at least provide a source line.                                       // 2696
      if (!test.err.stack && test.err.sourceURL && test.err.line !== undefined) {                                     // 2697
        str += "\n(" + test.err.sourceURL + ":" + test.err.line + ")";                                                // 2698
      }                                                                                                               // 2699
                                                                                                                      // 2700
      el.appendChild(fragment('<pre class="error">%e</pre>', str));                                                   // 2701
    }                                                                                                                 // 2702
                                                                                                                      // 2703
    // toggle code                                                                                                    // 2704
    // TODO: defer                                                                                                    // 2705
    if (!test.pending) {                                                                                              // 2706
      var h2 = el.getElementsByTagName('h2')[0];                                                                      // 2707
                                                                                                                      // 2708
      on(h2, 'click', function(){                                                                                     // 2709
        pre.style.display = 'none' == pre.style.display                                                               // 2710
          ? 'block'                                                                                                   // 2711
          : 'none';                                                                                                   // 2712
      });                                                                                                             // 2713
                                                                                                                      // 2714
      var pre = fragment('<pre><code>%e</code></pre>', utils.clean(test.fn.toString()));                              // 2715
      el.appendChild(pre);                                                                                            // 2716
      pre.style.display = 'none';                                                                                     // 2717
    }                                                                                                                 // 2718
                                                                                                                      // 2719
    // Don't call .appendChild if #mocha-report was already .shift()'ed off the stack.                                // 2720
    if (stack[0]) stack[0].appendChild(el);                                                                           // 2721
  });                                                                                                                 // 2722
}                                                                                                                     // 2723
                                                                                                                      // 2724
/**                                                                                                                   // 2725
 * Provide suite URL                                                                                                  // 2726
 *                                                                                                                    // 2727
 * @param {Object} [suite]                                                                                            // 2728
 */                                                                                                                   // 2729
                                                                                                                      // 2730
HTML.prototype.suiteURL = function(suite){                                                                            // 2731
  return '?grep=' + encodeURIComponent(suite.fullTitle());                                                            // 2732
};                                                                                                                    // 2733
                                                                                                                      // 2734
/**                                                                                                                   // 2735
 * Provide test URL                                                                                                   // 2736
 *                                                                                                                    // 2737
 * @param {Object} [test]                                                                                             // 2738
 */                                                                                                                   // 2739
                                                                                                                      // 2740
HTML.prototype.testURL = function(test){                                                                              // 2741
  return '?grep=' + encodeURIComponent(test.fullTitle());                                                             // 2742
};                                                                                                                    // 2743
                                                                                                                      // 2744
/**                                                                                                                   // 2745
 * Display error `msg`.                                                                                               // 2746
 */                                                                                                                   // 2747
                                                                                                                      // 2748
function error(msg) {                                                                                                 // 2749
  document.body.appendChild(fragment('<div id="mocha-error">%s</div>', msg));                                         // 2750
}                                                                                                                     // 2751
                                                                                                                      // 2752
/**                                                                                                                   // 2753
 * Return a DOM fragment from `html`.                                                                                 // 2754
 */                                                                                                                   // 2755
                                                                                                                      // 2756
function fragment(html) {                                                                                             // 2757
  var args = arguments                                                                                                // 2758
    , div = document.createElement('div')                                                                             // 2759
    , i = 1;                                                                                                          // 2760
                                                                                                                      // 2761
  div.innerHTML = html.replace(/%([se])/g, function(_, type){                                                         // 2762
    switch (type) {                                                                                                   // 2763
      case 's': return String(args[i++]);                                                                             // 2764
      case 'e': return escape(args[i++]);                                                                             // 2765
    }                                                                                                                 // 2766
  });                                                                                                                 // 2767
                                                                                                                      // 2768
  return div.firstChild;                                                                                              // 2769
}                                                                                                                     // 2770
                                                                                                                      // 2771
/**                                                                                                                   // 2772
 * Check for suites that do not have elements                                                                         // 2773
 * with `classname`, and hide them.                                                                                   // 2774
 */                                                                                                                   // 2775
                                                                                                                      // 2776
function hideSuitesWithout(classname) {                                                                               // 2777
  var suites = document.getElementsByClassName('suite');                                                              // 2778
  for (var i = 0; i < suites.length; i++) {                                                                           // 2779
    var els = suites[i].getElementsByClassName(classname);                                                            // 2780
    if (0 == els.length) suites[i].className += ' hidden';                                                            // 2781
  }                                                                                                                   // 2782
}                                                                                                                     // 2783
                                                                                                                      // 2784
/**                                                                                                                   // 2785
 * Unhide .hidden suites.                                                                                             // 2786
 */                                                                                                                   // 2787
                                                                                                                      // 2788
function unhide() {                                                                                                   // 2789
  var els = document.getElementsByClassName('suite hidden');                                                          // 2790
  for (var i = 0; i < els.length; ++i) {                                                                              // 2791
    els[i].className = els[i].className.replace('suite hidden', 'suite');                                             // 2792
  }                                                                                                                   // 2793
}                                                                                                                     // 2794
                                                                                                                      // 2795
/**                                                                                                                   // 2796
 * Set `el` text to `str`.                                                                                            // 2797
 */                                                                                                                   // 2798
                                                                                                                      // 2799
function text(el, str) {                                                                                              // 2800
  if (el.textContent) {                                                                                               // 2801
    el.textContent = str;                                                                                             // 2802
  } else {                                                                                                            // 2803
    el.innerText = str;                                                                                               // 2804
  }                                                                                                                   // 2805
}                                                                                                                     // 2806
                                                                                                                      // 2807
/**                                                                                                                   // 2808
 * Listen on `event` with callback `fn`.                                                                              // 2809
 */                                                                                                                   // 2810
                                                                                                                      // 2811
function on(el, event, fn) {                                                                                          // 2812
  if (el.addEventListener) {                                                                                          // 2813
    el.addEventListener(event, fn, false);                                                                            // 2814
  } else {                                                                                                            // 2815
    el.attachEvent('on' + event, fn);                                                                                 // 2816
  }                                                                                                                   // 2817
}                                                                                                                     // 2818
                                                                                                                      // 2819
}); // module: reporters/html.js                                                                                      // 2820
                                                                                                                      // 2821
require.register("reporters/index.js", function(module, exports, require){                                            // 2822
                                                                                                                      // 2823
exports.Base = require('./base');                                                                                     // 2824
exports.Dot = require('./dot');                                                                                       // 2825
exports.Doc = require('./doc');                                                                                       // 2826
exports.TAP = require('./tap');                                                                                       // 2827
exports.JSON = require('./json');                                                                                     // 2828
exports.HTML = require('./html');                                                                                     // 2829
exports.List = require('./list');                                                                                     // 2830
exports.Min = require('./min');                                                                                       // 2831
exports.Spec = require('./spec');                                                                                     // 2832
exports.Nyan = require('./nyan');                                                                                     // 2833
exports.XUnit = require('./xunit');                                                                                   // 2834
exports.Markdown = require('./markdown');                                                                             // 2835
exports.Progress = require('./progress');                                                                             // 2836
exports.Landing = require('./landing');                                                                               // 2837
exports.JSONCov = require('./json-cov');                                                                              // 2838
exports.HTMLCov = require('./html-cov');                                                                              // 2839
exports.JSONStream = require('./json-stream');                                                                        // 2840
                                                                                                                      // 2841
}); // module: reporters/index.js                                                                                     // 2842
                                                                                                                      // 2843
require.register("reporters/json-cov.js", function(module, exports, require){                                         // 2844
                                                                                                                      // 2845
/**                                                                                                                   // 2846
 * Module dependencies.                                                                                               // 2847
 */                                                                                                                   // 2848
                                                                                                                      // 2849
var Base = require('./base');                                                                                         // 2850
                                                                                                                      // 2851
/**                                                                                                                   // 2852
 * Expose `JSONCov`.                                                                                                  // 2853
 */                                                                                                                   // 2854
                                                                                                                      // 2855
exports = module.exports = JSONCov;                                                                                   // 2856
                                                                                                                      // 2857
/**                                                                                                                   // 2858
 * Initialize a new `JsCoverage` reporter.                                                                            // 2859
 *                                                                                                                    // 2860
 * @param {Runner} runner                                                                                             // 2861
 * @param {Boolean} output                                                                                            // 2862
 * @api public                                                                                                        // 2863
 */                                                                                                                   // 2864
                                                                                                                      // 2865
function JSONCov(runner, output) {                                                                                    // 2866
  var self = this                                                                                                     // 2867
    , output = 1 == arguments.length ? true : output;                                                                 // 2868
                                                                                                                      // 2869
  Base.call(this, runner);                                                                                            // 2870
                                                                                                                      // 2871
  var tests = []                                                                                                      // 2872
    , failures = []                                                                                                   // 2873
    , passes = [];                                                                                                    // 2874
                                                                                                                      // 2875
  runner.on('test end', function(test){                                                                               // 2876
    tests.push(test);                                                                                                 // 2877
  });                                                                                                                 // 2878
                                                                                                                      // 2879
  runner.on('pass', function(test){                                                                                   // 2880
    passes.push(test);                                                                                                // 2881
  });                                                                                                                 // 2882
                                                                                                                      // 2883
  runner.on('fail', function(test){                                                                                   // 2884
    failures.push(test);                                                                                              // 2885
  });                                                                                                                 // 2886
                                                                                                                      // 2887
  runner.on('end', function(){                                                                                        // 2888
    var cov = global._$jscoverage || {};                                                                              // 2889
    var result = self.cov = map(cov);                                                                                 // 2890
    result.stats = self.stats;                                                                                        // 2891
    result.tests = tests.map(clean);                                                                                  // 2892
    result.failures = failures.map(clean);                                                                            // 2893
    result.passes = passes.map(clean);                                                                                // 2894
    if (!output) return;                                                                                              // 2895
    process.stdout.write(JSON.stringify(result, null, 2 ));                                                           // 2896
  });                                                                                                                 // 2897
}                                                                                                                     // 2898
                                                                                                                      // 2899
/**                                                                                                                   // 2900
 * Map jscoverage data to a JSON structure                                                                            // 2901
 * suitable for reporting.                                                                                            // 2902
 *                                                                                                                    // 2903
 * @param {Object} cov                                                                                                // 2904
 * @return {Object}                                                                                                   // 2905
 * @api private                                                                                                       // 2906
 */                                                                                                                   // 2907
                                                                                                                      // 2908
function map(cov) {                                                                                                   // 2909
  var ret = {                                                                                                         // 2910
      instrumentation: 'node-jscoverage'                                                                              // 2911
    , sloc: 0                                                                                                         // 2912
    , hits: 0                                                                                                         // 2913
    , misses: 0                                                                                                       // 2914
    , coverage: 0                                                                                                     // 2915
    , files: []                                                                                                       // 2916
  };                                                                                                                  // 2917
                                                                                                                      // 2918
  for (var filename in cov) {                                                                                         // 2919
    var data = coverage(filename, cov[filename]);                                                                     // 2920
    ret.files.push(data);                                                                                             // 2921
    ret.hits += data.hits;                                                                                            // 2922
    ret.misses += data.misses;                                                                                        // 2923
    ret.sloc += data.sloc;                                                                                            // 2924
  }                                                                                                                   // 2925
                                                                                                                      // 2926
  ret.files.sort(function(a, b) {                                                                                     // 2927
    return a.filename.localeCompare(b.filename);                                                                      // 2928
  });                                                                                                                 // 2929
                                                                                                                      // 2930
  if (ret.sloc > 0) {                                                                                                 // 2931
    ret.coverage = (ret.hits / ret.sloc) * 100;                                                                       // 2932
  }                                                                                                                   // 2933
                                                                                                                      // 2934
  return ret;                                                                                                         // 2935
};                                                                                                                    // 2936
                                                                                                                      // 2937
/**                                                                                                                   // 2938
 * Map jscoverage data for a single source file                                                                       // 2939
 * to a JSON structure suitable for reporting.                                                                        // 2940
 *                                                                                                                    // 2941
 * @param {String} filename name of the source file                                                                   // 2942
 * @param {Object} data jscoverage coverage data                                                                      // 2943
 * @return {Object}                                                                                                   // 2944
 * @api private                                                                                                       // 2945
 */                                                                                                                   // 2946
                                                                                                                      // 2947
function coverage(filename, data) {                                                                                   // 2948
  var ret = {                                                                                                         // 2949
    filename: filename,                                                                                               // 2950
    coverage: 0,                                                                                                      // 2951
    hits: 0,                                                                                                          // 2952
    misses: 0,                                                                                                        // 2953
    sloc: 0,                                                                                                          // 2954
    source: {}                                                                                                        // 2955
  };                                                                                                                  // 2956
                                                                                                                      // 2957
  data.source.forEach(function(line, num){                                                                            // 2958
    num++;                                                                                                            // 2959
                                                                                                                      // 2960
    if (data[num] === 0) {                                                                                            // 2961
      ret.misses++;                                                                                                   // 2962
      ret.sloc++;                                                                                                     // 2963
    } else if (data[num] !== undefined) {                                                                             // 2964
      ret.hits++;                                                                                                     // 2965
      ret.sloc++;                                                                                                     // 2966
    }                                                                                                                 // 2967
                                                                                                                      // 2968
    ret.source[num] = {                                                                                               // 2969
        source: line                                                                                                  // 2970
      , coverage: data[num] === undefined                                                                             // 2971
        ? ''                                                                                                          // 2972
        : data[num]                                                                                                   // 2973
    };                                                                                                                // 2974
  });                                                                                                                 // 2975
                                                                                                                      // 2976
  ret.coverage = ret.hits / ret.sloc * 100;                                                                           // 2977
                                                                                                                      // 2978
  return ret;                                                                                                         // 2979
}                                                                                                                     // 2980
                                                                                                                      // 2981
/**                                                                                                                   // 2982
 * Return a plain-object representation of `test`                                                                     // 2983
 * free of cyclic properties etc.                                                                                     // 2984
 *                                                                                                                    // 2985
 * @param {Object} test                                                                                               // 2986
 * @return {Object}                                                                                                   // 2987
 * @api private                                                                                                       // 2988
 */                                                                                                                   // 2989
                                                                                                                      // 2990
function clean(test) {                                                                                                // 2991
  return {                                                                                                            // 2992
      title: test.title                                                                                               // 2993
    , fullTitle: test.fullTitle()                                                                                     // 2994
    , duration: test.duration                                                                                         // 2995
  }                                                                                                                   // 2996
}                                                                                                                     // 2997
                                                                                                                      // 2998
}); // module: reporters/json-cov.js                                                                                  // 2999
                                                                                                                      // 3000
require.register("reporters/json-stream.js", function(module, exports, require){                                      // 3001
                                                                                                                      // 3002
/**                                                                                                                   // 3003
 * Module dependencies.                                                                                               // 3004
 */                                                                                                                   // 3005
                                                                                                                      // 3006
var Base = require('./base')                                                                                          // 3007
  , color = Base.color;                                                                                               // 3008
                                                                                                                      // 3009
/**                                                                                                                   // 3010
 * Expose `List`.                                                                                                     // 3011
 */                                                                                                                   // 3012
                                                                                                                      // 3013
exports = module.exports = List;                                                                                      // 3014
                                                                                                                      // 3015
/**                                                                                                                   // 3016
 * Initialize a new `List` test reporter.                                                                             // 3017
 *                                                                                                                    // 3018
 * @param {Runner} runner                                                                                             // 3019
 * @api public                                                                                                        // 3020
 */                                                                                                                   // 3021
                                                                                                                      // 3022
function List(runner) {                                                                                               // 3023
  Base.call(this, runner);                                                                                            // 3024
                                                                                                                      // 3025
  var self = this                                                                                                     // 3026
    , stats = this.stats                                                                                              // 3027
    , total = runner.total;                                                                                           // 3028
                                                                                                                      // 3029
  runner.on('start', function(){                                                                                      // 3030
    console.log(JSON.stringify(['start', { total: total }]));                                                         // 3031
  });                                                                                                                 // 3032
                                                                                                                      // 3033
  runner.on('pass', function(test){                                                                                   // 3034
    console.log(JSON.stringify(['pass', clean(test)]));                                                               // 3035
  });                                                                                                                 // 3036
                                                                                                                      // 3037
  runner.on('fail', function(test, err){                                                                              // 3038
    console.log(JSON.stringify(['fail', clean(test)]));                                                               // 3039
  });                                                                                                                 // 3040
                                                                                                                      // 3041
  runner.on('end', function(){                                                                                        // 3042
    process.stdout.write(JSON.stringify(['end', self.stats]));                                                        // 3043
  });                                                                                                                 // 3044
}                                                                                                                     // 3045
                                                                                                                      // 3046
/**                                                                                                                   // 3047
 * Return a plain-object representation of `test`                                                                     // 3048
 * free of cyclic properties etc.                                                                                     // 3049
 *                                                                                                                    // 3050
 * @param {Object} test                                                                                               // 3051
 * @return {Object}                                                                                                   // 3052
 * @api private                                                                                                       // 3053
 */                                                                                                                   // 3054
                                                                                                                      // 3055
function clean(test) {                                                                                                // 3056
  return {                                                                                                            // 3057
      title: test.title                                                                                               // 3058
    , fullTitle: test.fullTitle()                                                                                     // 3059
    , duration: test.duration                                                                                         // 3060
  }                                                                                                                   // 3061
}                                                                                                                     // 3062
}); // module: reporters/json-stream.js                                                                               // 3063
                                                                                                                      // 3064
require.register("reporters/json.js", function(module, exports, require){                                             // 3065
                                                                                                                      // 3066
/**                                                                                                                   // 3067
 * Module dependencies.                                                                                               // 3068
 */                                                                                                                   // 3069
                                                                                                                      // 3070
var Base = require('./base')                                                                                          // 3071
  , cursor = Base.cursor                                                                                              // 3072
  , color = Base.color;                                                                                               // 3073
                                                                                                                      // 3074
/**                                                                                                                   // 3075
 * Expose `JSON`.                                                                                                     // 3076
 */                                                                                                                   // 3077
                                                                                                                      // 3078
exports = module.exports = JSONReporter;                                                                              // 3079
                                                                                                                      // 3080
/**                                                                                                                   // 3081
 * Initialize a new `JSON` reporter.                                                                                  // 3082
 *                                                                                                                    // 3083
 * @param {Runner} runner                                                                                             // 3084
 * @api public                                                                                                        // 3085
 */                                                                                                                   // 3086
                                                                                                                      // 3087
function JSONReporter(runner) {                                                                                       // 3088
  var self = this;                                                                                                    // 3089
  Base.call(this, runner);                                                                                            // 3090
                                                                                                                      // 3091
  var tests = []                                                                                                      // 3092
    , failures = []                                                                                                   // 3093
    , passes = [];                                                                                                    // 3094
                                                                                                                      // 3095
  runner.on('test end', function(test){                                                                               // 3096
    tests.push(test);                                                                                                 // 3097
  });                                                                                                                 // 3098
                                                                                                                      // 3099
  runner.on('pass', function(test){                                                                                   // 3100
    passes.push(test);                                                                                                // 3101
  });                                                                                                                 // 3102
                                                                                                                      // 3103
  runner.on('fail', function(test){                                                                                   // 3104
    failures.push(test);                                                                                              // 3105
  });                                                                                                                 // 3106
                                                                                                                      // 3107
  runner.on('end', function(){                                                                                        // 3108
    var obj = {                                                                                                       // 3109
        stats: self.stats                                                                                             // 3110
      , tests: tests.map(clean)                                                                                       // 3111
      , failures: failures.map(clean)                                                                                 // 3112
      , passes: passes.map(clean)                                                                                     // 3113
    };                                                                                                                // 3114
                                                                                                                      // 3115
    process.stdout.write(JSON.stringify(obj, null, 2));                                                               // 3116
  });                                                                                                                 // 3117
}                                                                                                                     // 3118
                                                                                                                      // 3119
/**                                                                                                                   // 3120
 * Return a plain-object representation of `test`                                                                     // 3121
 * free of cyclic properties etc.                                                                                     // 3122
 *                                                                                                                    // 3123
 * @param {Object} test                                                                                               // 3124
 * @return {Object}                                                                                                   // 3125
 * @api private                                                                                                       // 3126
 */                                                                                                                   // 3127
                                                                                                                      // 3128
function clean(test) {                                                                                                // 3129
  return {                                                                                                            // 3130
      title: test.title                                                                                               // 3131
    , fullTitle: test.fullTitle()                                                                                     // 3132
    , duration: test.duration                                                                                         // 3133
  }                                                                                                                   // 3134
}                                                                                                                     // 3135
}); // module: reporters/json.js                                                                                      // 3136
                                                                                                                      // 3137
require.register("reporters/landing.js", function(module, exports, require){                                          // 3138
                                                                                                                      // 3139
/**                                                                                                                   // 3140
 * Module dependencies.                                                                                               // 3141
 */                                                                                                                   // 3142
                                                                                                                      // 3143
var Base = require('./base')                                                                                          // 3144
  , cursor = Base.cursor                                                                                              // 3145
  , color = Base.color;                                                                                               // 3146
                                                                                                                      // 3147
/**                                                                                                                   // 3148
 * Expose `Landing`.                                                                                                  // 3149
 */                                                                                                                   // 3150
                                                                                                                      // 3151
exports = module.exports = Landing;                                                                                   // 3152
                                                                                                                      // 3153
/**                                                                                                                   // 3154
 * Airplane color.                                                                                                    // 3155
 */                                                                                                                   // 3156
                                                                                                                      // 3157
Base.colors.plane = 0;                                                                                                // 3158
                                                                                                                      // 3159
/**                                                                                                                   // 3160
 * Airplane crash color.                                                                                              // 3161
 */                                                                                                                   // 3162
                                                                                                                      // 3163
Base.colors['plane crash'] = 31;                                                                                      // 3164
                                                                                                                      // 3165
/**                                                                                                                   // 3166
 * Runway color.                                                                                                      // 3167
 */                                                                                                                   // 3168
                                                                                                                      // 3169
Base.colors.runway = 90;                                                                                              // 3170
                                                                                                                      // 3171
/**                                                                                                                   // 3172
 * Initialize a new `Landing` reporter.                                                                               // 3173
 *                                                                                                                    // 3174
 * @param {Runner} runner                                                                                             // 3175
 * @api public                                                                                                        // 3176
 */                                                                                                                   // 3177
                                                                                                                      // 3178
function Landing(runner) {                                                                                            // 3179
  Base.call(this, runner);                                                                                            // 3180
                                                                                                                      // 3181
  var self = this                                                                                                     // 3182
    , stats = this.stats                                                                                              // 3183
    , width = Base.window.width * .75 | 0                                                                             // 3184
    , total = runner.total                                                                                            // 3185
    , stream = process.stdout                                                                                         // 3186
    , plane = color('plane', '✈')                                                                                     // 3187
    , crashed = -1                                                                                                    // 3188
    , n = 0;                                                                                                          // 3189
                                                                                                                      // 3190
  function runway() {                                                                                                 // 3191
    var buf = Array(width).join('-');                                                                                 // 3192
    return '  ' + color('runway', buf);                                                                               // 3193
  }                                                                                                                   // 3194
                                                                                                                      // 3195
  runner.on('start', function(){                                                                                      // 3196
    stream.write('\n  ');                                                                                             // 3197
    cursor.hide();                                                                                                    // 3198
  });                                                                                                                 // 3199
                                                                                                                      // 3200
  runner.on('test end', function(test){                                                                               // 3201
    // check if the plane crashed                                                                                     // 3202
    var col = -1 == crashed                                                                                           // 3203
      ? width * ++n / total | 0                                                                                       // 3204
      : crashed;                                                                                                      // 3205
                                                                                                                      // 3206
    // show the crash                                                                                                 // 3207
    if ('failed' == test.state) {                                                                                     // 3208
      plane = color('plane crash', '✈');                                                                              // 3209
      crashed = col;                                                                                                  // 3210
    }                                                                                                                 // 3211
                                                                                                                      // 3212
    // render landing strip                                                                                           // 3213
    stream.write('\u001b[4F\n\n');                                                                                    // 3214
    stream.write(runway());                                                                                           // 3215
    stream.write('\n  ');                                                                                             // 3216
    stream.write(color('runway', Array(col).join('⋅')));                                                              // 3217
    stream.write(plane)                                                                                               // 3218
    stream.write(color('runway', Array(width - col).join('⋅') + '\n'));                                               // 3219
    stream.write(runway());                                                                                           // 3220
    stream.write('\u001b[0m');                                                                                        // 3221
  });                                                                                                                 // 3222
                                                                                                                      // 3223
  runner.on('end', function(){                                                                                        // 3224
    cursor.show();                                                                                                    // 3225
    console.log();                                                                                                    // 3226
    self.epilogue();                                                                                                  // 3227
  });                                                                                                                 // 3228
}                                                                                                                     // 3229
                                                                                                                      // 3230
/**                                                                                                                   // 3231
 * Inherit from `Base.prototype`.                                                                                     // 3232
 */                                                                                                                   // 3233
                                                                                                                      // 3234
function F(){};                                                                                                       // 3235
F.prototype = Base.prototype;                                                                                         // 3236
Landing.prototype = new F;                                                                                            // 3237
Landing.prototype.constructor = Landing;                                                                              // 3238
                                                                                                                      // 3239
}); // module: reporters/landing.js                                                                                   // 3240
                                                                                                                      // 3241
require.register("reporters/list.js", function(module, exports, require){                                             // 3242
                                                                                                                      // 3243
/**                                                                                                                   // 3244
 * Module dependencies.                                                                                               // 3245
 */                                                                                                                   // 3246
                                                                                                                      // 3247
var Base = require('./base')                                                                                          // 3248
  , cursor = Base.cursor                                                                                              // 3249
  , color = Base.color;                                                                                               // 3250
                                                                                                                      // 3251
/**                                                                                                                   // 3252
 * Expose `List`.                                                                                                     // 3253
 */                                                                                                                   // 3254
                                                                                                                      // 3255
exports = module.exports = List;                                                                                      // 3256
                                                                                                                      // 3257
/**                                                                                                                   // 3258
 * Initialize a new `List` test reporter.                                                                             // 3259
 *                                                                                                                    // 3260
 * @param {Runner} runner                                                                                             // 3261
 * @api public                                                                                                        // 3262
 */                                                                                                                   // 3263
                                                                                                                      // 3264
function List(runner) {                                                                                               // 3265
  Base.call(this, runner);                                                                                            // 3266
                                                                                                                      // 3267
  var self = this                                                                                                     // 3268
    , stats = this.stats                                                                                              // 3269
    , n = 0;                                                                                                          // 3270
                                                                                                                      // 3271
  runner.on('start', function(){                                                                                      // 3272
    console.log();                                                                                                    // 3273
  });                                                                                                                 // 3274
                                                                                                                      // 3275
  runner.on('test', function(test){                                                                                   // 3276
    process.stdout.write(color('pass', '    ' + test.fullTitle() + ': '));                                            // 3277
  });                                                                                                                 // 3278
                                                                                                                      // 3279
  runner.on('pending', function(test){                                                                                // 3280
    var fmt = color('checkmark', '  -')                                                                               // 3281
      + color('pending', ' %s');                                                                                      // 3282
    console.log(fmt, test.fullTitle());                                                                               // 3283
  });                                                                                                                 // 3284
                                                                                                                      // 3285
  runner.on('pass', function(test){                                                                                   // 3286
    var fmt = color('checkmark', '  '+Base.symbols.dot)                                                               // 3287
      + color('pass', ' %s: ')                                                                                        // 3288
      + color(test.speed, '%dms');                                                                                    // 3289
    cursor.CR();                                                                                                      // 3290
    console.log(fmt, test.fullTitle(), test.duration);                                                                // 3291
  });                                                                                                                 // 3292
                                                                                                                      // 3293
  runner.on('fail', function(test, err){                                                                              // 3294
    cursor.CR();                                                                                                      // 3295
    console.log(color('fail', '  %d) %s'), ++n, test.fullTitle());                                                    // 3296
  });                                                                                                                 // 3297
                                                                                                                      // 3298
  runner.on('end', self.epilogue.bind(self));                                                                         // 3299
}                                                                                                                     // 3300
                                                                                                                      // 3301
/**                                                                                                                   // 3302
 * Inherit from `Base.prototype`.                                                                                     // 3303
 */                                                                                                                   // 3304
                                                                                                                      // 3305
function F(){};                                                                                                       // 3306
F.prototype = Base.prototype;                                                                                         // 3307
List.prototype = new F;                                                                                               // 3308
List.prototype.constructor = List;                                                                                    // 3309
                                                                                                                      // 3310
                                                                                                                      // 3311
}); // module: reporters/list.js                                                                                      // 3312
                                                                                                                      // 3313
require.register("reporters/markdown.js", function(module, exports, require){                                         // 3314
/**                                                                                                                   // 3315
 * Module dependencies.                                                                                               // 3316
 */                                                                                                                   // 3317
                                                                                                                      // 3318
var Base = require('./base')                                                                                          // 3319
  , utils = require('../utils');                                                                                      // 3320
                                                                                                                      // 3321
/**                                                                                                                   // 3322
 * Expose `Markdown`.                                                                                                 // 3323
 */                                                                                                                   // 3324
                                                                                                                      // 3325
exports = module.exports = Markdown;                                                                                  // 3326
                                                                                                                      // 3327
/**                                                                                                                   // 3328
 * Initialize a new `Markdown` reporter.                                                                              // 3329
 *                                                                                                                    // 3330
 * @param {Runner} runner                                                                                             // 3331
 * @api public                                                                                                        // 3332
 */                                                                                                                   // 3333
                                                                                                                      // 3334
function Markdown(runner) {                                                                                           // 3335
  Base.call(this, runner);                                                                                            // 3336
                                                                                                                      // 3337
  var self = this                                                                                                     // 3338
    , stats = this.stats                                                                                              // 3339
    , level = 0                                                                                                       // 3340
    , buf = '';                                                                                                       // 3341
                                                                                                                      // 3342
  function title(str) {                                                                                               // 3343
    return Array(level).join('#') + ' ' + str;                                                                        // 3344
  }                                                                                                                   // 3345
                                                                                                                      // 3346
  function indent() {                                                                                                 // 3347
    return Array(level).join('  ');                                                                                   // 3348
  }                                                                                                                   // 3349
                                                                                                                      // 3350
  function mapTOC(suite, obj) {                                                                                       // 3351
    var ret = obj;                                                                                                    // 3352
    obj = obj[suite.title] = obj[suite.title] || { suite: suite };                                                    // 3353
    suite.suites.forEach(function(suite){                                                                             // 3354
      mapTOC(suite, obj);                                                                                             // 3355
    });                                                                                                               // 3356
    return ret;                                                                                                       // 3357
  }                                                                                                                   // 3358
                                                                                                                      // 3359
  function stringifyTOC(obj, level) {                                                                                 // 3360
    ++level;                                                                                                          // 3361
    var buf = '';                                                                                                     // 3362
    var link;                                                                                                         // 3363
    for (var key in obj) {                                                                                            // 3364
      if ('suite' == key) continue;                                                                                   // 3365
      if (key) link = ' - [' + key + '](#' + utils.slug(obj[key].suite.fullTitle()) + ')\n';                          // 3366
      if (key) buf += Array(level).join('  ') + link;                                                                 // 3367
      buf += stringifyTOC(obj[key], level);                                                                           // 3368
    }                                                                                                                 // 3369
    --level;                                                                                                          // 3370
    return buf;                                                                                                       // 3371
  }                                                                                                                   // 3372
                                                                                                                      // 3373
  function generateTOC(suite) {                                                                                       // 3374
    var obj = mapTOC(suite, {});                                                                                      // 3375
    return stringifyTOC(obj, 0);                                                                                      // 3376
  }                                                                                                                   // 3377
                                                                                                                      // 3378
  generateTOC(runner.suite);                                                                                          // 3379
                                                                                                                      // 3380
  runner.on('suite', function(suite){                                                                                 // 3381
    ++level;                                                                                                          // 3382
    var slug = utils.slug(suite.fullTitle());                                                                         // 3383
    buf += '<a name="' + slug + '"></a>' + '\n';                                                                      // 3384
    buf += title(suite.title) + '\n';                                                                                 // 3385
  });                                                                                                                 // 3386
                                                                                                                      // 3387
  runner.on('suite end', function(suite){                                                                             // 3388
    --level;                                                                                                          // 3389
  });                                                                                                                 // 3390
                                                                                                                      // 3391
  runner.on('pass', function(test){                                                                                   // 3392
    var code = utils.clean(test.fn.toString());                                                                       // 3393
    buf += test.title + '.\n';                                                                                        // 3394
    buf += '\n```js\n';                                                                                               // 3395
    buf += code + '\n';                                                                                               // 3396
    buf += '```\n\n';                                                                                                 // 3397
  });                                                                                                                 // 3398
                                                                                                                      // 3399
  runner.on('end', function(){                                                                                        // 3400
    process.stdout.write('# TOC\n');                                                                                  // 3401
    process.stdout.write(generateTOC(runner.suite));                                                                  // 3402
    process.stdout.write(buf);                                                                                        // 3403
  });                                                                                                                 // 3404
}                                                                                                                     // 3405
}); // module: reporters/markdown.js                                                                                  // 3406
                                                                                                                      // 3407
require.register("reporters/min.js", function(module, exports, require){                                              // 3408
                                                                                                                      // 3409
/**                                                                                                                   // 3410
 * Module dependencies.                                                                                               // 3411
 */                                                                                                                   // 3412
                                                                                                                      // 3413
var Base = require('./base');                                                                                         // 3414
                                                                                                                      // 3415
/**                                                                                                                   // 3416
 * Expose `Min`.                                                                                                      // 3417
 */                                                                                                                   // 3418
                                                                                                                      // 3419
exports = module.exports = Min;                                                                                       // 3420
                                                                                                                      // 3421
/**                                                                                                                   // 3422
 * Initialize a new `Min` minimal test reporter (best used with --watch).                                             // 3423
 *                                                                                                                    // 3424
 * @param {Runner} runner                                                                                             // 3425
 * @api public                                                                                                        // 3426
 */                                                                                                                   // 3427
                                                                                                                      // 3428
function Min(runner) {                                                                                                // 3429
  Base.call(this, runner);                                                                                            // 3430
                                                                                                                      // 3431
  runner.on('start', function(){                                                                                      // 3432
    // clear screen                                                                                                   // 3433
    process.stdout.write('\u001b[2J');                                                                                // 3434
    // set cursor position                                                                                            // 3435
    process.stdout.write('\u001b[1;3H');                                                                              // 3436
  });                                                                                                                 // 3437
                                                                                                                      // 3438
  runner.on('end', this.epilogue.bind(this));                                                                         // 3439
}                                                                                                                     // 3440
                                                                                                                      // 3441
/**                                                                                                                   // 3442
 * Inherit from `Base.prototype`.                                                                                     // 3443
 */                                                                                                                   // 3444
                                                                                                                      // 3445
function F(){};                                                                                                       // 3446
F.prototype = Base.prototype;                                                                                         // 3447
Min.prototype = new F;                                                                                                // 3448
Min.prototype.constructor = Min;                                                                                      // 3449
                                                                                                                      // 3450
                                                                                                                      // 3451
}); // module: reporters/min.js                                                                                       // 3452
                                                                                                                      // 3453
require.register("reporters/nyan.js", function(module, exports, require){                                             // 3454
/**                                                                                                                   // 3455
 * Module dependencies.                                                                                               // 3456
 */                                                                                                                   // 3457
                                                                                                                      // 3458
var Base = require('./base')                                                                                          // 3459
  , color = Base.color;                                                                                               // 3460
                                                                                                                      // 3461
/**                                                                                                                   // 3462
 * Expose `Dot`.                                                                                                      // 3463
 */                                                                                                                   // 3464
                                                                                                                      // 3465
exports = module.exports = NyanCat;                                                                                   // 3466
                                                                                                                      // 3467
/**                                                                                                                   // 3468
 * Initialize a new `Dot` matrix test reporter.                                                                       // 3469
 *                                                                                                                    // 3470
 * @param {Runner} runner                                                                                             // 3471
 * @api public                                                                                                        // 3472
 */                                                                                                                   // 3473
                                                                                                                      // 3474
function NyanCat(runner) {                                                                                            // 3475
  Base.call(this, runner);                                                                                            // 3476
  var self = this                                                                                                     // 3477
    , stats = this.stats                                                                                              // 3478
    , width = Base.window.width * .75 | 0                                                                             // 3479
    , rainbowColors = this.rainbowColors = self.generateColors()                                                      // 3480
    , colorIndex = this.colorIndex = 0                                                                                // 3481
    , numerOfLines = this.numberOfLines = 4                                                                           // 3482
    , trajectories = this.trajectories = [[], [], [], []]                                                             // 3483
    , nyanCatWidth = this.nyanCatWidth = 11                                                                           // 3484
    , trajectoryWidthMax = this.trajectoryWidthMax = (width - nyanCatWidth)                                           // 3485
    , scoreboardWidth = this.scoreboardWidth = 5                                                                      // 3486
    , tick = this.tick = 0                                                                                            // 3487
    , n = 0;                                                                                                          // 3488
                                                                                                                      // 3489
  runner.on('start', function(){                                                                                      // 3490
    Base.cursor.hide();                                                                                               // 3491
    self.draw();                                                                                                      // 3492
  });                                                                                                                 // 3493
                                                                                                                      // 3494
  runner.on('pending', function(test){                                                                                // 3495
    self.draw();                                                                                                      // 3496
  });                                                                                                                 // 3497
                                                                                                                      // 3498
  runner.on('pass', function(test){                                                                                   // 3499
    self.draw();                                                                                                      // 3500
  });                                                                                                                 // 3501
                                                                                                                      // 3502
  runner.on('fail', function(test, err){                                                                              // 3503
    self.draw();                                                                                                      // 3504
  });                                                                                                                 // 3505
                                                                                                                      // 3506
  runner.on('end', function(){                                                                                        // 3507
    Base.cursor.show();                                                                                               // 3508
    for (var i = 0; i < self.numberOfLines; i++) write('\n');                                                         // 3509
    self.epilogue();                                                                                                  // 3510
  });                                                                                                                 // 3511
}                                                                                                                     // 3512
                                                                                                                      // 3513
/**                                                                                                                   // 3514
 * Draw the nyan cat                                                                                                  // 3515
 *                                                                                                                    // 3516
 * @api private                                                                                                       // 3517
 */                                                                                                                   // 3518
                                                                                                                      // 3519
NyanCat.prototype.draw = function(){                                                                                  // 3520
  this.appendRainbow();                                                                                               // 3521
  this.drawScoreboard();                                                                                              // 3522
  this.drawRainbow();                                                                                                 // 3523
  this.drawNyanCat();                                                                                                 // 3524
  this.tick = !this.tick;                                                                                             // 3525
};                                                                                                                    // 3526
                                                                                                                      // 3527
/**                                                                                                                   // 3528
 * Draw the "scoreboard" showing the number                                                                           // 3529
 * of passes, failures and pending tests.                                                                             // 3530
 *                                                                                                                    // 3531
 * @api private                                                                                                       // 3532
 */                                                                                                                   // 3533
                                                                                                                      // 3534
NyanCat.prototype.drawScoreboard = function(){                                                                        // 3535
  var stats = this.stats;                                                                                             // 3536
  var colors = Base.colors;                                                                                           // 3537
                                                                                                                      // 3538
  function draw(color, n) {                                                                                           // 3539
    write(' ');                                                                                                       // 3540
    write('\u001b[' + color + 'm' + n + '\u001b[0m');                                                                 // 3541
    write('\n');                                                                                                      // 3542
  }                                                                                                                   // 3543
                                                                                                                      // 3544
  draw(colors.green, stats.passes);                                                                                   // 3545
  draw(colors.fail, stats.failures);                                                                                  // 3546
  draw(colors.pending, stats.pending);                                                                                // 3547
  write('\n');                                                                                                        // 3548
                                                                                                                      // 3549
  this.cursorUp(this.numberOfLines);                                                                                  // 3550
};                                                                                                                    // 3551
                                                                                                                      // 3552
/**                                                                                                                   // 3553
 * Append the rainbow.                                                                                                // 3554
 *                                                                                                                    // 3555
 * @api private                                                                                                       // 3556
 */                                                                                                                   // 3557
                                                                                                                      // 3558
NyanCat.prototype.appendRainbow = function(){                                                                         // 3559
  var segment = this.tick ? '_' : '-';                                                                                // 3560
  var rainbowified = this.rainbowify(segment);                                                                        // 3561
                                                                                                                      // 3562
  for (var index = 0; index < this.numberOfLines; index++) {                                                          // 3563
    var trajectory = this.trajectories[index];                                                                        // 3564
    if (trajectory.length >= this.trajectoryWidthMax) trajectory.shift();                                             // 3565
    trajectory.push(rainbowified);                                                                                    // 3566
  }                                                                                                                   // 3567
};                                                                                                                    // 3568
                                                                                                                      // 3569
/**                                                                                                                   // 3570
 * Draw the rainbow.                                                                                                  // 3571
 *                                                                                                                    // 3572
 * @api private                                                                                                       // 3573
 */                                                                                                                   // 3574
                                                                                                                      // 3575
NyanCat.prototype.drawRainbow = function(){                                                                           // 3576
  var self = this;                                                                                                    // 3577
                                                                                                                      // 3578
  this.trajectories.forEach(function(line, index) {                                                                   // 3579
    write('\u001b[' + self.scoreboardWidth + 'C');                                                                    // 3580
    write(line.join(''));                                                                                             // 3581
    write('\n');                                                                                                      // 3582
  });                                                                                                                 // 3583
                                                                                                                      // 3584
  this.cursorUp(this.numberOfLines);                                                                                  // 3585
};                                                                                                                    // 3586
                                                                                                                      // 3587
/**                                                                                                                   // 3588
 * Draw the nyan cat                                                                                                  // 3589
 *                                                                                                                    // 3590
 * @api private                                                                                                       // 3591
 */                                                                                                                   // 3592
                                                                                                                      // 3593
NyanCat.prototype.drawNyanCat = function() {                                                                          // 3594
  var self = this;                                                                                                    // 3595
  var startWidth = this.scoreboardWidth + this.trajectories[0].length;                                                // 3596
  var color = '\u001b[' + startWidth + 'C';                                                                           // 3597
  var padding = '';                                                                                                   // 3598
                                                                                                                      // 3599
  write(color);                                                                                                       // 3600
  write('_,------,');                                                                                                 // 3601
  write('\n');                                                                                                        // 3602
                                                                                                                      // 3603
  write(color);                                                                                                       // 3604
  padding = self.tick ? '  ' : '   ';                                                                                 // 3605
  write('_|' + padding + '/\\_/\\ ');                                                                                 // 3606
  write('\n');                                                                                                        // 3607
                                                                                                                      // 3608
  write(color);                                                                                                       // 3609
  padding = self.tick ? '_' : '__';                                                                                   // 3610
  var tail = self.tick ? '~' : '^';                                                                                   // 3611
  var face;                                                                                                           // 3612
  write(tail + '|' + padding + this.face() + ' ');                                                                    // 3613
  write('\n');                                                                                                        // 3614
                                                                                                                      // 3615
  write(color);                                                                                                       // 3616
  padding = self.tick ? ' ' : '  ';                                                                                   // 3617
  write(padding + '""  "" ');                                                                                         // 3618
  write('\n');                                                                                                        // 3619
                                                                                                                      // 3620
  this.cursorUp(this.numberOfLines);                                                                                  // 3621
};                                                                                                                    // 3622
                                                                                                                      // 3623
/**                                                                                                                   // 3624
 * Draw nyan cat face.                                                                                                // 3625
 *                                                                                                                    // 3626
 * @return {String}                                                                                                   // 3627
 * @api private                                                                                                       // 3628
 */                                                                                                                   // 3629
                                                                                                                      // 3630
NyanCat.prototype.face = function() {                                                                                 // 3631
  var stats = this.stats;                                                                                             // 3632
  if (stats.failures) {                                                                                               // 3633
    return '( x .x)';                                                                                                 // 3634
  } else if (stats.pending) {                                                                                         // 3635
    return '( o .o)';                                                                                                 // 3636
  } else if(stats.passes) {                                                                                           // 3637
    return '( ^ .^)';                                                                                                 // 3638
  } else {                                                                                                            // 3639
    return '( - .-)';                                                                                                 // 3640
  }                                                                                                                   // 3641
}                                                                                                                     // 3642
                                                                                                                      // 3643
/**                                                                                                                   // 3644
 * Move cursor up `n`.                                                                                                // 3645
 *                                                                                                                    // 3646
 * @param {Number} n                                                                                                  // 3647
 * @api private                                                                                                       // 3648
 */                                                                                                                   // 3649
                                                                                                                      // 3650
NyanCat.prototype.cursorUp = function(n) {                                                                            // 3651
  write('\u001b[' + n + 'A');                                                                                         // 3652
};                                                                                                                    // 3653
                                                                                                                      // 3654
/**                                                                                                                   // 3655
 * Move cursor down `n`.                                                                                              // 3656
 *                                                                                                                    // 3657
 * @param {Number} n                                                                                                  // 3658
 * @api private                                                                                                       // 3659
 */                                                                                                                   // 3660
                                                                                                                      // 3661
NyanCat.prototype.cursorDown = function(n) {                                                                          // 3662
  write('\u001b[' + n + 'B');                                                                                         // 3663
};                                                                                                                    // 3664
                                                                                                                      // 3665
/**                                                                                                                   // 3666
 * Generate rainbow colors.                                                                                           // 3667
 *                                                                                                                    // 3668
 * @return {Array}                                                                                                    // 3669
 * @api private                                                                                                       // 3670
 */                                                                                                                   // 3671
                                                                                                                      // 3672
NyanCat.prototype.generateColors = function(){                                                                        // 3673
  var colors = [];                                                                                                    // 3674
                                                                                                                      // 3675
  for (var i = 0; i < (6 * 7); i++) {                                                                                 // 3676
    var pi3 = Math.floor(Math.PI / 3);                                                                                // 3677
    var n = (i * (1.0 / 6));                                                                                          // 3678
    var r = Math.floor(3 * Math.sin(n) + 3);                                                                          // 3679
    var g = Math.floor(3 * Math.sin(n + 2 * pi3) + 3);                                                                // 3680
    var b = Math.floor(3 * Math.sin(n + 4 * pi3) + 3);                                                                // 3681
    colors.push(36 * r + 6 * g + b + 16);                                                                             // 3682
  }                                                                                                                   // 3683
                                                                                                                      // 3684
  return colors;                                                                                                      // 3685
};                                                                                                                    // 3686
                                                                                                                      // 3687
/**                                                                                                                   // 3688
 * Apply rainbow to the given `str`.                                                                                  // 3689
 *                                                                                                                    // 3690
 * @param {String} str                                                                                                // 3691
 * @return {String}                                                                                                   // 3692
 * @api private                                                                                                       // 3693
 */                                                                                                                   // 3694
                                                                                                                      // 3695
NyanCat.prototype.rainbowify = function(str){                                                                         // 3696
  var color = this.rainbowColors[this.colorIndex % this.rainbowColors.length];                                        // 3697
  this.colorIndex += 1;                                                                                               // 3698
  return '\u001b[38;5;' + color + 'm' + str + '\u001b[0m';                                                            // 3699
};                                                                                                                    // 3700
                                                                                                                      // 3701
/**                                                                                                                   // 3702
 * Stdout helper.                                                                                                     // 3703
 */                                                                                                                   // 3704
                                                                                                                      // 3705
function write(string) {                                                                                              // 3706
  process.stdout.write(string);                                                                                       // 3707
}                                                                                                                     // 3708
                                                                                                                      // 3709
/**                                                                                                                   // 3710
 * Inherit from `Base.prototype`.                                                                                     // 3711
 */                                                                                                                   // 3712
                                                                                                                      // 3713
function F(){};                                                                                                       // 3714
F.prototype = Base.prototype;                                                                                         // 3715
NyanCat.prototype = new F;                                                                                            // 3716
NyanCat.prototype.constructor = NyanCat;                                                                              // 3717
                                                                                                                      // 3718
                                                                                                                      // 3719
}); // module: reporters/nyan.js                                                                                      // 3720
                                                                                                                      // 3721
require.register("reporters/progress.js", function(module, exports, require){                                         // 3722
                                                                                                                      // 3723
/**                                                                                                                   // 3724
 * Module dependencies.                                                                                               // 3725
 */                                                                                                                   // 3726
                                                                                                                      // 3727
var Base = require('./base')                                                                                          // 3728
  , cursor = Base.cursor                                                                                              // 3729
  , color = Base.color;                                                                                               // 3730
                                                                                                                      // 3731
/**                                                                                                                   // 3732
 * Expose `Progress`.                                                                                                 // 3733
 */                                                                                                                   // 3734
                                                                                                                      // 3735
exports = module.exports = Progress;                                                                                  // 3736
                                                                                                                      // 3737
/**                                                                                                                   // 3738
 * General progress bar color.                                                                                        // 3739
 */                                                                                                                   // 3740
                                                                                                                      // 3741
Base.colors.progress = 90;                                                                                            // 3742
                                                                                                                      // 3743
/**                                                                                                                   // 3744
 * Initialize a new `Progress` bar test reporter.                                                                     // 3745
 *                                                                                                                    // 3746
 * @param {Runner} runner                                                                                             // 3747
 * @param {Object} options                                                                                            // 3748
 * @api public                                                                                                        // 3749
 */                                                                                                                   // 3750
                                                                                                                      // 3751
function Progress(runner, options) {                                                                                  // 3752
  Base.call(this, runner);                                                                                            // 3753
                                                                                                                      // 3754
  var self = this                                                                                                     // 3755
    , options = options || {}                                                                                         // 3756
    , stats = this.stats                                                                                              // 3757
    , width = Base.window.width * .50 | 0                                                                             // 3758
    , total = runner.total                                                                                            // 3759
    , complete = 0                                                                                                    // 3760
    , max = Math.max;                                                                                                 // 3761
                                                                                                                      // 3762
  // default chars                                                                                                    // 3763
  options.open = options.open || '[';                                                                                 // 3764
  options.complete = options.complete || '▬';                                                                         // 3765
  options.incomplete = options.incomplete || Base.symbols.dot;                                                        // 3766
  options.close = options.close || ']';                                                                               // 3767
  options.verbose = false;                                                                                            // 3768
                                                                                                                      // 3769
  // tests started                                                                                                    // 3770
  runner.on('start', function(){                                                                                      // 3771
    console.log();                                                                                                    // 3772
    cursor.hide();                                                                                                    // 3773
  });                                                                                                                 // 3774
                                                                                                                      // 3775
  // tests complete                                                                                                   // 3776
  runner.on('test end', function(){                                                                                   // 3777
    complete++;                                                                                                       // 3778
    var incomplete = total - complete                                                                                 // 3779
      , percent = complete / total                                                                                    // 3780
      , n = width * percent | 0                                                                                       // 3781
      , i = width - n;                                                                                                // 3782
                                                                                                                      // 3783
    cursor.CR();                                                                                                      // 3784
    process.stdout.write('\u001b[J');                                                                                 // 3785
    process.stdout.write(color('progress', '  ' + options.open));                                                     // 3786
    process.stdout.write(Array(n).join(options.complete));                                                            // 3787
    process.stdout.write(Array(i).join(options.incomplete));                                                          // 3788
    process.stdout.write(color('progress', options.close));                                                           // 3789
    if (options.verbose) {                                                                                            // 3790
      process.stdout.write(color('progress', ' ' + complete + ' of ' + total));                                       // 3791
    }                                                                                                                 // 3792
  });                                                                                                                 // 3793
                                                                                                                      // 3794
  // tests are complete, output some stats                                                                            // 3795
  // and the failures if any                                                                                          // 3796
  runner.on('end', function(){                                                                                        // 3797
    cursor.show();                                                                                                    // 3798
    console.log();                                                                                                    // 3799
    self.epilogue();                                                                                                  // 3800
  });                                                                                                                 // 3801
}                                                                                                                     // 3802
                                                                                                                      // 3803
/**                                                                                                                   // 3804
 * Inherit from `Base.prototype`.                                                                                     // 3805
 */                                                                                                                   // 3806
                                                                                                                      // 3807
function F(){};                                                                                                       // 3808
F.prototype = Base.prototype;                                                                                         // 3809
Progress.prototype = new F;                                                                                           // 3810
Progress.prototype.constructor = Progress;                                                                            // 3811
                                                                                                                      // 3812
                                                                                                                      // 3813
}); // module: reporters/progress.js                                                                                  // 3814
                                                                                                                      // 3815
require.register("reporters/spec.js", function(module, exports, require){                                             // 3816
                                                                                                                      // 3817
/**                                                                                                                   // 3818
 * Module dependencies.                                                                                               // 3819
 */                                                                                                                   // 3820
                                                                                                                      // 3821
var Base = require('./base')                                                                                          // 3822
  , cursor = Base.cursor                                                                                              // 3823
  , color = Base.color;                                                                                               // 3824
                                                                                                                      // 3825
/**                                                                                                                   // 3826
 * Expose `Spec`.                                                                                                     // 3827
 */                                                                                                                   // 3828
                                                                                                                      // 3829
exports = module.exports = Spec;                                                                                      // 3830
                                                                                                                      // 3831
/**                                                                                                                   // 3832
 * Initialize a new `Spec` test reporter.                                                                             // 3833
 *                                                                                                                    // 3834
 * @param {Runner} runner                                                                                             // 3835
 * @api public                                                                                                        // 3836
 */                                                                                                                   // 3837
                                                                                                                      // 3838
function Spec(runner) {                                                                                               // 3839
  Base.call(this, runner);                                                                                            // 3840
                                                                                                                      // 3841
  var self = this                                                                                                     // 3842
    , stats = this.stats                                                                                              // 3843
    , indents = 0                                                                                                     // 3844
    , n = 0;                                                                                                          // 3845
                                                                                                                      // 3846
  function indent() {                                                                                                 // 3847
    return Array(indents).join('  ')                                                                                  // 3848
  }                                                                                                                   // 3849
                                                                                                                      // 3850
  runner.on('start', function(){                                                                                      // 3851
    console.log();                                                                                                    // 3852
  });                                                                                                                 // 3853
                                                                                                                      // 3854
  runner.on('suite', function(suite){                                                                                 // 3855
    ++indents;                                                                                                        // 3856
    console.log(color('suite', '%s%s'), indent(), suite.title);                                                       // 3857
  });                                                                                                                 // 3858
                                                                                                                      // 3859
  runner.on('suite end', function(suite){                                                                             // 3860
    --indents;                                                                                                        // 3861
    if (1 == indents) console.log();                                                                                  // 3862
  });                                                                                                                 // 3863
                                                                                                                      // 3864
  runner.on('pending', function(test){                                                                                // 3865
    var fmt = indent() + color('pending', '  - %s');                                                                  // 3866
    console.log(fmt, test.title);                                                                                     // 3867
  });                                                                                                                 // 3868
                                                                                                                      // 3869
  runner.on('pass', function(test){                                                                                   // 3870
    if ('fast' == test.speed) {                                                                                       // 3871
      var fmt = indent()                                                                                              // 3872
        + color('checkmark', '  ' + Base.symbols.ok)                                                                  // 3873
        + color('pass', ' %s ');                                                                                      // 3874
      cursor.CR();                                                                                                    // 3875
      console.log(fmt, test.title);                                                                                   // 3876
    } else {                                                                                                          // 3877
      var fmt = indent()                                                                                              // 3878
        + color('checkmark', '  ' + Base.symbols.ok)                                                                  // 3879
        + color('pass', ' %s ')                                                                                       // 3880
        + color(test.speed, '(%dms)');                                                                                // 3881
      cursor.CR();                                                                                                    // 3882
      console.log(fmt, test.title, test.duration);                                                                    // 3883
    }                                                                                                                 // 3884
  });                                                                                                                 // 3885
                                                                                                                      // 3886
  runner.on('fail', function(test, err){                                                                              // 3887
    cursor.CR();                                                                                                      // 3888
    console.log(indent() + color('fail', '  %d) %s'), ++n, test.title);                                               // 3889
  });                                                                                                                 // 3890
                                                                                                                      // 3891
  runner.on('end', self.epilogue.bind(self));                                                                         // 3892
}                                                                                                                     // 3893
                                                                                                                      // 3894
/**                                                                                                                   // 3895
 * Inherit from `Base.prototype`.                                                                                     // 3896
 */                                                                                                                   // 3897
                                                                                                                      // 3898
function F(){};                                                                                                       // 3899
F.prototype = Base.prototype;                                                                                         // 3900
Spec.prototype = new F;                                                                                               // 3901
Spec.prototype.constructor = Spec;                                                                                    // 3902
                                                                                                                      // 3903
                                                                                                                      // 3904
}); // module: reporters/spec.js                                                                                      // 3905
                                                                                                                      // 3906
require.register("reporters/tap.js", function(module, exports, require){                                              // 3907
                                                                                                                      // 3908
/**                                                                                                                   // 3909
 * Module dependencies.                                                                                               // 3910
 */                                                                                                                   // 3911
                                                                                                                      // 3912
var Base = require('./base')                                                                                          // 3913
  , cursor = Base.cursor                                                                                              // 3914
  , color = Base.color;                                                                                               // 3915
                                                                                                                      // 3916
/**                                                                                                                   // 3917
 * Expose `TAP`.                                                                                                      // 3918
 */                                                                                                                   // 3919
                                                                                                                      // 3920
exports = module.exports = TAP;                                                                                       // 3921
                                                                                                                      // 3922
/**                                                                                                                   // 3923
 * Initialize a new `TAP` reporter.                                                                                   // 3924
 *                                                                                                                    // 3925
 * @param {Runner} runner                                                                                             // 3926
 * @api public                                                                                                        // 3927
 */                                                                                                                   // 3928
                                                                                                                      // 3929
function TAP(runner) {                                                                                                // 3930
  Base.call(this, runner);                                                                                            // 3931
                                                                                                                      // 3932
  var self = this                                                                                                     // 3933
    , stats = this.stats                                                                                              // 3934
    , n = 1                                                                                                           // 3935
    , passes = 0                                                                                                      // 3936
    , failures = 0;                                                                                                   // 3937
                                                                                                                      // 3938
  runner.on('start', function(){                                                                                      // 3939
    var total = runner.grepTotal(runner.suite);                                                                       // 3940
    console.log('%d..%d', 1, total);                                                                                  // 3941
  });                                                                                                                 // 3942
                                                                                                                      // 3943
  runner.on('test end', function(){                                                                                   // 3944
    ++n;                                                                                                              // 3945
  });                                                                                                                 // 3946
                                                                                                                      // 3947
  runner.on('pending', function(test){                                                                                // 3948
    console.log('ok %d %s # SKIP -', n, title(test));                                                                 // 3949
  });                                                                                                                 // 3950
                                                                                                                      // 3951
  runner.on('pass', function(test){                                                                                   // 3952
    passes++;                                                                                                         // 3953
    console.log('ok %d %s', n, title(test));                                                                          // 3954
  });                                                                                                                 // 3955
                                                                                                                      // 3956
  runner.on('fail', function(test, err){                                                                              // 3957
    failures++;                                                                                                       // 3958
    console.log('not ok %d %s', n, title(test));                                                                      // 3959
    if (err.stack) console.log(err.stack.replace(/^/gm, '  '));                                                       // 3960
  });                                                                                                                 // 3961
                                                                                                                      // 3962
  runner.on('end', function(){                                                                                        // 3963
    console.log('# tests ' + (passes + failures));                                                                    // 3964
    console.log('# pass ' + passes);                                                                                  // 3965
    console.log('# fail ' + failures);                                                                                // 3966
  });                                                                                                                 // 3967
}                                                                                                                     // 3968
                                                                                                                      // 3969
/**                                                                                                                   // 3970
 * Return a TAP-safe title of `test`                                                                                  // 3971
 *                                                                                                                    // 3972
 * @param {Object} test                                                                                               // 3973
 * @return {String}                                                                                                   // 3974
 * @api private                                                                                                       // 3975
 */                                                                                                                   // 3976
                                                                                                                      // 3977
function title(test) {                                                                                                // 3978
  return test.fullTitle().replace(/#/g, '');                                                                          // 3979
}                                                                                                                     // 3980
                                                                                                                      // 3981
}); // module: reporters/tap.js                                                                                       // 3982
                                                                                                                      // 3983
require.register("reporters/xunit.js", function(module, exports, require){                                            // 3984
                                                                                                                      // 3985
/**                                                                                                                   // 3986
 * Module dependencies.                                                                                               // 3987
 */                                                                                                                   // 3988
                                                                                                                      // 3989
var Base = require('./base')                                                                                          // 3990
  , utils = require('../utils')                                                                                       // 3991
  , escape = utils.escape;                                                                                            // 3992
                                                                                                                      // 3993
/**                                                                                                                   // 3994
 * Save timer references to avoid Sinon interfering (see GH-237).                                                     // 3995
 */                                                                                                                   // 3996
                                                                                                                      // 3997
var Date = global.Date                                                                                                // 3998
  , setTimeout = global.setTimeout                                                                                    // 3999
  , setInterval = global.setInterval                                                                                  // 4000
  , clearTimeout = global.clearTimeout                                                                                // 4001
  , clearInterval = global.clearInterval;                                                                             // 4002
                                                                                                                      // 4003
/**                                                                                                                   // 4004
 * Expose `XUnit`.                                                                                                    // 4005
 */                                                                                                                   // 4006
                                                                                                                      // 4007
exports = module.exports = XUnit;                                                                                     // 4008
                                                                                                                      // 4009
/**                                                                                                                   // 4010
 * Initialize a new `XUnit` reporter.                                                                                 // 4011
 *                                                                                                                    // 4012
 * @param {Runner} runner                                                                                             // 4013
 * @api public                                                                                                        // 4014
 */                                                                                                                   // 4015
                                                                                                                      // 4016
function XUnit(runner) {                                                                                              // 4017
  Base.call(this, runner);                                                                                            // 4018
  var stats = this.stats                                                                                              // 4019
    , tests = []                                                                                                      // 4020
    , self = this;                                                                                                    // 4021
                                                                                                                      // 4022
  runner.on('pending', function(test){                                                                                // 4023
    tests.push(test);                                                                                                 // 4024
  });                                                                                                                 // 4025
                                                                                                                      // 4026
  runner.on('pass', function(test){                                                                                   // 4027
    tests.push(test);                                                                                                 // 4028
  });                                                                                                                 // 4029
                                                                                                                      // 4030
  runner.on('fail', function(test){                                                                                   // 4031
    tests.push(test);                                                                                                 // 4032
  });                                                                                                                 // 4033
                                                                                                                      // 4034
  runner.on('end', function(){                                                                                        // 4035
    console.log(tag('testsuite', {                                                                                    // 4036
        name: 'Mocha Tests'                                                                                           // 4037
      , tests: stats.tests                                                                                            // 4038
      , failures: stats.failures                                                                                      // 4039
      , errors: stats.failures                                                                                        // 4040
      , skipped: stats.tests - stats.failures - stats.passes                                                          // 4041
      , timestamp: (new Date).toUTCString()                                                                           // 4042
      , time: (stats.duration / 1000) || 0                                                                            // 4043
    }, false));                                                                                                       // 4044
                                                                                                                      // 4045
    tests.forEach(test);                                                                                              // 4046
    console.log('</testsuite>');                                                                                      // 4047
  });                                                                                                                 // 4048
}                                                                                                                     // 4049
                                                                                                                      // 4050
/**                                                                                                                   // 4051
 * Inherit from `Base.prototype`.                                                                                     // 4052
 */                                                                                                                   // 4053
                                                                                                                      // 4054
function F(){};                                                                                                       // 4055
F.prototype = Base.prototype;                                                                                         // 4056
XUnit.prototype = new F;                                                                                              // 4057
XUnit.prototype.constructor = XUnit;                                                                                  // 4058
                                                                                                                      // 4059
                                                                                                                      // 4060
/**                                                                                                                   // 4061
 * Output tag for the given `test.`                                                                                   // 4062
 */                                                                                                                   // 4063
                                                                                                                      // 4064
function test(test) {                                                                                                 // 4065
  var attrs = {                                                                                                       // 4066
      classname: test.parent.fullTitle()                                                                              // 4067
    , name: test.title                                                                                                // 4068
    , time: (test.duration / 1000) || 0                                                                               // 4069
  };                                                                                                                  // 4070
                                                                                                                      // 4071
  if ('failed' == test.state) {                                                                                       // 4072
    var err = test.err;                                                                                               // 4073
    attrs.message = escape(err.message);                                                                              // 4074
    console.log(tag('testcase', attrs, false, tag('failure', attrs, false, cdata(err.stack))));                       // 4075
  } else if (test.pending) {                                                                                          // 4076
    console.log(tag('testcase', attrs, false, tag('skipped', {}, true)));                                             // 4077
  } else {                                                                                                            // 4078
    console.log(tag('testcase', attrs, true) );                                                                       // 4079
  }                                                                                                                   // 4080
}                                                                                                                     // 4081
                                                                                                                      // 4082
/**                                                                                                                   // 4083
 * HTML tag helper.                                                                                                   // 4084
 */                                                                                                                   // 4085
                                                                                                                      // 4086
function tag(name, attrs, close, content) {                                                                           // 4087
  var end = close ? '/>' : '>'                                                                                        // 4088
    , pairs = []                                                                                                      // 4089
    , tag;                                                                                                            // 4090
                                                                                                                      // 4091
  for (var key in attrs) {                                                                                            // 4092
    pairs.push(key + '="' + escape(attrs[key]) + '"');                                                                // 4093
  }                                                                                                                   // 4094
                                                                                                                      // 4095
  tag = '<' + name + (pairs.length ? ' ' + pairs.join(' ') : '') + end;                                               // 4096
  if (content) tag += content + '</' + name + end;                                                                    // 4097
  return tag;                                                                                                         // 4098
}                                                                                                                     // 4099
                                                                                                                      // 4100
/**                                                                                                                   // 4101
 * Return cdata escaped CDATA `str`.                                                                                  // 4102
 */                                                                                                                   // 4103
                                                                                                                      // 4104
function cdata(str) {                                                                                                 // 4105
  return '<![CDATA[' + escape(str) + ']]>';                                                                           // 4106
}                                                                                                                     // 4107
                                                                                                                      // 4108
}); // module: reporters/xunit.js                                                                                     // 4109
                                                                                                                      // 4110
require.register("runnable.js", function(module, exports, require){                                                   // 4111
                                                                                                                      // 4112
/**                                                                                                                   // 4113
 * Module dependencies.                                                                                               // 4114
 */                                                                                                                   // 4115
                                                                                                                      // 4116
var EventEmitter = require('browser/events').EventEmitter                                                             // 4117
  , debug = require('browser/debug')('mocha:runnable')                                                                // 4118
  , milliseconds = require('./ms');                                                                                   // 4119
                                                                                                                      // 4120
/**                                                                                                                   // 4121
 * Save timer references to avoid Sinon interfering (see GH-237).                                                     // 4122
 */                                                                                                                   // 4123
                                                                                                                      // 4124
var Date = global.Date                                                                                                // 4125
  , setTimeout = global.setTimeout                                                                                    // 4126
  , setInterval = global.setInterval                                                                                  // 4127
  , clearTimeout = global.clearTimeout                                                                                // 4128
  , clearInterval = global.clearInterval;                                                                             // 4129
                                                                                                                      // 4130
/**                                                                                                                   // 4131
 * Object#toString().                                                                                                 // 4132
 */                                                                                                                   // 4133
                                                                                                                      // 4134
var toString = Object.prototype.toString;                                                                             // 4135
                                                                                                                      // 4136
/**                                                                                                                   // 4137
 * Expose `Runnable`.                                                                                                 // 4138
 */                                                                                                                   // 4139
                                                                                                                      // 4140
module.exports = Runnable;                                                                                            // 4141
                                                                                                                      // 4142
/**                                                                                                                   // 4143
 * Initialize a new `Runnable` with the given `title` and callback `fn`.                                              // 4144
 *                                                                                                                    // 4145
 * @param {String} title                                                                                              // 4146
 * @param {Function} fn                                                                                               // 4147
 * @api private                                                                                                       // 4148
 */                                                                                                                   // 4149
                                                                                                                      // 4150
function Runnable(title, fn) {                                                                                        // 4151
  this.title = title;                                                                                                 // 4152
  this.fn = fn;                                                                                                       // 4153
  this.async = fn && fn.length;                                                                                       // 4154
  this.sync = ! this.async;                                                                                           // 4155
  this._timeout = 2000;                                                                                               // 4156
  this._slow = 75;                                                                                                    // 4157
  this.timedOut = false;                                                                                              // 4158
}                                                                                                                     // 4159
                                                                                                                      // 4160
/**                                                                                                                   // 4161
 * Inherit from `EventEmitter.prototype`.                                                                             // 4162
 */                                                                                                                   // 4163
                                                                                                                      // 4164
function F(){};                                                                                                       // 4165
F.prototype = EventEmitter.prototype;                                                                                 // 4166
Runnable.prototype = new F;                                                                                           // 4167
Runnable.prototype.constructor = Runnable;                                                                            // 4168
                                                                                                                      // 4169
                                                                                                                      // 4170
/**                                                                                                                   // 4171
 * Set & get timeout `ms`.                                                                                            // 4172
 *                                                                                                                    // 4173
 * @param {Number|String} ms                                                                                          // 4174
 * @return {Runnable|Number} ms or self                                                                               // 4175
 * @api private                                                                                                       // 4176
 */                                                                                                                   // 4177
                                                                                                                      // 4178
Runnable.prototype.timeout = function(ms){                                                                            // 4179
  if (0 == arguments.length) return this._timeout;                                                                    // 4180
  if ('string' == typeof ms) ms = milliseconds(ms);                                                                   // 4181
  debug('timeout %d', ms);                                                                                            // 4182
  this._timeout = ms;                                                                                                 // 4183
  if (this.timer) this.resetTimeout();                                                                                // 4184
  return this;                                                                                                        // 4185
};                                                                                                                    // 4186
                                                                                                                      // 4187
/**                                                                                                                   // 4188
 * Set & get slow `ms`.                                                                                               // 4189
 *                                                                                                                    // 4190
 * @param {Number|String} ms                                                                                          // 4191
 * @return {Runnable|Number} ms or self                                                                               // 4192
 * @api private                                                                                                       // 4193
 */                                                                                                                   // 4194
                                                                                                                      // 4195
Runnable.prototype.slow = function(ms){                                                                               // 4196
  if (0 === arguments.length) return this._slow;                                                                      // 4197
  if ('string' == typeof ms) ms = milliseconds(ms);                                                                   // 4198
  debug('timeout %d', ms);                                                                                            // 4199
  this._slow = ms;                                                                                                    // 4200
  return this;                                                                                                        // 4201
};                                                                                                                    // 4202
                                                                                                                      // 4203
/**                                                                                                                   // 4204
 * Return the full title generated by recursively                                                                     // 4205
 * concatenating the parent's full title.                                                                             // 4206
 *                                                                                                                    // 4207
 * @return {String}                                                                                                   // 4208
 * @api public                                                                                                        // 4209
 */                                                                                                                   // 4210
                                                                                                                      // 4211
Runnable.prototype.fullTitle = function(){                                                                            // 4212
  return this.parent.fullTitle() + ' ' + this.title;                                                                  // 4213
};                                                                                                                    // 4214
                                                                                                                      // 4215
/**                                                                                                                   // 4216
 * Clear the timeout.                                                                                                 // 4217
 *                                                                                                                    // 4218
 * @api private                                                                                                       // 4219
 */                                                                                                                   // 4220
                                                                                                                      // 4221
Runnable.prototype.clearTimeout = function(){                                                                         // 4222
  clearTimeout(this.timer);                                                                                           // 4223
};                                                                                                                    // 4224
                                                                                                                      // 4225
/**                                                                                                                   // 4226
 * Inspect the runnable void of private properties.                                                                   // 4227
 *                                                                                                                    // 4228
 * @return {String}                                                                                                   // 4229
 * @api private                                                                                                       // 4230
 */                                                                                                                   // 4231
                                                                                                                      // 4232
Runnable.prototype.inspect = function(){                                                                              // 4233
  return JSON.stringify(this, function(key, val){                                                                     // 4234
    if ('_' == key[0]) return;                                                                                        // 4235
    if ('parent' == key) return '#<Suite>';                                                                           // 4236
    if ('ctx' == key) return '#<Context>';                                                                            // 4237
    return val;                                                                                                       // 4238
  }, 2);                                                                                                              // 4239
};                                                                                                                    // 4240
                                                                                                                      // 4241
/**                                                                                                                   // 4242
 * Reset the timeout.                                                                                                 // 4243
 *                                                                                                                    // 4244
 * @api private                                                                                                       // 4245
 */                                                                                                                   // 4246
                                                                                                                      // 4247
Runnable.prototype.resetTimeout = function(){                                                                         // 4248
  var self = this;                                                                                                    // 4249
  var ms = this.timeout() || 1e9;                                                                                     // 4250
                                                                                                                      // 4251
  this.clearTimeout();                                                                                                // 4252
  this.timer = setTimeout(function(){                                                                                 // 4253
    self.callback(new Error('timeout of ' + ms + 'ms exceeded'));                                                     // 4254
    self.timedOut = true;                                                                                             // 4255
  }, ms);                                                                                                             // 4256
};                                                                                                                    // 4257
                                                                                                                      // 4258
/**                                                                                                                   // 4259
 * Whitelist these globals for this test run                                                                          // 4260
 *                                                                                                                    // 4261
 * @api private                                                                                                       // 4262
 */                                                                                                                   // 4263
Runnable.prototype.globals = function(arr){                                                                           // 4264
  var self = this;                                                                                                    // 4265
  this._allowedGlobals = arr;                                                                                         // 4266
};                                                                                                                    // 4267
                                                                                                                      // 4268
/**                                                                                                                   // 4269
 * Run the test and invoke `fn(err)`.                                                                                 // 4270
 *                                                                                                                    // 4271
 * @param {Function} fn                                                                                               // 4272
 * @api private                                                                                                       // 4273
 */                                                                                                                   // 4274
                                                                                                                      // 4275
Runnable.prototype.run = function(fn){                                                                                // 4276
  var self = this                                                                                                     // 4277
    , ms = this.timeout()                                                                                             // 4278
    , start = new Date                                                                                                // 4279
    , ctx = this.ctx                                                                                                  // 4280
    , finished                                                                                                        // 4281
    , emitted;                                                                                                        // 4282
                                                                                                                      // 4283
  if (ctx) ctx.runnable(this);                                                                                        // 4284
                                                                                                                      // 4285
  // timeout                                                                                                          // 4286
  if (this.async) {                                                                                                   // 4287
    if (ms) {                                                                                                         // 4288
      this.timer = setTimeout(function(){                                                                             // 4289
        done(new Error('timeout of ' + ms + 'ms exceeded'));                                                          // 4290
        self.timedOut = true;                                                                                         // 4291
      }, ms);                                                                                                         // 4292
    }                                                                                                                 // 4293
  }                                                                                                                   // 4294
                                                                                                                      // 4295
  // called multiple times                                                                                            // 4296
  function multiple(err) {                                                                                            // 4297
    if (emitted) return;                                                                                              // 4298
    emitted = true;                                                                                                   // 4299
    self.emit('error', err || new Error('done() called multiple times'));                                             // 4300
  }                                                                                                                   // 4301
                                                                                                                      // 4302
  // finished                                                                                                         // 4303
  function done(err) {                                                                                                // 4304
    if (self.timedOut) return;                                                                                        // 4305
    if (finished) return multiple(err);                                                                               // 4306
    self.clearTimeout();                                                                                              // 4307
    self.duration = new Date - start;                                                                                 // 4308
    finished = true;                                                                                                  // 4309
    fn(err);                                                                                                          // 4310
  }                                                                                                                   // 4311
                                                                                                                      // 4312
  // for .resetTimeout()                                                                                              // 4313
  this.callback = done;                                                                                               // 4314
                                                                                                                      // 4315
  // async                                                                                                            // 4316
  if (this.async) {                                                                                                   // 4317
    try {                                                                                                             // 4318
      this.fn.call(ctx, function(err){                                                                                // 4319
        if (err instanceof Error || toString.call(err) === "[object Error]") return done(err);                        // 4320
        if (null != err) return done(new Error('done() invoked with non-Error: ' + err));                             // 4321
        done();                                                                                                       // 4322
      });                                                                                                             // 4323
    } catch (err) {                                                                                                   // 4324
      done(err);                                                                                                      // 4325
    }                                                                                                                 // 4326
    return;                                                                                                           // 4327
  }                                                                                                                   // 4328
                                                                                                                      // 4329
  if (this.asyncOnly) {                                                                                               // 4330
    return done(new Error('--async-only option in use without declaring `done()`'));                                  // 4331
  }                                                                                                                   // 4332
                                                                                                                      // 4333
  // sync                                                                                                             // 4334
  try {                                                                                                               // 4335
    if (!this.pending) this.fn.call(ctx);                                                                             // 4336
    this.duration = new Date - start;                                                                                 // 4337
    fn();                                                                                                             // 4338
  } catch (err) {                                                                                                     // 4339
    fn(err);                                                                                                          // 4340
  }                                                                                                                   // 4341
};                                                                                                                    // 4342
                                                                                                                      // 4343
}); // module: runnable.js                                                                                            // 4344
                                                                                                                      // 4345
require.register("runner.js", function(module, exports, require){                                                     // 4346
/**                                                                                                                   // 4347
 * Module dependencies.                                                                                               // 4348
 */                                                                                                                   // 4349
                                                                                                                      // 4350
var EventEmitter = require('browser/events').EventEmitter                                                             // 4351
  , debug = require('browser/debug')('mocha:runner')                                                                  // 4352
  , Test = require('./test')                                                                                          // 4353
  , utils = require('./utils')                                                                                        // 4354
  , filter = utils.filter                                                                                             // 4355
  , keys = utils.keys;                                                                                                // 4356
                                                                                                                      // 4357
/**                                                                                                                   // 4358
 * Non-enumerable globals.                                                                                            // 4359
 */                                                                                                                   // 4360
                                                                                                                      // 4361
var globals = [                                                                                                       // 4362
  'setTimeout',                                                                                                       // 4363
  'clearTimeout',                                                                                                     // 4364
  'setInterval',                                                                                                      // 4365
  'clearInterval',                                                                                                    // 4366
  'XMLHttpRequest',                                                                                                   // 4367
  'Date'                                                                                                              // 4368
];                                                                                                                    // 4369
                                                                                                                      // 4370
/**                                                                                                                   // 4371
 * Expose `Runner`.                                                                                                   // 4372
 */                                                                                                                   // 4373
                                                                                                                      // 4374
module.exports = Runner;                                                                                              // 4375
                                                                                                                      // 4376
/**                                                                                                                   // 4377
 * Initialize a `Runner` for the given `suite`.                                                                       // 4378
 *                                                                                                                    // 4379
 * Events:                                                                                                            // 4380
 *                                                                                                                    // 4381
 *   - `start`  execution started                                                                                     // 4382
 *   - `end`  execution complete                                                                                      // 4383
 *   - `suite`  (suite) test suite execution started                                                                  // 4384
 *   - `suite end`  (suite) all tests (and sub-suites) have finished                                                  // 4385
 *   - `test`  (test) test execution started                                                                          // 4386
 *   - `test end`  (test) test completed                                                                              // 4387
 *   - `hook`  (hook) hook execution started                                                                          // 4388
 *   - `hook end`  (hook) hook complete                                                                               // 4389
 *   - `pass`  (test) test passed                                                                                     // 4390
 *   - `fail`  (test, err) test failed                                                                                // 4391
 *   - `pending`  (test) test pending                                                                                 // 4392
 *                                                                                                                    // 4393
 * @api public                                                                                                        // 4394
 */                                                                                                                   // 4395
                                                                                                                      // 4396
function Runner(suite) {                                                                                              // 4397
  var self = this;                                                                                                    // 4398
  this._globals = [];                                                                                                 // 4399
  this._abort = false;                                                                                                // 4400
  this.suite = suite;                                                                                                 // 4401
  this.total = suite.total();                                                                                         // 4402
  this.failures = 0;                                                                                                  // 4403
  this.on('test end', function(test){ self.checkGlobals(test); });                                                    // 4404
  this.on('hook end', function(hook){ self.checkGlobals(hook); });                                                    // 4405
  this.grep(/.*/);                                                                                                    // 4406
  this.globals(this.globalProps().concat(extraGlobals()));                                                            // 4407
}                                                                                                                     // 4408
                                                                                                                      // 4409
/**                                                                                                                   // 4410
 * Wrapper for setImmediate, process.nextTick, or browser polyfill.                                                   // 4411
 *                                                                                                                    // 4412
 * @param {Function} fn                                                                                               // 4413
 * @api private                                                                                                       // 4414
 */                                                                                                                   // 4415
                                                                                                                      // 4416
Runner.immediately = global.setImmediate || process.nextTick;                                                         // 4417
                                                                                                                      // 4418
/**                                                                                                                   // 4419
 * Inherit from `EventEmitter.prototype`.                                                                             // 4420
 */                                                                                                                   // 4421
                                                                                                                      // 4422
function F(){};                                                                                                       // 4423
F.prototype = EventEmitter.prototype;                                                                                 // 4424
Runner.prototype = new F;                                                                                             // 4425
Runner.prototype.constructor = Runner;                                                                                // 4426
                                                                                                                      // 4427
                                                                                                                      // 4428
/**                                                                                                                   // 4429
 * Run tests with full titles matching `re`. Updates runner.total                                                     // 4430
 * with number of tests matched.                                                                                      // 4431
 *                                                                                                                    // 4432
 * @param {RegExp} re                                                                                                 // 4433
 * @param {Boolean} invert                                                                                            // 4434
 * @return {Runner} for chaining                                                                                      // 4435
 * @api public                                                                                                        // 4436
 */                                                                                                                   // 4437
                                                                                                                      // 4438
Runner.prototype.grep = function(re, invert){                                                                         // 4439
  debug('grep %s', re);                                                                                               // 4440
  this._grep = re;                                                                                                    // 4441
  this._invert = invert;                                                                                              // 4442
  this.total = this.grepTotal(this.suite);                                                                            // 4443
  return this;                                                                                                        // 4444
};                                                                                                                    // 4445
                                                                                                                      // 4446
/**                                                                                                                   // 4447
 * Returns the number of tests matching the grep search for the                                                       // 4448
 * given suite.                                                                                                       // 4449
 *                                                                                                                    // 4450
 * @param {Suite} suite                                                                                               // 4451
 * @return {Number}                                                                                                   // 4452
 * @api public                                                                                                        // 4453
 */                                                                                                                   // 4454
                                                                                                                      // 4455
Runner.prototype.grepTotal = function(suite) {                                                                        // 4456
  var self = this;                                                                                                    // 4457
  var total = 0;                                                                                                      // 4458
                                                                                                                      // 4459
  suite.eachTest(function(test){                                                                                      // 4460
    var match = self._grep.test(test.fullTitle());                                                                    // 4461
    if (self._invert) match = !match;                                                                                 // 4462
    if (match) total++;                                                                                               // 4463
  });                                                                                                                 // 4464
                                                                                                                      // 4465
  return total;                                                                                                       // 4466
};                                                                                                                    // 4467
                                                                                                                      // 4468
/**                                                                                                                   // 4469
 * Return a list of global properties.                                                                                // 4470
 *                                                                                                                    // 4471
 * @return {Array}                                                                                                    // 4472
 * @api private                                                                                                       // 4473
 */                                                                                                                   // 4474
                                                                                                                      // 4475
Runner.prototype.globalProps = function() {                                                                           // 4476
  var props = utils.keys(global);                                                                                     // 4477
                                                                                                                      // 4478
  // non-enumerables                                                                                                  // 4479
  for (var i = 0; i < globals.length; ++i) {                                                                          // 4480
    if (~utils.indexOf(props, globals[i])) continue;                                                                  // 4481
    props.push(globals[i]);                                                                                           // 4482
  }                                                                                                                   // 4483
                                                                                                                      // 4484
  return props;                                                                                                       // 4485
};                                                                                                                    // 4486
                                                                                                                      // 4487
/**                                                                                                                   // 4488
 * Allow the given `arr` of globals.                                                                                  // 4489
 *                                                                                                                    // 4490
 * @param {Array} arr                                                                                                 // 4491
 * @return {Runner} for chaining                                                                                      // 4492
 * @api public                                                                                                        // 4493
 */                                                                                                                   // 4494
                                                                                                                      // 4495
Runner.prototype.globals = function(arr){                                                                             // 4496
  if (0 == arguments.length) return this._globals;                                                                    // 4497
  debug('globals %j', arr);                                                                                           // 4498
  this._globals = this._globals.concat(arr);                                                                          // 4499
  return this;                                                                                                        // 4500
};                                                                                                                    // 4501
                                                                                                                      // 4502
/**                                                                                                                   // 4503
 * Check for global variable leaks.                                                                                   // 4504
 *                                                                                                                    // 4505
 * @api private                                                                                                       // 4506
 */                                                                                                                   // 4507
                                                                                                                      // 4508
Runner.prototype.checkGlobals = function(test){                                                                       // 4509
  if (this.ignoreLeaks) return;                                                                                       // 4510
  var ok = this._globals;                                                                                             // 4511
                                                                                                                      // 4512
  var globals = this.globalProps();                                                                                   // 4513
  var isNode = process.kill;                                                                                          // 4514
  var leaks;                                                                                                          // 4515
                                                                                                                      // 4516
  if (test) {                                                                                                         // 4517
    ok = ok.concat(test._allowedGlobals || []);                                                                       // 4518
  }                                                                                                                   // 4519
                                                                                                                      // 4520
  if(this.prevGlobalsLength == globals.length) return;                                                                // 4521
  this.prevGlobalsLength = globals.length;                                                                            // 4522
                                                                                                                      // 4523
  leaks = filterLeaks(ok, globals);                                                                                   // 4524
  this._globals = this._globals.concat(leaks);                                                                        // 4525
                                                                                                                      // 4526
  if (leaks.length > 1) {                                                                                             // 4527
    this.fail(test, new Error('global leaks detected: ' + leaks.join(', ') + ''));                                    // 4528
  } else if (leaks.length) {                                                                                          // 4529
    this.fail(test, new Error('global leak detected: ' + leaks[0]));                                                  // 4530
  }                                                                                                                   // 4531
};                                                                                                                    // 4532
                                                                                                                      // 4533
/**                                                                                                                   // 4534
 * Fail the given `test`.                                                                                             // 4535
 *                                                                                                                    // 4536
 * @param {Test} test                                                                                                 // 4537
 * @param {Error} err                                                                                                 // 4538
 * @api private                                                                                                       // 4539
 */                                                                                                                   // 4540
                                                                                                                      // 4541
Runner.prototype.fail = function(test, err){                                                                          // 4542
  ++this.failures;                                                                                                    // 4543
  test.state = 'failed';                                                                                              // 4544
                                                                                                                      // 4545
  if ('string' == typeof err) {                                                                                       // 4546
    err = new Error('the string "' + err + '" was thrown, throw an Error :)');                                        // 4547
  }                                                                                                                   // 4548
                                                                                                                      // 4549
  this.emit('fail', test, err);                                                                                       // 4550
};                                                                                                                    // 4551
                                                                                                                      // 4552
/**                                                                                                                   // 4553
 * Fail the given `hook` with `err`.                                                                                  // 4554
 *                                                                                                                    // 4555
 * Hook failures work in the following pattern:                                                                       // 4556
 * - If bail, then exit                                                                                               // 4557
 * - Failed `before` hook skips all tests in a suite and subsuites,                                                   // 4558
 *   but jumps to corresponding `after` hook                                                                          // 4559
 * - Failed `before each` hook skips remaining tests in a                                                             // 4560
 *   suite and jumps to corresponding `after each` hook,                                                              // 4561
 *   which is run only once                                                                                           // 4562
 * - Failed `after` hook does not alter                                                                               // 4563
 *   execution order                                                                                                  // 4564
 * - Failed `after each` hook skips remaining tests in a                                                              // 4565
 *   suite and subsuites, but executes other `after each`                                                             // 4566
 *   hooks                                                                                                            // 4567
 *                                                                                                                    // 4568
 * @param {Hook} hook                                                                                                 // 4569
 * @param {Error} err                                                                                                 // 4570
 * @api private                                                                                                       // 4571
 */                                                                                                                   // 4572
                                                                                                                      // 4573
Runner.prototype.failHook = function(hook, err){                                                                      // 4574
  this.fail(hook, err);                                                                                               // 4575
  if (this.suite.bail()) {                                                                                            // 4576
    this.emit('end');                                                                                                 // 4577
  }                                                                                                                   // 4578
};                                                                                                                    // 4579
                                                                                                                      // 4580
/**                                                                                                                   // 4581
 * Run hook `name` callbacks and then invoke `fn()`.                                                                  // 4582
 *                                                                                                                    // 4583
 * @param {String} name                                                                                               // 4584
 * @param {Function} function                                                                                         // 4585
 * @api private                                                                                                       // 4586
 */                                                                                                                   // 4587
                                                                                                                      // 4588
Runner.prototype.hook = function(name, fn){                                                                           // 4589
  var suite = this.suite                                                                                              // 4590
    , hooks = suite['_' + name]                                                                                       // 4591
    , self = this                                                                                                     // 4592
    , timer;                                                                                                          // 4593
                                                                                                                      // 4594
  function next(i) {                                                                                                  // 4595
    var hook = hooks[i];                                                                                              // 4596
    if (!hook) return fn();                                                                                           // 4597
    if (self.failures && suite.bail()) return fn();                                                                   // 4598
    self.currentRunnable = hook;                                                                                      // 4599
                                                                                                                      // 4600
    hook.ctx.currentTest = self.test;                                                                                 // 4601
                                                                                                                      // 4602
    self.emit('hook', hook);                                                                                          // 4603
                                                                                                                      // 4604
    hook.on('error', function(err){                                                                                   // 4605
      self.failHook(hook, err);                                                                                       // 4606
    });                                                                                                               // 4607
                                                                                                                      // 4608
    hook.run(function(err){                                                                                           // 4609
      hook.removeAllListeners('error');                                                                               // 4610
      var testError = hook.error();                                                                                   // 4611
      if (testError) self.fail(self.test, testError);                                                                 // 4612
      if (err) {                                                                                                      // 4613
        self.failHook(hook, err);                                                                                     // 4614
                                                                                                                      // 4615
        // stop executing hooks, notify callee of hook err                                                            // 4616
        return fn(err);                                                                                               // 4617
      }                                                                                                               // 4618
      self.emit('hook end', hook);                                                                                    // 4619
      delete hook.ctx.currentTest;                                                                                    // 4620
      next(++i);                                                                                                      // 4621
    });                                                                                                               // 4622
  }                                                                                                                   // 4623
                                                                                                                      // 4624
  Runner.immediately(function(){                                                                                      // 4625
    next(0);                                                                                                          // 4626
  });                                                                                                                 // 4627
};                                                                                                                    // 4628
                                                                                                                      // 4629
/**                                                                                                                   // 4630
 * Run hook `name` for the given array of `suites`                                                                    // 4631
 * in order, and callback `fn(err, errSuite)`.                                                                        // 4632
 *                                                                                                                    // 4633
 * @param {String} name                                                                                               // 4634
 * @param {Array} suites                                                                                              // 4635
 * @param {Function} fn                                                                                               // 4636
 * @api private                                                                                                       // 4637
 */                                                                                                                   // 4638
                                                                                                                      // 4639
Runner.prototype.hooks = function(name, suites, fn){                                                                  // 4640
  var self = this                                                                                                     // 4641
    , orig = this.suite;                                                                                              // 4642
                                                                                                                      // 4643
  function next(suite) {                                                                                              // 4644
    self.suite = suite;                                                                                               // 4645
                                                                                                                      // 4646
    if (!suite) {                                                                                                     // 4647
      self.suite = orig;                                                                                              // 4648
      return fn();                                                                                                    // 4649
    }                                                                                                                 // 4650
                                                                                                                      // 4651
    self.hook(name, function(err){                                                                                    // 4652
      if (err) {                                                                                                      // 4653
        var errSuite = self.suite;                                                                                    // 4654
        self.suite = orig;                                                                                            // 4655
        return fn(err, errSuite);                                                                                     // 4656
      }                                                                                                               // 4657
                                                                                                                      // 4658
      next(suites.pop());                                                                                             // 4659
    });                                                                                                               // 4660
  }                                                                                                                   // 4661
                                                                                                                      // 4662
  next(suites.pop());                                                                                                 // 4663
};                                                                                                                    // 4664
                                                                                                                      // 4665
/**                                                                                                                   // 4666
 * Run hooks from the top level down.                                                                                 // 4667
 *                                                                                                                    // 4668
 * @param {String} name                                                                                               // 4669
 * @param {Function} fn                                                                                               // 4670
 * @api private                                                                                                       // 4671
 */                                                                                                                   // 4672
                                                                                                                      // 4673
Runner.prototype.hookUp = function(name, fn){                                                                         // 4674
  var suites = [this.suite].concat(this.parents()).reverse();                                                         // 4675
  this.hooks(name, suites, fn);                                                                                       // 4676
};                                                                                                                    // 4677
                                                                                                                      // 4678
/**                                                                                                                   // 4679
 * Run hooks from the bottom up.                                                                                      // 4680
 *                                                                                                                    // 4681
 * @param {String} name                                                                                               // 4682
 * @param {Function} fn                                                                                               // 4683
 * @api private                                                                                                       // 4684
 */                                                                                                                   // 4685
                                                                                                                      // 4686
Runner.prototype.hookDown = function(name, fn){                                                                       // 4687
  var suites = [this.suite].concat(this.parents());                                                                   // 4688
  this.hooks(name, suites, fn);                                                                                       // 4689
};                                                                                                                    // 4690
                                                                                                                      // 4691
/**                                                                                                                   // 4692
 * Return an array of parent Suites from                                                                              // 4693
 * closest to furthest.                                                                                               // 4694
 *                                                                                                                    // 4695
 * @return {Array}                                                                                                    // 4696
 * @api private                                                                                                       // 4697
 */                                                                                                                   // 4698
                                                                                                                      // 4699
Runner.prototype.parents = function(){                                                                                // 4700
  var suite = this.suite                                                                                              // 4701
    , suites = [];                                                                                                    // 4702
  while (suite = suite.parent) suites.push(suite);                                                                    // 4703
  return suites;                                                                                                      // 4704
};                                                                                                                    // 4705
                                                                                                                      // 4706
/**                                                                                                                   // 4707
 * Run the current test and callback `fn(err)`.                                                                       // 4708
 *                                                                                                                    // 4709
 * @param {Function} fn                                                                                               // 4710
 * @api private                                                                                                       // 4711
 */                                                                                                                   // 4712
                                                                                                                      // 4713
Runner.prototype.runTest = function(fn){                                                                              // 4714
  var test = this.test                                                                                                // 4715
    , self = this;                                                                                                    // 4716
                                                                                                                      // 4717
  if (this.asyncOnly) test.asyncOnly = true;                                                                          // 4718
                                                                                                                      // 4719
  try {                                                                                                               // 4720
    test.on('error', function(err){                                                                                   // 4721
      self.fail(test, err);                                                                                           // 4722
    });                                                                                                               // 4723
    test.run(fn);                                                                                                     // 4724
  } catch (err) {                                                                                                     // 4725
    fn(err);                                                                                                          // 4726
  }                                                                                                                   // 4727
};                                                                                                                    // 4728
                                                                                                                      // 4729
/**                                                                                                                   // 4730
 * Run tests in the given `suite` and invoke                                                                          // 4731
 * the callback `fn()` when complete.                                                                                 // 4732
 *                                                                                                                    // 4733
 * @param {Suite} suite                                                                                               // 4734
 * @param {Function} fn                                                                                               // 4735
 * @api private                                                                                                       // 4736
 */                                                                                                                   // 4737
                                                                                                                      // 4738
Runner.prototype.runTests = function(suite, fn){                                                                      // 4739
  var self = this                                                                                                     // 4740
    , tests = suite.tests.slice()                                                                                     // 4741
    , test;                                                                                                           // 4742
                                                                                                                      // 4743
                                                                                                                      // 4744
  function hookErr(err, errSuite, after) {                                                                            // 4745
    // before/after Each hook for errSuite failed:                                                                    // 4746
    var orig = self.suite;                                                                                            // 4747
                                                                                                                      // 4748
    // for failed 'after each' hook start from errSuite parent,                                                       // 4749
    // otherwise start from errSuite itself                                                                           // 4750
    self.suite = after ? errSuite.parent : errSuite;                                                                  // 4751
                                                                                                                      // 4752
    if (self.suite) {                                                                                                 // 4753
      // call hookUp afterEach                                                                                        // 4754
      self.hookUp('afterEach', function(err2, errSuite2) {                                                            // 4755
        self.suite = orig;                                                                                            // 4756
        // some hooks may fail even now                                                                               // 4757
        if (err2) return hookErr(err2, errSuite2, true);                                                              // 4758
        // report error suite                                                                                         // 4759
        fn(errSuite);                                                                                                 // 4760
      });                                                                                                             // 4761
    } else {                                                                                                          // 4762
      // there is no need calling other 'after each' hooks                                                            // 4763
      self.suite = orig;                                                                                              // 4764
      fn(errSuite);                                                                                                   // 4765
    }                                                                                                                 // 4766
  }                                                                                                                   // 4767
                                                                                                                      // 4768
  function next(err, errSuite) {                                                                                      // 4769
    // if we bail after first err                                                                                     // 4770
    if (self.failures && suite._bail) return fn();                                                                    // 4771
                                                                                                                      // 4772
    if (self._abort) return fn();                                                                                     // 4773
                                                                                                                      // 4774
    if (err) return hookErr(err, errSuite, true);                                                                     // 4775
                                                                                                                      // 4776
    // next test                                                                                                      // 4777
    test = tests.shift();                                                                                             // 4778
                                                                                                                      // 4779
    // all done                                                                                                       // 4780
    if (!test) return fn();                                                                                           // 4781
                                                                                                                      // 4782
    // grep                                                                                                           // 4783
    var match = self._grep.test(test.fullTitle());                                                                    // 4784
    if (self._invert) match = !match;                                                                                 // 4785
    if (!match) return next();                                                                                        // 4786
                                                                                                                      // 4787
    // pending                                                                                                        // 4788
    if (test.pending) {                                                                                               // 4789
      self.emit('pending', test);                                                                                     // 4790
      self.emit('test end', test);                                                                                    // 4791
      return next();                                                                                                  // 4792
    }                                                                                                                 // 4793
                                                                                                                      // 4794
    // execute test and hook(s)                                                                                       // 4795
    self.emit('test', self.test = test);                                                                              // 4796
    self.hookDown('beforeEach', function(err, errSuite){                                                              // 4797
                                                                                                                      // 4798
      if (err) return hookErr(err, errSuite, false);                                                                  // 4799
                                                                                                                      // 4800
      self.currentRunnable = self.test;                                                                               // 4801
      self.runTest(function(err){                                                                                     // 4802
        test = self.test;                                                                                             // 4803
                                                                                                                      // 4804
        if (err) {                                                                                                    // 4805
          self.fail(test, err);                                                                                       // 4806
          self.emit('test end', test);                                                                                // 4807
          return self.hookUp('afterEach', next);                                                                      // 4808
        }                                                                                                             // 4809
                                                                                                                      // 4810
        test.state = 'passed';                                                                                        // 4811
        self.emit('pass', test);                                                                                      // 4812
        self.emit('test end', test);                                                                                  // 4813
        self.hookUp('afterEach', next);                                                                               // 4814
      });                                                                                                             // 4815
    });                                                                                                               // 4816
  }                                                                                                                   // 4817
                                                                                                                      // 4818
  this.next = next;                                                                                                   // 4819
  next();                                                                                                             // 4820
};                                                                                                                    // 4821
                                                                                                                      // 4822
/**                                                                                                                   // 4823
 * Run the given `suite` and invoke the                                                                               // 4824
 * callback `fn()` when complete.                                                                                     // 4825
 *                                                                                                                    // 4826
 * @param {Suite} suite                                                                                               // 4827
 * @param {Function} fn                                                                                               // 4828
 * @api private                                                                                                       // 4829
 */                                                                                                                   // 4830
                                                                                                                      // 4831
Runner.prototype.runSuite = function(suite, fn){                                                                      // 4832
  var total = this.grepTotal(suite)                                                                                   // 4833
    , self = this                                                                                                     // 4834
    , i = 0;                                                                                                          // 4835
                                                                                                                      // 4836
  debug('run suite %s', suite.fullTitle());                                                                           // 4837
                                                                                                                      // 4838
  if (!total) return fn();                                                                                            // 4839
                                                                                                                      // 4840
  this.emit('suite', this.suite = suite);                                                                             // 4841
                                                                                                                      // 4842
  function next(errSuite) {                                                                                           // 4843
    if (errSuite) {                                                                                                   // 4844
      // current suite failed on a hook from errSuite                                                                 // 4845
      if (errSuite == suite) {                                                                                        // 4846
        // if errSuite is current suite                                                                               // 4847
        // continue to the next sibling suite                                                                         // 4848
        return done();                                                                                                // 4849
      } else {                                                                                                        // 4850
        // errSuite is among the parents of current suite                                                             // 4851
        // stop execution of errSuite and all sub-suites                                                              // 4852
        return done(errSuite);                                                                                        // 4853
      }                                                                                                               // 4854
    }                                                                                                                 // 4855
                                                                                                                      // 4856
    if (self._abort) return done();                                                                                   // 4857
                                                                                                                      // 4858
    var curr = suite.suites[i++];                                                                                     // 4859
    if (!curr) return done();                                                                                         // 4860
    self.runSuite(curr, next);                                                                                        // 4861
  }                                                                                                                   // 4862
                                                                                                                      // 4863
  function done(errSuite) {                                                                                           // 4864
    self.suite = suite;                                                                                               // 4865
    self.hook('afterAll', function(){                                                                                 // 4866
      self.emit('suite end', suite);                                                                                  // 4867
      fn(errSuite);                                                                                                   // 4868
    });                                                                                                               // 4869
  }                                                                                                                   // 4870
                                                                                                                      // 4871
  this.hook('beforeAll', function(err){                                                                               // 4872
    if (err) return done();                                                                                           // 4873
    self.runTests(suite, next);                                                                                       // 4874
  });                                                                                                                 // 4875
};                                                                                                                    // 4876
                                                                                                                      // 4877
/**                                                                                                                   // 4878
 * Handle uncaught exceptions.                                                                                        // 4879
 *                                                                                                                    // 4880
 * @param {Error} err                                                                                                 // 4881
 * @api private                                                                                                       // 4882
 */                                                                                                                   // 4883
                                                                                                                      // 4884
Runner.prototype.uncaught = function(err){                                                                            // 4885
  debug('uncaught exception %s', err.message);                                                                        // 4886
  var runnable = this.currentRunnable;                                                                                // 4887
  if (!runnable || 'failed' == runnable.state) return;                                                                // 4888
  runnable.clearTimeout();                                                                                            // 4889
  err.uncaught = true;                                                                                                // 4890
  this.fail(runnable, err);                                                                                           // 4891
                                                                                                                      // 4892
  // recover from test                                                                                                // 4893
  if ('test' == runnable.type) {                                                                                      // 4894
    this.emit('test end', runnable);                                                                                  // 4895
    this.hookUp('afterEach', this.next);                                                                              // 4896
    return;                                                                                                           // 4897
  }                                                                                                                   // 4898
                                                                                                                      // 4899
  // bail on hooks                                                                                                    // 4900
  this.emit('end');                                                                                                   // 4901
};                                                                                                                    // 4902
                                                                                                                      // 4903
/**                                                                                                                   // 4904
 * Run the root suite and invoke `fn(failures)`                                                                       // 4905
 * on completion.                                                                                                     // 4906
 *                                                                                                                    // 4907
 * @param {Function} fn                                                                                               // 4908
 * @return {Runner} for chaining                                                                                      // 4909
 * @api public                                                                                                        // 4910
 */                                                                                                                   // 4911
                                                                                                                      // 4912
Runner.prototype.run = function(fn){                                                                                  // 4913
  var self = this                                                                                                     // 4914
    , fn = fn || function(){};                                                                                        // 4915
                                                                                                                      // 4916
  function uncaught(err){                                                                                             // 4917
    self.uncaught(err);                                                                                               // 4918
  }                                                                                                                   // 4919
                                                                                                                      // 4920
  debug('start');                                                                                                     // 4921
                                                                                                                      // 4922
  // callback                                                                                                         // 4923
  this.on('end', function(){                                                                                          // 4924
    debug('end');                                                                                                     // 4925
    process.removeListener('uncaughtException', uncaught);                                                            // 4926
    fn(self.failures);                                                                                                // 4927
  });                                                                                                                 // 4928
                                                                                                                      // 4929
  // run suites                                                                                                       // 4930
  this.emit('start');                                                                                                 // 4931
  this.runSuite(this.suite, function(){                                                                               // 4932
    debug('finished running');                                                                                        // 4933
    self.emit('end');                                                                                                 // 4934
  });                                                                                                                 // 4935
                                                                                                                      // 4936
  // uncaught exception                                                                                               // 4937
  process.on('uncaughtException', uncaught);                                                                          // 4938
                                                                                                                      // 4939
  return this;                                                                                                        // 4940
};                                                                                                                    // 4941
                                                                                                                      // 4942
/**                                                                                                                   // 4943
 * Cleanly abort execution                                                                                            // 4944
 *                                                                                                                    // 4945
 * @return {Runner} for chaining                                                                                      // 4946
 * @api public                                                                                                        // 4947
 */                                                                                                                   // 4948
Runner.prototype.abort = function(){                                                                                  // 4949
  debug('aborting');                                                                                                  // 4950
  this._abort = true;                                                                                                 // 4951
}                                                                                                                     // 4952
                                                                                                                      // 4953
/**                                                                                                                   // 4954
 * Filter leaks with the given globals flagged as `ok`.                                                               // 4955
 *                                                                                                                    // 4956
 * @param {Array} ok                                                                                                  // 4957
 * @param {Array} globals                                                                                             // 4958
 * @return {Array}                                                                                                    // 4959
 * @api private                                                                                                       // 4960
 */                                                                                                                   // 4961
                                                                                                                      // 4962
function filterLeaks(ok, globals) {                                                                                   // 4963
  return filter(globals, function(key){                                                                               // 4964
    // Firefox and Chrome exposes iframes as index inside the window object                                           // 4965
    if (/^d+/.test(key)) return false;                                                                                // 4966
                                                                                                                      // 4967
    // in firefox                                                                                                     // 4968
    // if runner runs in an iframe, this iframe's window.getInterface method not init at first                        // 4969
    // it is assigned in some seconds                                                                                 // 4970
    if (global.navigator && /^getInterface/.test(key)) return false;                                                  // 4971
                                                                                                                      // 4972
    // an iframe could be approached by window[iframeIndex]                                                           // 4973
    // in ie6,7,8 and opera, iframeIndex is enumerable, this could cause leak                                         // 4974
    if (global.navigator && /^\d+/.test(key)) return false;                                                           // 4975
                                                                                                                      // 4976
    // Opera and IE expose global variables for HTML element IDs (issue #243)                                         // 4977
    if (/^mocha-/.test(key)) return false;                                                                            // 4978
                                                                                                                      // 4979
    var matched = filter(ok, function(ok){                                                                            // 4980
      if (~ok.indexOf('*')) return 0 == key.indexOf(ok.split('*')[0]);                                                // 4981
      return key == ok;                                                                                               // 4982
    });                                                                                                               // 4983
    return matched.length == 0 && (!global.navigator || 'onerror' !== key);                                           // 4984
  });                                                                                                                 // 4985
}                                                                                                                     // 4986
                                                                                                                      // 4987
/**                                                                                                                   // 4988
 * Array of globals dependent on the environment.                                                                     // 4989
 *                                                                                                                    // 4990
 * @return {Array}                                                                                                    // 4991
 * @api private                                                                                                       // 4992
 */                                                                                                                   // 4993
                                                                                                                      // 4994
 function extraGlobals() {                                                                                            // 4995
  if (typeof(process) === 'object' &&                                                                                 // 4996
      typeof(process.version) === 'string') {                                                                         // 4997
                                                                                                                      // 4998
    var nodeVersion = process.version.split('.').reduce(function(a, v) {                                              // 4999
      return a << 8 | v;                                                                                              // 5000
    });                                                                                                               // 5001
                                                                                                                      // 5002
    // 'errno' was renamed to process._errno in v0.9.11.                                                              // 5003
                                                                                                                      // 5004
    if (nodeVersion < 0x00090B) {                                                                                     // 5005
      return ['errno'];                                                                                               // 5006
    }                                                                                                                 // 5007
  }                                                                                                                   // 5008
                                                                                                                      // 5009
  return [];                                                                                                          // 5010
 }                                                                                                                    // 5011
                                                                                                                      // 5012
}); // module: runner.js                                                                                              // 5013
                                                                                                                      // 5014
require.register("suite.js", function(module, exports, require){                                                      // 5015
                                                                                                                      // 5016
/**                                                                                                                   // 5017
 * Module dependencies.                                                                                               // 5018
 */                                                                                                                   // 5019
                                                                                                                      // 5020
var EventEmitter = require('browser/events').EventEmitter                                                             // 5021
  , debug = require('browser/debug')('mocha:suite')                                                                   // 5022
  , milliseconds = require('./ms')                                                                                    // 5023
  , utils = require('./utils')                                                                                        // 5024
  , Hook = require('./hook');                                                                                         // 5025
                                                                                                                      // 5026
/**                                                                                                                   // 5027
 * Expose `Suite`.                                                                                                    // 5028
 */                                                                                                                   // 5029
                                                                                                                      // 5030
exports = module.exports = Suite;                                                                                     // 5031
                                                                                                                      // 5032
/**                                                                                                                   // 5033
 * Create a new `Suite` with the given `title`                                                                        // 5034
 * and parent `Suite`. When a suite with the                                                                          // 5035
 * same title is already present, that suite                                                                          // 5036
 * is returned to provide nicer reporter                                                                              // 5037
 * and more flexible meta-testing.                                                                                    // 5038
 *                                                                                                                    // 5039
 * @param {Suite} parent                                                                                              // 5040
 * @param {String} title                                                                                              // 5041
 * @return {Suite}                                                                                                    // 5042
 * @api public                                                                                                        // 5043
 */                                                                                                                   // 5044
                                                                                                                      // 5045
exports.create = function(parent, title){                                                                             // 5046
  var suite = new Suite(title, parent.ctx);                                                                           // 5047
  suite.parent = parent;                                                                                              // 5048
  if (parent.pending) suite.pending = true;                                                                           // 5049
  title = suite.fullTitle();                                                                                          // 5050
  parent.addSuite(suite);                                                                                             // 5051
  return suite;                                                                                                       // 5052
};                                                                                                                    // 5053
                                                                                                                      // 5054
/**                                                                                                                   // 5055
 * Initialize a new `Suite` with the given                                                                            // 5056
 * `title` and `ctx`.                                                                                                 // 5057
 *                                                                                                                    // 5058
 * @param {String} title                                                                                              // 5059
 * @param {Context} ctx                                                                                               // 5060
 * @api private                                                                                                       // 5061
 */                                                                                                                   // 5062
                                                                                                                      // 5063
function Suite(title, ctx) {                                                                                          // 5064
  this.title = title;                                                                                                 // 5065
  this.ctx = ctx;                                                                                                     // 5066
  this.suites = [];                                                                                                   // 5067
  this.tests = [];                                                                                                    // 5068
  this.pending = false;                                                                                               // 5069
  this._beforeEach = [];                                                                                              // 5070
  this._beforeAll = [];                                                                                               // 5071
  this._afterEach = [];                                                                                               // 5072
  this._afterAll = [];                                                                                                // 5073
  this.root = !title;                                                                                                 // 5074
  this._timeout = 2000;                                                                                               // 5075
  this._slow = 75;                                                                                                    // 5076
  this._bail = false;                                                                                                 // 5077
}                                                                                                                     // 5078
                                                                                                                      // 5079
/**                                                                                                                   // 5080
 * Inherit from `EventEmitter.prototype`.                                                                             // 5081
 */                                                                                                                   // 5082
                                                                                                                      // 5083
function F(){};                                                                                                       // 5084
F.prototype = EventEmitter.prototype;                                                                                 // 5085
Suite.prototype = new F;                                                                                              // 5086
Suite.prototype.constructor = Suite;                                                                                  // 5087
                                                                                                                      // 5088
                                                                                                                      // 5089
/**                                                                                                                   // 5090
 * Return a clone of this `Suite`.                                                                                    // 5091
 *                                                                                                                    // 5092
 * @return {Suite}                                                                                                    // 5093
 * @api private                                                                                                       // 5094
 */                                                                                                                   // 5095
                                                                                                                      // 5096
Suite.prototype.clone = function(){                                                                                   // 5097
  var suite = new Suite(this.title);                                                                                  // 5098
  debug('clone');                                                                                                     // 5099
  suite.ctx = this.ctx;                                                                                               // 5100
  suite.timeout(this.timeout());                                                                                      // 5101
  suite.slow(this.slow());                                                                                            // 5102
  suite.bail(this.bail());                                                                                            // 5103
  return suite;                                                                                                       // 5104
};                                                                                                                    // 5105
                                                                                                                      // 5106
/**                                                                                                                   // 5107
 * Set timeout `ms` or short-hand such as "2s".                                                                       // 5108
 *                                                                                                                    // 5109
 * @param {Number|String} ms                                                                                          // 5110
 * @return {Suite|Number} for chaining                                                                                // 5111
 * @api private                                                                                                       // 5112
 */                                                                                                                   // 5113
                                                                                                                      // 5114
Suite.prototype.timeout = function(ms){                                                                               // 5115
  if (0 == arguments.length) return this._timeout;                                                                    // 5116
  if ('string' == typeof ms) ms = milliseconds(ms);                                                                   // 5117
  debug('timeout %d', ms);                                                                                            // 5118
  this._timeout = parseInt(ms, 10);                                                                                   // 5119
  return this;                                                                                                        // 5120
};                                                                                                                    // 5121
                                                                                                                      // 5122
/**                                                                                                                   // 5123
 * Set slow `ms` or short-hand such as "2s".                                                                          // 5124
 *                                                                                                                    // 5125
 * @param {Number|String} ms                                                                                          // 5126
 * @return {Suite|Number} for chaining                                                                                // 5127
 * @api private                                                                                                       // 5128
 */                                                                                                                   // 5129
                                                                                                                      // 5130
Suite.prototype.slow = function(ms){                                                                                  // 5131
  if (0 === arguments.length) return this._slow;                                                                      // 5132
  if ('string' == typeof ms) ms = milliseconds(ms);                                                                   // 5133
  debug('slow %d', ms);                                                                                               // 5134
  this._slow = ms;                                                                                                    // 5135
  return this;                                                                                                        // 5136
};                                                                                                                    // 5137
                                                                                                                      // 5138
/**                                                                                                                   // 5139
 * Sets whether to bail after first error.                                                                            // 5140
 *                                                                                                                    // 5141
 * @parma {Boolean} bail                                                                                              // 5142
 * @return {Suite|Number} for chaining                                                                                // 5143
 * @api private                                                                                                       // 5144
 */                                                                                                                   // 5145
                                                                                                                      // 5146
Suite.prototype.bail = function(bail){                                                                                // 5147
  if (0 == arguments.length) return this._bail;                                                                       // 5148
  debug('bail %s', bail);                                                                                             // 5149
  this._bail = bail;                                                                                                  // 5150
  return this;                                                                                                        // 5151
};                                                                                                                    // 5152
                                                                                                                      // 5153
/**                                                                                                                   // 5154
 * Run `fn(test[, done])` before running tests.                                                                       // 5155
 *                                                                                                                    // 5156
 * @param {Function} fn                                                                                               // 5157
 * @return {Suite} for chaining                                                                                       // 5158
 * @api private                                                                                                       // 5159
 */                                                                                                                   // 5160
                                                                                                                      // 5161
Suite.prototype.beforeAll = function(fn){                                                                             // 5162
  if (this.pending) return this;                                                                                      // 5163
  var hook = new Hook('"before all" hook', fn);                                                                       // 5164
  hook.parent = this;                                                                                                 // 5165
  hook.timeout(this.timeout());                                                                                       // 5166
  hook.slow(this.slow());                                                                                             // 5167
  hook.ctx = this.ctx;                                                                                                // 5168
  this._beforeAll.push(hook);                                                                                         // 5169
  this.emit('beforeAll', hook);                                                                                       // 5170
  return this;                                                                                                        // 5171
};                                                                                                                    // 5172
                                                                                                                      // 5173
/**                                                                                                                   // 5174
 * Run `fn(test[, done])` after running tests.                                                                        // 5175
 *                                                                                                                    // 5176
 * @param {Function} fn                                                                                               // 5177
 * @return {Suite} for chaining                                                                                       // 5178
 * @api private                                                                                                       // 5179
 */                                                                                                                   // 5180
                                                                                                                      // 5181
Suite.prototype.afterAll = function(fn){                                                                              // 5182
  if (this.pending) return this;                                                                                      // 5183
  var hook = new Hook('"after all" hook', fn);                                                                        // 5184
  hook.parent = this;                                                                                                 // 5185
  hook.timeout(this.timeout());                                                                                       // 5186
  hook.slow(this.slow());                                                                                             // 5187
  hook.ctx = this.ctx;                                                                                                // 5188
  this._afterAll.push(hook);                                                                                          // 5189
  this.emit('afterAll', hook);                                                                                        // 5190
  return this;                                                                                                        // 5191
};                                                                                                                    // 5192
                                                                                                                      // 5193
/**                                                                                                                   // 5194
 * Run `fn(test[, done])` before each test case.                                                                      // 5195
 *                                                                                                                    // 5196
 * @param {Function} fn                                                                                               // 5197
 * @return {Suite} for chaining                                                                                       // 5198
 * @api private                                                                                                       // 5199
 */                                                                                                                   // 5200
                                                                                                                      // 5201
Suite.prototype.beforeEach = function(fn){                                                                            // 5202
  if (this.pending) return this;                                                                                      // 5203
  var hook = new Hook('"before each" hook', fn);                                                                      // 5204
  hook.parent = this;                                                                                                 // 5205
  hook.timeout(this.timeout());                                                                                       // 5206
  hook.slow(this.slow());                                                                                             // 5207
  hook.ctx = this.ctx;                                                                                                // 5208
  this._beforeEach.push(hook);                                                                                        // 5209
  this.emit('beforeEach', hook);                                                                                      // 5210
  return this;                                                                                                        // 5211
};                                                                                                                    // 5212
                                                                                                                      // 5213
/**                                                                                                                   // 5214
 * Run `fn(test[, done])` after each test case.                                                                       // 5215
 *                                                                                                                    // 5216
 * @param {Function} fn                                                                                               // 5217
 * @return {Suite} for chaining                                                                                       // 5218
 * @api private                                                                                                       // 5219
 */                                                                                                                   // 5220
                                                                                                                      // 5221
Suite.prototype.afterEach = function(fn){                                                                             // 5222
  if (this.pending) return this;                                                                                      // 5223
  var hook = new Hook('"after each" hook', fn);                                                                       // 5224
  hook.parent = this;                                                                                                 // 5225
  hook.timeout(this.timeout());                                                                                       // 5226
  hook.slow(this.slow());                                                                                             // 5227
  hook.ctx = this.ctx;                                                                                                // 5228
  this._afterEach.push(hook);                                                                                         // 5229
  this.emit('afterEach', hook);                                                                                       // 5230
  return this;                                                                                                        // 5231
};                                                                                                                    // 5232
                                                                                                                      // 5233
/**                                                                                                                   // 5234
 * Add a test `suite`.                                                                                                // 5235
 *                                                                                                                    // 5236
 * @param {Suite} suite                                                                                               // 5237
 * @return {Suite} for chaining                                                                                       // 5238
 * @api private                                                                                                       // 5239
 */                                                                                                                   // 5240
                                                                                                                      // 5241
Suite.prototype.addSuite = function(suite){                                                                           // 5242
  suite.parent = this;                                                                                                // 5243
  suite.timeout(this.timeout());                                                                                      // 5244
  suite.slow(this.slow());                                                                                            // 5245
  suite.bail(this.bail());                                                                                            // 5246
  this.suites.push(suite);                                                                                            // 5247
  this.emit('suite', suite);                                                                                          // 5248
  return this;                                                                                                        // 5249
};                                                                                                                    // 5250
                                                                                                                      // 5251
/**                                                                                                                   // 5252
 * Add a `test` to this suite.                                                                                        // 5253
 *                                                                                                                    // 5254
 * @param {Test} test                                                                                                 // 5255
 * @return {Suite} for chaining                                                                                       // 5256
 * @api private                                                                                                       // 5257
 */                                                                                                                   // 5258
                                                                                                                      // 5259
Suite.prototype.addTest = function(test){                                                                             // 5260
  test.parent = this;                                                                                                 // 5261
  test.timeout(this.timeout());                                                                                       // 5262
  test.slow(this.slow());                                                                                             // 5263
  test.ctx = this.ctx;                                                                                                // 5264
  this.tests.push(test);                                                                                              // 5265
  this.emit('test', test);                                                                                            // 5266
  return this;                                                                                                        // 5267
};                                                                                                                    // 5268
                                                                                                                      // 5269
/**                                                                                                                   // 5270
 * Return the full title generated by recursively                                                                     // 5271
 * concatenating the parent's full title.                                                                             // 5272
 *                                                                                                                    // 5273
 * @return {String}                                                                                                   // 5274
 * @api public                                                                                                        // 5275
 */                                                                                                                   // 5276
                                                                                                                      // 5277
Suite.prototype.fullTitle = function(){                                                                               // 5278
  if (this.parent) {                                                                                                  // 5279
    var full = this.parent.fullTitle();                                                                               // 5280
    if (full) return full + ' ' + this.title;                                                                         // 5281
  }                                                                                                                   // 5282
  return this.title;                                                                                                  // 5283
};                                                                                                                    // 5284
                                                                                                                      // 5285
/**                                                                                                                   // 5286
 * Return the total number of tests.                                                                                  // 5287
 *                                                                                                                    // 5288
 * @return {Number}                                                                                                   // 5289
 * @api public                                                                                                        // 5290
 */                                                                                                                   // 5291
                                                                                                                      // 5292
Suite.prototype.total = function(){                                                                                   // 5293
  return utils.reduce(this.suites, function(sum, suite){                                                              // 5294
    return sum + suite.total();                                                                                       // 5295
  }, 0) + this.tests.length;                                                                                          // 5296
};                                                                                                                    // 5297
                                                                                                                      // 5298
/**                                                                                                                   // 5299
 * Iterates through each suite recursively to find                                                                    // 5300
 * all tests. Applies a function in the format                                                                        // 5301
 * `fn(test)`.                                                                                                        // 5302
 *                                                                                                                    // 5303
 * @param {Function} fn                                                                                               // 5304
 * @return {Suite}                                                                                                    // 5305
 * @api private                                                                                                       // 5306
 */                                                                                                                   // 5307
                                                                                                                      // 5308
Suite.prototype.eachTest = function(fn){                                                                              // 5309
  utils.forEach(this.tests, fn);                                                                                      // 5310
  utils.forEach(this.suites, function(suite){                                                                         // 5311
    suite.eachTest(fn);                                                                                               // 5312
  });                                                                                                                 // 5313
  return this;                                                                                                        // 5314
};                                                                                                                    // 5315
                                                                                                                      // 5316
}); // module: suite.js                                                                                               // 5317
                                                                                                                      // 5318
require.register("test.js", function(module, exports, require){                                                       // 5319
                                                                                                                      // 5320
/**                                                                                                                   // 5321
 * Module dependencies.                                                                                               // 5322
 */                                                                                                                   // 5323
                                                                                                                      // 5324
var Runnable = require('./runnable');                                                                                 // 5325
                                                                                                                      // 5326
/**                                                                                                                   // 5327
 * Expose `Test`.                                                                                                     // 5328
 */                                                                                                                   // 5329
                                                                                                                      // 5330
module.exports = Test;                                                                                                // 5331
                                                                                                                      // 5332
/**                                                                                                                   // 5333
 * Initialize a new `Test` with the given `title` and callback `fn`.                                                  // 5334
 *                                                                                                                    // 5335
 * @param {String} title                                                                                              // 5336
 * @param {Function} fn                                                                                               // 5337
 * @api private                                                                                                       // 5338
 */                                                                                                                   // 5339
                                                                                                                      // 5340
function Test(title, fn) {                                                                                            // 5341
  Runnable.call(this, title, fn);                                                                                     // 5342
  this.pending = !fn;                                                                                                 // 5343
  this.type = 'test';                                                                                                 // 5344
}                                                                                                                     // 5345
                                                                                                                      // 5346
/**                                                                                                                   // 5347
 * Inherit from `Runnable.prototype`.                                                                                 // 5348
 */                                                                                                                   // 5349
                                                                                                                      // 5350
function F(){};                                                                                                       // 5351
F.prototype = Runnable.prototype;                                                                                     // 5352
Test.prototype = new F;                                                                                               // 5353
Test.prototype.constructor = Test;                                                                                    // 5354
                                                                                                                      // 5355
                                                                                                                      // 5356
}); // module: test.js                                                                                                // 5357
                                                                                                                      // 5358
require.register("utils.js", function(module, exports, require){                                                      // 5359
/**                                                                                                                   // 5360
 * Module dependencies.                                                                                               // 5361
 */                                                                                                                   // 5362
                                                                                                                      // 5363
var fs = require('browser/fs')                                                                                        // 5364
  , path = require('browser/path')                                                                                    // 5365
  , join = path.join                                                                                                  // 5366
  , debug = require('browser/debug')('mocha:watch');                                                                  // 5367
                                                                                                                      // 5368
/**                                                                                                                   // 5369
 * Ignored directories.                                                                                               // 5370
 */                                                                                                                   // 5371
                                                                                                                      // 5372
var ignore = ['node_modules', '.git'];                                                                                // 5373
                                                                                                                      // 5374
/**                                                                                                                   // 5375
 * Escape special characters in the given string of html.                                                             // 5376
 *                                                                                                                    // 5377
 * @param  {String} html                                                                                              // 5378
 * @return {String}                                                                                                   // 5379
 * @api private                                                                                                       // 5380
 */                                                                                                                   // 5381
                                                                                                                      // 5382
exports.escape = function(html){                                                                                      // 5383
  return String(html)                                                                                                 // 5384
    .replace(/&/g, '&amp;')                                                                                           // 5385
    .replace(/"/g, '&quot;')                                                                                          // 5386
    .replace(/</g, '&lt;')                                                                                            // 5387
    .replace(/>/g, '&gt;');                                                                                           // 5388
};                                                                                                                    // 5389
                                                                                                                      // 5390
/**                                                                                                                   // 5391
 * Array#forEach (<=IE8)                                                                                              // 5392
 *                                                                                                                    // 5393
 * @param {Array} array                                                                                               // 5394
 * @param {Function} fn                                                                                               // 5395
 * @param {Object} scope                                                                                              // 5396
 * @api private                                                                                                       // 5397
 */                                                                                                                   // 5398
                                                                                                                      // 5399
exports.forEach = function(arr, fn, scope){                                                                           // 5400
  for (var i = 0, l = arr.length; i < l; i++)                                                                         // 5401
    fn.call(scope, arr[i], i);                                                                                        // 5402
};                                                                                                                    // 5403
                                                                                                                      // 5404
/**                                                                                                                   // 5405
 * Array#map (<=IE8)                                                                                                  // 5406
 *                                                                                                                    // 5407
 * @param {Array} array                                                                                               // 5408
 * @param {Function} fn                                                                                               // 5409
 * @param {Object} scope                                                                                              // 5410
 * @api private                                                                                                       // 5411
 */                                                                                                                   // 5412
                                                                                                                      // 5413
exports.map = function(arr, fn, scope){                                                                               // 5414
  var result = [];                                                                                                    // 5415
  for (var i = 0, l = arr.length; i < l; i++)                                                                         // 5416
    result.push(fn.call(scope, arr[i], i));                                                                           // 5417
  return result;                                                                                                      // 5418
};                                                                                                                    // 5419
                                                                                                                      // 5420
/**                                                                                                                   // 5421
 * Array#indexOf (<=IE8)                                                                                              // 5422
 *                                                                                                                    // 5423
 * @parma {Array} arr                                                                                                 // 5424
 * @param {Object} obj to find index of                                                                               // 5425
 * @param {Number} start                                                                                              // 5426
 * @api private                                                                                                       // 5427
 */                                                                                                                   // 5428
                                                                                                                      // 5429
exports.indexOf = function(arr, obj, start){                                                                          // 5430
  for (var i = start || 0, l = arr.length; i < l; i++) {                                                              // 5431
    if (arr[i] === obj)                                                                                               // 5432
      return i;                                                                                                       // 5433
  }                                                                                                                   // 5434
  return -1;                                                                                                          // 5435
};                                                                                                                    // 5436
                                                                                                                      // 5437
/**                                                                                                                   // 5438
 * Array#reduce (<=IE8)                                                                                               // 5439
 *                                                                                                                    // 5440
 * @param {Array} array                                                                                               // 5441
 * @param {Function} fn                                                                                               // 5442
 * @param {Object} initial value                                                                                      // 5443
 * @api private                                                                                                       // 5444
 */                                                                                                                   // 5445
                                                                                                                      // 5446
exports.reduce = function(arr, fn, val){                                                                              // 5447
  var rval = val;                                                                                                     // 5448
                                                                                                                      // 5449
  for (var i = 0, l = arr.length; i < l; i++) {                                                                       // 5450
    rval = fn(rval, arr[i], i, arr);                                                                                  // 5451
  }                                                                                                                   // 5452
                                                                                                                      // 5453
  return rval;                                                                                                        // 5454
};                                                                                                                    // 5455
                                                                                                                      // 5456
/**                                                                                                                   // 5457
 * Array#filter (<=IE8)                                                                                               // 5458
 *                                                                                                                    // 5459
 * @param {Array} array                                                                                               // 5460
 * @param {Function} fn                                                                                               // 5461
 * @api private                                                                                                       // 5462
 */                                                                                                                   // 5463
                                                                                                                      // 5464
exports.filter = function(arr, fn){                                                                                   // 5465
  var ret = [];                                                                                                       // 5466
                                                                                                                      // 5467
  for (var i = 0, l = arr.length; i < l; i++) {                                                                       // 5468
    var val = arr[i];                                                                                                 // 5469
    if (fn(val, i, arr)) ret.push(val);                                                                               // 5470
  }                                                                                                                   // 5471
                                                                                                                      // 5472
  return ret;                                                                                                         // 5473
};                                                                                                                    // 5474
                                                                                                                      // 5475
/**                                                                                                                   // 5476
 * Object.keys (<=IE8)                                                                                                // 5477
 *                                                                                                                    // 5478
 * @param {Object} obj                                                                                                // 5479
 * @return {Array} keys                                                                                               // 5480
 * @api private                                                                                                       // 5481
 */                                                                                                                   // 5482
                                                                                                                      // 5483
exports.keys = Object.keys || function(obj) {                                                                         // 5484
  var keys = []                                                                                                       // 5485
    , has = Object.prototype.hasOwnProperty // for `window` on <=IE8                                                  // 5486
                                                                                                                      // 5487
  for (var key in obj) {                                                                                              // 5488
    if (has.call(obj, key)) {                                                                                         // 5489
      keys.push(key);                                                                                                 // 5490
    }                                                                                                                 // 5491
  }                                                                                                                   // 5492
                                                                                                                      // 5493
  return keys;                                                                                                        // 5494
};                                                                                                                    // 5495
                                                                                                                      // 5496
/**                                                                                                                   // 5497
 * Watch the given `files` for changes                                                                                // 5498
 * and invoke `fn(file)` on modification.                                                                             // 5499
 *                                                                                                                    // 5500
 * @param {Array} files                                                                                               // 5501
 * @param {Function} fn                                                                                               // 5502
 * @api private                                                                                                       // 5503
 */                                                                                                                   // 5504
                                                                                                                      // 5505
exports.watch = function(files, fn){                                                                                  // 5506
  var options = { interval: 100 };                                                                                    // 5507
  files.forEach(function(file){                                                                                       // 5508
    debug('file %s', file);                                                                                           // 5509
    fs.watchFile(file, options, function(curr, prev){                                                                 // 5510
      if (prev.mtime < curr.mtime) fn(file);                                                                          // 5511
    });                                                                                                               // 5512
  });                                                                                                                 // 5513
};                                                                                                                    // 5514
                                                                                                                      // 5515
/**                                                                                                                   // 5516
 * Ignored files.                                                                                                     // 5517
 */                                                                                                                   // 5518
                                                                                                                      // 5519
function ignored(path){                                                                                               // 5520
  return !~ignore.indexOf(path);                                                                                      // 5521
}                                                                                                                     // 5522
                                                                                                                      // 5523
/**                                                                                                                   // 5524
 * Lookup files in the given `dir`.                                                                                   // 5525
 *                                                                                                                    // 5526
 * @return {Array}                                                                                                    // 5527
 * @api private                                                                                                       // 5528
 */                                                                                                                   // 5529
                                                                                                                      // 5530
exports.files = function(dir, ret){                                                                                   // 5531
  ret = ret || [];                                                                                                    // 5532
                                                                                                                      // 5533
  fs.readdirSync(dir)                                                                                                 // 5534
  .filter(ignored)                                                                                                    // 5535
  .forEach(function(path){                                                                                            // 5536
    path = join(dir, path);                                                                                           // 5537
    if (fs.statSync(path).isDirectory()) {                                                                            // 5538
      exports.files(path, ret);                                                                                       // 5539
    } else if (path.match(/\.(js|coffee|litcoffee|coffee.md)$/)) {                                                    // 5540
      ret.push(path);                                                                                                 // 5541
    }                                                                                                                 // 5542
  });                                                                                                                 // 5543
                                                                                                                      // 5544
  return ret;                                                                                                         // 5545
};                                                                                                                    // 5546
                                                                                                                      // 5547
/**                                                                                                                   // 5548
 * Compute a slug from the given `str`.                                                                               // 5549
 *                                                                                                                    // 5550
 * @param {String} str                                                                                                // 5551
 * @return {String}                                                                                                   // 5552
 * @api private                                                                                                       // 5553
 */                                                                                                                   // 5554
                                                                                                                      // 5555
exports.slug = function(str){                                                                                         // 5556
  return str                                                                                                          // 5557
    .toLowerCase()                                                                                                    // 5558
    .replace(/ +/g, '-')                                                                                              // 5559
    .replace(/[^-\w]/g, '');                                                                                          // 5560
};                                                                                                                    // 5561
                                                                                                                      // 5562
/**                                                                                                                   // 5563
 * Strip the function definition from `str`,                                                                          // 5564
 * and re-indent for pre whitespace.                                                                                  // 5565
 */                                                                                                                   // 5566
                                                                                                                      // 5567
exports.clean = function(str) {                                                                                       // 5568
  str = str                                                                                                           // 5569
    .replace(/\r\n?|[\n\u2028\u2029]/g, "\n").replace(/^\uFEFF/, '')                                                  // 5570
    .replace(/^function *\(.*\) *{/, '')                                                                              // 5571
    .replace(/\s+\}$/, '');                                                                                           // 5572
                                                                                                                      // 5573
  var spaces = str.match(/^\n?( *)/)[1].length                                                                        // 5574
    , tabs = str.match(/^\n?(\t*)/)[1].length                                                                         // 5575
    , re = new RegExp('^\n?' + (tabs ? '\t' : ' ') + '{' + (tabs ? tabs : spaces) + '}', 'gm');                       // 5576
                                                                                                                      // 5577
  str = str.replace(re, '');                                                                                          // 5578
                                                                                                                      // 5579
  return exports.trim(str);                                                                                           // 5580
};                                                                                                                    // 5581
                                                                                                                      // 5582
/**                                                                                                                   // 5583
 * Escape regular expression characters in `str`.                                                                     // 5584
 *                                                                                                                    // 5585
 * @param {String} str                                                                                                // 5586
 * @return {String}                                                                                                   // 5587
 * @api private                                                                                                       // 5588
 */                                                                                                                   // 5589
                                                                                                                      // 5590
exports.escapeRegexp = function(str){                                                                                 // 5591
  return str.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");                                                                 // 5592
};                                                                                                                    // 5593
                                                                                                                      // 5594
/**                                                                                                                   // 5595
 * Trim the given `str`.                                                                                              // 5596
 *                                                                                                                    // 5597
 * @param {String} str                                                                                                // 5598
 * @return {String}                                                                                                   // 5599
 * @api private                                                                                                       // 5600
 */                                                                                                                   // 5601
                                                                                                                      // 5602
exports.trim = function(str){                                                                                         // 5603
  return str.replace(/^\s+|\s+$/g, '');                                                                               // 5604
};                                                                                                                    // 5605
                                                                                                                      // 5606
/**                                                                                                                   // 5607
 * Parse the given `qs`.                                                                                              // 5608
 *                                                                                                                    // 5609
 * @param {String} qs                                                                                                 // 5610
 * @return {Object}                                                                                                   // 5611
 * @api private                                                                                                       // 5612
 */                                                                                                                   // 5613
                                                                                                                      // 5614
exports.parseQuery = function(qs){                                                                                    // 5615
  return exports.reduce(qs.replace('?', '').split('&'), function(obj, pair){                                          // 5616
    var i = pair.indexOf('=')                                                                                         // 5617
      , key = pair.slice(0, i)                                                                                        // 5618
      , val = pair.slice(++i);                                                                                        // 5619
                                                                                                                      // 5620
    obj[key] = decodeURIComponent(val);                                                                               // 5621
    return obj;                                                                                                       // 5622
  }, {});                                                                                                             // 5623
};                                                                                                                    // 5624
                                                                                                                      // 5625
/**                                                                                                                   // 5626
 * Highlight the given string of `js`.                                                                                // 5627
 *                                                                                                                    // 5628
 * @param {String} js                                                                                                 // 5629
 * @return {String}                                                                                                   // 5630
 * @api private                                                                                                       // 5631
 */                                                                                                                   // 5632
                                                                                                                      // 5633
function highlight(js) {                                                                                              // 5634
  return js                                                                                                           // 5635
    .replace(/</g, '&lt;')                                                                                            // 5636
    .replace(/>/g, '&gt;')                                                                                            // 5637
    .replace(/\/\/(.*)/gm, '<span class="comment">//$1</span>')                                                       // 5638
    .replace(/('.*?')/gm, '<span class="string">$1</span>')                                                           // 5639
    .replace(/(\d+\.\d+)/gm, '<span class="number">$1</span>')                                                        // 5640
    .replace(/(\d+)/gm, '<span class="number">$1</span>')                                                             // 5641
    .replace(/\bnew *(\w+)/gm, '<span class="keyword">new</span> <span class="init">$1</span>')                       // 5642
    .replace(/\b(function|new|throw|return|var|if|else)\b/gm, '<span class="keyword">$1</span>')                      // 5643
}                                                                                                                     // 5644
                                                                                                                      // 5645
/**                                                                                                                   // 5646
 * Highlight the contents of tag `name`.                                                                              // 5647
 *                                                                                                                    // 5648
 * @param {String} name                                                                                               // 5649
 * @api private                                                                                                       // 5650
 */                                                                                                                   // 5651
                                                                                                                      // 5652
exports.highlightTags = function(name) {                                                                              // 5653
  var code = document.getElementsByTagName(name);                                                                     // 5654
  for (var i = 0, len = code.length; i < len; ++i) {                                                                  // 5655
    code[i].innerHTML = highlight(code[i].innerHTML);                                                                 // 5656
  }                                                                                                                   // 5657
};                                                                                                                    // 5658
                                                                                                                      // 5659
}); // module: utils.js                                                                                               // 5660
// The global object is "self" in Web Workers.                                                                        // 5661
global = (function() { return this; })();                                                                             // 5662
                                                                                                                      // 5663
/**                                                                                                                   // 5664
 * Save timer references to avoid Sinon interfering (see GH-237).                                                     // 5665
 */                                                                                                                   // 5666
                                                                                                                      // 5667
var Date = global.Date;                                                                                               // 5668
var setTimeout = global.setTimeout;                                                                                   // 5669
var setInterval = global.setInterval;                                                                                 // 5670
var clearTimeout = global.clearTimeout;                                                                               // 5671
var clearInterval = global.clearInterval;                                                                             // 5672
                                                                                                                      // 5673
/**                                                                                                                   // 5674
 * Node shims.                                                                                                        // 5675
 *                                                                                                                    // 5676
 * These are meant only to allow                                                                                      // 5677
 * mocha.js to run untouched, not                                                                                     // 5678
 * to allow running node code in                                                                                      // 5679
 * the browser.                                                                                                       // 5680
 */                                                                                                                   // 5681
                                                                                                                      // 5682
var process = {};                                                                                                     // 5683
process.exit = function(status){};                                                                                    // 5684
process.stdout = {};                                                                                                  // 5685
                                                                                                                      // 5686
var uncaughtExceptionHandlers = [];                                                                                   // 5687
                                                                                                                      // 5688
/**                                                                                                                   // 5689
 * Remove uncaughtException listener.                                                                                 // 5690
 */                                                                                                                   // 5691
                                                                                                                      // 5692
process.removeListener = function(e, fn){                                                                             // 5693
  if ('uncaughtException' == e) {                                                                                     // 5694
    global.onerror = function() {};                                                                                   // 5695
    var i = Mocha.utils.indexOf(uncaughtExceptionHandlers, fn);                                                       // 5696
    if (i != -1) { uncaughtExceptionHandlers.splice(i, 1); }                                                          // 5697
  }                                                                                                                   // 5698
};                                                                                                                    // 5699
                                                                                                                      // 5700
/**                                                                                                                   // 5701
 * Implements uncaughtException listener.                                                                             // 5702
 */                                                                                                                   // 5703
                                                                                                                      // 5704
process.on = function(e, fn){                                                                                         // 5705
  if ('uncaughtException' == e) {                                                                                     // 5706
    global.onerror = function(err, url, line){                                                                        // 5707
      fn(new Error(err + ' (' + url + ':' + line + ')'));                                                             // 5708
      return true;                                                                                                    // 5709
    };                                                                                                                // 5710
    uncaughtExceptionHandlers.push(fn);                                                                               // 5711
  }                                                                                                                   // 5712
};                                                                                                                    // 5713
                                                                                                                      // 5714
/**                                                                                                                   // 5715
 * Expose mocha.                                                                                                      // 5716
 */                                                                                                                   // 5717
                                                                                                                      // 5718
var Mocha = global.Mocha = require('mocha'),                                                                          // 5719
    mocha = global.mocha = new Mocha({ reporter: 'html' });                                                           // 5720
                                                                                                                      // 5721
// The BDD UI is registered by default, but no UI will be functional in the                                           // 5722
// browser without an explicit call to the overridden `mocha.ui` (see below).                                         // 5723
// Ensure that this default UI does not expose its methods to the global scope.                                       // 5724
mocha.suite.removeAllListeners('pre-require');                                                                        // 5725
                                                                                                                      // 5726
var immediateQueue = []                                                                                               // 5727
  , immediateTimeout;                                                                                                 // 5728
                                                                                                                      // 5729
function timeslice() {                                                                                                // 5730
  var immediateStart = new Date().getTime();                                                                          // 5731
  while (immediateQueue.length && (new Date().getTime() - immediateStart) < 100) {                                    // 5732
    immediateQueue.shift()();                                                                                         // 5733
  }                                                                                                                   // 5734
  if (immediateQueue.length) {                                                                                        // 5735
    immediateTimeout = setTimeout(timeslice, 0);                                                                      // 5736
  } else {                                                                                                            // 5737
    immediateTimeout = null;                                                                                          // 5738
  }                                                                                                                   // 5739
}                                                                                                                     // 5740
                                                                                                                      // 5741
/**                                                                                                                   // 5742
 * High-performance override of Runner.immediately.                                                                   // 5743
 */                                                                                                                   // 5744
                                                                                                                      // 5745
Mocha.Runner.immediately = function(callback) {                                                                       // 5746
  immediateQueue.push(callback);                                                                                      // 5747
  if (!immediateTimeout) {                                                                                            // 5748
    immediateTimeout = setTimeout(timeslice, 0);                                                                      // 5749
  }                                                                                                                   // 5750
};                                                                                                                    // 5751
                                                                                                                      // 5752
/**                                                                                                                   // 5753
 * Function to allow assertion libraries to throw errors directly into mocha.                                         // 5754
 * This is useful when running tests in a browser because window.onerror will                                         // 5755
 * only receive the 'message' attribute of the Error.                                                                 // 5756
 */                                                                                                                   // 5757
mocha.throwError = function(err) {                                                                                    // 5758
  Mocha.utils.forEach(uncaughtExceptionHandlers, function (fn) {                                                      // 5759
    fn(err);                                                                                                          // 5760
  });                                                                                                                 // 5761
  throw err;                                                                                                          // 5762
};                                                                                                                    // 5763
                                                                                                                      // 5764
/**                                                                                                                   // 5765
 * Override ui to ensure that the ui functions are initialized.                                                       // 5766
 * Normally this would happen in Mocha.prototype.loadFiles.                                                           // 5767
 */                                                                                                                   // 5768
                                                                                                                      // 5769
mocha.ui = function(ui){                                                                                              // 5770
  Mocha.prototype.ui.call(this, ui);                                                                                  // 5771
  this.suite.emit('pre-require', global, null, this);                                                                 // 5772
  return this;                                                                                                        // 5773
};                                                                                                                    // 5774
                                                                                                                      // 5775
/**                                                                                                                   // 5776
 * Setup mocha with the given setting options.                                                                        // 5777
 */                                                                                                                   // 5778
                                                                                                                      // 5779
mocha.setup = function(opts){                                                                                         // 5780
  if ('string' == typeof opts) opts = { ui: opts };                                                                   // 5781
  for (var opt in opts) this[opt](opts[opt]);                                                                         // 5782
  return this;                                                                                                        // 5783
};                                                                                                                    // 5784
                                                                                                                      // 5785
/**                                                                                                                   // 5786
 * Run mocha, returning the Runner.                                                                                   // 5787
 */                                                                                                                   // 5788
                                                                                                                      // 5789
mocha.run = function(fn){                                                                                             // 5790
  var options = mocha.options;                                                                                        // 5791
  mocha.globals('location');                                                                                          // 5792
                                                                                                                      // 5793
  var query = Mocha.utils.parseQuery(global.location.search || '');                                                   // 5794
  if (query.grep) mocha.grep(query.grep);                                                                             // 5795
  if (query.invert) mocha.invert();                                                                                   // 5796
                                                                                                                      // 5797
  return Mocha.prototype.run.call(mocha, function(){                                                                  // 5798
    // The DOM Document is not available in Web Workers.                                                              // 5799
    if (global.document) {                                                                                            // 5800
      Mocha.utils.highlightTags('code');                                                                              // 5801
    }                                                                                                                 // 5802
    if (fn) fn();                                                                                                     // 5803
  });                                                                                                                 // 5804
};                                                                                                                    // 5805
                                                                                                                      // 5806
/**                                                                                                                   // 5807
 * Expose the process shim.                                                                                           // 5808
 */                                                                                                                   // 5809
                                                                                                                      // 5810
Mocha.process = process;                                                                                              // 5811
})();                                                                                                                 // 5812
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/mike_mocha/reporter.js                                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
MochaWeb = this.MochaWeb = {};                                                                                        // 1
                                                                                                                      // 2
if (Meteor.isServer)                                                                                                  // 3
  var Base = Npm.require("mocha/lib/reporters").Base;                                                                 // 4
else                                                                                                                  // 5
  Base = Mocha.reporters.Base                                                                                         // 6
                                                                                                                      // 7
function getAncestors(testObject, ancestors){                                                                         // 8
  if (!ancestors)                                                                                                     // 9
    ancestors = []                                                                                                    // 10
  if (testObject.parent && testObject.parent.title !== ""){                                                           // 11
    ancestors.push(testObject.parent.title)                                                                           // 12
    return getAncestors(testObject.parent, ancestors);                                                                // 13
  }                                                                                                                   // 14
  else{                                                                                                               // 15
    return ancestors;                                                                                                 // 16
  }                                                                                                                   // 17
};                                                                                                                    // 18
                                                                                                                      // 19
MochaWeb.MeteorCollectionTestReporter = function(runner){                                                             // 20
  Base.call(this, runner);                                                                                            // 21
  var self = this;                                                                                                    // 22
                                                                                                                      // 23
  function saveTestResult(test){                                                                                      // 24
    if (test.state === "failed"){                                                                                     // 25
      console.log(test.err.message);                                                                                  // 26
      console.log(test.err.stack);                                                                                    // 27
    }                                                                                                                 // 28
                                                                                                                      // 29
    // console.log("SAVE TEST RESULT", test);                                                                         // 30
                                                                                                                      // 31
    var ancestors = getAncestors(test);                                                                               // 32
    var result = {                                                                                                    // 33
      id: "mocha:" + ancestors.join(":") + ":" + test.title,                                                          // 34
      async: !!test.async,                                                                                            // 35
      framework: "mocha",                                                                                             // 36
      name: test.title,                                                                                               // 37
      pending: test.pending,                                                                                          // 38
      result: test.state,                                                                                             // 39
      duration: test.duration,                                                                                        // 40
      timeOut: test._timeout,                                                                                         // 41
      timedOut: test.timedOut,                                                                                        // 42
      ancestors: ancestors,                                                                                           // 43
      isClient: Meteor.isClient,                                                                                      // 44
      isServer: Meteor.isServer,                                                                                      // 45
      timestamp: new Date()                                                                                           // 46
    };                                                                                                                // 47
    if (typeof test.state === "undefined" && test.pending === true) {                                                 // 48
      result.result = "pending";                                                                                      // 49
    }                                                                                                                 // 50
    if (test.err){                                                                                                    // 51
      result.failureMessage = test.err.message;                                                                       // 52
      result.failureStackTrace = test.err.stack;                                                                      // 53
    }                                                                                                                 // 54
    // console.log("POSTING RESULT", result);                                                                         // 55
                                                                                                                      // 56
    ddpParentConnection.call("velocity/reports/submit", result, function(error, result){                              // 57
      if (error){                                                                                                     // 58
        console.error("ERROR WRITING TEST", error);                                                                   // 59
      }                                                                                                               // 60
    });                                                                                                               // 61
  }                                                                                                                   // 62
                                                                                                                      // 63
  runner.on("start", Meteor.bindEnvironment(                                                                          // 64
    function(){                                                                                                       // 65
      //TODO tell testRunner that mocha tests have started                                                            // 66
    },                                                                                                                // 67
    function(err){                                                                                                    // 68
      throw err;                                                                                                      // 69
    }                                                                                                                 // 70
  ));                                                                                                                 // 71
                                                                                                                      // 72
  ["pass", "fail", "pending"].forEach(function(testEvent){                                                            // 73
    runner.on(testEvent, Meteor.bindEnvironment(                                                                      // 74
      function(test){                                                                                                 // 75
        saveTestResult(test);                                                                                         // 76
      },                                                                                                              // 77
      function(err){                                                                                                  // 78
        throw err;                                                                                                    // 79
      }                                                                                                               // 80
    ));                                                                                                               // 81
  });                                                                                                                 // 82
                                                                                                                      // 83
  runner.on('end', Meteor.bindEnvironment(function(){                                                                 // 84
    //TODO tell testRunner all mocha web tests have finished                                                          // 85
  }, function(err){                                                                                                   // 86
    throw err;                                                                                                        // 87
  }));                                                                                                                // 88
};                                                                                                                    // 89
                                                                                                                      // 90
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/mike_mocha/client.js                                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
ddpParentConnection = null;                                                                                           // 1
window.mochaWebClientTestsComplete = false;                                                                           // 2
                                                                                                                      // 3
var testSetupFunctions = [];                                                                                          // 4
                                                                                                                      // 5
MochaWeb.testOnly = function(callback){                                                                               // 6
  testSetupFunctions.push(callback);                                                                                  // 7
};                                                                                                                    // 8
                                                                                                                      // 9
window.MirrorURLs = new Meteor.Collection("mirrorUrls");                                                              // 10
                                                                                                                      // 11
window.chai = Package['practicalmeteor:chai'].chai;                                                                   // 12
                                                                                                                      // 13
                                                                                                                      // 14
Meteor.startup(function(){                                                                                            // 15
  //TODO this method should probably live in the Velocity namespace velocity/mirrorInfo?                              // 16
  Meteor.call("mirrorInfo", function(error, mirrorInfo){                                                              // 17
    if (mirrorInfo.isMirror){                                                                                         // 18
      Session.set("mochaWebMirror", true);                                                                            // 19
      Meteor.setTimeout(function(){                                                                                   // 20
        ddpParentConnection = DDP.connect(mirrorInfo.parentUrl);                                                      // 21
        ddpParentConnection.call("velocity/reports/reset", {framework: 'mocha'}, function(err, result){               // 22
          // enable stack trace with line numbers with assertions                                                     // 23
          chai.config.includeStack = true;                                                                            // 24
          //TODO allow ui to be customized with Meteor.settings                                                       // 25
          mocha.setup({reporter: MochaWeb.MeteorCollectionTestReporter, ui: "bdd"});                                  // 26
          testSetupFunctions.forEach(function(testFunction){                                                          // 27
            testFunction();                                                                                           // 28
          });                                                                                                         // 29
          mocha.run(function(){                                                                                       // 30
            window.mochaWebClientTestsComplete = true;                                                                // 31
            Meteor.call("clientTestsComplete", function(err, result){                                                 // 32
              if (err){                                                                                               // 33
                console.error("ERROR INVOKING CLIENT TESTS COMPLETE", err);                                           // 34
              }                                                                                                       // 35
            });                                                                                                       // 36
          });                                                                                                         // 37
        });                                                                                                           // 38
      }, 0);                                                                                                          // 39
    } else {                                                                                                          // 40
      Session.set("mochaWebMirror", false);                                                                           // 41
    }                                                                                                                 // 42
  });                                                                                                                 // 43
});                                                                                                                   // 44
                                                                                                                      // 45
Template.mochaweb.helpers({                                                                                           // 46
  mochaWebIFrameURL: function(){                                                                                      // 47
    var mirror = VelocityMirrors.findOne({framework: "mocha", state: "ready"});                                       // 48
    if (mirror && mirror.rootUrl){                                                                                    // 49
      return mirror.rootUrl + mirror.rootUrlPath + "&lastModified=" + mirror.lastModified;                            // 50
    }                                                                                                                 // 51
    return null;                                                                                                      // 52
  }                                                                                                                   // 53
});                                                                                                                   // 54
                                                                                                                      // 55
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['mike:mocha'] = {
  MochaWeb: MochaWeb
};

})();
