let drumChoice = ["tom1", "tom2", "tom3", "tom4", "crash", "kick", "snare"];

let gamePattern = [];

let userClickedPattern = [];

let level = 0;

let started = false;

$(".btn").on("click", function () {

    let userChosenDrum = $(this).attr("id");
    userClickedPattern.push(userChosenDrum);

    playSound(userChosenDrum);
    animateColor(userChosenDrum);
    checkAnswer(userClickedPattern.length - 1);
})

$(document).on("keypress", function () {

    if (!started) {
        nextSequence();
        $("#level-title").text("Level " + level);
        started = true;
    }

});

function nextSequence() {
    level++;

    $("#level-title").text("Level " + level);

    userClickedPattern = [];
    let randomNumber = Math.floor(Math.random() * 7);
    let randomDrum = drumChoice[randomNumber];
    gamePattern.push(randomDrum);

    $("#" + randomDrum).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomDrum);

};

function playSound(name) {

    let makeAudio = new Audio("./sounds/" + name + ".mp3");
    makeAudio.play();

}

function animateColor(userChosenDrum) {

    $("#" + userChosenDrum).fadeIn(100).fadeOut(100).fadeIn(100);

}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("SUCCESS");
    } else {

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();

    }


    if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function () {
            nextSequence();
        }, 1000);
    } else {
        console.log("wrong");
    }

    function startOver() {
        level = 0;
        gamePattern = [];
        started = false;
    }

};









