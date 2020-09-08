///////////////////////////////////////////Globala variabler

const NAMN = "test";
const PASS = "1234";

document.body.onload = initializeApp;

//första funktion. Initialiserar app

function initializeApp() {
    const user = getUserName();
    if (userIsLoggedIn()) {
        loadUserPage(user);
    } else {
        loadStartPage();
    }
}

function loadStartPage() {
    const startPage = createStartPage();
    appendPage(startPage);
    createLoginButtonEventHandler();
}

function loadUserPage(name) {
    const userPage = createUserPage(name);
    appendPage(userPage);
    createLogoutButtonEventHandler();
}

function loadLoginFailedPage() {
    const failPage = createFailPage();
    appendPage(failPage);
    createBackButtonEventHandler();
}


////////////////////////////////////////////Failed Log In Page Render - funktioner

const createFailPage = () => {
    let div = document.createElement("div");
    div.setAttribute("id", "frame");
    div.innerHTML = (
        `<header><h1>Sorry, ingen användare med det namnet och lösenordet finns här...</h1><header><br><button class="button" id='back-btn'>Tillbaks</button>`
    );
    return div;
}

const createBackButtonEventHandler = () => {
    document.getElementById("back-btn").addEventListener("click", onBackBtnClickedEventHandler);
}


//////////////////////////////////////////////Login Page Render -funktioner.

const createStartPage = () => {
    let form = document.createElement("form");
    form.innerHTML = (
        "<label class='label' for='name'>Namn:</label><input type='text' class='input' id='name'><br><label for='pass' class='label'>Lösenord</label><input type='text' id='pass' class='input'><br><button class='button' id='log-in-btn'>Logga in</button>"
    );
    return form;
}

const appendPage = page => {
    const app = document.getElementById("app");
    if (app.firstChild !== page) {
        app.innerHTML = '';
    }
    app.appendChild(page);
}

const createLoginButtonEventHandler = () => {
    document.getElementById("log-in-btn").addEventListener("click", e => {
        e.preventDefault();
        onLoginBtnClickedEventHandler();
    });
}

////////////////////////////////////////////////User Page Render -funktioner

const createUserPage = name => {
    let div = document.createElement("div");
    div.setAttribute("id", "frame");
    div.innerHTML = (
        `<header><h1>Välkommen till din sida <i>${name}</i></h1><header><br><img src='https://picsum.photos/200/300' alt='random photo'/><br><button class="button" id='log-out-btn'>Logga ut</button>`
    );
    return div;
}

const createLogoutButtonEventHandler = () => {
    document.getElementById("log-out-btn").addEventListener("click", onLogoutBtnClickedEventHandler);
}


////////////////////////////////////////////////////Event Handlers

const onLoginBtnClickedEventHandler = () => {
    const namn = document.getElementById("name").value;
    const pass = document.getElementById("pass").value;
    if (passwordChecksOut(namn, pass)) {
        loginUser(namn);
        loadUserPage(namn);
    } else {
        loadLoginFailedPage();
    }
}

const onLogoutBtnClickedEventHandler = () => {
    logOutUser();
    loadStartPage();
}

const onBackBtnClickedEventHandler = () => {
    loadStartPage();
}


/////////////////////////////////////////////////Authentication - relaterade funktioner

const passwordChecksOut = (inpName, inpPass) => {
    return (inpName === NAMN && inpPass === PASS);
}

const loginUser = name => {
    localStorage.setItem("activeUser", name);
}

const userIsLoggedIn = () => {
    return (localStorage.getItem("activeUser") !== null);
}

const getUserName = () => {
    return localStorage.getItem("activeUser");
}

const logOutUser = () => {
    localStorage.removeItem("activeUser");
}



