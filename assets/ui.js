'use strict';

var SearchQuest = {
  init: function sq_init() {
    this.registerEvents();
  },

  registerEvents: function sq_registerEvents() {
    $('#1p-start,#2p-start').click(function vspc(){
      $('#start').slideUp();
      $('#main-ui').slideDown();
    });
  }
};

SearchQuest.init();
