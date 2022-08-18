//check the console for date click event
//Fixed day highlight
//Added previous month and next month view
let dateChose = new Date();
let todayGoalPercent = 40;
var elem = document.getElementById("myBar");
let calender = document.querySelector(".calendar");
let dayPercent = document.querySelector(".dayPercent");
let chart = document.querySelector("#chartContainer");
let calendarBtn = document.querySelector(".button-85");
let calendarOn = false;
var i = 0;
function move() {
  if (i == 0) {
    i = 1;
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= todayGoalPercent) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        dayPercent.innerHTML = width + "%";
        elem.style.width = width + "%";
      }
    }
  }
}
function CalendarControl() {
  const calendar = new Date();
  const calendarControl = {
    localDate: new Date(),
    prevMonthLastDate: null,
    calWeekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    calMonthName: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    daysInMonth: function (month, year) {
      return new Date(year, month, 0).getDate();
    },
    firstDay: function () {
      return new Date(calendar.getFullYear(), calendar.getMonth(), 1);
    },
    lastDay: function () {
      return new Date(calendar.getFullYear(), calendar.getMonth() + 1, 0);
    },
    firstDayNumber: function () {
      return calendarControl.firstDay().getDay() + 1;
    },
    lastDayNumber: function () {
      return calendarControl.lastDay().getDay() + 1;
    },
    getPreviousMonthLastDate: function () {
      let lastDate = new Date(
        calendar.getFullYear(),
        calendar.getMonth(),
        0
      ).getDate();
      return lastDate;
    },
    navigateToPreviousMonth: function () {
      calendar.setMonth(calendar.getMonth() - 1);
      calendarControl.attachEventsOnNextPrev();
    },
    navigateToNextMonth: function () {
      calendar.setMonth(calendar.getMonth() + 1);
      calendarControl.attachEventsOnNextPrev();
    },
    navigateToCurrentMonth: function () {
      let currentMonth = calendarControl.localDate.getMonth();
      let currentYear = calendarControl.localDate.getFullYear();
      calendar.setMonth(currentMonth);
      calendar.setYear(currentYear);
      calendarControl.attachEventsOnNextPrev();
    },
    displayYear: function () {
      let yearLabel = document.querySelector(".calendar .calendar-year-label");
      yearLabel.innerHTML = calendar.getFullYear();
    },
    displayMonth: function () {
      let monthLabel = document.querySelector(
        ".calendar .calendar-month-label"
      );
      monthLabel.innerHTML = calendarControl.calMonthName[calendar.getMonth()];
    },
    selectDate: function (e) {
      console.log(
        `${e.target.textContent} ${
          calendarControl.calMonthName[calendar.getMonth()]
        } ${calendar.getFullYear()}`
      );
      dateChose = `${e.target.textContent} ${
        calendarControl.calMonthName[calendar.getMonth()]
      } ${calendar.getFullYear()}`;
      calendarOn = false;
      calender.style.display = "none";
      chart.style.display = "flex";
      // console.log(calendar.value)
      let date = e.target.textContent;
      if (date < 10) {
        date = "0" + date;
      }
      console.log(date);
      let month = calendar.getMonth();
      month += 1;
      if (month < 10) {
        month = "0" + month;
      }
      console.log(month);
      let year = calendar.getFullYear();
      console.log(year);
      let fullDate = year + "-" + month + "-" + date;
      console.log(fullDate);
      // console.log(newDateArray);
      // let newDate = newDateArray[0] + newDateArray[1];
      // console.log(newDate);
      getDateData(fullDate, 3);
    },
    plotSelectors: function () {
      document.querySelector(
        ".calendar"
      ).innerHTML += `<div class="calendar-inner"><div class="calendar-controls">
        <div class="calendar-prev"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#666" d="M88.2 3.8L35.8 56.23 28 64l7.8 7.78 52.4 52.4 9.78-7.76L45.58 64l52.4-52.4z"/></svg></a></div>
        <div class="calendar-year-month">
        <div class="calendar-month-label"></div>
        <div>-</div>
        <div class="calendar-year-label"></div>
        </div>
        <div class="calendar-next"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#666" d="M38.8 124.2l52.4-52.42L99 64l-7.77-7.78-52.4-52.4-9.8 7.77L81.44 64 29 116.42z"/></svg></a></div>
        </div>
        <div class="calendar-today-date">Today: 
          ${calendarControl.calWeekDays[calendarControl.localDate.getDay()]}, 
          ${calendarControl.localDate.getDate()}, 
          ${calendarControl.calMonthName[calendarControl.localDate.getMonth()]} 
          ${calendarControl.localDate.getFullYear()}
        </div>
        <div class="calendar-body"></div></div>`;
    },
    plotDayNames: function () {
      for (let i = 0; i < calendarControl.calWeekDays.length; i++) {
        document.querySelector(
          ".calendar .calendar-body"
        ).innerHTML += `<div>${calendarControl.calWeekDays[i]}</div>`;
      }
    },
    plotDates: function () {
      document.querySelector(".calendar .calendar-body").innerHTML = "";
      calendarControl.plotDayNames();
      calendarControl.displayMonth();
      calendarControl.displayYear();
      let count = 1;
      let prevDateCount = 0;

      calendarControl.prevMonthLastDate =
        calendarControl.getPreviousMonthLastDate();
      let prevMonthDatesArray = [];
      let calendarDays = calendarControl.daysInMonth(
        calendar.getMonth() + 1,
        calendar.getFullYear()
      );
      // dates of current month
      for (let i = 1; i < calendarDays; i++) {
        if (i < calendarControl.firstDayNumber()) {
          prevDateCount += 1;
          document.querySelector(
            ".calendar .calendar-body"
          ).innerHTML += `<div class="prev-dates"></div>`;
          prevMonthDatesArray.push(calendarControl.prevMonthLastDate--);
        } else {
          document.querySelector(
            ".calendar .calendar-body"
          ).innerHTML += `<div class="number-item" data-num=${count}><a class="dateNumber" href="#">${count++}</a></div>`;
        }
      }
      //remaining dates after month dates
      for (let j = 0; j < prevDateCount + 1; j++) {
        document.querySelector(
          ".calendar .calendar-body"
        ).innerHTML += `<div class="number-item" data-num=${count}><a class="dateNumber" href="#">${count++}</a></div>`;
      }
      calendarControl.highlightToday();
      calendarControl.plotPrevMonthDates(prevMonthDatesArray);
      calendarControl.plotNextMonthDates();
    },
    attachEvents: function () {
      let prevBtn = document.querySelector(".calendar .calendar-prev a");
      let nextBtn = document.querySelector(".calendar .calendar-next a");
      let todayDate = document.querySelector(".calendar .calendar-today-date");
      let dateNumber = document.querySelectorAll(".calendar .dateNumber");
      prevBtn.addEventListener(
        "click",
        calendarControl.navigateToPreviousMonth
      );
      nextBtn.addEventListener("click", calendarControl.navigateToNextMonth);
      todayDate.addEventListener(
        "click",
        calendarControl.navigateToCurrentMonth
      );
      for (var i = 0; i < dateNumber.length; i++) {
        dateNumber[i].addEventListener(
          "click",
          calendarControl.selectDate,
          false
        );
      }
    },
    highlightToday: function () {
      let currentMonth = calendarControl.localDate.getMonth() + 1;
      let changedMonth = calendar.getMonth() + 1;
      let currentYear = calendarControl.localDate.getFullYear();
      let changedYear = calendar.getFullYear();
      if (
        currentYear === changedYear &&
        currentMonth === changedMonth &&
        document.querySelectorAll(".number-item")
      ) {
        document
          .querySelectorAll(".number-item")
          [calendar.getDate() - 1].classList.add("calendar-today");
      }
    },
    plotPrevMonthDates: function (dates) {
      dates.reverse();
      for (let i = 0; i < dates.length; i++) {
        if (document.querySelectorAll(".prev-dates")) {
          document.querySelectorAll(".prev-dates")[i].textContent = dates[i];
        }
      }
    },
    plotNextMonthDates: function () {
      let childElemCount =
        document.querySelector(".calendar-body").childElementCount;
      //7 lines
      if (childElemCount > 42) {
        let diff = 49 - childElemCount;
        calendarControl.loopThroughNextDays(diff);
      }

      //6 lines
      if (childElemCount > 35 && childElemCount <= 42) {
        let diff = 42 - childElemCount;
        calendarControl.loopThroughNextDays(42 - childElemCount);
      }
    },
    loopThroughNextDays: function (count) {
      if (count > 0) {
        for (let i = 1; i <= count; i++) {
          document.querySelector(
            ".calendar-body"
          ).innerHTML += `<div class="next-dates">${i}</div>`;
        }
      }
    },
    attachEventsOnNextPrev: function () {
      calendarControl.plotDates();
      calendarControl.attachEvents();
    },
    init: function () {
      calendarControl.plotSelectors();
      calendarControl.plotDates();
      calendarControl.attachEvents();
    },
  };
  calendarControl.init();
}

