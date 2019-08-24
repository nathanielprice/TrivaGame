//Inital values
let counter = 30
let currentQuestion = 0;
let score = 0;
let lost = 0;
let timer;

// If the timer is over go to the next quesiton

function nextQuestion() {
    const isQuestionOver = (quizQuestions.length - 1) === currentQuestion;
    if (isQuestionOver) {
        console.log('Game over!');
        displayResult();
    } else {
        currentQuestion++;
        loadQuestion();
    }

}

// Start a 30 second timer for user to respond or choose an answer to each question
function timeUp() {
    clearInterval(timer);

    lost++;
    
    setTimeout(nextQuestion, 3 * 1000)
}

function countDown() {
    counter--;

    $('#time').html('Timer: ' + counter);

    if(counter === 0) {
        timeUp();
    }
}



//Display the questions and the choices in the browser

function loadQuestion() {

    counter = 30;
    timer = setInterval(countDown, 1000);

    const question = quizQuestions[currentQuestion].question;
    const choices = quizQuestions[currentQuestion].choices;

    $('#time').html('Timer: ' + counter);
    $('#game').html(`
        <h4>${question}</h4> 
        ${loadChoices(choices)}
        ${loadRemainingQuestion()}
    `);
}

function loadChoices (choices) {
    let result ='';

    for (let i = 0; i < choices.length; i++) {
        result += `<p class ="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
    }
    return result;
}

// Either correct/worng choice slected, go to the next question

$(document).on('click', '.choice', function() {
    clearInterval(timer);
    const slectedAnswer = $(this).attr('data-answer');
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (correctAnswer === slectedAnswer) {
        score++;
        console.log('You Win!');
        preloadImage ('win');
        setTimeout(nextQuestion, 3 * 1000)

    } else {
        lost++;
        console.log('You Loose!');
        preloadImage ('lost');
        setTimeout(nextQuestion, 3 * 1000)

    }
});

function displayResult() {
    const result = `
    <p>You got ${score} questions(s) right</p>
    <p>You missed ${lost} questions(s) right</p>
    <p>Total question ${quizQuestions.length} questions(s) right</p>
    <button class="btn btn-primary" id="reset">Reset Game</button>
    `;

    $('#game').html(result);
}

$(document).on("click", '#reset', function() {
    counter = 30
    currentQuestion = 0;
    score = 0;
    lost = 0;
    timer = null;

    loadQuestion();
});

function loadRemainingQuestion () {
    const remainingQuestion = quizQuestions.length - (currentQuestion + 1);
    const totalQuestion = quizQuestions.length;

    return `Remaining Question: ${remainingQuestion}/${totalQuestion}`;
}



function preloadImage(status){
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;
    if (status === 'win') {
        $('#game').html(`
        <p class="preload-image"><b>Congratulations</b>, you picked the correct answer!</p>
        <p class="preload-image">The corret answer is <b>${correctAnswer}.</b></p>
        
        `);
    } else {
        $('#game').html(`
        <p class="preload-image"><b>You Loose!</b></p>
        <p class="preload-image">The correct answer was <b>${correctAnswer}.</b></p>
        
        `);
    }
}

$('#start').click(function() {
    $('#start').remove();
    $('#time').html(counter);
    loadQuestion();
});;