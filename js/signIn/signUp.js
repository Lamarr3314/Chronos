window.addEventListener("load", (event) => {
  let signUp = document.getElementById("signUpBTN");
  usrname = document.getElementById("usr");
  email = document.getElementById("email");
  signUp.onclick = function (e) {
    e.preventDefault();
    signUpProc(usrname.vaule, email.value);
  };
});
function signUpProc(usrname, email) {
  if (usrname == "") {
    alert("Please fill out the username value");
  }
  if (email == "") {
    alert("Please fill out the email value");
  } else {
    window.location.href = "../../html/mainPage/home.html";
  }
}
