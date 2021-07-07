var PLAY = 1;
var END = 0;
var gameState = PLAY;

var planet,planetImg;

var alien,alienImg,alien_collided;

var invisibleG;

var apple,appleimg,appleG;

var enemie,enemieImg,enemiesG;

var score = 0;
var applescollected = 0; 

var restart,restartImg,gameOver,gameOverImg

function preload(){

  //loading images or animation
planetImg = loadImage("1781.jpg");

alienImg = loadAnimation("Imported piskel.gif");

alien_collided = loadAnimation("Imported piskel (1).gif");  
  
appleImg = loadImage("pnghut_apple-food-clip-art-animation-cartoon-red.png");  
   
enemieImg = loadImage("n715475.png");  
  
restartImg = loadImage("Restart-PNG-High-Quality-Image.png");
  
gameOverImg = loadImage("pngwing.com.png");  
    
}

function setup() {
  
 createCanvas(1100,600);
  
 //create planet 
  planet = createSprite(300,300,10,30)
  planet.addImage(planetImg);
  planet.scale = 0.2;
  planet.velocityX = -3;
  
 //create alien Sprite  
  alien = createSprite(100,500)  
  alien.addAnimation("walking",alienImg);  
  alien.addAnimation("collided",alien_collided);
  
 //restart images
  restart = createSprite(300,390,10,30);
  restart.addImage(restartImg);
  restart.scale = 0.050;
  
 // gameover Image
  gameOver = createSprite(300,250,10,30);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.050;
  
 //make an invisible ground
  invisibleG = createSprite(300,560,600,10);
  invisibleG.visible = false;
  
  applesG = new Group()
  enemiesG = new Group()
}

function draw() {
  background(0);
  //display score
  stroke("white");
  fill("white");
  textSize(25);
  text("Score: "+ score, 900,100);
  
if (gameState === (PLAY)){
    
  restart.visible = false
  gameOver.visible = false;
  
  alien.visible = true;
  
  //reset the ground
  if (planet.x < 0){
      planet.x = 300;
       }
  
  // when space key is pressed make alien jump
   if(keyDown("space")&& alien.y >=400){
      alien.velocityY = -20;
      }
  
  //add grvity
  alien.velocityY = alien.velocityY + 0.8;
  
 
  
  if (applesG.isTouching(alien)){
      applesG.destroyEach()
      score = score+10;
      }
  
  spawnApples(); 
  
 spawnEnemies();
  
  if (enemiesG.isTouching(alien))
  {
    gameState = END; 
  }
  
} else if (gameState === END)
     {
       
      gameOver.visible = true
      restart.visible = true;
            
      alien.visible = false; 
       
      planet.velocityX = 0;
      alien.velocityY = 0;
       
      enemiesG.setLifetimeEach(-1);
      applesG.setLifetimeEach(-1);
       
      enemiesG.setVelocityXEach(0);
      applesG.setVelocityXEach(0);
       
      if(mousePressedOver(restart)) {
      reset();
        
    }   
       
     } 
  
  //collide alien in invisible Ground
  alien.collide(invisibleG);
  
 drawSprites()
  
  //console.log(frameCount)
}

function reset(){
  
  
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  planet.x = 300
  planet.velocityX = -3
  applesG.destroyEach();
  enemiesG.destroyEach();
  
  score = 0;
  
}



function spawnApples(){
if (frameCount % 200 === 0)
  {
 apple = createSprite(600,400,10,30);
 apple.y = Math.round(random(300,400))
 apple.addImage(appleImg); 
 apple.scale = 0.1; 
 apple.lifetime = 800; 
 apple.velocityX = -5;   
    
 applesG.add(apple);   
    
  } 
  
}

function spawnEnemies(){
  if (frameCount % 330 === 0)
   {
    enemie = createSprite(600,550,10,30);
    enemie.y = Math.round(random(450,500)) 
     
    enemie.addImage(enemieImg);
    enemie.scale = 0.070;  
    enemie.lifetime = 800;
   enemie.velocityX = -(6 + score/50);
    enemiesG.add(enemie) 
   }
  
}


