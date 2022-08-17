const list = document.querySelector("#tasks");
let hasData = false;
let dueDate;
let dataLoaded = false;
let taskListSelect = document.querySelector("#tasks");
window.addEventListener("load", () => {
  const form = document.querySelector("#new-task-form");
  const input = document.querySelector("#new-task-input");

  const calendartext = document.querySelector("#calendartext");
  const calendar = document.querySelector("#calendar");

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  const currDate = yyyy + "-" + mm + "-" + dd;

  dueDate = calendar.value;
  // getAllData(dueDate, 3)
  getDateData(dueDate, 3);
  list.innerHTML = "";
  console.log("This code runs");

  function updateText(date) {
    if (date == currDate) {
      calendartext.innerHTML = "Today";
    } else {
      calendartext.innerHTML = date;
    }
  }

  // CHECK DATABASE IF CURRENT INFORMATION ALREADY EXISTS FOR THIS DATE
  // IF SO, POPULATE PAGE WITH THE INFORMATION
  // IF NOT, CREATE A NEW ENTRY FOR THAT DATE

  list.innerHTML = "";

  calendar.addEventListener("change", () => {
    list.innerHTML = "";
    console.log("changed");
    dueDate = calendar.value;
    getDateData(dueDate, 3);
    updateText(dueDate);
    // loadDate();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputVal = input.value;
    if (!inputVal) {
      alert("Please fill out the task");
      return;
    } else {
      insertData(inputVal, dueDate, "goal", 0, 0);
      //DATAHERE
    }

    input.value = "";

    // task_edit.addEventListener("click", () => {
    //   console.log(task_edit.name);
    //   if (task_edit.name == "edit") {
    //     task_input.removeAttribute("readonly");
    //     task_input.focus();
    //     task_edit.innerHTML = '<img src = "images/check.png">';
    //     task_edit.name = "check";
    //   } else {
    //     // UPDATE TASK WITH THE NEW VALUE OF THE TASK_INPUT
    //     task_edit.name = "edit";
    //     task_input.setAttribute("readonly", "readonly");
    //     task_edit.innerHTML = '<img src = "images/edit.png">';
    //   }
    // });
    // task_delete.addEventListener("click", () => {
    //   // REMOVE TASK FROM DATABASE
    //   list.removeChild(task);
    // });
  });
});

