		
const questionNumber = document.querySelector(".question-no");
const questionText = document.querySelector(".question-text");
const optionsContainer = document.querySelector(".opt-container");
const answerIndicatorContainer = document.querySelector(".ans-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const name = document.querySelector(".name");
const totalQuestions=5;
var uname="";
var sel="";


let questionCounter=0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;


function setAvailableQuestions(course){
	console.log(course);
	switch(course){
		case "BOSM": {
			sel="Basics of Stock Market.";
			for(let i=0;i<totalQuestions; i++){
				availableQuestions.push(BOSM[i]);
				console.log(BOSM[i]);
			}
			break;
		}
		case "MF": {
			sel= "Magic of Mutual Funds.";
			for(let i=0;i<totalQuestions; i++){
				availableQuestions.push(MF[i]);
			}
			break;
		}
		case "MMM": {
			sel= "Mastering Money Management.";
			for(let i=0;i<totalQuestions; i++){
				availableQuestions.push(MMM[i]);
			}
			break;
		}
		case "FA": {
			sel= "Fundamental Analysis.";
			for(let i=0;i<totalQuestions; i++){
				availableQuestions.push(FA[i]);
			}
			break;
		}
		case "TA": {
			sel= "Technical Analysis."
			for(let i=0;i<totalQuestions; i++){
				availableQuestions.push(TA[i]);
			}
			break;
		}
		case "VA": {
			sel ="Art of Value Investing."
			for(let i=0;i<totalQuestions; i++){
				availableQuestions.push(VA[i]);
			}
			break;
		}
		case "FNO": {
			sel="Futures and Options."
			for(let i=0;i<totalQuestions; i++){
				availableQuestions.push(FNO[i]);
			}
			break;
		}

	}
	
}


function getNewQuestion(){
 	
 	questionNumber.innerHTML="Question "+(questionCounter+1)+" of "+ totalQuestions;

 	const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
 	currentQuestion=questionIndex;
 	questionText.innerHTML=currentQuestion.q;

 	const index1=availableQuestions.indexOf(questionIndex);
 	
 	availableQuestions.splice(index1,1);
 	

 	const optionLen= currentQuestion.options.length;
 	for(let i=0; i<optionLen; i++){
 		availableOptions.push(i);
 	}
 	optionsContainer.innerHTML='';
 	let animationDelay = 0.15;
	
	for(let i=0;i<optionLen; i++){
	
		const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
		
		const index2= availableOptions.indexOf(optionIndex);
		
		availableOptions.splice(index2,1);



		const option = document.createElement("div");
		option.innerHTML=currentQuestion.options[optionIndex];
		option.id=optionIndex;
		option.style.animationDelay = animationDelay+'s';
		animationDelay=animationDelay+0.15;
		option.className="option";
		optionsContainer.appendChild(option);
		option.setAttribute("onclick","getResult(this)");
	}
 	
 	questionCounter++
}


function getResult(element){
	const id = parseInt(element.id);
	
	if (id === currentQuestion.answer){
		
		element.classList.add("correct");
		
		updateAnswerIndicator("correct");
		correctAnswers++;
		console.log("correct:"+correctAnswers)
	}
	else{
	
		element.classList.add("wrong");
		
		updateAnswerIndicator("wrong");

		const optionLen = optionsContainer.children.length;
		for(let i=0; i<optionLen; i++){
			if(parseInt(optionsContainer.children[i].id) === currentQuestion.answer){
				optionsContainer.children[i].classList.add("correct");
			}
		}
	}
	attempt++;
	unclickableOptions();
}


function unclickableOptions() {

	const optionLen = optionsContainer.children.length;
	for(let i=0;i<optionLen; i++){
		optionsContainer.children[i].classList.add("already-answered");
	}
}


function answerIndicator(){
	answerIndicatorContainer.innerHTML = '';
	const totalQuestions = 5;
	for(let i=0; i<totalQuestions; i++){
		const indicator = document.createElement("div");
		answerIndicatorContainer.appendChild(indicator);
	}
}
function updateAnswerIndicator(markType){
	answerIndicatorContainer.children[questionCounter-1].classList.add(markType)
}


function next(){
	if(questionCounter===totalQuestions){
		console.log("Quiz Over!");
		quizOver();
	}
	else{
		getNewQuestion();
	}
}


function quizOver(){
	
	quizBox.classList.add("hide");
	
	resultBox.classList.remove("hide");
	quizResult();
}

function quizResult(){
	resultBox.querySelector(".res").innerHTML = "Dear " + uname + " here is your result for " + sel;
	resultBox.querySelector(".tot-question").innerHTML = totalQuestions;
	const percentage =  (correctAnswers/totalQuestions)*100;
	resultBox.querySelector(".tot-percentage").innerHTML = percentage.toFixed(2) + "%";
	resultBox.querySelector(".tot-score").innerHTML = correctAnswers+" / "+ totalQuestions;
	if(correctAnswers===5){
		resultBox.querySelector(".recommended").innerHTML = "Amazing..! You have solid understand of " + sel;
	}
	else{
		
	}
	
}



function startQuiz(elem){
	uname=document.getElementById("myInput").value;
	homeBox.classList.add("hide");
	quizBox.classList.remove("hide" );
	let course=elem.id;
	setAvailableQuestions(course);
	
	getNewQuestion();
	
	answerIndicator();
}

function resetQuiz(){
	questionCounter=0;
	correctAnswers = 0;
	attempt = 0;
}
function tryAgainQuiz(){
	
	resultBox.classList.add("hide");
	
	quizBox.classList.remove("hide");
	resetQuiz();
	startQuiz();

}
function goToHome(){
	
	resultBox.classList.add("hide");

	homeBox.classList.remove("hide");
	resetQuiz();
}	
function rEload()
{
	
	quizBox.classList.add("hide");

	homeBox.classList.remove("hide");
	resetQuiz();
}
