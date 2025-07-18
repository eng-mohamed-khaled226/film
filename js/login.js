const btnDark = document.querySelector("#btn-dark")

const sectionEl = document.querySelector("#main")
const formEl = document.querySelector(".card")
const footerEl = document.querySelector("#footer")
const linkEl = document.querySelectorAll("a")


const emailEl = document.getElementById("email")
const passwordEl = document.getElementById("password")
const btnEl = document.getElementsByClassName("btn-reg")[0]
const errorEl = document.querySelector("#error")



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



let email = window.localStorage.getItem("email");
let password = window.localStorage.getItem("password");


errorEl.style.display = "none"
btnEl.addEventListener("click", () => {

    if (email == emailEl.value && password == passwordEl.value) {
        errorEl.style.display = "none"
        window.location.replace("./index.html")
    }
    else {
        errorEl.style.display = "block"
        errorEl.style.color = "red"
    }
})

