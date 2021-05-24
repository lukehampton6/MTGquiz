var time = 60;
var currentQuestionIndex = 0;
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
var maxHighScores = 5;
console.log(highScores);
var questions = [
  {
    question: "How many lands can you play per turn?",
    answers: ["One", "Two", "As many as you want", "Four"],
    correctAnswer: 0,
  },

  {
    question: "What is your starting life total?",
    answers: ["Ten", "Fifty", "Twenty", "Fifteen"],
    correctAnswer: 2,
  },

  {
    question: "When can you cast a sorcery spell?",
    answers: [
      "Anytime",
      "During your turn",
      "During the combat phase",
      "During your opponents turn",
    ],
    correctAnswer: 1,
  },

  {
    question: "What is the correct sequence of phases?",
    answers: [
      "Draw, Main, Combat, End",
      "Upkeep, Untap, Main 1, Combat, Main 2, End",
      "Draw, Upkeep, Combat, Main, End",
      "Untap, Upkeep, Draw, Main 1, Combat, Main 2, End",
    ],
    correctAnswer: 3,
  },

  {
    question: "How many colors are there?",
    answers: ["Four", "Five", "Three", "Ten"],
    correctAnswer: 1,
  },

  {
    question: "Which of these formats is not real?",
    answers: [
      "Modern",
      "Commander",
      "New Age",
      "Pauper",
    ],
    correctAnswer: 2,
  },
];

//clicking start button
$("#startBtn").click(function () {
  $(this).hide();
  time = 60;
  currentQuestionIndex = 0;
  showQuestion();
  //start timer
  var interval = setInterval(function () {
    $("h3").text(time);
    time--;
    //end if time gets to 0 or run out of questions
    if (time <= 0) {
      clearInterval(interval);
      time = 0;
      enterScore();
    } else if (currentQuestionIndex >= questions.length) {
      clearInterval(interval);
      enterScore();
    }
  }, 1000);
});

//display question
function showQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  $("main").empty();

  $("main").append("<container></container>");
  $("container").append("<h3>" + time + "</h3>");
  $("container").append("<h2>" + currentQuestion.question + "</h2>");
  $("container").append("<ul></ul>");

  //display each answer
  for (i = 0; i < currentQuestion.answers.length; i++) {
    var li = $("<li>").text(currentQuestion.answers[i]);
    //give each answer a number attribute
    li.attr("data-index", i);
    $("ul").append(li);

    li.click(checkAnswer);
  }
}

//selecting answer
function checkAnswer(event) {
  var selectedAnswer = event.target.getAttribute("data-index");
  var currentCorrectAnswer = questions[currentQuestionIndex].correctAnswer;

  //displaying wrong/right and changing time
  if (selectedAnswer == currentCorrectAnswer) {
    $(".wrongRight").empty().append("<h2>Correct!</h2>");
    time += 5;
  } else {
    $(".wrongRight").empty().append("<h2>Wrong Answer...</h2>");
    time -= 10;
  }

  //move to next question
  currentQuestionIndex++;
  if (currentQuestionIndex >= questions.length) {
    enterScore();
  } else {
    showQuestion();
  }
}

//show score and enter initials
function enterScore() {
  $("main")
    .empty()
    .append("<h2>Your Score: " + time + "</h2>");
  $(".wrongRight")
    .empty()
    .append("<input type='text' placeholder='Enter your initials'>");
  $(".wrongRight").append("<button id='enterBtn'>Enter</button>");
  var enterBtn = $("#enterBtn");

  //save score
  enterBtn.click(function () {
    var initials = $("input").val();
    var currentHighScore = {
      name: initials,
      score: time,
    };

    //sort high scores and remove any below top 5, idea from james quick
    highScores.push(currentHighScore);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem("highScores", JSON.stringify(highScores));

    $(".wrongRight").empty();
    $("main").empty();
    displayHighScores();
  });
}

function displayHighScores() {
  $("main").append("<ul></ul>");

  //var newScores = highScores.map(highScores => {
  //return highScores.name && highScores.score;
  //})
  for (i = 0; i < highScores.length; i++) {
    var nameLi = $("<li>").text(highScores[i]);
    $("ul").append(nameLi);
  }
  $(".wrongRight").append("<p>i dont know how to fix this :(</p>");

  $("#startBtn").show();
}
