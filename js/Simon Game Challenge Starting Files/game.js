var gamePattern=[];
var buttonColors=["red","blue","green","yellow"];
var userClickedPattern=[];
var started=false;
var level=0;


$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
})

function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currenColor){
    $("#"+currenColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currenColor).removeClass("pressed");
    },100);
}

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber= Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function checkAnswer(currentLevel){
    
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("Success")
        
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
                 },1000);
            }
        }
     else {
            console.log("False");
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            },200);
            $("#level-title").text("Game Over, Press Any Key To Restart");
            startOver();
            
        }
    }


$(".btn").click(function(event){
    var userChosenColor=event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}