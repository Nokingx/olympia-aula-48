class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");

    this.leadeboardTitle = createElement("h2");

    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");

    this.shot=false;
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    mangus=createSprite(width/2-200,height-200);
    mangus.addImage(mangusImg);

    frango=createSprite(width/2+200,height-200);
    frango.addImage(frangoImg);
    frango.scale= 0.9;

    gamers = [mangus, frango];

    gShot1=new Group();
    gShot2=new Group();
  }


  
  handleElements() {
    form.hide();

    //C39
    this.resetTitle.html("Reiniciar");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width / 2 + 200, 40);

    this.resetButton.class("resetButton");
    this.resetButton.position(width / 2 + 230, 100);

    this.leadeboardTitle.html("Placar");
    this.leadeboardTitle.class("resetText");
    this.leadeboardTitle.position(width / 3 - 60, 40);

    this.leader1.class("leadersText");
    this.leader1.position(width / 3 - 50, 80);

    this.leader2.class("leadersText");
    this.leader2.position(width / 3 - 50, 130);
  }

  play() {
    this.handleElements();
    this.handleResetButton();

    Player.getPlayersInfo();

    if (playerCount == 2){
      
      drawSprites();
      this.movimentacao();

      var index=0;

      for (var plyr in allPlayers){
      
      var x = allPlayers[plyr].positionX;
      var y = height - allPlayers[plyr].positionY;

      gamers[index].position.x = x;
      gamers[index].position.y = y;

      index=index+1;
      this.showLife(index);
      if(index==player.index){
      if(this.shot){
        var shot=createSprite(player.positionX, player.positionY, 20,10);
        if(index==1){
          gShot1.add(shot);
          shot.velocityX=10;
          shot.addImage(shotImage1);
        }
        else if (index==2){
          gShot2.add(shot);
          shot.velocityX=-10;
          shot.addImage(shotImage2)
        }
        this.shot=false;
      }
      if (gamers[index-1].collide(gShot1)){
        player.life-=20;
        player.update();
      }
      if(gamers[index-1].collide(gShot2)){
        player.life-=20;
        player.update();
      }
      console.log(gShot1);
      }
    }
  }
    
  }
  handleResetButton() {
    this.resetButton.mousePressed(() => {
      database.ref("/").set({
        playerCount: 0,
        gameState: 0,
        players: {}
      });
      window.location.reload();
    });
  }
  movimentacao() {
  
      //console.log(allPlayers);
      if (keyIsDown (UP_ARROW)){
        player.positionY +=5;
        player.update();
      }
      if (keyIsDown (LEFT_ARROW)){
        player.positionX-=5;
        player.update();
      }
      if (keyIsDown (DOWN_ARROW)){
        player.positionY-=5;
        player.update();
      }
      if (keyDown (RIGHT_ARROW)){
        player.positionX+=5;
        player.update();
      }
    
    

  }
  showLife(index){
    if(index==1){
      fill("white");
      rect(width/2-300,height-150,185,10);
      fill("red");
      rect(width/2-300,height-150,player.life,10);
    }
    else{
      fill("white");
      rect(width/2+300,height-150,145,10);
      fill("red");
      rect(width/2+300,height-150,player.life-40,10);
    }
  }
}
