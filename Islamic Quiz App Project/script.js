// QUESTION BANK
const questionBank = {
    pillars: [
        {
            question: "How many pillars are there in Islam?",
            options: ["Four", "Five", "Six", "Seven"],
            correct: 1,
            explanation: "The five pillars (Arkan al-Islam) are the foundation of Muslim life."
        },
        {
            question: "Which of these is NOT one of the pillars of Islam?",
            options: ["Salah (Prayer)", "Hajj (Pilgrimage)", "Reading Quran", "Zakat (Charity)"],
            correct: 2,
            explanation: "Reading Quran is highly rewarded, but it is not one of the specific Five Pillars."
        },
        {
            question: "What is the First Pillar of Islam?",
            options: ["Salah", "Sawm", "Shahada", "Hajj"],
            correct: 2,
            explanation: "The Shahada (Faith) is the declaration that there is no god but Allah and Muhammad is His messenger."
        },
        {
            question: "In which month do Muslims fast (Sawm)?",
            options: ["Rajab", "Ramadan", "Sha'ban", "Muharram"],
            correct: 1,
            explanation: "Fasting during the holy month of Ramadan is obligatory for all adult Muslims."
        },
        {
            question: "Hajj is obligatory for whom?",
            options: ["Every Muslim every year", "Only those who live in Mecca", "Every adult Muslim who is physically and financially able", "Only the elderly"],
            correct: 2,
            explanation: "Hajj is required once in a lifetime for those who have the physical and financial ability."
        }
    ],
    prophets: [
        {
            question: "Who was the first Prophet in Islam?",
            options: ["Nuh (Noah)", "Ibrahim (Abraham)", "Adam", "Musa (Moses)"],
            correct: 2,
            explanation: "Adam (AS) was the first human created and the first Prophet of Allah."
        },
        {
            question: "To which Prophet was the Injil (Gospel) revealed?",
            options: ["Musa (AS)", "Isa (AS)", "Dawud (AS)", "Muhammad (PBUH)"],
            correct: 1,
            explanation: "The Injil was revealed to Prophet Isa (Jesus) AS."
        },
        {
            question: "Which Prophet is known as 'Khalilullah' (Friend of Allah)?",
            options: ["Ibrahim (AS)", "Ismail (AS)", "Yusuf (AS)", "Yunus (AS)"],
            correct: 0,
            explanation: "Prophet Ibrahim (AS) was given the title Khalilullah due to his immense love and obedience to Allah."
        },
        {
            question: "Who was the last Prophet of Allah?",
            options: ["Isa (AS)", "Musa (AS)", "Muhammad (PBUH)", "Yahya (AS)"],
            correct: 2,
            explanation: "Prophet Muhammad (PBUH) is the Seal of the Prophets (Khatam an-Nabiyyin)."
        },
        {
            question: "Which Prophet was swallowed by a whale?",
            options: ["Yusuf (AS)", "Yunus (AS)", "Nuh (AS)", "Lut (AS)"],
            correct: 1,
            explanation: "Prophet Yunus (Jonah) was swallowed by a whale and repented to Allah from within."
        }
    ],
    quran: [
        {
            question: "What is the first Surah in the Quran?",
            options: ["Surah Al-Baqarah", "Surah Yasin", "Surah Al-Fatiha", "Surah An-Nas"],
            correct: 2,
            explanation: "Surah Al-Fatiha (The Opening) is the first chapter of the Quran."
        },
        {
            question: "Which is the longest Surah in the Quran?",
            options: ["Al-Baqarah", "Al-Imran", "An-Nisa", "Al-Ma'idah"],
            correct: 0,
            explanation: "Surah Al-Baqarah consists of 286 verses, making it the longest Surah."
        },
        {
            question: "The Quran was revealed over a period of approximately how many years?",
            options: ["10 years", "23 years", "40 years", "50 years"],
            correct: 1,
            explanation: "The Quran was revealed to Prophet Muhammad (PBUH) over a period of approximately 23 years."
        },
        {
            question: "Which Surah is known as the 'Heart of the Quran'?",
            options: ["Surah Rahman", "Surah Yasin", "Surah Mulk", "Surah Kahf"],
            correct: 1,
            explanation: "Prophet Muhammad (PBUH) referred to Surah Yasin as the heart of the Quran."
        },
        {
            question: "How many Juz (parts) are there in the Quran?",
            options: ["10", "114", "30", "60"],
            correct: 2,
            explanation: "The Quran is divided into 30 equal parts, known as Juz or Para."
        }
    ]
};

// STATE VARIABLES
let currentCategory = '';
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let hasAnswered = false;

//INITIALIZATION
// Load High Scores on startup
document.addEventListener('DOMContentLoaded', () => {
    updateHighScoreUI();
});

//CORE FUNCTIONS

// Start Quiz
function startQuiz(category) {
    currentCategory = category;
    currentQuestions = [...questionBank[category]];
    currentQuestionIndex = 0;
    score = 0;
    
    // UI Transitions
    document.getElementById('welcome-screen').classList.add('d-none');
    document.getElementById('result-screen').classList.add('d-none');
    document.getElementById('quiz-screen').classList.remove('d-none');
    
    displayQuestion();
}

