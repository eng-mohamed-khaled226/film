

const cards = document.querySelector("#cards-trending")
const cardSearch = document.querySelector("#cards-search")
const cardPerson = document.querySelector("#cards-person")
const moreEl = document.querySelector("#more")

const iconSearch = document.querySelector("#icon-search")
const overlayHeader = document.querySelector(".overlay-header")
const closeSearch = document.querySelector("#close-search")

closeSearch.addEventListener("click", () => {
    overlayHeader.style.display = "none"
})

overlayHeader.style.display = "none"
iconSearch.addEventListener("click", () => {
    overlayHeader.style.display = "block"
})




const imgPath = "https://image.tmdb.org/t/p/w500/"


function searchFunction() {
    const searchInput = document.querySelector(".search-input")
    const searchButton = document.querySelector(".search-button")
    const selectEl = document.querySelector("#select")

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

    const light = document.querySelector("#light")

    light.addEventListener("click", () => {

        localStorage.setItem("dark", false)
        bodyTag.style.backgroundColor = "white"
        bodyTag.style.color = "black "

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

    }
    else {
        bodyTag.style.backgroundColor = "black"
        bodyTag.style.color = "white"
    }

}

darkMode()

function getTvId(id) {
    window.sessionStorage.setItem("tv_id", id)
}
function getPeopleId(id) {
    sessionStorage.setItem("person_id", id)
}
function getId(id) {
    window.sessionStorage.setItem("video-id", id)
}


let counter = 1
function pageNumber() {
    moreEl.addEventListener("click", (e) => {
        counter = counter + 1

        search()
        displaySearch()
    })
}

const searchQuery = sessionStorage.getItem("search")
const selectQuery = sessionStorage.getItem("select")



const now = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMThlN2FmOTViZWM1NGVhMTljOTBlNGE3ZmE0MGUwNCIsIm5iZiI6MTcyNTgyNzQyMS44NzE5Mywic3ViIjoiNjZkY2I0YmZmZjllOWQwNDc5YjkyNzY3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.fjqYQgF7d_LP9nQ_J4mMC2bhOB4VoE4xDZzAXNDveQE'
    }
};


async function search() {
    const item = await fetch(`https://api.themoviedb.org/3/search/${selectQuery}?query="${searchQuery}"&include_adult=false&language=en-US&page=${counter}`, now);
    const data = await item.json();
    return data

}

async function displaySearch() {
    const searchItem = await search()
    const result = searchItem.results
    if (selectQuery == "tv") {
        for (const tv of result) {
            cardSearch.innerHTML += `
                            <div class="card-content">
                                        <div class="card" >
                                            <div class="overlay"><i class="fa-regular fa-circle-play svg" style="color: #e8ebef;"></i></div>
                                                <img src="${imgPath}${tv.poster_path}" alt="">
                                                <div class = "movie-title" >
                                                <a href="../detailstv.html" onclick="getTvId(${tv.id})">${tv.name.split(' ').slice(0, 2).join(" ")}....</a>
                                                <p>Vote Average : ${tv.vote_average}</p>
                                        </div>
                                 </div>
                            </div>`

        };
    } else if (selectQuery == "movie") {
        for (const movie of result) {
            cards.innerHTML += `
                            <div class="card-content">
                                        <div class="card"  >
                                            <div class="overlay"><i class="fa-regular fa-circle-play svg" style="color: #e8ebef;"></i></div>
                                                <img src="${imgPath}${movie.poster_path}" alt="">
                                                <div class = "movie-title"  >
                                                <a href="../details.html" onclick="getId(${movie.id})">${movie.title.split(' ').slice(0, 1).join(" ")}....</a>
                                                <p>Vote Average : ${movie.vote_average}</p>
                                        </div>
                                 </div>
                            </div>`

        };
    }
    else {
        for (const person of result) {
            cardPerson.innerHTML += `
                            <div class="card-content">
                                        <div class="card">
                                            <div class="overlay"><i class="fa-regular fa-circle-play svg" style="color: #e8ebef;"></i></div>
                                                <img src="${imgPath}${person.profile_path}" alt="">
                                                <div class = "movie-title">
                                                <a href="../peopledetail.html" onclick="getPeopleId(${person.id})">${person.name}....</a>

                                        </div>
                                 </div>
                            </div>`

        };
    }



}
pageNumber()
displaySearch()
