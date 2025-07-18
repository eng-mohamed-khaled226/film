
const cards = document.querySelector("#cards-trending")

const day = document.querySelector("#day")
const week = document.querySelector("#week")


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

function getId(id) {
    window.sessionStorage.setItem("video-id", id)
}


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


day.addEventListener("click", () => {
    day.classList = "nav-link  tv-link"
    week.classList.remove("tv-link")

    cards.innerHTML = ""
    displayTrendingMovie()

})

week.addEventListener("click", () => {
    cards.innerHTML = ""
    week.classList = "nav-link  tv-link"
    day.classList.remove("tv-link")

    async function trendingMovie() {
        const movieData = await fetch('https://api.themoviedb.org/3/trending/movie/week?language=en-US', options);
        const data = await movieData.json();
        return data

    }
    const imgPath = "https://image.tmdb.org/t/p/w500/"

    async function displayTrendingMovie() {
        const trendingList = await trendingMovie()
        const result = trendingList.results
        const watch = localStorage.getItem("list")
        for (const movie of result) {
            if (watch != null) {
                if (watch.includes(movie.id) == false) {
                    cards.innerHTML += ` <div class="card-content" >
                                            <div class="card">
                                                <div class="overlay"><i class="fa-regular fa-circle-play svg" style="color: #e8ebef;"></i></div>
                                                <img src="${imgPath}${movie.poster_path}" alt="">
                                                <div class = "movie-title" >
                                                <button class="w-25 button"  onclick="setWatchList(${movie.id})"><i class="fa-solid fa-bookmark border-0" style="color :#ffd43b4d"></i></button>
                                                <a href="../details.html" onclick = "getId(${movie.id})">${movie.title.split(" ").slice(0, 1).join(" ")}</a>
                                                <p id = "rate">${Math.floor(movie.vote_average * 10)}%</p>
                                                <h6>${movie.release_date}</h6>
                                                </div>
                                            </div>
                                        </div>`
                } else {
                    cards.innerHTML += ` <div class="card-content" >
                    <div class="card">
                        <div class="overlay"><i class="fa-regular fa-circle-play svg" style="color: #e8ebef;"></i></div>
                        <img src="${imgPath}${movie.poster_path}" alt="">
                        <div class = "movie-title" >
                        <button class="w-25 button"  onclick="setWatchList(${movie.id})"><i class="fa-solid fa-bookmark border-0" style="color : #FFD43B" ></i></button>
                        <a href="../details.html" onclick = "getId(${movie.id})">${movie.title.split(" ").slice(0, 1).join(" ")}</a>
                        <p id = "rate">${Math.floor(movie.vote_average * 10)}%</p>
                        <h6>${movie.release_date}</h6>
                        </div>
                    </div>
                </div>`
                }

            }
            else {
                cards.innerHTML += ` <div class="card-content" >
                <div class="card">
                    <div class="overlay"><i class="fa-regular fa-circle-play svg" style="color: #e8ebef;"></i></div>
                    <img src="${imgPath}${movie.poster_path}" alt="">
                    <div class = "movie-title" >
                    <button class="w-25 button"  onclick="setWatchList(${movie.id})"><i class="fa-solid fa-bookmark border-0" style="color :#ffd43b4d"></i></button>
                    <a href="../details.html" onclick = "getId(${movie.id})">${movie.title.split(" ").slice(0, 1).join(" ")}</a>
                    <p id = "rate">${Math.floor(movie.vote_average * 10)}%</p>
                    <h6>${movie.release_date}</h6>
                    </div>
                </div>
             </div>`
            }



        };


    }
    displayTrendingMovie()
})

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMThlN2FmOTViZWM1NGVhMTljOTBlNGE3ZmE0MGUwNCIsIm5iZiI6MTcyNTc0MDYyOC4yMDg3MjYsInN1YiI6IjY2ZGNiNGJmZmY5ZTlkMDQ3OWI5Mjc2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pRLy9VCmDpHcPgiv37uuwuwxjw4rqaKisRhmNikH1hc'
    }
};


async function trendingMovie() {
    const movieData = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options);
    const data = await movieData.json();
    return data

}
const imgPath = "https://image.tmdb.org/t/p/w500/"

async function displayTrendingMovie() {
    const trendingList = await trendingMovie()
    const result = trendingList.results
    const watch = localStorage.getItem("list")
    for (const movie of result) {
        if (watch != null) {
            if (watch.includes(movie.id) == false) {
                cards.innerHTML += ` <div class="card-content" >
                                        <div class="card">
                                            <div class="overlay"><i class="fa-regular fa-circle-play svg" style="color: #e8ebef;"></i></div>
                                            <img src="${imgPath}${movie.poster_path}" alt="">
                                            <div class = "movie-title" >
                                            <button class="w-25 button"  onclick="setWatchList(${movie.id})"><i class="fa-solid fa-bookmark border-0" style="color :#ffd43b4d"></i></button>
                                            <a href="../details.html" onclick = "getId(${movie.id})">${movie.title.split(" ").slice(0, 1).join(" ")}</a>
                                            <p id = "rate">${Math.floor(movie.vote_average * 10)}%</p>
                                            <h6>${movie.release_date}</h6>
                                            </div>
                                        </div>
                                    </div>`
            } else {
                cards.innerHTML += ` <div class="card-content" >
                <div class="card">
                    <div class="overlay"><i class="fa-regular fa-circle-play svg" style="color: #e8ebef;"></i></div>
                    <img src="${imgPath}${movie.poster_path}" alt="">
                    <div class = "movie-title" >
                    <button class="w-25 button"  onclick="setWatchList(${movie.id})"><i class="fa-solid fa-bookmark border-0" style="color : #FFD43B" ></i></button>
                    <a href="../details.html" onclick = "getId(${movie.id})">${movie.title.split(" ").slice(0, 1).join(" ")}</a>
                    <p id = "rate">${Math.floor(movie.vote_average * 10)}%</p>
                    <h6>${movie.release_date}</h6>
                    </div>
                </div>
            </div>`
            }

        }
        else {
            cards.innerHTML += ` <div class="card-content" >
            <div class="card">
                <div class="overlay"><i class="fa-regular fa-circle-play svg" style="color: #e8ebef;"></i></div>
                <img src="${imgPath}${movie.poster_path}" alt="">
                <div class = "movie-title" >
                  <button class="w-25 button"  onclick="setWatchList(${movie.id})"><i class="fa-solid fa-bookmark border-0" style="color :#ffd43b4d"></i></button>
                <a href="../details.html" onclick = "getId(${movie.id})">${movie.title.split(" ").slice(0, 1).join(" ")}</a>
                <p id = "rate">${Math.floor(movie.vote_average * 10)}%</p>
                <h6>${movie.release_date}</h6>
                </div>
            </div>
         </div>`
        }



    };



}
displayTrendingMovie()





