var playing = false;
var score;
var action;
var timeremaining;
var correctAns;

// if we click on start/reset
document.getElementById("startreset").onclick = function () {
  //if we are playing
  if (playing == true) {
    location.reload(); //reload page
  } else {
    //change mode to playing
    playing = true;

    //if we are not playing
    //set score to 0
    score = 0;
    document.getElementById("scorevalue").innerHTML = score;

    //show countdown box
    show("timeremaining");
    timeremaining = 60;
    document.getElementById("timeremainingvalue").innerHTML = timeremaining;

    //hide game over box
    hide("gameover");

    //change button to reset
    document.getElementById("startreset").innerHTML = "Reset Game";

    //start countdown
    startCountdown();

    //generate a new Q&A
    generateQA();
  }
};

//clicking on the ans box
for (i = 1; i < 5; i++) {
  document.getElementById("box" + i).onclick = function () {
    //check if we are playing
    if (playing == true) {
      //yes
      if (this.innerHTML == correctAns) {
        //correct answer

        //increase score by 1
        score++;
        document.getElementById("scorevalue").innerHTML = score;

        //hide wrong box and show correct box
        hide("wrong");
        show("correct");
        setTimeout(function () {
          hide("correct");
        }, 1000);

        //Generate new Q&A

        generateQA();
      } else {
        //wrong answer
        hide("correct");
        show("wrong");
        setTimeout(function () {
          hide("wrong");
        }, 1000);
      }
    }
  };
}

//functions

//start counter
function startCountdown() {
  action = setInterval(function () {
    timeremaining -= 1;
    document.getElementById("timeremainingvalue").innerHTML = timeremaining;
    if (timeremaining == 0) {
      //game over
      stopCountdown();

      show("gameover");
      document.getElementById("gameover").innerHTML =
        "<p>Game Over</p> <p>Your score is " + score + "</p>";

      hide("timeremaining");
      hide("correct");
      hide("wrong");
      playing = false;
      document.getElementById("startreset").innerHTML = "Start Game";
    }
  }, 1000);
}

//stop the counter
function stopCountdown() {
  clearInterval(action);
}

//hide an element
function hide(Id) {
  document.getElementById(Id).style.display = "none";
}

//show an element
function show(Id) {
  document.getElementById(Id).style.display = "block";
}

//generate questions and multiple answers
function generateQA() {
  var x = 1 + Math.round(9 * Math.random());
  var y = 1 + Math.round(9 * Math.random());
  correctAns = x * y;

  document.getElementById("question").innerHTML = x + "x" + y;

  var correctPos = 1 + Math.round(3 * Math.random());

  //fill one box with the correct answer
  document.getElementById("box" + correctPos).innerHTML = correctAns;

  //fill other boxes with wrong answer
  var answers = [correctAns];
  for (i = 1; i < 5; i++) {
    if (i != correctPos) {
      // a wrong ans
      var wrongAns;
      do {
        wrongAns =
          1 +
          Math.round(9 * Math.random()) +
          (1 + Math.round(9 * Math.random()));
      } while (answers.indexOf(wrongAns) > -1);

      document.getElementById("box" + i).innerHTML = wrongAns;
      answers.push(wrongAns);
    }
  }
}
