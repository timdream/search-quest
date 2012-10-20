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
    this.fire(this._checkin(keyword), player);
  },

  fire: function map_fire(mapping, player) {
    for (var i = 0; i < mapping.length; i++) {
      if (this._keywords.indexOf(mapping[i])) {
        $('#map div.placeholder').eq(this._keywords.indexOf(mapping[i])).addClass('active');
      }
    }
  },

  _checkin: function map_checkin(keyword) {
    var mapping = [];
    for (var i = 0; i < this.options.width*this.options.height; i++) {
      if (Math.random() < 0.05)
        mapping.push(this._keywords[i]);
    }

    return mapping;
  }
};
