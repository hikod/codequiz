var startQuizBtn = document.getElementById("startQuizBtn");
var timerEl = document.getElementById('countdown');
var template = document.createElement('div');
var currentQuestion = 0;
var timeLeft = 75;
var timeInterval;

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
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    timeInterval = setInterval(function () {
        // As long as the `timeLeft` is greater than 1
        if (timeLeft > 0) {
            // Set the `textContent` of `timerEl` to show the remaining seconds
            timerEl.textContent = "Time: " + timeLeft;
            // Decrement `timeLeft` by 1
            timeLeft--;
            if(timeLeft<0){
                gameOver();
            }
        } else {
            // Once `timeLeft` gets to 0, set `timerEl` to an empty string
            timerEl.textContent = '';
             gameOver();
        }
    }, 1000);
}

function clearBox(elementID) {
    document.getElementById(elementID).innerHTML = "";
}

function startQuiz(value) {
    countdown();
    displayQuestions(value);
}


function showAnswer() {
    var correctAnswer = document.createElement('label');
    var hr = document.createElement('hr');
    hr.style.height = "2px";
    hr.style.marginBottom = "5px";
    hr.style.top = "5px";
    hr.style.background = "black";
    document.getElementById("firstRow").append(hr);

    if (checkAnswer()) {
        correctAnswer.textContent = "Correct"
    } else {
        correctAnswer.textContent = "Wrong";
        clearInterval(timeInterval);
        timeLeft = document.getElementById("countdown").innerText.split(" ")[1] - 10;
        countdown();

    }
    document.getElementById("firstRow").append(correctAnswer);
}

function checkAnswer() {
    var flag = false
    if (quiz[currentQuestion - 1]["correct"] === window.localStorage.getItem("answer")) {
        flag = true;
    }
    return flag;
}



function displayQuestions(value) {
    clearBox("firstRow");
    console.log(currentQuestion)
    if (currentQuestion === quiz.length) {
        console.log(quiz[currentQuestion - 1]["correct"])
        console.log(window.localStorage.getItem("answer"))
        // clearInterval(timeInterval);
        gameOver();
    } else {
        var question = document.createElement('p');
        question.id = "question";
        question.textContent = quiz[currentQuestion]["question"];
        document.getElementById("firstRow").appendChild(question);
        window.localStorage.setItem('answer', value);
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
        if (window.localStorage.getItem("answer") !== 'startQuiz') {
            showAnswer();
        }
        currentQuestion++;
    }
}
function gameOver() {
    // clearInterval(timeInterval);
    clearBox("firstRow");
    var h2 = document.createElement('h2');
    h2.innerText = "All done!";

    var p = document.createElement('p');
    clearInterval(timeInterval);
    console.log(document.getElementById("countdown").innerText)
    if (document.getElementById("countdown").innerText !== "") {

        // clearInterval(timeInterval);
        p.innerText = "Your final score is " + document.getElementById("countdown").innerText.split(" ")[1] + ".";
    } else {
        // clearInterval(timeInterval);
        p.innerText = "Your final score is 0.";
    }
    
    var label = document.createElement('label');
    label.innerText = "Enter Initials";
    label.for = "initials"
    var inputText = document.createElement('input')
    inputText.type = "text";
    inputText.name = "initials"
    var inputButton = document.createElement('input')
    inputButton.type = "button";
    inputButton.value = "Submit";
    //inputButton.setAttribute('onclick','submit(inputText.innerText)');

    document.getElementById("firstRow").appendChild(h2);
    document.getElementById("firstRow").appendChild(p);
    document.getElementById("firstRow").appendChild(label);
    document.getElementById("firstRow").appendChild(inputText);
    document.getElementById("firstRow").appendChild(inputButton);
    if (document.getElementById("countdown").innerText.split(" ")[1] > 0) {
        showAnswer();
    }
}
function submit(initials) {
    // clearBox("firstRow");
    var h2 = document.createElement('h2');
    h2.innerText = "High scores";
    document.getElementById("firstRow").appendChild(h2);
    console.log(initials)
}
