"use strict";
///////////////////////////////////////////Globala variabler
var NAMN = "test";
var PASS = "1234";
document.body.onload = initializeApp;
//första funktion. Initialiserar app
function initializeApp() {
    var user = getUserName();
    if (userIsLoggedIn()) {
        loadUserPage(user);
    }
    else {
        loadStartPage();
    }
}
function loadStartPage() {
    var startPage = createStartPage();
    appendPage(startPage);
    createLoginButtonEventHandler();
}
function loadUserPage(name) {
    var userPage = createUserPage(name);
    appendPage(userPage);
    createLogoutButtonEventHandler();
}
function loadLoginFailedPage() {
    var failPage = createFailPage();
    appendPage(failPage);
    createBackButtonEventHandler();
}
////////////////////////////////////////////Failed Log In Page Render - funktioner
var createFailPage = function () {
    var div = document.createElement("div");
    div.setAttribute("id", "frame");
    div.innerHTML = ("<header><h1>Sorry, ingen anv\u00E4ndare med det namnet och l\u00F6senordet finns h\u00E4r...</h1><header><br><button class=\"button\" id='back-btn'>Tillbaka</button>");
    return div;
};
var createBackButtonEventHandler = function () {
    var backBtn = document.getElementById("back-btn");
    if (backBtn != null) {
        backBtn.addEventListener("click", onBackBtnClickedEventHandler);
    }
};
//////////////////////////////////////////////Start Page Render -funktioner.
var createStartPage = function () {
    var form = document.createElement("form");
    form.innerHTML = ("<label class='label' for='name'>Namn:</label><br><input type='text' class='input' id='name'><br><label for='pass' class='label'>Lösenord:</label><br><input type='text' id='pass' class='input'><br><br><br><button class='button' id='log-in-btn'>Logga in</button>");
    return form;
};
var appendPage = function (page) {
    var app = document.getElementById("app");
    if (app !== null) {
        if (app.firstChild !== page) {
            app.innerHTML = '';
        }
        app.appendChild(page);
    }
};
var createLoginButtonEventHandler = function () {
    var button = document.getElementById("log-in-btn");
    if (button !== null) {
        button.addEventListener("click", function (e) {
            e.preventDefault();
            onLoginBtnClickedEventHandler();
        });
    }
};
////////////////////////////////////////////////User Page Render -funktioner
var createUserPage = function (name) {
    var div = document.createElement("div");
    div.setAttribute("id", "frame");
    div.innerHTML = ("<header><h1>V\u00E4lkommen till din sida <u><i>" + name + "</i></u> !</h1><header><br><img src='https://picsum.photos/200/300' alt='random photo'/><br><br><br><button class=\"button\" id='log-out-btn'>Logga ut</button>");
    return div;
};
var createLogoutButtonEventHandler = function () {
    var logOutBtn = document.getElementById("log-out-btn");
    if (logOutBtn != null) {
        logOutBtn.addEventListener("click", onLogoutBtnClickedEventHandler);
    }
};
////////////////////////////////////////////////////Event Handlers
var onLoginBtnClickedEventHandler = function () {
    var namn = document.getElementById("name");
    var pass = document.getElementById("pass");
    var passVal = "";
    var namnVal = "";
    if (namn != null && namn instanceof HTMLInputElement && pass != null && pass instanceof HTMLInputElement) {
        namnVal = namn.value;
        passVal = pass.value;
    }
    if (passwordChecksOut(namnVal, passVal)) {
        loginUser(namnVal);
        loadUserPage(namnVal);
    }
    else {
        loadLoginFailedPage();
    }
};
var onLogoutBtnClickedEventHandler = function () {
    logOutUser();
    loadStartPage();
};
var onBackBtnClickedEventHandler = function () {
    loadStartPage();
};
/////////////////////////////////////////////////Authentication - relaterade funktioner
var passwordChecksOut = function (inpName, inpPass) {
    return (inpName === NAMN && inpPass === PASS);
};
var loginUser = function (name) {
    if (name != null) {
        localStorage.setItem("activeUser", name);
    }
};
var userIsLoggedIn = function () {
    return (localStorage.getItem("activeUser") !== null);
};
var getUserName = function () {
    return localStorage.getItem("activeUser");
};
var logOutUser = function () {
    localStorage.removeItem("activeUser");
};
