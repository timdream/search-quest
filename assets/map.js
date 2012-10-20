'use strict';

var Map = {
  
  options: {},

  _length: 100,

  _units: [],

  getKeywords: function map_getKeywords(){
    var keywords = [
      '討厭', '說話', '迪奇', '魔王', 'Peter', '不得不', '主要', '凱薩琳', '士兵', '大戰', '對抗', '房子', '擔心', '敘述', '是電影', '殘酷', '環島', '痞子英雄', '等待', '經過', '背後', '菲利浦', '諷刺', '豆導', '趙薇', '43m', 'MIB', '上尉', '分享', '刻意', '子女', '帥氣', '日人', '明明', '春梅', '比利', '獵人', '看來', '荒謬', '野獸', '開戰時刻', '阿樹', '阿賢', '離婚', '首相', '麥克', '黃四郎', '黑天鵝', '一片', '也因', '他也', '受傷', '多麼', '大陸', '女樹', '孤獨', '帶來', '搭配', '是人', '梅蘭芳', '死法', '狀況', '猩球崛起'
    ];

    return keywords;
  },

  _lineLength: 5,

  _defaultOptions: {
    width: 5,
    height: 5,
    'player-number': '1P',
    'quest-cate': ''
  },

  init: function map_init(options) {
    if (this._inited)
      return;
    $('#keyword').val('').focus();

    this.options = this._defaultOptions;
    this._keywords = this.getKeywords();
    this.generate();
    this.render();
    this._inited = true;
  },

  generate: function map_generate() {

  },

  render: function map_render() {
    $('#map').width(this._length * this.options.width).height(this._length * this.options.height);
    
    for (var i = 0; i < this.options.height; i++) {
      for (var j = 0; j < this.options.width; j++) {
        var unit = $('<div class="placeholder" style="float: left;width: '+this._length+'px; height: '+this._length+'px;" data-index="'+i+','+j+'"><div class="gem"><div class="craft">'+this._keywords[i*this.options.width+j]+'</div></div></div>');
        unit.appendTo($('#map'));
        this._units.push($('#map div.placeholder:last'));
      }
    }
  },

  createBomb: function map_createBomb(keyword) {
    $('<span class="label label-info moving"><a target="_blank" href="http://tw.search.yahoo.com/search?p='+keyword+'">'+keyword+'</a></span>').appendTo($('#bombArea'));
    return $('#bombArea span.moving:last');
  },

  fire: function map_fire(mapping, player, bomb, keyword) {
    var matched = false;
    for (var i = 0; i < mapping.length; i++) {
      if (this._keywords.indexOf(mapping[i])) {
        matched = true;
        var target = $('#map div.placeholder').eq(this._keywords.indexOf(mapping[i]));
        target.addClass('active');
        self.checkBingo(i);
        var clone = bomb.clone();
        var x = target.offset().left - bomb.parent().offset().left;
        var y = target.offset().top - bomb.parent().offset().top;
        clone.css({'-moz-transform': 'translate(0, 0) rotate(0deg)', '-webkit-transform': 'translate(0, 0) rotate(0deg)'}).appendTo($('#bombArea')).removeClass('moving').addClass('flying');
        setTimeout((function(clone, x, y){
          return function(){
            clone.css({'-moz-transform': 'translate('+x+'px,'+y+'px) rotate(1800deg)', '-webkit-transform': 'translate('+x+'px,'+y+'px) rotate(1800deg)'});
          }})(clone, x, y),10);
      }
    }
    if (matched) bomb.remove();
    return matched;
  },

  match: function map_match(keyword, player) {
    var self = this;
    API.getYSearchText(keyword, function onSearchReturn(data) {
      console.log(data);
      var mapping = [];
      for (var i = 0; i < self.options.width * self.options.height; i++) {
        if (data.indexOf(self._keywords[i]) >= 0 && keyword.indexOf(self._keywords[i]) < 0 && !$('#map div.placeholder').eq(i).hasClass('active')) {
          // success
          mapping.push(self._keywords[i]);
        } else {
          // fail
        }
      }
      var bomb = self.createBomb(keyword);
      var matched = self.fire(mapping, player, bomb);
      if (mapping.length) bomb.hide().remove();
      else {
        bomb.bind('webkitAnimationEnd animationend', function () {
          bomb.remove();
        });
        bomb.removeClass('moving').addClass('deleting');
      }
    });
  },

  checkBingo: function map_checkBingo(root) {
    var x = root % this.options.width;
    var y = (root - x)/ this.options.height;
    var line = 0;
    var array = [];
    for (var i = 0; i < this.options.width; i++) {
      var target = $('#map div.placeholder').eq(y * this.options.width + i);
      if (target.hasClass('active'))
        array.push(target);
      }
    }

    if (array.length == this._lineLength) {
      // new line!
      // scoreBox.fitLine();
      line ++;
      for (var i = 0; i < array.length; i++) {
        array[i].addClass('firefox');
      }
    }

    array = [];

    for (var j = 0; j < this.options.height; j++) {
      var target = $('#map div.placeholder').eq(j * this.options.height + x);
      if (target.hasClass('active')) {
        array.push(target);
      }
    }

    if (array.length == this._lineLength) {
      // new line!
      // scoreBox.fitLine();
      line++;
      for (var i = 0; i < array.length; i++) {
        array[i].addClass('firefox');
      }
    }

    array = [];

    //  /
    if (x + y == this._lineLength - 1) {
      for (var i = 0; i < this.options.width; i++) {
        var target = $('#map div.placeholder').eq(i* (this.options.width - 1));
        if (target.hasClass('active')) {
          array.push(target);
        }
      }
    }

    if (array.length == this._lineLength) {
      line++;
      for (var i = 0; i < array.length; i++) {
        array[i].addClass('firefox');
      }
    }

    array = [];

    if (x == y) {
      for (var i = 0; i < this.options.width; i++) {
        var target = $('#map div.placeholder').eq(i * this.options.width + i);
        if (target.hasClass('active')) {
          array.push(target);
        }
      }
    }

    if (array.length == this._lineLength){
      line++;
      for (var i = 0; i < array.length; i++) {
        array[i].addClass('firefox');
      }
    }

    if (line) {
      scoreBox.fitLine(line);
    }
    // \
  }
};
