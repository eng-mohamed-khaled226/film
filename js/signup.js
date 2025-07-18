const btnDark = document.querySelector("#btn-dark")

const sectionEl = document.querySelector("#main")
const formEl = document.querySelector(".card")
const footerEl = document.querySelector("#footer")
const linkEl = document.querySelectorAll("a")


btnDark.innerHTML = `<i class="fa-solid fa-moon"></i>`

btnDark.addEventListener("click", () => {
    btnDark.innerHTML = `<i class="fa-solid fa-moon" style="color: #ffffff;"></i>`
    sectionEl.classList.toggle("dark-mood")
    formEl.classList.toggle("dark-mood")
    footerEl.classList.toggle("dark-mood")
    for (link of linkEl) {
        link.style.color = "white"
    }
})






const fnameEl = document.getElementById("name")
const emailEl = document.getElementById("email")
const passwordEl = document.getElementById("password")
const cPasswordEl = document.getElementById("cpassword")
const btnEl = document.getElementsByClassName("btn-reg")[0]


let passwordErrorEl = document.getElementById("password-error")
let nameErrorEl = document.getElementById("name-error")
let emailErrorEl = document.getElementById("email-error")
let confirmPasswordErrorEl = document.getElementById("confirm-password-error")



function nameValidate() {

    if (fnameEl.value == "" || fnameEl.value.length < 8) {
        fnameEl.style.border = "2px solid red"
        nameErrorEl.innerText = "This filed is required"
        nameErrorEl.style.color = "red"

    }
    else {
        return true
    }
    fnameEl.addEventListener("input", () => {
        if (fnameEl.value != "" && fnameEl.value.length >= 8) {
            nameErrorEl.style.display = "none"
            fnameEl.style.border = "2px solid #dee2e6"
        }
        else {
            fnameEl.style.border = "2px solid red"
        }
    })
}


function emailValidate() {
    let regexString = /[a-z]/
    let regexNumber = /[0-9]/

    if (emailEl.value.endsWith("@gmail.com") === false || regexNumber.test(emailEl.value) === false || regexString.test(emailEl.value) === false) {
        emailEl.style.border = "2px solid red"
        emailErrorEl.innerText = "Email must end with @gmail.com , And include Character and Numbers"
        emailErrorEl.style.color = "red"
    }
    else {
        return true
    }
    emailEl.addEventListener("input", () => {
        if (emailEl.value.endsWith("@gmail.com") === true && regexNumber.test(emailEl.value) === true && regexString.test(emailEl.value) === true) {
            emailErrorEl.style.display = "none"
            emailEl.style.border = "2px solid #dee2e6"
        } else {
            emailEl.style.border = "2px solid red"
        }
    })

}


function passwordValidate() {
    let regexStringLower = /[a-z]/
    let regexStringUpper = /[A-Z]/
    let regexNumber = /[0-9]/

    if (passwordEl.value == "" || passwordEl.value.length < 8 || regexStringUpper.test(passwordEl.value) === false || regexStringLower.test(passwordEl.value) === false || regexNumber.test(passwordEl.value) == false) {
        passwordEl.style.border = "2px solid red"
        passwordErrorEl.innerText = "Password must be at least 8 characters and include letters and numbers"
        passwordErrorEl.style.color = "red"
    }
    else {
        return true
    }
    passwordEl.addEventListener("input", () => {
        if (passwordEl.value !== "" && passwordEl.value.length > 8 && regexStringUpper.test(passwordEl.value) === true && regexStringLower.test(passwordEl.value) === true && regexNumber.test(passwordEl.value) == true) {
            passwordEl.style.border = "2px solid #dee2e6"
            passwordErrorEl.style.display = "none"
        }
        else {
            passwordEl.style.border = "2px solid red"
            passwordErrorEl.innerText = "Password must be at least 8 characters and include letters and numbers"
        }

    })



}


function confirmPasswordValidate() {
    if (cPasswordEl.value !== passwordEl.value || cPasswordEl.value == "") {
        cPasswordEl.style.border = "2px solid red"
        confirmPasswordErrorEl.innerText = "Passwords do not match"
        confirmPasswordErrorEl.style.color = "red"
    }
    else {
        return true
    }
    cPasswordEl.addEventListener("input", () => {
        if (cPasswordEl.value == passwordEl.value) {
            cPasswordEl.style.border = "2px solid #dee2e6"
            confirmPasswordErrorEl.style.display = "none"
        }
        else {
            cPasswordEl.style.border = "2px solid red"
        }

    })



}


btnEl.addEventListener("click", () => {
    console.log("aaaa");
    if (nameValidate() && emailValidate() && passwordValidate() && confirmPasswordValidate()) {
        window.localStorage.setItem("email", emailEl.value)
        window.localStorage.setItem("password", passwordEl.value)
        window.location.assign("./login.html")
    }
})


fnameEl.addEventListener("blur", nameValidate)
emailEl.addEventListener("blur", emailValidate)
passwordEl.addEventListener("blur", passwordValidate)
cPasswordEl.addEventListener("blur", confirmPasswordValidate)
