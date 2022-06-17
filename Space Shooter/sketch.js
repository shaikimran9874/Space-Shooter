var bgImg;
var HeroRocketImg,HeroRocket;
var laser,laserImg,meteorImg,enemyImg;
var lasersGroup,meteorsGroup,CoinsGroup;
var score,health;
var gameOverImg,gameOver;
var HealthCoin,Coin;


function preload(){
    bgImg = loadImage("./Images/Backround.png")
    HeroRocketImg = loadImage("./Images/hero.png")
    laserImg = loadImage("./Images/LaserBeam.png")
    meteorImg = loadImage("./Images/meteour.png")
    enemyImg = loadImage("./Images/enemy.png")
    gameOverImg = loadImage("./Images/gameOver.png")
    HealthCoin = loadImage("./Images/coin.png")
}


function setup()
{
    canvas = createCanvas(windowWidth,windowHeight)
    HeroRocket = createSprite(60,windowHeight/2,100,100) 
    HeroRocket.addImage(HeroRocketImg)
    HeroRocket.scale = 0.5
    var frames = 0;

    lasersGroup = new Group();
    meteorsGroup = new Group();
    CoinsGroup = new Group();
    score = 0;
    health = 150;

    gameOver = createSprite(width/2,height/2,10,10)
    gameOver.addImage(gameOverImg)
    gameOver.visible = false

}

function draw(){
    background(bgImg)

    console.log(lasersGroup)

    if(keyIsDown(UP_ARROW)){
        HeroRocket.position.y = HeroRocket.position.y - 5
        //console.log(HeroRocket.position.x)
    }

    if(keyIsDown(DOWN_ARROW)){
        HeroRocket.position.y = HeroRocket.position.y +5
    }

    drawSprites()

    if(keyDown("space")){
        SpawnLaser()
        //console.log("HI")
    }

    SpawnMeteor();
    spawnCoins();

    /*for(var i = 0; i<lasersGroup.length;i++){
        if(meteorsGroup.collide(lasersGroup.get(i))){
            lasersGroup.get(i).remove();
        }
    }*/


    for(var i = 0; i<meteorsGroup.length;i++){
        if(lasersGroup.collide(meteorsGroup.get(i))){
            meteorsGroup.get(i).remove();
            score+=1;
            lasersGroup.removeSprites()
        }
    }

   
    fill("black")
    textSize(20)
    text("Score: "+ score,width-100,50)

    text("Health: "+ health,width-250,50)

   for(var i = 0; i<meteorsGroup.length;i++){
    if(meteorsGroup.get(i).collide(HeroRocket)){
        meteorsGroup.get(i).remove();
        health-=10
    }
   }

   for(var i = 0; i<CoinsGroup.length;i++){
    if(CoinsGroup.get(i).collide(HeroRocket)){
        CoinsGroup.get(i).remove();
        health+=5
    }
   }

   if(health === 0 ){
       gameOver.visible = true
       meteorsGroup.removeSprites();
       lasersGroup.removeSprites();
   }

}

function SpawnLaser(){
    laser = createSprite(HeroRocket.position.x+100,HeroRocket.position.y,50,50)
    laser.addImage(laserImg) 
    laser.setVelocity(5,0)
    laser.scale = 0.2
    //console.log(laser)
    lasersGroup.add(laser)
}

function SpawnMeteor(){
  if(frameCount % 80 === 0){
    meteor = createSprite(width,random(10,height-50),10,10)
   // console.log(meteor)
    meteor.addImage(meteorImg)
    //frames = frames + (frameCount/60)
    meteor.setVelocity(-4,0)
    meteor.scale = 0.2
    meteorsGroup.add(meteor)
  }
}

function spawnCoins(){
    if(frameCount % 200 === 0){
        Coin = createSprite(width,random(10,height-50),10,10)
        Coin.addImage(HealthCoin)
        Coin.setVelocity(-6,0)
        Coin.scale = 0.1
        CoinsGroup.add(Coin)
    }
}