function loadDate(data) {
  // some variable to hold data, from index.html
  if (data.length === 0) {
    list.innerHTML = "";
    hasData = false;
    console.log("u got no data");
    return;
  }
  data.forEach(function ({ goal_id, goal_name, date_added }) {
    // list.innerHTML = "";
    console.log(data);
    const task = document.createElement("div");
    task.classList.add("task");

    const task_content = document.createElement("div");
    task_content.classList.add("content");

    task.appendChild(task_content);

    const task_input = document.createElement("input");
    task_input.classList.add("text");
    task_input.type = "text";
    task_input.value = goal_name;
    task_input.setAttribute("readonly", "readonly");
    task_content.appendChild(task_input);
    task_input.setAttribute("data-id", goal_id);

    const task_actions = document.createElement("div");
    task_actions.classList.add("actions");

    const task_edit = document.createElement("button");
    task_edit.classList.add("edit");
    task_edit.innerHTML =
      '<img src = "images/edit.png" data-id="' + goal_id + '">';
    task_edit.name = "edit";
    task_edit.setAttribute("data-id", goal_id);

    const task_delete = document.createElement("button");
    task_delete.classList.add("delete");
    task_delete.innerHTML =
      '<img src = "images/delete.png" data-id="' + goal_id + '">';
    task_delete.setAttribute("data-id", goal_id);

    const task_completed = document.createElement("input");
    task_completed.classList.add("completed");
    task_completed.type = "checkbox";
    task_completed.setAttribute("data-id", goal_id);

    task_actions.appendChild(task_completed);
    task_actions.appendChild(task_edit);
    task_actions.appendChild(task_delete);

    task.appendChild(task_actions);
    list.appendChild(task);
    task_completed.addEventListener("click", (event) => {
      console.log(task_input.value);
    });
    task_delete.addEventListener("click", (event) => {
      list.innerHTML = "";
      deleteRowById(goal_id);
    });
    task_edit.addEventListener("click", () => {
      console.log(task_edit.name);
      if (task_edit.name == "edit") {
        task_input.removeAttribute("readonly");
        task_input.focus();
        task_edit.innerHTML = '<img src = "images/check.png">';
        task_edit.name = "check";
      } else {
        list.innerHTML = "";
        updateRowById(task_input.value, goal_id);
        // UPDATE TASK WITH THE NEW VALUE OF THE TASK_INPUT
        task_edit.name = "edit";
        task_input.setAttribute("readonly", "readonly");
        task_edit.innerHTML = '<img src = "images/edit.png">';
        console.log(task_input.value);
      }
    });
    task_completed.addEventListener("click", () => {
      if (task_completed.checked) {
        insertData("NA", "NA", "checkBox", goal_id, 1);
        // UPDATE "IS COMPLETED" BOOLEAN VARIABLE TO BE TRUE
        console.log("changed");
        task_input.style.textDecoration = "line-through";
        task_input.style.opacity = 0.5;
        task_input.style.color = "#1fd655";
      } else {
        insertData("NA", "NA", "checkBox", goal_id, 1);
        // UPDATE "IS COMPLETED" BOOLEAN VARIABLE TO BE FALSE
        console.log("revert");
        task_input.style.textDecoration = "none";
        task_input.style.opacity = 1;
        task_input.style.color = "#EEE";
      }
    });
  });
}
function insertDivEl(data) {
  console.log(data);
  console.log("We runnin");
  console.log(data.goal_id);
  const task = document.createElement("div");
  task.classList.add("task");

  const task_content = document.createElement("div");
  task_content.classList.add("content");

  task.appendChild(task_content);

  const task_input = document.createElement("input");
  task_input.classList.add("text");
  task_input.type = "text";
  task_input.value = data.goal_name;
  task_input.setAttribute("readonly", "readonly");
  task_content.appendChild(task_input);

  const task_actions = document.createElement("div");
  task_actions.classList.add("actions");

  const task_edit = document.createElement("button");
  task_edit.classList.add("edit");
  task_edit.innerHTML = '<img src = "images/edit.png">';
  task_edit.name = "edit";

  const task_delete = document.createElement("button");
  task_delete.classList.add("delete");
  task_delete.innerHTML = '<img src = "images/delete.png">';

  const task_completed = document.createElement("input");
  task_completed.classList.add("completed");
  task_completed.type = "checkbox";
  task_completed.value = true;

  task_actions.appendChild(task_completed);
  task_actions.appendChild(task_edit);
  task_actions.appendChild(task_delete);

  task.appendChild(task_actions);
  list.appendChild(task);
  console.log(dataLoaded);
  console.log(data.is_completed);
}
function deleteRowById(goal_id) {
  fetch("https://cronos-productivity.herokuapp.com/delete/" + goal_id, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        getDateData(dueDate, 3);
      }
    });
}

function updateRowById(goal_name, goal_id) {
  console.log("line 225 script.js is run");
  fetch("https://cronos-productivity.herokuapp.com/update", {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      goal_id: goal_id,
      goal_name: goal_name,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        getDateData(dueDate, 3);
      }
    });
}
function getAllData(date_added, user_id) {
  fetch("https://cronos-productivity.herokuapp.com/getAll", {
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      date_added: date_added,
      user_id: user_id,
    }),
  })
    .then((response) => response.json())
    .then((data) => loadDate(data["data"]));
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
function insertData(inputVal, dueDate, type, goal_id, cValue) {
  if (type == "goal") {
    fetch("https://cronos-productivity.herokuapp.com/insert", {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name: inputVal,
        due_date: dueDate,
        type: type,
        goal_id: goal_id,
        cValue: cValue,
      }),
    })
      .then((response) => response.json())
      .then((data) => insertDivEl(data["data"]));

    // ADD GOAL/TASK INTO THE ENTRY PERTAINING TO THE DATE SELECTED
    // DATE SELEECTED IS IN VARIABLE DUE DATE
    console.log("success");
  } else {
    fetch("https://cronos-productivity.herokuapp.com/insert", {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name: inputVal,
        due_date: dueDate,
        type: type,
        goal_id: goal_id,
        cValue: cValue,
      }),
    }).then((response) => response.json());
  }
}
