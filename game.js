var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

// nextSequence() is used to display the system sequence aka game pattern
function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);


  // Show the Sequence to the User with Animations and Sounds
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  animatePress(randomChosenColor);

  // Increase level by 1 each time nextSequence()is called and display it
  level++;
  $("#level-title").text("Level " + level);
}

// Check which color is pressed
$(".block").on("click", function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

// Function that will play sounds for userChosenColor + randomChosenColor + wrong
function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

// Function that will temporarily add a pressed class to a button
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Start / restart the game by calling nextsequence on first key press only
$(document).on("keypress", function() {
  $("#level-title").text("Level " + level);
  if (started == false) {
    started = true;
    nextSequence();
  }
});

// Check answer
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(nextSequence, 1000);
      userClickedPattern = [];
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Keyboard Key to Restart");
    startOver();
  }
}

// Restart the game
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}
