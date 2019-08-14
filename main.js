enchant();

/*

Core
- rootScene
-- Sprite (bear)

*/

window.onload = function(){

  var core = new Core(320,320);
  core.preload('chara1.png');
  core.fps = 15;
  core.onload = function(){
    var bear = new Sprite(32,32);
    bear.image = core.assets['chara1.png'];
    bear.x = 150;
    bear.y = 150;
    bear.frame = 0;

    bear.addEventListener('enterframe',function(){
      bear.frame = this.age % 3 + 6;
      if (this.x > 320)this.x = 0;
      if (this.y > 320)this.y = 0;
      if (this.x < 0)this.x = 320;
      if (this.y < 0)this.y = 320;

      if(core.input.left) this.x -= 5;
      if(core.input.right) this.x += 5;
      if(core.input.up) this.y -= 5;
      if(core.input.down) this.y += 5;

      // if(this.intersect(enemy)){
      //   label.text = 'hit!';
      // }

      if(this.within(enemy,15)){
        // label.text = 'HIT!';
        core.pushScene(gameOverScene);
        core.stop();
      }
    })

    var enemy = new Sprite(32,32);
    enemy.image = core.assets['chara1.png'];
    enemy.x = 80;
    enemy.y = 0;
    enemy.frame = 4;
    
    var enemys = [];
    for(var i = 0; i < 100;i++){
      bear[i] = new enemy(rand(320),rand(320));
    }
    function rand(n){
      return Math.floor(Math.random()*(n+1)):
    }

    enemy.addEventListener('enterframe',function(){
      enemy.frame = this.age % 3 + 3;
      if (this.x <= bear.x) {
        this.x += 3;
      }else if(this.x >= bear.x){
        this.x -= 3;
      }
      if (this.y <= bear.y) {
        this.y += 3;
      }else if(this.y >= bear.y){
        this.y -= 3;
      }

      if (this.x > 320)this.x = 0;
      if (this.y > 320)this.y = 0;
      if (this.x < 0)this.x = 320;
      if (this.y < 0)this.y = 320;

    });

    var gameOverScene = new Scene();
    gameOverScene.backgroundColor = 'black';

    var gameOlabel = new Label
    gameOlabel.x =  60;
    gameOlabel.y =  140;
    gameOlabel.color =  'white';
    gameOlabel.font =  '32px "Arial"';
    gameOlabel.text =  'GAME OVER';

    // var gameOpt = new Label
    // gameOpt.x =  100;
    // gameOpt.y =  140;
    // gameOpt.color =  'white';
    // gameOpt.font =  '20px "Arial"';
    // gameOpt.text =  `TIME : ${time}`;

    var label = new Label
    label.x =  280;
    label.y =  5;
    label.color =  'red';
    label.font =  '14px "Arial"';
    label.text =  '0';
    label.on('enterframe',function(){
      var time = (core.frame / core.fps).toFixed(2);
      label.text = `${time}`;
    })
    //
    /*bear.on('touchstart',function(){
      core.rootScene.removeChild(this);
    });*/

    core.rootScene.on('touchmove',function(e){
      // bear.x = e.x;
      // bear.y = e.y;

      if (bear.x <= e.x) {
        bear.x += 3;
      }else if(bear.x >= e.x){
        bear.x -= 3;
      }
      if (bear.y <= e.y) {
        bear.y += 3;
      }else if(bear.y >= e.y){
        bear.y -= 3;
      }
    });

    core.rootScene.addChild(label);
    gameOverScene.addChild(gameOlabel);
    // gameOverScene.addChild(gameOpt);
    core.rootScene.addChild(bear);
    core.rootScene.addChild(enemy);
  }
  core.start();
};
