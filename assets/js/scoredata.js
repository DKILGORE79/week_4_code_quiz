var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");

// Retreives local stroage 
var scoreData = localStorage.getItem("scoreData");
scoreData = JSON.parse(scoreData);

if (scoreData !== null) {

    for (var i = 0; i < scoreData.length; i++) {

        var listEl = document.createElement("li");
        listEl.textContent = scoreData[i].initials + " " + scoreData[i].score;
        highScore.appendChild(listEl);

    }
}
// Clearing the scores
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

// Moving back to main index page
goBack.addEventListener("click", function () {
    window.location.replace("./index.html");
});

