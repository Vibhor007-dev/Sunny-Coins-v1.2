var PLAY = 1;
var END = 0;
var gameState = PLAY;

var devil, devil_running;
var ground, invisibleGround, groundImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;


var score = 0;

var gameOver, restart;




function preload() {
  devil_running = loadImage("devil.gif");
  groundImage = loadImage("ground2.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  devil = createSprite(150, windowHeight - 20, 20, 50);
  devil.addAnimation("running", devil_running);
  devil.scale = 0.5;

  ground = createSprite(200, windowHeight - 20, windowWidth, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  ground.velocityX = -(6 + 3 * score / 100);

  gameOver = createSprite(windowWidth / 2, windowHeight / 2);
  gameOver.addImage(gameOverImg);

  restart = createSprite(windowWidth / 2, windowHeight / 2 + 40);
  restart.addImage(restartImg);

  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;

  invisibleGround = createSprite(windowWidth / 2, windowHeight - 10, windowWidth, 10);
  invisibleGround.visible = false;

  obstacle1 = loadImage("obstacle.jpg");
  obstacle2 = loadImage("obstacle.jpg");
  obstacle3 = loadImage("obstacle.jpg");
  obstacle4 = loadImage("obstacle.jpg");
  obstacle5 = loadImage("obstacle.jpg");
  obstacle6 = loadImage("obstacle.jpg");

  score = 0;

  obstaclesGroup=createGroup();
}

function draw() {
  background(255);
  textSize(18);

  text("Score: " + score, windowWidth - 100, 50)

  if (gameState === PLAY) {
    score = score + Math.round(getFrameRate() / 60);
    ground.velocityX = (-6 + 3 * score / 100);

    if ((touches.length > 0 || keyDown("space")) &&devil.y >= windowHeight - 41) {
      devil.velocityY = -12;
      touches = [];
    }
      if(keyDown==="SPACE"){
    devil.velocityY = devil.velocityY + 0.8
    }

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    devil.collide(invisibleGround);
    spawnObstacles();
    
    console.log(obstaclesGroup);
console.log(devil);
    if ( obstaclesGroup.isTouching(devil)){
      gameState = END;
    }
  } 
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;

    //set velcity of each game object to 0
    ground.velocityX = 0;
    devil.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);


    obstaclesGroup.setLifetimeEach(-1);
    if (mousePressedOver(restart) || touches.length > 0) {
      reset();
      touches = [];
    }
  }

  drawSprites();
}



function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600, windowHeight - 35, 10, 40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3 * score / 100);

    //generate random obstacles
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1: obstacle.addImage(obstacle1);
        break;
      case 2: obstacle.addImage(obstacle2);
        break;
      case 3: obstacle.addImage(obstacle3);
        break;
      case 4: obstacle.addImage(obstacle4);
        break;
      case 5: obstacle.addImage(obstacle5);
        break;
      case 6: obstacle.addImage(obstacle6);
        break;
      default: break;
    }

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    //obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;

  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();

  devil.changeAnimation("running", devil_running);



  score = 0;
}