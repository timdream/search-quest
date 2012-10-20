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

  _defaultOptions: {
    width: 6,
    height: 6,
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

  match: function map_match(keyword, player) {
    var self = this;
    var bomb = this.createBomb(keyword);
    setTimeout(function() {
      var matched = self.fire(self._checkin(keyword), player, bomb);
      bomb.bind('animationend webkitAnimationEnd oanimationend', function() {
        bomb.remove();
      });
      if (matched) bomb.hide().remove();
      else bomb.removeClass('moving').addClass('deleting');

    }, 3000);
  },

  createBomb: function map_createBomb(keyword) {
    $('<span class="label label-info moving">'+keyword+'</span>').appendTo($('#bombArea'));
    return $('#bombArea span.moving:last');
  },

  fire: function map_fire(mapping, player, bomb) {
    var matched = false;
    for (var i = 0; i < mapping.length; i++) {
      if (this._keywords.indexOf(mapping[i])) {
        matched = true;
        var target = $('#map div.placeholder').eq(this._keywords.indexOf(mapping[i]));
        var clone = bomb.clone();
        clone.css({top: bomb.offset().top, left: bomb.offset().left}).appendTo($('#bombArea')).removeClass('moving').addClass('flying').css({top: target.offset().top, left: target.offset().left});
      }
    }
    return matched;
  },

  _checkin: function map_checkin(keyword) {
    this._currentKeyword = keyword;
    var mapping = [];
    for (var i = 0; i < this.options.width*this.options.height; i++) {
      if (Math.random() < 0.02)
        mapping.push(this._keywords[i]);
    }

    return mapping;
  }
};
