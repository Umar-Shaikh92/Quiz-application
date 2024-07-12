const questions = [
  {
    question: "What is the capital of Pakistan?",
    answers: [
      { text: "Karachi", correct: false },
      { text: "Islamabad", correct: true },
      { text: "Quetta", correct: false },
      { text: "Lahore", correct: false },
    ]
  },
  {
    question: "What is the national code of Pakistan?",
    answers: [
      { text: "PK", correct: true },
      { text: "PAK", correct: false },
      { text: "PAK 1", correct: false },
      { text: "None of them", correct: false },
    ]
  },
  {
    question: "Who is the current prime minister of Pakistan?",
    answers: [
      { text: "Pervaiz Musharraf", correct: false },
      { text: "Nawaz Sharif", correct: false },
      { text: "Imran Khan", correct: false },
      { text: "Shahbaz Sharif", correct: true },
    ]
  },
  {
    question: "The national sport of Pakistan is?",
    answers: [
      { text: "Cricket", correct: false },
      { text: "Footbal", correct: false },
      { text: "Hokey", correct: true },
      { text: "Tennis", correct: false },
    ]
  },
  {
    question: "Which animal is the national animal of Pakistan?",
    answers: [
      { text: "Markhor", correct: true },
      { text: "Tiger", correct: false },
      { text: "Panda", correct: false },
      { text: "Lion", correct: false },
    ]
  },
  {
    question: "Which bird is the national bird of Pakistan??",
    answers: [
      { text: "Sparrow", correct: false },
      { text: "Cikor", correct: true },
      { text: "Eagle", correct: false },
      { text: "Peagon", correct: false },
    ]
  },
  {
    question: "Badshahi Mosque in Lahore was built by Mughal emperor?",
    answers: [
      { text: "Bahadur Shah Zafar", correct: false },
      { text: "Jalal-uddin-Akbar", correct: false },
      { text: "Shah Jahan", correct: false },
      { text: "Aurangzaib Alamgir", correct: true },
    ]
  },
  {
    question: "Which tree is the national tree of Pakistan?",
    answers: [
      { text: "Diyodar", correct: true },
      { text: "Sheesham", correct: false },
      { text: "Neem", correct: false },
      { text: "Date Palm", correct: false },
    ]
  },
  {
    question: "Where is the headquarter of IMF?",
    answers: [
      { text: "USA", correct: false },
      { text: "Washinton", correct: false },
      { text: "New York", correct: true },
      { text: "Hague", correct: false },
    ]
  },
  {
    question: "Pakistan largest river is?",
    answers: [
      { text: "Indus", correct: true },
      { text: "Hub", correct: false },
      { text: "Jhelum", correct: false },
      { text: "Ravi", correct: false },
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
    } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}



function showScore(){
  resetState();
  questionElement.innerHTML = `You Score is ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";

}




function handleNextButton(){
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
}else{
  showScore();
}
}


nextButton.addEventListener("click", ()=>{
  if (currentQuestionIndex < questions.length) {
handleNextButton();
} else {
  startQuiz();
}
  })




startQuiz();

























document.getElementById('signUpForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const name = document.getElementById('signUpName').value;
  const email = document.getElementById('signUpEmail').value;
  const password = document.getElementById('signUpPassword').value;

  const user = {
      name: name,
      email: email,
      password: password
  };
  localStorage.setItem('user', JSON.stringify(user));

  alert('Sign Up Successful');
  document.getElementById('signUpForm').reset();
});

document.getElementById('signInForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const email = document.getElementById('signInEmail').value;
  const password = document.getElementById('signInPassword').value;

  const storedUser = JSON.parse(localStorage.getItem('user'));

  if (storedUser && storedUser.email === email && storedUser.password === password) {
      alert('Sign In Successful');
      document.getElementsByClassName('quizContainer').style.visibility = 'visible';
  } else {
      alert('Invalid email or password');
      document.getElementsByClassName('app').style.visibility = 'hidden';
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (storedUser) {
      document.getElementById('authContainer').style.display = 'none';
      document.getElementById('quizContainer').style.display = 'block';
  }
});

