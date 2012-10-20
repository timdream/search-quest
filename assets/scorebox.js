(function(){
	var ScoreBox = function(targetElement){
		this.targetElement = targetElement;
		this.combo = 0;
		this.initUI();
	};
	ScoreBox.prototype = {
		constructor: ScoreBox,
		initUI: function(){
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
		},
		refreshUI: function(){
			this.targetElement.attr("class","");
			this.initUI();
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
			this.updateScore(this.score+10);
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
		},
		fitLine: function(num){
			this.comboMessage("score-msg-line", num+" Line Bonus!!");
		},
		comboMessage: function(type, msg) {
			var li = $([
				'<div class="score-msg ',type,'">',msg,'</div>'
			].join('')).appendTo(this.targetElement);
			li.bind('animationEnd webAnimationEnd mozAnimationEnd', function(){
				li.remove();
			});
		}
	}
	//window.scoreBox = new ScoreBox($("#scorebox"));
})();
