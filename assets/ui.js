'use strict';

var SearchQuest = {
  init: function sq_init() {
    this.registerEvents();
  },

  registerEvents: function sq_registerEvents() {
    $('#1p-start,#2p-start').click(function vspc(){
      $('#hero-unit').slideUp();
      $('#ui').fadeIn();
      $('#header').slideDown();
    });
  }
};

SearchQuest.init();
