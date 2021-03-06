/*
 * JS Bond
 * Simple two-way data binding library for the browser
 *
 * Author: Thameera Senanayaka
 * License: MIT
 */

;(function(window, define) {

  var boundVals = {};
  var ATTR_NAME = 'data-bond';

  var isInputElement = function(tagName) {
    var tag = tagName.toLowerCase();
    return (tag === 'input' || tag === 'select' || tag === 'textarea');
  };

  var Bond = function(varName, initialValue) {

    // Duplicate check
    if (boundVals[varName]) {
      console.warn('Bond: Duplicate name detected: ' + varName);
    }

    boundVals[varName] = 1;

    var newBond = (function() {
      var __val = null;
      var observers = [];
      var curTarget = null;

      // Updates all DOM elements bound to the current Bond
      var updateDOM = function(val) {
        observers.forEach(function(obs) {
          // Do not update the element being changed (if any)
          if (obs === curTarget) {
            curTarget = null;
            return;
          }

          if (isInputElement(obs.tagName)) {
            obs.value = __val;
          } else {
            obs.innerHTML = __val;
          }
        });
      };

      // Bond object
      var obj = {
        get: function() {
          return __val;
        },
        set: function(val) {
          __val = val;
          updateDOM();
        }
      };

      // Find DOM elements bound to current bond ("observers")
      var elements = document.querySelectorAll('[' + ATTR_NAME + '="' + varName + '"]');
      for (var i = 0; i < elements.length; i++) {
        // Attach event listers to input elements
        if (isInputElement(elements[i].tagName)) {
          elements[i].addEventListener('input', function(e) {
            curTarget = e.target;
            obj.set(e.target.value);
          });
        }
        observers.push(elements[i]);
      }

      // Set the optional initial value
      obj.set(initialValue);

      // Make the attributes unmodifiable
      Object.freeze(obj);

      return obj;
    })();

    return newBond;
  };

  // Expose to AMD, CommonJS or as a global
  if (typeof define === 'function' && define.amd !== undefined) {
    define(function () {
      return Bond;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = Bond;
  } else {
    window.Bond = Bond;
  }

})(this, this.define);

