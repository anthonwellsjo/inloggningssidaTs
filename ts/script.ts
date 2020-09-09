//////////////////////////////////////////Types
type User = string | null;
type Page = HTMLDivElement | HTMLFormElement;


///////////////////////////////////////////Globala variabler

const NAMN: string = "test";
const PASS: string = "1234";

document.body.onload = initializeApp;

//första funktion. Initialiserar app

function initializeApp(): void {
    const user: User = getUserName();
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

function loadUserPage(name: User): void {
    const userPage = createUserPage(name);
    appendPage(userPage);
    createLogoutButtonEventHandler();
}

function loadLoginFailedPage(): void {
    const failPage: HTMLDivElement = createFailPage();
    appendPage(failPage);
    createBackButtonEventHandler();
}


////////////////////////////////////////////Failed Log In Page Render - funktioner

const createFailPage = (): HTMLDivElement => {
    let div = <HTMLDivElement>document.createElement("div");
    div.setAttribute("id", "frame");
    div.innerHTML = (
        `<header><h1>Sorry, ingen användare med det namnet och lösenordet finns här...</h1><header><br><button class="button" id='back-btn'>Tillbaka</button>`
    );
    return div;
}

const createBackButtonEventHandler = (): void => {
    let backBtn = <HTMLButtonElement>document.getElementById("back-btn");
    if (backBtn != null) {
        backBtn.addEventListener("click", onBackBtnClickedEventHandler);
    }
}


//////////////////////////////////////////////Start Page Render -funktioner.

const createStartPage = () => {
    let form = <HTMLFormElement>document.createElement("form");
    form.innerHTML = (
        "<label class='label' for='name'>Namn:</label><br><input type='text' class='input' id='name'><br><label for='pass' class='label'>Lösenord:</label><br><input type='text' id='pass' class='input'><br><br><br><button class='button' id='log-in-btn'>Logga in</button>"
    );
    return form;
}

const appendPage = (page: Page): void => {
    const app = <HTMLDivElement>document.getElementById("app");
    if (app !== null) {
        if (app.firstChild !== page) {
            app.innerHTML = '';
        }
        app.appendChild(page);
    }
}

const createLoginButtonEventHandler = (): void => {
    const button = document.getElementById("log-in-btn");
    if (button !== null) {
        button.addEventListener("click", e => {
            e.preventDefault();
            onLoginBtnClickedEventHandler();
        });

    }
}

////////////////////////////////////////////////User Page Render -funktioner

const createUserPage = (name: User): HTMLDivElement => {
    let div = document.createElement("div");
    div.setAttribute("id", "frame");
    div.innerHTML = (
        `<header><h1>Välkommen till din sida <u><i>${name}</i></u> !</h1><header><br><img src='https://picsum.photos/200/300' alt='random photo'/><br><br><br><button class="button" id='log-out-btn'>Logga ut</button>`
    );
    return div;
}

const createLogoutButtonEventHandler = (): void => {
    let logOutBtn = document.getElementById("log-out-btn");
    if (logOutBtn != null) {
        logOutBtn.addEventListener("click", onLogoutBtnClickedEventHandler);
    }

}


////////////////////////////////////////////////////Event Handlers

const onLoginBtnClickedEventHandler = () => {
    const namn = <HTMLInputElement>document.getElementById("name");
    const pass = <HTMLInputElement>document.getElementById("pass");
    let passVal = "";
    let namnVal = "";
    if (namn != null && namn instanceof HTMLInputElement && pass != null && pass instanceof HTMLInputElement) {
        namnVal = namn.value;
        passVal = pass.value;
    }
    if (passwordChecksOut(namnVal, passVal)) {
        loginUser(namnVal);
        loadUserPage(namnVal);
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

const passwordChecksOut = (inpName: String, inpPass: String) => {
    return (inpName === NAMN && inpPass === PASS);
}

const loginUser = (name: User) => {
    if (name != null) {
        localStorage.setItem("activeUser", name);
    }

}

const userIsLoggedIn = (): boolean => {
    return (localStorage.getItem("activeUser") !== null);
}

const getUserName = (): string | null => {
    return localStorage.getItem("activeUser");
}

const logOutUser = () => {
    localStorage.removeItem("activeUser");
}



