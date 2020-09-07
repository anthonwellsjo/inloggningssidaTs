//Globala variabler

const NAMN = "test";
const PASS = "1234";

document.body.onload = loadLoginPage;

function loadLoginPage() {
    const loginPage = createLoginPage();
    appendPage(loginPage);
    createButtonEventHandler();
}

//Login Page Render -funktioner.

const createLoginPage = () => {
    let form = document.createElement("form");
    form.innerHTML = (
        "<label class='label' for='name'>Namn:</label><input type='text' class='input' id='name'><label for='pass' class='label'>Lösenord</label><input type='text' id='pass' class='input'><button id='loginBtn'>Logga in</button>"
    );

    console.log(form, "form");
    return form;
}

const appendPage = page => {
    const app = document.getElementById("app");
    if (app.firstChild !== page) {
        console.log("new page, erasing app.innerHTML before adding new", app.lastChild, page);
        app.innerHTML = '';
    }
    app.appendChild(page);
}

const createButtonEventHandler = () => {
    document.getElementById("loginBtn").addEventListener("click", e => {
        e.preventDefault();
        onLoginBtnClickedEventHandler();
    });
}



//Event Handlers

const onLoginBtnClickedEventHandler = () => {
    alert("klick!");
}