const calendarControl = new CalendarControl();
var canvasElement = document.getElementById("chart");
let mondayComplete = 0;
let tuesdayComplete = 0;
let wednesdayComplete = 0;
let thursdayComplete = 0;
let fridayComplete = 0;
let saturdayComplete = 0;
let sundayComplete = 0;
let mondayInComplete = 0;
let tuesdayInComplete = 0;
let wednesdayInComplete = 0;
let thursdayInComplete = 0;
let fridayInComplete = 0;
let saturdayInComplete = 0;
let sundayInComplete = 0;
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
window.onload = function () {
  move();
  console.log("The page was loaded successfully");
};
function loadDate(data) {
  if (data.length === 0) {
    let dayOTW = new Date(date_added);
    dayOTW = dayOTW.getUTCDay();
    switch (dayOTW) {
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
        break;
      case 6:
        break;
      case 7:
        break;
    }
    console.log("u got no data");
    return;
  }
  data.forEach(function ({ goal_id, goal_name, date_added, is_completed }) {
    // list.innerHTML = "";
    let outtaLoop = false;
    let dayOTW = new Date(date_added);
    dayOTW = dayOTW.getUTCDay();
    fulldate = new Date(date_added);
    let filteredDay = fulldate.getDate();
    let filteredMonth = fulldate.getDate();
    let filteredYear = fulldate.getDate();

    console.log("without function: " + fulldate);
    let upDate = addDay(fulldate);
    console.log("with n:" + upDate);
    console.log("Day number" + dayOTW);
    switch (dayOTW) {
      case 1:
        break;
      case 2:
        console.log("GOOD");
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
        break;
      case 6:
        break;
      case 7:
        break;
    }
    console.log("monday Complete:" + mondayComplete);
    console.log("monday inComplete:" + mondayInComplete);
  });
}
if (calendarOn == false) {
  calendarBtn.onclick = function () {
    calender.style.display = "flex";
    console.log(dateChose);
    chart.style.display = "none";
  };
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
function addDay(date) {
  let m = date.getMonth();
  m += 1;
  let y = date.getFullYear();
  let d = date.getDate();
  d += 1;
  if (m < 10) {
    m = "0" + m;
  }
  return y + "-" + m + "-" + d;
}
