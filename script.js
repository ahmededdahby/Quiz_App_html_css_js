var startButton = document.getElementById("start-button");
var nextButton = document.getElementById("next-button");

var questionContainer = document.getElementById("question-container");
//question is empty for the moment
var question = document.getElementById("question");
var answerButtons = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;
let quizScore = 0;


nextButton.addEventListener("click", () => { 
    currentQuestionIndex++
    setnextQuestion()
})
//start game button
startButton.addEventListener("click", startGame);
function startGame() {
    startButton.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random());
    console.log(shuffledQuestions);
    currentQuestionIndex = 0;
    questionContainer.classList.remove("hide");
    setnextQuestion();
    quizScore = 0;
    document.getElementById('right-answer').innerText = quizScore
}



//funct responsable for showing the question
function showQuestion(question) {
    for (var i = 0; i < question.answers.length; i++) {
        const btn = document.createElement("button");
        btn.innerText = question.answers[i].text;
        btn.classList.add("btn");
        if (question.answers[i].correct) {
            btn.dataset.correct = question.answers.correct;
        }
        btn.addEventListener("click", selectAnswer);
        answerButtons.appendChild(btn);
    }
    questionContainer.innerText = question.question;
    questionContainer.appendChild(answerButtons);
}
//selecting the answer
function selectAnswer(e) { 
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct

    setStatusClass(document.body, correct)
    Array.from(answerButtons.children).forEach((btn) => {
        setStatusClass(btn,btn.dataset.correct)  
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) { 
        nextButton.classList.remove("hide") 
    } else {
        startButton.innerText = "restart"
        startButton.classList.remove("hide")
    }
    if (selectedButton.dataset = correct) {
        quizScore++
    }
    document.getElementById('right-answer').innerText = quizScore
}

















function setnextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}


//hide next button + remove the prev buttons in answer-buttons+removing the background frm the body
function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add("hide");
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
//removing background from element
function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}
//adding background color to element
function setStatusClass(element,correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct")
        
    } else {
        element.classList.add('wrong')
    }
}