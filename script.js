const loginButton = document.getElementById("login");
const loginForm = document.getElementById("login-form");
const loginClose = document.getElementById("login-off");
const registerForm = document.getElementById("register-form");
const registerClose = document.getElementById("register-off");
const noAccount = document.getElementById("no-have-account");
const overlay = document.getElementById("overlay");
const message = document.getElementById("message");
const submitButton = document.getElementById("submit");
const reserveButton = document.querySelectorAll(".reserveButton");
// register form
const registerName = document.getElementById("name2");
const registerPw = document.getElementById("password2");
const registerAge = document.getElementById("age");
const registerDriving = document.getElementById("drivingLicense");
const registerPhone = document.getElementById("phone");
const registerEmail = document.getElementById("email");
const registerSubmit = document.getElementById("submit2");
// reserve form
const reserveForm = document.getElementById("reserveForm");
const fname = document.getElementById("fname");
const submitReserve = document.getElementById("submit-reserve");
const cardholder = document.getElementById("cardholder");
const email = document.getElementById("email2");
const phone = document.getElementById("phone2");
const cDate = document.getElementById("cDate");
const rDate = document.getElementById("rDate");
const cTime = document.getElementById("cTime");
const rTime = document.getElementById("rTime");
const cPoint = document.getElementById("cPoint");
const rPoint = document.getElementById("rPoint");
const cardnumber = document.getElementById("cardnumber");
const cvv = document.getElementById("cvv");
const exdate = document.getElementById("exdate");

let isLogin = localStorage.getItem("isLogin") === "true";

