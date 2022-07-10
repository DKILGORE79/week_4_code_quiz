
var score = 0;
var questionIndex = 0;
var wrapper = document.querySelector("#wrapper");
var questionsSec = document.querySelector("#questionsSec");
var secTimer = document.querySelector("#secTimer");
var timer = document.querySelector("#startQuiz");

// Remaining time, 10 sec per question. 1 sec extra for delay in display
var timeRem = 81;
// For holding time interval
var holdTime = 0;
// Penalty time
var penTime = 10;
// new ul element
var ulEl = document.createElement("ul");

// For trigegring the timer and display it - https://stackoverflow.com/questions/31106189/create-a-simple-10-second-countdown
timer.addEventListener("click", function () {
    if (holdTime === 0) {
        holdTime = setInterval(function () {
            timeRem--;
            secTimer.textContent = "Time: " + timeRem;

            if (timeRem <= 0) {
                clearInterval(holdTime);
                allDone();
                secTimer.textContent = "Time's up!";
            }
        }, 1000);
    }
    displayQuiz(questionIndex);
});

// Displaying question and options - Tutor helped here
function displayQuiz(questionIndex) {
    // Existing questions clearing
    questionsSec.innerHTML = "";
    ulEl.innerHTML = "";
    // Loop for accessing each question
    for (var i = 0; i < questions.length; i++) {
        // Appends question title only
        var disQues = questions[questionIndex].title;
        var disOption = questions[questionIndex].choices;
        questionsSec.textContent = disQues;
    }
    // Loop for accessing the options
    disOption.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsSec.appendChild(ulEl);
        ulEl.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
// Comparing user answer with true answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var divEl = document.createElement("div");
        divEl.setAttribute("id", "divEl");

        if (element.textContent == questions[questionIndex].answer) {
            score++;
            divEl.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;

        } else {
            // 10 seconds penulty for wrong answers
            timeRem = timeRem - penTime;
            divEl.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }

    questionIndex++;

    if (questionIndex >= questions.length) {
        allDone();
        divEl.textContent = "Done!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        displayQuiz(questionIndex);
    }
    questionsSec.appendChild(divEl);

}
// All done will appear when quiz is finished
function allDone() {
    questionsSec.innerHTML = "";
    secTimer.innerHTML = "";

    // All done text
    var h1El = document.createElement("h1");
    h1El.setAttribute("id", "h1El");
    h1El.textContent = "All Done!"

    questionsSec.appendChild(h1El);


    var pEl = document.createElement("p");
    pEl.setAttribute("id", "pEl");

    questionsSec.appendChild(pEl);

    // Remaining time is converted to score
    if (timeRem >= 0) {
        var timeRemaining = timeRem;
        var pEl2 = document.createElement("p");
        clearInterval(holdTime);
        pEl.textContent = "Your final score is: " + timeRemaining;
        questionsSec.appendChild(pEl2);
    }

    // Creating label element
    var labelEl = document.createElement("label");
    labelEl.setAttribute("id", "labelEl");
    labelEl.textContent = "Enter your initials: ";

    questionsSec.appendChild(labelEl);

    //input for user initials
    var inputEl = document.createElement("input");
    inputEl.setAttribute("type", "text");
    inputEl.setAttribute("id", "initials");
    inputEl.textContent = "";

    questionsSec.appendChild(inputEl);

    // submit button
    var submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("id", "Submit");
    submitButton.textContent = "Submit";

    questionsSec.appendChild(submitButton);

    // function for accessing intitals and score data - https://www.delftstack.com/howto/javascript/javascript-onclick-submit-form/
    submitButton.addEventListener("click", function () {
        var initials = inputEl.value;

        if (initials === null) {

            console.log("Enter something!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var scoreData = localStorage.getItem("scoreData");
            if (scoreData === null) {
                scoreData = [];
            } else {
                scoreData = JSON.parse(scoreData);
            }
            scoreData.push(finalScore);
            var newScore = JSON.stringify(scoreData);
            localStorage.setItem("scoreData", newScore);
            window.location.replace("./scoredata.html");
        }
    });



}


