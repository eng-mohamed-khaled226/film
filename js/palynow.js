const cards = document.querySelector("#cards-trending")

const pageEl = document.querySelector("#page")




const imgPath = "https://image.tmdb.org/t/p/w500/"



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

function setWatchList(id) {


    cards.addEventListener("click", (e) => {
        e.target.style.color = "#FFD43B"
    })

    const watch = localStorage.getItem("list")

    if (watch == null) {
        const watchList = []
        watchList.push(id)
        localStorage.setItem("list", watchList)

    } else {

        if (watch.includes(id) == true) {

            watchL = id.toString()

            cards.addEventListener("click", (e) => {
                e.target.style.color = "#ffd43b4d"
            })
            localStorage.setItem("list", watch.replace(watchL, ""))

        } else {

            localStorage.setItem("list", watch + "," + id)
        }

    }
}
searchFunction()

function getId(id) {
    window.sessionStorage.setItem("video-id", id)
}


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
        nowPlaying()
        displayNowPlaying()
    })
}




const now = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMThlN2FmOTViZWM1NGVhMTljOTBlNGE3ZmE0MGUwNCIsIm5iZiI6MTcyNTgyNzQyMS44NzE5Mywic3ViIjoiNjZkY2I0YmZmZjllOWQwNDc5YjkyNzY3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.fjqYQgF7d_LP9nQ_J4mMC2bhOB4VoE4xDZzAXNDveQE'
    }
};


async function nowPlaying() {
    const nowPlay = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${currentPage}&adult=false`, now);
    const data = await nowPlay.json();
    return data

}

async function displayNowPlaying() {
    const nowPlayingVideo = await nowPlaying()
    const result = nowPlayingVideo.results
    const watch = localStorage.getItem("list")
    for (const video of result) {
        if (watch != null) {

            if (watch.includes(video.id) == false) {

                cards.innerHTML += `  <div class="card-content">
                            <div class="card"  >
                                <div class="overlay"><i class="fa-regular fa-circle-play svg" style="color: #e8ebef;"></i></div>
                                    <img src="${imgPath}${video.poster_path}" alt="">
                                    <div class = "movie-title"  >
                                    <button class="w-25 button"  onclick="setWatchList(${video.id})"><i class="fa-solid fa-bookmark border-0" style="color :#ffd43b4d"></i></button>
                                    <a href="../details.html" onclick="getId(${video.id})">${video.title.split(" ").slice(0, 1).join(" ")}....</a>
                                    <p>Vote Average : ${video.vote_average}</p>
                            </div>
                     </div>
                </div>`
            } else {
                cards.innerHTML += `
                <div class="card-content">
                            <div class="card"  >
                                <div class="overlay"><i class="fa-regular fa-circle-play svg" style="color: #e8ebef;"></i></div>
                                    <img src="${imgPath}${video.poster_path}" alt="">
                                    <div class = "movie-title"  >
                                    <button class="w-25 button"  onclick="setWatchList(${video.id})"><i class="fa-solid fa-bookmark border-0" style="color : #FFD43B" ></i></button>
                                    <a href="../details.html" onclick="getId(${video.id})">${video.title.split(" ").slice(0, 1).join(" ")}....</a>
                                    <p>Vote Average : ${video.vote_average}</p>
                            </div>
                     </div>
                </div>`
            }
        }
        else {
            cards.innerHTML += `
            <div class="card-content">
                        <div class="card"  >
                            <div class="overlay"><i class="fa-regular fa-circle-play svg" style="color: #e8ebef;"></i></div>
                                <img src="${imgPath}${video.poster_path}" alt="">
                                <div class = "movie-title"  >
                                <button class="w-25 button"  onclick="setWatchList(${video.id})"><i class="fa-solid fa-bookmark border-0" style="color : #ffd43b4d" ></i></button>
                                <a href="../details.html" onclick="getId(${video.id})">${video.title.split(" ").slice(0, 1).join(" ")}....</a>
                                <p>Vote Average : ${video.vote_average}</p>
                        </div>
                 </div>
            </div>`
        }
    }






}
pageNumber()
displayNowPlaying()
