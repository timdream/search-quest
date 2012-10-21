'use strict';

var Map = {
  
  options: {},

  _length: 100,

  _units: [],

  _debugMode: true,

  getKeywords: function map_getKeywords(type) {
    var keywords = [];
    if (window._debugMode) {
      type = 'Debug';
    }
    switch (type) {
      case 'Debug':
        keywords = ['安麗', '李宗瑞', '蘋果', '大聯盟', '中華電信', '九把刀', '陳妍希', '英雄聯盟', 'TPA', '不要問', '回不去', '李組長', '22k', '華碩', '變形金剛', '九二共識', '塊陶阿', '經濟動能推升', '賈柏斯', '余詳銓', '台科', '竹科', '保險套', '吳宗憲', '你好大'];
      case 'News':
        keywords = ['華碩',
          '中華電信',
          '李宗瑞',
          '九把刀',
          '施顏祥',
          '蘋果',
          '健保',
          '諾貝爾',
          '個資法',
          '九二共識',
          '阿基師',
          '釣魚台',
          '賈伯斯',
          '吳宗憲',
          '大聯盟',
          '麥當勞',
          '竹科',
          '巴西',
          '流星雨',
          '大樂透',
          '救援王',
          '保險套',
          '捷運',
          '歐巴馬',
          '高鐵',
        '賓拉登'];
        break;
      case 'Movie':
        keywords = ['鐵達尼號', '單車', '蝙蝠俠', '鋼鐵人', '福爾摩斯', '變形金剛', '陳妍希', '東京', '柯博文', '豆導', '傻瓜', '翁山蘇姬', '柴契爾', '好萊塢', '佛地魔', '逆光飛翔', '木偶人', '翻滾', '陳漢典', '打十個', '痞子英雄', '皮克斯', '復仇者', '吸血鬼', '史瑞克']
        break;
      case 'BBS':
        keywords = ['李組長', '爪爪', '臣亮言', '好笑嗎', '炸你全家', '大大', '八卦', '新警察', '余祥銓', '成龍', '臣又', '洗澡', '好人', '英雄聯盟', '不要問', '卡卡獸', '批踢踢', '騜', '吱吱', '安麗', '大聲', '回不去了', '宅男', '能吃嗎', '天龍國', '台科'];
        break;
    }

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
    window.scoreBox = new ScoreBox($("#scorebox"));

    this.options = this._defaultOptions;
    if(!window._debugMode){
      this._keywords = this.shuffle(this.getKeywords($('#quest-cate').val()));
    } else {
      this._keywords = this.getKeywords($('#quest-cate').val());
    }
    this.generate();
    this.render();
    this._inited = true;
  },

  generate: function map_generate() {

  },

  shuffle: function map_shuffle(o) { //v1.0
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
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
      var index = mapping[i];
        matched = true;
        var target = $('#map div.placeholder').eq(index);
        target.addClass('active');
        this.checkBingo(index);
        var clone = bomb.clone();
        var x = target.offset().left - bomb.parent().offset().left;
        var y = target.offset().top - bomb.parent().offset().top;
        clone.css({'-moz-transform': 'translate(0, 0) rotate(0deg)', '-webkit-transform': 'translate(0, 0) rotate(0deg)'}).appendTo($('#bombArea')).removeClass('moving').addClass('flying');
        setTimeout((function(clone, x, y){
          return function(){
            clone.css({'-moz-transform': 'translate('+x+'px,'+y+'px) rotate(1800deg)', '-webkit-transform': 'translate('+x+'px,'+y+'px) rotate(1800deg)'});
          }})(clone, x, y),10);
    }
    bomb.remove();
  },

  match: function map_match(keyword, player) {
    var self = this;
    API.getYSearchText(keyword, function onSearchReturn(data) {
      var log = data;
      console.log(data);
      var mapping = [];
      for (var i = 0; i < self.options.width * self.options.height; i++) {
        var index = keyword.indexOf(self._keywords[i]);
        if (data.indexOf(self._keywords[i]) >= 0 && keyword.indexOf(self._keywords[i]) < 0 &&
             !$('#map div.placeholder').eq(i).hasClass('active')) {
          scoreBox.success();
          mapping.push(i);
        } else {
          // fail
        }
      }
      for (var i = 0; i < mapping.length; i++) {
        data = data.replace(self._keywords[mapping[i]], '<span style="color:red;">'+self._keywords[mapping[i]]+'</span>');
      }
      $('#search-log').append('<div>'+data+'</div>');
      var bomb = self.createBomb(keyword);
      if (mapping.length) {
        self.fire(mapping, player, bomb);
      } else {
        scoreBox.fail();
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
      if (target.hasClass('active')) {
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
        var target = $('#map div.placeholder').eq((i+1)*(this.options.width - 1));
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
