(function(){
  var ScoreBox = function(targetElement){
    this.targetElement = targetElement;
    this.combo = 0;
    this.initUI();
  };
  ScoreBox.prototype = {
    constructor: ScoreBox,
    initUI: function(){
      if(window.$countdown){
        $countdown.countdown("destroy");
	delete window.$countdown;
      }
      if(!window.$countdown){
        window.$countdown = $('#countdown');
        $countdown.countdown({
          until: new Date((new Date()).getTime() + (window._debugMode?120:120) * 1000),
          compact: true,
          format: 'MS', description: '',
          expiryText: 'Times Up!!',
          onExpiry: function () {
  	  scoreBox.displayFinal();
          }
        });
	(function(){
	    if(!window._debugMode)return;
	    var keywords = [
		"去世 蘋果",
	//	"我猜",
		"王建民",
		"二代上路",
		"種花 手機",
	//      "富少 淫魔",
		"那些年",
		"經濟部長",
		"美國大選",
		"早鳥",
		"宜蘭奶凍",
	//	"上路 企業",
		"王雪紅內建",
	//	"形男大主廚",
		"是台灣的",
		"陪你去看",
	//	"彩券號碼",
		"扁維拉",
		"善島寺",
	//	"都是為你",
		"宅 新貴",
	//	"2014足球",
		"以卵擊石",
		"安全性行為",
		""
	    ].join('\n');    
	    var processInput = function(i){
		if(i>=keywords.length) return;
		if(keywords[i]=="\n"){
		    $("#search").submit();
		} else {
		    $("#keyword").val($("#keyword").val()+keywords[i]);
		}
		i++;
		setTimeout(function(){
		    processInput(i);
		}, keywords[i]=="\n"?1000:100);
	    };
	    processInput(0);
	})();

      }
      var self = this;
      this.targetElement.append([
        '<span class="score-label">Score:</span>',
        '<span id="score-digit-container">',
          '<span class="score-digit" id="digit-5">0</span>',
          '<span class="score-digit" id="digit-4">0</span>',
          '<span class="score-digit" id="digit-3">0</span>',
          '<span class="score-digit" id="digit-2">0</span>',
          '<span class="score-digit" id="digit-1">0</span>',
        '</span>',
        '<div id="play-again">PlayAgain</div>'
      ].join(''));
      this.score = 0;
      this.combo = 0;
      this.targetElement.find(".score-digit").bind('webkitAnimationEnd mozAnimationEnd animationend', function () {
        $(this).attr("class", "score-digit");
      });;
      this.targetElement.find("#play-again").bind("click", function(){
        location.reload();
      });
    },
    resetUI: function(){
    },
    updateScore: function(newScore){
      var j = 5;
      var padright = function(str, num){
        if(str.length < num){
          return padright("0"+str, num);
        }
        return str;
      };
      var nowScoreStr = padright(this.score.toString(), 5);
      var newScoreStr = padright(newScore.toString(), 5);

      if(this.targetElement.is(".score-update1")){
        this.targetElement.attr("class", "score-update2");
      } else {
        this.targetElement.attr("class", "score-update1");
      }
      var shuffle = [1,2,3,4,5];
      this.targetElement.find(".score-digit").attr("class", "score-digit");
      for(var i = 0; i < 5; i++){
        if(nowScoreStr[i]!=newScoreStr[i]){
          break;
        }
      }
      shuffle.splice(5-i,999);
      for(i = i ; i < 5; i++){
        var r = parseInt(Math.random()*(5-i));
        $("#digit-"+(5-i)).addClass("delay-update-"+shuffle[r]).text(newScoreStr[i]);
        shuffle.splice(r,1);
      }
      this.score = newScore;
    },
    success: function(){
      this.updateScore(this.score+10 + 5*this.combo);
      this.combo++;
      if(this.combo > 2){
        this.comboMessage("score-msg-combo", this.combo+" Combos!!");
      }
    },
    fail: function(){
      this.combo = 0;
    },
    displayFinal: function(){
      this.targetElement.addClass("final-score");
      $("#search").fadeOut();
      $("#keyword").blur();
    },
    fitLine: function(num){
      switch(num){
      case 1:
        this.updateScore(this.score+123);
        break;
      case 2:
        this.updateScore(this.score+777);
        break;
      case 3:
        this.updateScore(this.score+2468);
        break;
      case 4:
        this.updateScore(this.score+32767);
        break;
      }
      this.comboMessage("score-msg-line", num+" Line Bonus!!");
    },
    comboMessage: function(type, msg) {
      var li = $([
        '<div class="score-msg ',type,'">',msg,'</div>'
      ].join('')).appendTo(this.targetElement);
      li.bind('webkitAnimationEnd mozAnimationEnd animationend', function () {
        $(this).remove();
      });
    }
  }
  window.ScoreBox = ScoreBox;
  //window.scoreBox = new ScoreBox($("#scorebox"));
})();
