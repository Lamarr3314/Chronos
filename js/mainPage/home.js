const realuser_id = getCookie(decodeURIComponent(document.cookie));
let todayCompleted=0;
let todayInCompleted=0;
function getCookie(decodedCookie) {
  let cookieArr = decodedCookie.split("=");
  let tempcookie = cookieArr[1];
  let newArr = tempcookie.split("n");
  let endUsr = newArr[0];
  return endUsr;
}
window.addEventListener("load", (event) => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;
  console.log(realuser_id);
  console.log(today);
  // let circle=document.querySelector(".meter-2")
  // circle.style.strokeDashoffset= "20"
  getDateData(today, realuser_id);
});
var loadFile = function (event) {
  var image = document.getElementById("output");
  image.src = URL.createObjectURL(event.target.files[0]);
};

let noProfile = (document.getElementById("output").src =
  "../../images/empty pfp.png");

let pfpBorder = (document.getElementById("output").style.border =
  "3px solid #606980");

let streakBadge = document.getElementById("Streak");
streakBadge.onclick = function () {
  document.getElementById("Streak").src = "../../images/StreakUnlocked.png";
};

let shareBadge = document.getElementById("Share");
shareBadge.onclick = function () {
  document.getElementById("Share").src = "../../images/ShareUnlocked.png";
};

let allGoalsDoneBage = document.getElementById("AllGoalsDone");
allGoalsDoneBage.onclick = function () {
  document.getElementById("AllGoalsDone").src =
    "../../images/AllGoalsDoneUnlocked.png";
};

let PlannerBadge = document.getElementById("Planner");
PlannerBadge.onclick = function () {
  document.getElementById("Planner").src = "../../images/PlannerUnlocked.png";
};
function extractData(data) {
  console.log(data)
  if (data.length === 0) {
    calcPercent(1, 0);
  }
  data.forEach(function ({ goal_id, goal_name, date_added, is_completed }) {
    if (is_completed == 1) {
      todayCompleted++;
    }
    if (is_completed == 0) {
      todayInCompleted++;
    }
    calcPercent(todayCompleted, todayInCompleted);
  });
}

function getDateData(date_added, user_id) {
  fetch(
    "https://cronos-productivity.herokuapp.com/search/" +
      user_id +
      "/" +
      date_added
  )
    .then((response) => response.json())
    .then((data) => extractData(data["data"]));
}
function calcPercent(complete, inComplete) {
  console.log("Complete: " + complete);
  console.log("Incomplete: " + inComplete);
  let fraction = complete / (complete + inComplete);
  console.log("fraction: " + Math.floor(fraction*100));
  fraction=Math.floor(fraction*100)
  let percent=document.querySelector(".half-arc")
  percent.style="--percentage: "+fraction+"%"
  document.querySelector(".label").innerHTML=fraction+"%";
}
