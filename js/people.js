const cards = document.querySelector("#cards-trending")
const pageEl = document.querySelector("#page")


function searchFunction() {
    const iconSearch = document.querySelector("#icon-search")
    const overlayHeader = document.querySelector(".overlay-header")

    const searchInput = document.querySelector(".search-input")
    const searchButton = document.querySelector(".search-button")
    const selectEl = document.querySelector("#select")

    overlayHeader.style.display = "none"
    iconSearch.addEventListener("click", () => {
        overlayHeader.style.display = "block"
    })

    const closeSearch = document.querySelector("#close-search")

    closeSearch.addEventListener("click", () => {
        overlayHeader.style.display = "none"
    })



    searchButton.addEventListener("click", () => {
        const searchValue = searchInput.value.trim()
        const searchSelect = selectEl.selectedOptions[0].value
        sessionStorage.setItem("search", searchValue)
        sessionStorage.setItem("select", searchSelect)
        window.location.href = "search.html"
    })


}

searchFunction()


function darkMode() {

    const bodyTag = document.getElementsByTagName("body")[0]
    const cardMain = document.querySelector(".trending")

    const light = document.querySelector("#light")

    light.addEventListener("click", () => {

        localStorage.setItem("dark", false)
        bodyTag.style.backgroundColor = "white"
        bodyTag.style.color = "black "
        cardMain.style.backgroundColor = "#fffdfd"

    })
    const dark = document.querySelector("#black")
    dark.addEventListener("click", () => {
        localStorage.setItem("dark", true)
        bodyTag.style.backgroundColor = "black"
        bodyTag.style.color = "white"

    })

    const getDarkMode = localStorage.getItem("dark")

    if (getDarkMode === "false") {
        bodyTag.style.backgroundColor = "white"
        bodyTag.style.color = "black "
        cardMain.style.backgroundColor = "#fffdfd"

    }
    else {
        bodyTag.style.backgroundColor = "black"
        bodyTag.style.color = "white"
    }

}

darkMode()

let pages = 20
let currentPage = 1;
for (let page = 1; page <= pages; page++) {
    pageEl.innerHTML += `<li class="page-item"><button class="page-link" >${page}</button></li>`

}

function pageNumber() {
    pageEl.addEventListener("click", (e) => {
        currentPage = e.target.innerText;

        cards.innerHTML = ``
        e.target.style.backgroundColor = "black"
        trendingPeople()
        displayTrendingPeople()
    })
}

pageNumber()

function getPeopleId(id) {
    sessionStorage.setItem("person_id", id)
}





const peopleTrending = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMThlN2FmOTViZWM1NGVhMTljOTBlNGE3ZmE0MGUwNCIsIm5iZiI6MTcyNTgyNzQyMS44NzE5Mywic3ViIjoiNjZkY2I0YmZmZjllOWQwNDc5YjkyNzY3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.fjqYQgF7d_LP9nQ_J4mMC2bhOB4VoE4xDZzAXNDveQE'
    }
};

async function trendingPeople() {
    const peopleData = await fetch(`https://api.themoviedb.org/3/person/popular?language=en-US&page=${currentPage}`, peopleTrending)
    const data = await peopleData.json();
    return data
}


const imgPathPeople = "https://image.tmdb.org/t/p/w500/"
async function displayTrendingPeople() {
    const trendingList = await trendingPeople()
    const result = trendingList.results
    for (const people of result) {

        cards.innerHTML += `
        <div class="card-content">
                <div class="card">
                    <img src="${imgPathPeople}${people.profile_path}" alt="">
                    <div class = "movie-title" >
                    <a href="../peopledetail.html" onclick="getPeopleId(${people.id})">${people.name}</a>
                    </div>
                </div>
        </div>`
    };

}

displayTrendingPeople()
