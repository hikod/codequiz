var startQuizBtn = document.getElementById("startQuizBtn");
var timerEl = document.getElementById('countdown');
var template = document.createElement('div');
var currentQuestion = 0;

// The array of questions for our quiz game.
var quiz = [
    {
        "question": "Commonly used data type DO NOT include",
        "choices": [
            "Strings",
            "Booleans",
            "Alerts",
            "Numbers"
        ],
        "correct": "Alerts"
    },
    {
        "question": "A very useful tool used during development and debugging for printing content to the debugger is:",
        "choices": [
            "JavaScript",
            "terminal/bash",
            "for loops",
            "console.log"
        ],
        "correct": "console.log"
    },
    {
        "question": "Arrays in JavaScript can be used to store _______.",
        "choices": [
            "numbers and strings",
            "other arrays",
            "booleans",
            "all of the above"
        ],
        "correct": "all of the above"
    },
    {
        "question": "The condition in an if/ else statement is enclosed with _______.",
        "choices": [
            "quotes",
            "curly brackets",
            "parenthesis",
            "square brackets"
        ],
        "correct": "curly brackets"
    },
    {
        "question": "String values must be enclosed within _______ when being assigned to variables.",
        "choices": [
            "commas",
            "curly brackets",
            "quotes",
            "paranthesis"
        ],
        "correct": "quotes"
    }
];

// Timer that counts down from 75
function countdown() {
    var timeLeft = 75;

    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
        // As long as the `timeLeft` is greater than 1
        if (timeLeft > 0) {
            // Set the `textContent` of `timerEl` to show the remaining seconds
            timerEl.textContent = "Time: " + timeLeft;
            // Decrement `timeLeft` by 1
            timeLeft--;
        } else {
            // Once `timeLeft` gets to 0, set `timerEl` to an empty string
            timerEl.textContent = '';
            // Use `clearInterval()` to stop the timer
            clearInterval(timeInterval);
        }
    }, 1000);
}

function clearBox(elementID) {
    document.getElementById(elementID).innerHTML = "";
}

function startQuiz(value) {
    // clearBox("firstRow");
    countdown();
    displayQuestions(value);
    // clearBox("firstRow");

}


function showAnswer() {
    var correctAnswer = document.createElement('label');
    var hr = document.createElement('hr');
    hr.style.height ="2px";
    hr.style.marginBottom ="5px";
    hr.style.top="5px";
    hr.style.background= "black";
    document.getElementById("firstRow").append(hr);


    if (checkAnswer()) {
        correctAnswer.textContent = "Correct"
    } else {
        correctAnswer.textContent = "Wrong";
    }
    document.getElementById("firstRow").append(correctAnswer);
}

function checkAnswer() {
    var flag = false
    console.log("Current question correct answer: " + quiz[currentQuestion]["correct"])
    if (quiz[currentQuestion]["correct"] === window.localStorage.getItem("answer")) {
        flag = true;
    }
    return flag;
}



function displayQuestions(value) {
    clearBox("firstRow");
    var clicked = false;
    console.log("the value of the clicked button:" + value)
    window.localStorage.setItem('answer', value);
    var previousQuestionAnswer = checkAnswer();
    var question = document.createElement('p');
    question.id = "question";
    question.textContent = quiz[currentQuestion]["question"];

    document.getElementById("firstRow").appendChild(question);
    //loop through choices, and create buttons for the answers
    for (var i = 0; i < quiz[currentQuestion]["choices"].length; i++) {

        var answer = document.createElement('button');
        answer.className = 'block';
        answer.type = 'button';
        answer.name = 'quiz';
        answer.id = 'choice' + (i + 1);
        answer.value = quiz[currentQuestion]["choices"][i];
        answer.textContent = quiz[currentQuestion]["choices"][i];
        answer.setAttribute('onclick', 'displayQuestions(this.value)');
        document.getElementById("firstRow").appendChild(answer);

        var btn = document.getElementById(answer.id);
    }
    clicked = true;
    if (clicked) {
        currentQuestion++;
        if (window.localStorage.getItem("answer")!=='startQuiz'){
            showAnswer();
        }
    }
    clicked = false;
}