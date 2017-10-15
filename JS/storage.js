;(function (){
  'use strict';
  window.S = {};
  S.set = function(key, val){
    val = JSON.stringify(val);
    return localStorage.setItem(key, val);
  };

  S.get = function(key){
    return JSON.parse(localStorage.getItem(key));
  };
})();