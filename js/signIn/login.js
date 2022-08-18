let noAccount = false;
let usrname;
let finalName;
let email;
window.addEventListener("load", (event) => {
  let login = document.getElementById("loginBTN");
  usrname = document.getElementById("usr");
  email = document.getElementById("email");
  login.onclick = function (e) {
    e.preventDefault();
    loginProc(usrname.value, email.value);
  };
});
function loginProc(first_name, email_address) {
  if (first_name == "") {
    alert("Please fill out the username value");
  }
  if (email_address == "") {
    alert("Please fill out the email value");
  } else {
    fetchLogin(first_name, email_address);
    finalName=first_name;
  }
}
function fetchLogin(first_name, email_address) {
  fetch(
    "https://cronos-productivity.herokuapp.com/login/" +
      first_name +
      "/" +
      email_address
  )
    .then((response) => response.json())
    .then((data) => interpretLogin(data["data"]));
}
function interpretLogin(data) {
  console.log(data);
  if (data.length == 0) {
    alert("Please enter a valid username");
    usrname.value = "";
    email.value = "";
  } else {
    extractData(data);
    // console.log(data.user_id)
    // document.cookie = "name=" + cookievalue + "; path=/";
    // document.write("Setting Cookies : " + "name=" + cookievalue);
  }
}
function extractData(data) {
  data.forEach(function ({ user_id }) {
    console.log(user_id);
    document.cookie = "user_id=" + user_id + "name="+ finalName +";path=/;";
    let decodedCookie = decodeURIComponent(document.cookie);
    console.log(decodedCookie);
    cookieArr = decodedCookie.split("=");
    console.log(cookieArr);
    cookie = cookieArr;
    window.location.href = "../../html/mainPage/home.html";
  });
}
