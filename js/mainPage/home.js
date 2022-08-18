const realuser_id=getCookie(decodeURIComponent(document.cookie))
function getCookie(decodedCookie) {
  let cookieArr = decodedCookie.split("=");
  let tempcookie = cookieArr[1];
  return tempcookie;
}
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