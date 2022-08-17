var canvasElement = document.getElementById("chart");
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
