var canvasElement = document.getElementById("chart");
let mondayComplete=0;
let tuesdayComplete=0;
let wednesdayComplete=0;
let thursdayComplete=0;
let fridayComplete=0;
let saturdayComplete=0;
let sundayComplete=0;
var config = {
  type: "bar",
  backdropColor: "rgba(255, 255, 255, 1.1)",
  data: {
    backgroundColor: "rgb(255, 255, 255)",
    fontColor: "rgb(255, 255, 255)",
    labels: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    datasets: [
      {
        label: "Percentage of your  Goal",
        fontColor: "rgb(255, 255, 255)",
        data: [10, 60, 30, 90, 20, 100, 38],
        backdropColor: "rgba(255, 255, 255, 1)",
        backgroundColor: [
          "#f17e3c",
          "#f17e3c",
          "#f17e3c",
          "#f17e3c",
          "#f17e3c",
          "#f17e3c",
        ],
        borderColor: [
          "#f48c44",
          "#f48c44",
          "#f48c44",
          "#f48c44",
          "#f48c44",
          "#f48c44",
        ],
      },
    ],
  },
};
var cookieChart = new Chart(canvasElement, config);
window.onload = function() {
  console.log("The page was loaded successfully")
  getDateData('2022-08-15', 3);
};
function loadDate(data){
  data.forEach(function ({ goal_id, goal_name, date_added, is_completed }) {
    let current= new Date(date_added)
    console.log(date_added);
    console.log(current.getUTCDay())
  })
}
function getDateData(date_added, user_id) {
  fetch(
    "https://cronos-productivity.herokuapp.com/search/" +
      user_id +
      "/" +
      date_added
  )
    .then((response) => response.json())
    .then((data) => loadDate(data["data"]));
}