// Display Question 
function displayQuestion() {
    hasAnswered = false; // Reset answer state
    const questionData = currentQuestions[currentQuestionIndex];
    
    // Update UI Elements
    document.getElementById('current-question-num').textContent = currentQuestionIndex + 1;
    document.getElementById('total-questions').textContent = currentQuestions.length;
    document.getElementById('current-score').textContent = score;
    document.getElementById('question-text').textContent = questionData.question;
    
    // Update Progress Bar
    const progressPercent = ((currentQuestionIndex) / currentQuestions.length) * 100;
    document.getElementById('progress-bar').style.width = `${progressPercent}%`;

    // Reset Feedback Area
    const feedbackContainer = document.getElementById('feedback-container');
    feedbackContainer.classList.add('d-none');
    feedbackContainer.className = 'mt-4 p-3 rounded d-none';
    
    // Disable Next Button
    const nextBtn = document.getElementById('next-btn');
    nextBtn.classList.add('disabled');

    // Generate Options
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    questionData.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'btn option-btn w-100 text-start';
        button.innerHTML = `<span class="fw-bold me-2">${String.fromCharCode(65 + index)}.</span> ${option}`;
        button.onclick = () => selectAnswer(index, button);
        optionsContainer.appendChild(button);
    });
}

// Handle Answer Selection
function selectAnswer(selectedIndex, selectedButton) {
    if (hasAnswered) return; // Prevent multiple clicks
    hasAnswered = true;

    const questionData = currentQuestions[currentQuestionIndex];
    const isCorrect = selectedIndex === questionData.correct;
    const allButtons = document.querySelectorAll('.option-btn');

    // 1. Visual Feedback on Buttons
    if (isCorrect) {
        score += 10;
        selectedButton.classList.add('correct');
        selectedButton.innerHTML += ` <i class="fas fa-check-circle float-end mt-1"></i>`;
    } else {
        selectedButton.classList.add('wrong');
        selectedButton.innerHTML += ` <i class="fas fa-times-circle float-end mt-1"></i>`;
        // Highlight the correct answer
        allButtons[questionData.correct].classList.add('correct');
        allButtons[questionData.correct].innerHTML += ` <i class="fas fa-check-circle float-end mt-1"></i>`;
    }

    // Disable all buttons
    allButtons.forEach(btn => btn.classList.add('disabled'));

    // 2. Update Score
    document.getElementById('current-score').textContent = score;

    // 3. Show Explanation
    const feedbackContainer = document.getElementById('feedback-container');
    const feedbackTitle = document.getElementById('feedback-title');
    const feedbackText = document.getElementById('feedback-text');

    feedbackContainer.classList.remove('d-none');
    if (isCorrect) {
        feedbackContainer.classList.add('feedback-correct');
        feedbackTitle.textContent = "Correct!";
    } else {
        feedbackContainer.classList.add('feedback-wrong');
        feedbackTitle.textContent = "Incorrect";
    }
    feedbackText.textContent = questionData.explanation;

    // 4. Enable Next Button
    document.getElementById('next-btn').classList.remove('disabled');
}

// Next Question Logic 
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

// End Quiz and Show Results
function endQuiz() {
    document.getElementById('quiz-screen').classList.add('d-none');
    document.getElementById('result-screen').classList.remove('d-none');

    const totalScore = currentQuestions.length * 10;
    document.getElementById('final-score').textContent = score;
    document.getElementById('final-total').textContent = totalScore;

    // Result Message
    const percentage = (score / totalScore) * 100;
    const msgElement = document.getElementById('result-message');
    const iconElement = document.getElementById('result-icon');
    
    if (percentage === 100) {
        msgElement.textContent = "Masha'Allah! Perfect Score!";
        iconElement.className = "fas fa-star fa-4x text-warning mb-3";
    } else if (percentage >= 70) {
        msgElement.textContent = "Excellent work! Keep learning.";
        iconElement.className = "fas fa-trophy fa-4x text-warning mb-3";
    } else {
        msgElement.textContent = "Good effort! Try again to improve.";
        iconElement.className = "fas fa-book-open fa-4x text-info mb-3";
    }

    saveHighScore(score, currentCategory);
}

// Restart Quiz
function restartQuiz() {
    startQuiz(currentCategory);
}

//DATA PERSISTENCE (LocalStorage)

function saveHighScore(newScore, category) {
    const highScores = JSON.parse(localStorage.getItem('islamicQuizHighScores')) || {};
    
    // Only update if new score is higher
    if (!highScores[category] || newScore > highScores[category]) {
        highScores[category] = newScore;
        localStorage.setItem('islamicQuizHighScores', JSON.stringify(highScores));
        updateHighScoreUI();
    }
}

function updateHighScoreUI() {
    const highScores = JSON.parse(localStorage.getItem('islamicQuizHighScores')) || {};
    
    // Update badges on the welcome screen
    if(highScores.pillars) document.getElementById('score-pillars').textContent = `High Score: ${highScores.pillars}`;
    if(highScores.prophets) document.getElementById('score-prophets').textContent = `High Score: ${highScores.prophets}`;
    if(highScores.quran) document.getElementById('score-quran').textContent = `High Score: ${highScores.quran}`;
}