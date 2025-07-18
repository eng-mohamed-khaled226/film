const cards = document.querySelector("#cards-trending")
const clearList = document.querySelector(".btn-danger")


clearList.addEventListener("click", () => {
    localStorage.clear()
    cards.innerHTML = ""
})


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

function getTvId(id) {
    window.sessionStorage.setItem("tv_id", id)
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



const tv = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMThlN2FmOTViZWM1NGVhMTljOTBlNGE3ZmE0MGUwNCIsIm5iZiI6MTcyNTgyNzQyMS44NzE5Mywic3ViIjoiNjZkY2I0YmZmZjllOWQwNDc5YjkyNzY3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.fjqYQgF7d_LP9nQ_J4mMC2bhOB4VoE4xDZzAXNDveQE'
    }
};


function getId(id) {
    window.sessionStorage.setItem("video-id", id)
}
const watch = localStorage.getItem("list").split(",")


for (let film of watch) {



    async function tvShow() {
        const tvShowData = await fetch(`https://api.themoviedb.org/3/movie/${film}?language=en-US`, tv)
        const data = await tvShowData.json();
        return data
    }
    const imgPathTv = "https://image.tmdb.org/t/p/w500/"
    async function displayTvShow() {
        const trendingList = await tvShow()
        console.log(trendingList);
        // const result = trendingList.results

        cards.innerHTML += `
                <div class="card-content">
                             <div class="card">
                                <img src="${imgPathTv}${trendingList.poster_path}" alt="">
                                <div class = "movie-title">
                                <a href="./details.html" onclick="getId(${trendingList.id})">${trendingList.title.split(' ').slice(0, 2).join(" ")}</a>
                                <p>origin country is : ${trendingList.origin_country[0]}</p>
                                <p>Vote Average : ${trendingList.vote_average}</p>
                                </div>
                            </div>
                </div>            `



    };
    displayTvShow()
}

