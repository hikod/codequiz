var startQuizBtn = document.getElementById("startQuizBtn");
var timerEl = document.getElementById('countdown');
var template = document.createElement('div');
var currentQuestion = 0;
var userAnswer;

// The array of questions for our quiz game.
var quiz = [
    {
        "question": "Q1: Who came up with theory of relativity?",
        "choices": [
            "Sir Isaac Newton",
            "Nicolaus Copernicus",
            "Albert Einstein",
            "Ralph Waldo Emmerson"
        ],
        "correct": "Albert Einstein"
    },
    {
        "question": "Q2: Who is on the two dollar bill?",
        "choices": [
            "Thomas Jefferson",
            "Dwight D. Eisenhower",
            "Benjamin Franklin",
            "Abraham Lincoln"
        ],
        "correct": "Thomas Jefferson",
        "explanation": "The two dollar bill is seldom seen in circulation. As a result, some businesses are confused when presented with the note.",
    }
];

// Timer that counts down from 5
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

startQuizBtn.addEventListener("click", function () {
    clearBox("firstRow");
    countdown();
    if (currentQuestion < quiz.length - 1) {
        displayQuestions();
        currentQuestion++;
    } else {
        showFinalResults();
    }
});


function showAnswer(userAnswer) {
    var correctAnswer = document.createElement('label');
    var hr = document.createElement('hr');
    document.getElementById("firstRow").after(correctAnswer);
    correctAnswer.appendChild(hr);
    if (checkAnswer(userAnswer)) {
        correctAnswer.textContent = "Correct"
    } else {
        correctAnswer.textContent = "Wrong";
    }
}

function checkAnswer(userAnswer) {
    var flag = false
    console.log(quiz[currentQuestion-1]["correct"]);
    console.log(userAnswer.value);
    if (quiz[currentQuestion-1]["correct"] === userAnswer) {
        flag = true;
    }
    return flag;
}
function displayQuestions() {
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
        document.getElementById("firstRow").appendChild(answer);

        var btn = document.getElementById(answer.id);
        btn.addEventListener("click", event => {
            userAnswer = event.target.value;
            console.log(userAnswer);
            showAnswer(userAnswer);
            currentQuestion++;
            clearBox("firstRow");
        });
    }
}