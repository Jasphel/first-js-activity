// Improved JS: Added timer, high score, progress bar, and clean UX.
// File: script.js

const quizData = [
    {
        question: "What does 'let' declare in JavaScript?",
        options: ["A constant value", "A changeable variable", "A function", "An array"],
        correct: 1
    },
    {
        question: "Which is the strict equality operator?",
        options: ["==", "=", "===", "!="],
        correct: 2
    },
    {
        question: "What is the purpose of a for loop?",
        options: ["To declare variables", "To repeat code a set number of times", "To handle events", "To style elements"],
        correct: 1
    },
    {
        question: "How do you select an element by ID in the DOM?",
        options: ["querySelector", "getElementById", "createElement", "appendChild"],
        correct: 1
    },
    {
        question: "What keyword declares a constant in JS?",
        options: ["const", "let", "var", "static"],
        correct: 0
    },
    {
        question: "What function prints output to the console?",
        options: ["print()", "log()", "console.log()", "alert()"],
        correct: 2
    },
    {
        question: "What data type is empty on purpose?",
        options: ["boolean", "object", "undefined", "null"],
        correct: 3
    },
    {
        question: "Which of these logical operands represents 'OR'?",
        options: ["&&", "//", "||", "?"],
        correct: 2
    },
    {
        question: "How do you select an element by class in the DOM?",
        options: ["querySelector", "getElementById", "createElement", "appendChild"],
        correct: 0
    },
    {
        question: `"JavaScript is the same as Java (the programming language)."`,
        options: ["TRUE", "FALSE, JS is for websites while Java is for applications", "FALSE, Java is for websites while JS is for applications", "FALSE, it is the same but the latter is better"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let totalQuestions = quizData.length;
let selectedAnswer = -1;
let timerInterval;
let timeLeft = 30;
let highScore = localStorage.getItem('jsQuizHighScore') || 0;

// Update progress bar
function updateProgress() {
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
    document.getElementById('current-q').textContent = currentQuestion + 1;
    document.getElementById('total-q').textContent = totalQuestions;
}

// Start timer
function startTimer() {
    timeLeft = 30;
    document.getElementById('timer-container').style.display = 'block';
    document.getElementById('timer-text').textContent = timeLeft;
    document.getElementById('timer-fill').style.width = '100%';

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer-text').textContent = timeLeft;
        document.getElementById('timer-fill').style.width = (timeLeft / 30 * 100) + '%';

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            nextQuestion();
        }
    }, 1000);
}

// Clear timer
function clearTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        document.getElementById('timer-container').style.display = 'none';
    }
}

// Load a question
function loadQuestion() {
    const q = quizData[currentQuestion];
    if (!q) return;

    document.getElementById('question').textContent = q.question;
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';

    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.classList.add('option');
        btn.onclick = () => selectOption(index);
        optionsDiv.appendChild(btn);
    });

    document.getElementById('next-btn').style.display = 'none';
    updateProgress();
    startTimer();
}



// sound effects
const correctans = new Audio('sound/fanaf_score.mp3');
const wrongans = new Audio('sound/fnanf_error.mp3');
const donequiz = new Audio('sound/fnaf_shiftcomplete.mp3'); 
const donequiz2 = new Audio('sound/fnanf_yey.mp3'); // should be a yey mp3

correctans.volume = 0.2;
wrongans.volume = 0.9;

// Handle answer selection
// the correct or wrong answers
// this is where i add the sound effects
function selectOption(index) {
    if (selectedAnswer !== -1) return;

    selectedAnswer = index;
    clearTimer();

    const options = document.querySelectorAll('.option');
    options.forEach((opt, i) => {
        opt.disabled = true;
        if (i === quizData[currentQuestion].correct) {
            opt.classList.add('correct');
        } else if (i === index) {
            opt.classList.add('incorrect');
        }
    });

    // ✅ play sound
    if (index === quizData[currentQuestion].correct) {
        correctans.currentTime = 0;
        correctans.play();
    } else {
        wrongans.currentTime = 0;
        wrongans.play();
    }

    // ✅ show the next button
    document.getElementById('next-btn').style.display = 'block';
}



// Go to next question
function nextQuestion() {
    if (selectedAnswer === quizData[currentQuestion].correct) {
        score++;
    }

    currentQuestion++;
    selectedAnswer = -1;

    if (currentQuestion < totalQuestions) {
        loadQuestion();
    } else {
        showScore();
    }
}

// Show score and feedback
function showScore() {
    clearTimer();
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('score-container').style.display = 'block';

    document.getElementById('score-circle-text').textContent = score;
    document.getElementById('total-score').textContent = totalQuestions;

    const percentage = Math.round((score / totalQuestions) * 100);
    let feedback = "";

    if (percentage >= 80) feedback = "Outstanding! You're a JavaScript wizard. 🌟";
    else if (percentage >= 60) feedback = "Well done! More practice for those concepts. 👍";
    else if (percentage === 50) feedback = "Soooo close! Almost is never enough.😢";
    else if (percentage === 0) feedback = "It's fine to fail. Don't be like me, a failure. ☹";
    else feedback = "Bad start. Review your notes again! 📚";

    document.getElementById('feedback').textContent = feedback;

    if (score > highScore) {
        highScore = score;
        localStorage.setItem('jsQuizHighScore', highScore);
    }

    document.getElementById('high-score').style.display = 'block';
    document.getElementById('high-score-val').textContent = highScore;


    // finish yey sound mp3 (cuz its a must)
    donequiz.currentTime = 0;
    donequiz.play();
    donequiz2.currentTime = 0;
    donequiz2.play();

    donequiz.currentTime = 0;
    donequiz.play();
    s2tarConfetti(); // 🌟
}

// Restart quiz
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = -1;
    document.getElementById('question-container').style.display = 'block';
    document.getElementById('score-container').style.display = 'none';
    loadQuestion();
}

// Initialize
document.addEventListener('DOMContentLoaded', loadQuestion);




// i  chat gpt-ed this because i don't know how
// pls go easy on me TTvTT
// 🌟 Falling Star Confetti (no libraries)
function starConfetti() {
  for (let i = 0; i < 25; i++) { // number of stars
    const star = document.createElement('div');
    star.textContent = '⭐';
    star.style.position = 'fixed';
    star.style.left = Math.random() * 100 + 'vw'; // random horizontal position
    star.style.top = '-10px'; // start above the screen
    star.style.fontSize = 20 + Math.random() * 20 + 'px'; // random size
    star.style.opacity = 0.8;
    star.style.zIndex = 9999;
    star.style.userSelect = 'none';
    star.style.pointerEvents = 'none';
    star.style.animation = `starFall ${2 + Math.random() * 2}s linear`;

    document.body.appendChild(star);

    // remove after it falls
    setTimeout(() => star.remove(), 4000);
  }
}

// 💫 falling animation
const style = document.createElement('style');
style.textContent = `
@keyframes starFall {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
}`;
document.head.appendChild(style);

