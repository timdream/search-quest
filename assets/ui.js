'use strict';

var SearchQuest = {
  init: function sq_init() {
    this.registerEvents();
  },

  _focus: 0,

  _MENUITEMCOUNT: $('#main-menu li').length,

  registerEvents: function sq_registerEvents() {
    var self = this;

    $('#player-number').change(function onNumberChange(evt) {
      $('#player-number-label').text($(this).val());
    });
    
    $('#quest-cate').change(function onCateChange(evt) {
      $('#quest-cate-label').text($(this).val());
    });

    $('#search').submit(function onSubmit(evt) {
      evt.preventDefault();
      var key = $('#keyword').val();
      Map.match(key);
      $('#keyword').val('');
      return false;
    });

    $('#main-menu li').mouseenter(function onMouseenter() {
      $(this).siblings('.active').removeClass('active');
      $(this).addClass('active');
      self._focus = parseInt($(this).data('index'), 10);
    });
    
    $('body').live('keydown', function onKeydown(evt){
      switch (evt.keyCode) {
        case 13:  //enter
          self.startGame();
          break;
        case 37:  //<-
          switch (self._focus) {
            case 0:
              self.prevPlayerNumber();
              break;
            case 1:
              self.prevQuestCate();
              break;
            case 2:
              // do nothing;
              break;
            case 3:
              // do nothing
              break;
            case 4:
              // do nothing
              break;
          }
          break;
        case 38:  //^
          self._focus --;
          break;
        case 39:  //->
          switch (self._focus) {
            case 0:
              self.nextPlayerNumber();
              break;
            case 1:
              self.nextQuestCate();
              break;
            case 2:
              // do nothing;
              break;
            case 3:
              self.startGame();
              break;
            case 4:
              self.displayTagDialog();
              break;
          }
          break;
        case 40:  // down
          self._focus ++;
          break;
      }

      if (self._focus < 0)
        self._focus += self._MENUITEMCOUNT;

      self._focus = self._focus % self._MENUITEMCOUNT;
      $('#main-menu li.active').removeClass('active');
      $('#main-menu li[data-index=' + self._focus + ']').addClass('active');
    });
  },
  
  prevPlayerNumber: function sq_nextPlayerNumber() {
    var current = $('#player-number')[0].selectedIndex;
    var total = $('#player-number option').length;
    current--;
    current = (current + total) % total;
    $('#player-number')[0].selectedIndex = current;
    $('#player-number').trigger('change');
  },

  prevQuestCate: function sq_nextQuestCate() {
    var current = $('#quest-cate')[0].selectedIndex;
    var total = $('#quest-cate option').length;
    current--;
    current = (current + total) % total;
    $('#quest-cate')[0].selectedIndex = current;
    $('#quest-cate').trigger('change');
  },

  nextPlayerNumber: function sq_nextPlayerNumber() {
    var current = $('#player-number')[0].selectedIndex;
    var total = $('#player-number option').length;
    current++;
    current = current % total;
    $('#player-number')[0].selectedIndex = current;
    $('#player-number').trigger('change');
  },

  nextQuestCate: function sq_nextQuestCate() {
    var current = $('#quest-cate')[0].selectedIndex;
    var total = $('#quest-cate option').length;
    current++;
    current = current % total;
    $('#quest-cate')[0].selectedIndex = current;
    $('#quest-cate').trigger('change');
  },

  displayTagDialog: function sq_displayTagDialog() {
  },

  startGame: function sq_startGame() {
    $('#start').slideUp();
    $('#game').slideDown();
    Map.init({});
  }
};

SearchQuest.init();