if(isLogin){
    loginButton.innerHTML = "Logout";
}
loginButton.addEventListener("click", e => {
    e.preventDefault();
    if(isLogin === false){
        loginForm.style.display = "block";
        overlay.style.display = "block";
    }
    else{
        isLogin = false;
        localStorage.setItem("isLogin", "false");
        loginButton.innerHTML = "Login";
        alert("Logout Successfully ☺️");
        window.location.href = "index.html";
    }
});
loginClose.addEventListener("click", e => {
    loginForm.style.display = "none";
    overlay.style.display = "none";
    
});
noAccount.addEventListener("click", e => {
    e.preventDefault();
    loginForm.style.display = "none"
    registerForm.style.display = "block";
    overlay.style.display = "block";
});
// validate register form
registerSubmit.addEventListener("click", e => {
    e.preventDefault();
    const registerNameValue = registerName.value.trim();
    const registerPwValue = registerPw.value.trim();
    const registerAgeValue = registerAge.value.trim();
    const registerDrivingValue = registerDriving.value;
    const registerPhoneValue = registerPhone.value.trim();
    const registerEmailValue = registerEmail.value.trim();
    // regex
    const characters = /^[A-Za-z\s]+$/;
    const phoneValidate = /^\d{8}$/;
    const emailValidate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!characters.test(registerNameValue)){
        alert("Name should only have characters");
        registerName.focus();
        return;
    }
    else if(registerPwValue.length < 5){
        alert("Password must be at least 5 characters or more");
        registerPw.focus();
        return;
    }
    else if(!registerAgeValue || registerAgeValue < 18){
        alert("You must be 18 or above");
        registerAge.focus();
        return;
    }
    else if(registerDrivingValue === "no" || registerDrivingValue === ""){
        alert("You must have driving license");
        registerDriving.focus();
        return;
    }
    else if(!emailValidate.test(registerEmailValue)){
        alert("Email should be example@gmail.com");
        registerEmail.focus();
        return;
    }
    else if(!phoneValidate.test(registerPhoneValue)){
        alert("Phone number must be 8 digits");
        registerPhone.focus();
        return;
    }
    else{
        const userInfo = {
            name: registerNameValue,
            password: registerPwValue
        };
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        alert("You have successfully registered! 😄");
        registerName.value = "";
        registerPw.value = "";
        registerAge.value = "";
        registerEmail.value = "";
        registerPhone.value = "";
        registerEmail.value = "";
        registerForm.style.display = "none";
        loginForm.style.display = "block";
    }
});
registerClose.addEventListener("click", e => {
    registerForm.style.display = "none";
    overlay.style.display = "none";
});
function validateForm(e){
    e.preventDefault();
    let user = document.getElementById("name").value;
    let password = document.getElementById("password").value;
    const getUserInfo = JSON.parse(localStorage.getItem("userInfo"));

    if(user === getUserInfo.name && password === getUserInfo.password){
        message.style.color = "lawngreen"
        message.textContent = "Login Successfully 😄"
        setTimeout(() => {
            loginForm.style.display = "none";
            overlay.style.display = "none";
            message.textContent = "";
            loginButton.innerHTML = "Logout";
            isLogin = true;
            localStorage.setItem("isLogin", "true");
        }, 1000);
    }
    else{
        message.style.color = "red"
        message.textContent = "Login failed😭"
    }
}
submitButton.addEventListener("click", validateForm);
reserveButton.forEach(button => {
    button.addEventListener("click", e => {
        e.preventDefault();
        if(isLogin){
            window.location.href = "reserveform.html";
        }
        else{
            alert("You need to be logged in first! 😡");
        }
    });
});
// validate reserve form
submitReserve.addEventListener("click", e => {
    e.preventDefault();
    const fnameValue = fname.value.trim();
    const cardholderValue = cardholder.value.trim();
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();
    const cDateValue = cDate.value;
    const rDateValue = rDate.value;
    const cTimeValue = cTime.value;
    const rTimeValue = rTime.value;
    const cPointValue = cPoint.value;
    const rPointValue = rPoint.value;
    const cardnumberValue = cardnumber.value.trim();
    const cvvValue = cvv.value.trim();
    const exdateValue = exdate.value.trim();
    // regex
    const characters = /^[A-Za-z\s]+$/;
    const emailValidate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneValidate = /^\d{8}$/;
    const cardnumberValidate = /^\d{16}$/;
    const cvvValidate = /^\d{3}$/;
    const exdateValidate = /^(0[1-9]|1[0-2])\/\d{2}$/;
    // User particulars
    if(!characters.test(fnameValue)){
        alert("Full name should only be in characters, no numbers or special character allowed!");
        fname.focus();
        return;
    }
    else if(!emailValidate.test(emailValue)){
        alert("Email should be example@gmail.com");
        email.focus();
        return;
    }
    else if(!phoneValidate.test(phoneValue)){
        alert("Phone number must be 8 digits");
        phone.focus();
        return;
    }
    // Rental details
    else if(!cDateValue){
        alert("Select a collection date");
        cDate.focus();
        return
    }
    else if(!rDateValue){
        alert("Select a return date");
        rDate.focus();
        return;
    }
    else if(new Date(rDateValue) < new Date(cDateValue)){
        alert("Return date must not be before collection date");
        rDate.focus();
        return;
    }
    else if(!cTimeValue){
        alert("Select a collection time");
        cTime.focus();
        return;
    }
    else if(!rTimeValue){
        alert("Select a return time");
        rTime.focus();
        return;
    }
    else if(!cPointValue || cPointValue === "Select Office"){
        alert("Select a collection point");
        cPoint.focus();
        return;
    }
    else if(!rPointValue || rPointValue === "Select Community Club"){
        e.preventDefault();
        alert("Select a return point");
        rPoint.focus();
        return;
    }
    // Credit card details
    else if(!characters.test(cardholderValue)){
        alert("Cardholder name should only be in characters, no numbers or special character allowed!");
        cardholder.focus();
        return;
    }
    else if(!cardnumberValidate.test(cardnumberValue)){
        alert("Card number must be 16 digits");
        cardnumber.focus();
        return;
    }
    else if(!cvvValidate.test(cvvValue)){
        alert("CVV must be 3 digits");
        cvv.focus();
        return;
    }
    else if(!exdateValidate.test(exdateValue)){
        alert("Expirate date must be in MM/YY");
        exdate.focus();
        return;
    }  
    else{
        alert("You have successfully reserved this car 😄");
        fname.value = "";
        email.value = "";
        phone.value = "";
        cDate.value = "";
        rDate.value = "";
        cTime.value = "";
        rTime.value = "";
        cPoint.value = "Select Office";
        rPoint.value = "Select Community Club";
        cardholder.value = "";
        cardnumber.value = "";
        cvv.value = "";
        exdate.value = "";
    }    
});


