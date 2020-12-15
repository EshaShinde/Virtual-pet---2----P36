var database ,dog,dog1,dog2
var position
//var form
var feed,add
var foodobject
var feedtime
var Lastfeed
//Create variables here

function preload()

{
  dogimg1 = loadImage("images/dogImg.png")
  dogimg2 = loadImage("images/dogImg1.png")
	//load images here
}

function setup() {
	createCanvas(1000, 500);
  database = firebase.database();
  console.log(database);
 
  foodobject=new Food()
  dog = createSprite(550,250,10,10);
  dog.addImage(dogimg1)
  dog.scale=0.2
 
  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);

  feed = createButton("FEED DRAGO")
  feed.position(500,15)
  feed.mousePressed(FeedDog)

  add = createButton("ADD FOOD")
  add.position(400,15)
  add.mousePressed(AddFood)

} 

function draw(){
 background(46,139,87);

 foodobject.display()
 
 

 drawSprites();

 
 
  
 fill(255,255,254);
 textSize(15);

 feedtime = database.ref('Feedtime');
 feedtime.on("value", function(data){
   Lastfeed=data.val();
 })

 if(Lastfeed>=12){
   text("Last feed : " +Lastfeed%12 + "PM", 350, 50);
 }else if(Lastfeed == 0){
text("Last Feed : 12 am", 350, 30)
} else{
 text("Last Feed :"+ Lastfeed + "AM", 35, 30)
}
   }
 
drawSprites();

function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
}

function showError(){
  console.log("Getting Error ＞﹏＜");
}

function writePosition(shaun){
  if(shaun>0){
    shaun=shaun-1
  }
  else{
    shaun=0
  }
  database.ref('/').set({
    'Food': shaun
  })

}
function AddFood(){
position++
database.ref('/').update({
  Food:position
}

)
}
function FeedDog(){

dog.addImage(dogimg2)
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime:hour ()
 })
}
