const cards = document.querySelector("#cards-trending")
const cast = document.querySelector("#cards")
const cardsRec = document.querySelector("#cards-rec")
const carousel = document.querySelector(".carousel-inner")
const carouselRev = document.querySelector(".carousel")
const hRev = document.querySelector(".h-rev")


const imageEl = document.querySelector("#show")
const pageEl = document.querySelector("#page")
const image = document.querySelector("#image")
const video = document.querySelector("#video")


const imgUrl = "https://image.tmdb.org/t/p/w500/"

const youtubeUrl = "https://www.youtube.com/embed/"



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

let tvId = sessionStorage.getItem("tv_id")



image.addEventListener("click", () => {
    video.classList.remove("tv-link")
    image.classList = "nav-link  tv-link"


    imageEl.innerHTML = ""
    async function imageMovie() {

        const image = await fetch(`https://api.themoviedb.org/3/tv/${tvId}/images`, detail);
        const data = await image.json();
        return data

    }

    async function displayImageMovie() {
        const imagesMovie = await imageMovie()
        for (let image of imagesMovie.backdrops) {
            imageEl.innerHTML += ` <div class="card-cast">

                    <img src="${imgUrl}${image.file_path}" alt="">

                    </div>
                </div>`
        };

    }
    displayImageMovie()

})
video.addEventListener("click", () => {
    image.classList.remove("tv-link")
    video.classList = "nav-link  tv-link"
    imageEl.innerHTML = ""
    async function videoMovie() {

        const image = await fetch(`https://api.themoviedb.org/3/tv/${tvId}/videos?language=en-US`, detail);
        const data = await image.json();
        return data

    }

    async function displayVideoMovie() {
        const imagesMovie = await videoMovie()
        const result = imagesMovie.results

        for (let video of result.slice(0, 5)) {
            imageEl.innerHTML += `<iframe src="${youtubeUrl}${video.key}" style="height:300px;width:500px;" title="Iframe Example"></iframe>`
        };

    }
    displayVideoMovie()

})




const detail = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMThlN2FmOTViZWM1NGVhMTljOTBlNGE3ZmE0MGUwNCIsIm5iZiI6MTcyNTgyNzQyMS44NzE5Mywic3ViIjoiNjZkY2I0YmZmZjllOWQwNDc5YjkyNzY3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.fjqYQgF7d_LP9nQ_J4mMC2bhOB4VoE4xDZzAXNDveQE'
    }
};


async function detailTv() {

    const details = await fetch(`https://api.themoviedb.org/3/tv/${tvId}?language=en-US`, detail);
    const data = await details.json();
    return data

}

async function displayDetail() {
    const videoDetail = await detailTv()
    cards.innerHTML += `
                            <div  id="cards-detail">
                                    <div class="img">
                                    <img src="${imgUrl}${videoDetail.poster_path}" alt="">
                                </div>
                                <div class="info">
                                <h2>${videoDetail.name}</h2>
                                <h5>Release Date : ${videoDetail.last_air_date}</h5>
 
                                <h5>genres: ${videoDetail.genres.map((genre) => genre.name).join(', ')}</h5>
                                <h5>spoken languages: ${videoDetail.spoken_languages.map((language) => language.name).join(', ')}</h5>
                                <h5>Vote Average : ${videoDetail.vote_average}</h5>
                                <h5>Overview : ${videoDetail.overview}</h5>
                                </div>
                            </div>`

}

displayDetail()

//  Display credits 

function getPeopleId(id) {
    sessionStorage.setItem("person_id", id)
}


async function creditsMovie() {

    const cast = await fetch(`https://api.themoviedb.org/3/tv/${tvId}/credits?language=en-US`, detail);
    const data = await cast.json();
    return data

}

async function displayCredit() {
    const castDetail = await creditsMovie()
    const result = castDetail.cast

    for (let casting of result) {
        cast.innerHTML += ` <div class="card-cast">
                
                    <img src="${imgUrl}${casting.profile_path}" alt="">
                    <div class = "movie-title" >
                    <a href="../peopledetail.html"  onclick="getPeopleId(${casting.id})">${casting.name}</a>

                    </div>
                </div>`
    };

}

displayCredit()




const avter = "https://image.tmdb.org/t/p/w45_and_h45_face"

async function reviews() {

    const rev = await fetch(`https://api.themoviedb.org/3/tv/${tvId}/reviews?language=en-US`, detail);
    const data = await rev.json();
    return data

}

async function displayReviews() {
    const revs = await reviews()
    const result = revs.results
    if (result.length == 0) {
        carouselRev.style.display = "none"
        hRev.innerText = "Reviews | 0"
    }
    else {
        hRev.innerHTML = `Reviews | <span class="badge text-bg-secondary">${result.length}</span>`
        for (let review of result.slice(0, 1)) {
            carousel.innerHTML += ` <div class="carousel-item review w-50 active " >
                                    <div class="user-info">
                                        <img class="user-avatar" src="${avter}${review.author_details.avatar_path}" alt="User Avatar">
                                        <div class="d-flex flex-column">
                                            <span class="user-name">A review by ${review.author_details.username} </span>

                                            <span>Written by ${review.author} on  ${review.created_at} </span>
                                        </div>
                                    </div>
                                    <div class="review-content">
                                        <p>${review.content} </p>
                                    </div>
                                </div >`

        };
        for (let review of result.slice(2,)) {
            carousel.innerHTML += ` <div class="carousel-item review w-50 " >
                                    <div class="user-info">
                                        <img class="user-avatar" src="${avter}${review.author_details.avatar_path}" alt="User Avatar">
                                        <div class="d-flex flex-column">
                                            <span class="user-name">A review by ${review.author_details.username} </span>

                                            <span>Written by ${review.author} on  ${review.created_at} </span>
                                        </div>
                                    </div>
                                    <div class="review-content">
                                        <p>${review.content} </p>
                                    </div>
                                </div >`

        };
    }





}

displayReviews()




async function imageMovie() {

    const image = await fetch(`https://api.themoviedb.org/3/tv/${tvId}/images`, detail);
    const data = await image.json();
    return data

}

async function displayImageMovie() {
    const imagesMovie = await imageMovie()
    for (let image of imagesMovie.backdrops) {
        imageEl.innerHTML += ` <div class="card-cast">

                    <img src="${imgUrl}${image.file_path}" alt="">

                    </div>
                </div>`
    };

}

displayImageMovie()



function getTvId(id) {
    window.sessionStorage.setItem("tv_id", id)
}




async function recommendations() {

    const image = await fetch(`https://api.themoviedb.org/3/tv/${tvId}/recommendations?language=en-US`, detail);
    const data = await image.json();
    return data

}

async function displayRecommendations() {
    const rec = await recommendations()
    const result = rec.results
    for (let recommend of result) {
        cardsRec.innerHTML += ` <div class="card">
                   
                    <img src="${imgUrl}${recommend.poster_path}" alt="" class="h-100">
                    <div class = "movie-title">
                    <a href="../detailstv.html" onclick="getTvId(${recommend.id})">${recommend.name}</a>
                    <p id = "rate">${Math.floor(recommend.vote_average * 10)}%</p>
                    <h6>${recommend.first_air_date}</h6>
                    </div>
                </div>`
    };

}


displayRecommendations()