
const carousel = document.querySelector("#carousel-inner")
const carouselSider = document.querySelector(".carousel-sidebar")
const cards = document.querySelector("#cards")
const tvShowEl = document.querySelector("#tv-show")
const tvShowAllEl = document.querySelector(".show-all")
const movieShowAllEl = document.querySelector(".show-movie-all")
const peopleShowAllEl = document.querySelector(".show-people-all")
const cardsPeople = document.querySelector("#cards-people")




const onAir = document.querySelector("#onair")
const trend = document.querySelector("#trend")

const menu = document.querySelector("#menu")
const linkEl = document.querySelector(".links")


menu.addEventListener("click", () => {
    linkEl.classList.toggle("menu-link")

})




const imgPath = "https://image.tmdb.org/t/p/w500/"


function getId(id) {
    window.sessionStorage.setItem("video-id", id)
}




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


// Play Now Movie

// const now = {
//     method: 'GET',
//     headers: {
//         accept: 'application/json',
//         Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMThlN2FmOTViZWM1NGVhMTljOTBlNGE3ZmE0MGUwNCIsIm5iZiI6MTcyNTgyNzQyMS44NzE5Mywic3ViIjoiNjZkY2I0YmZmZjllOWQwNDc5YjkyNzY3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.fjqYQgF7d_LP9nQ_J4mMC2bhOB4VoE4xDZzAXNDveQE'
//     }
// };







// async function nowPlaying() {
//     const nowPlay = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', now);
//     const data = await nowPlay.json();
//     return data

// }

// async function displayNowPlaying() {

//     const nowPlayingVideo = await nowPlaying()
//     const result = nowPlayingVideo.results

//     for (const video of result.slice(0, 3)) {
//         carouselSider.innerHTML += `<div class="img-sider">
//                     <img src="${imgPath}${video.poster_path}"
//                         alt="Sidebar Image">
//                     <div class="info" >
//                         <div class="my-2">
//                             <a href=""><i class="fa-regular fa-circle-play" style="color: #ffffff;"></i></a>
//                             <span>3:40</span>
//                         </div>

//                         <a href="../details.html" onclick="getId(${video.id})">${video.title}</a>
//                         <div class="like">
//                             <a href=""><i class="fa-solid fa-thumbs-up" style="color: #FFD43B;"></i>132</a>
//                             <a href=""><i class="fa-solid fa-heart" style="color: #A92E5D;"></i>102</a>
//                         </div>

//                     </div>


//                 </div>`

//     };

// }

// displayNowPlaying()




// Top Rate Movie

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMThlN2FmOTViZWM1NGVhMTljOTBlNGE3ZmE0MGUwNCIsIm5iZiI6MTcyNTc0MDYyOC4yMDg3MjYsInN1YiI6IjY2ZGNiNGJmZmY5ZTlkMDQ3OWI5Mjc2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pRLy9VCmDpHcPgiv37uuwuwxjw4rqaKisRhmNikH1hc'
    }
};


async function topRated() {
    const rated = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options);
    const data = await rated.json();
    return data

}


async function displayTopRated() {
    const rated = await topRated()
    const result = rated.results


    for (const rate of result.slice(0, 1)) {
        carousel.innerHTML += ` <div class="carousel-item active" >
                                    <div  class="overlay">
                                     <div class="card">
                                            <div class="overlay"><i class="fa-regular fa-circle-play svg" style="color: #e8ebef;"></i></div>
                                                <img src="${imgPath}${rate.backdrop_path}" alt="">
                                                <div class = "movie-title"">
                                                <a href="../details.html" class="link-tag" onclick="getId(${rate.id})">${rate.title}</a>
                                                
                                               
                                                <h6>${rate.release_date}</h6>
                                             </div>
                                        </div>
                                    <p>Vote Avrage : ${rate.vote_average}</p>
                                    </div>
                                    <div id="stars">
                                        <i class="fa-solid fa-star" style="color: #ffbb00;"></i>
                                   
                                    </div>
                                     <img src="${imgPath}${rate.poster_path}"
                                    class="d-block w-100" alt="...">

                                </div>`

    };
    for (const rate of result.slice(2, 4)) {
        carousel.innerHTML += ` <div class="carousel-item ">
                                   <div  class="overlay">
                                        <div class="card">
                                            <div class="overlay"><i class="fa-regular fa-circle-play svg" style="color: #e8ebef;"></i></div>
                                                <img src="${imgPath}${rate.backdrop_path}" alt="">
                                                <div class = "movie-title"">
                                                <a href="../details.html" class="link-tag"  onclick="getId(${rate.id})">${rate.title}</a>
                                           
                                                <h6>${rate.release_date}</h6>
                                             </div>
                                        </div>
                                        <p>Vote Avrage : ${rate.vote_average}</p>
                                    </div>
                                    <div id="stars">
                                        <i class="fa-solid fa-star" style="color: #ffbb00;"></i>
                
                                    </div>
                                    <img src="${imgPath}${rate.poster_path}"
                                    class="d-block w-100" alt="...">

                                </div>`

    };

    function darkMode() {
        const light = document.querySelector("#light")

        light.addEventListener("click", () => {

            localStorage.setItem("dark", false)
        })

        const bodyTag = document.getElementsByTagName("body")[0]
        const tagLink = document.querySelector('.link-tag');


        const getDarkMode = localStorage.getItem("dark")

        if (getDarkMode === "false") {
            bodyTag.style.backgroundColor = "white"
            bodyTag.style.color = "black !important"
            tagLink.style.color = "black"
        }
    }

    darkMode()

}
displayTopRated()

// let watchList;

// localStorage.clear()
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
async function trendingMovie() {
    const movieData = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options);
    const data = await movieData.json();
    return data

}


async function displayTrendingMovie() {
    const trendingList = await trendingMovie()
    const result = trendingList.results;
    const movies = result.slice(1, 10);
    const watch = localStorage.getItem("list")
    for (let movie of movies) {
        if (watch != null) {

            if (watch.includes(movie.id) == false) {

                cards.innerHTML += ` <div class="card">
                             <div class="overlay"><i class="fa-regular fa-circle-play svg" style="color: #e8ebef;"></i></div>
                            <img src="${imgPath}${movie.poster_path}" alt="">
                            <div class = "movie-title"">
                            <a href="../details.html" class="link-tag"   onclick="getId(${movie.id})">${movie.title}</a>
                            
                            <button class="w-25 button" onclick="setWatchList(${movie.id})"><i class="fa-solid fa-bookmark border-0"  style="color :#ffd43b4d"></i></button>
                            <p id = "rate">${Math.floor(movie.vote_average * 10)}%</p>
                            <h6>${movie.release_date}</h6>
                            </div>
                        </div>`
            } else {
                cards.innerHTML += ` <div class="card">
                             <div class="overlay"><i class="fa-regular fa-circle-play svg" style="color: #e8ebef;"></i></div>
                            <img src="${imgPath}${movie.poster_path}" alt="">
                            <div class = "movie-title"">
                            <a href="../details.html" class="link-tag"  onclick="getId(${movie.id})">${movie.title}</a>
                            
                            <button class="w-25 button"  onclick="setWatchList(${movie.id})"><i class="fa-solid fa-bookmark border-0" style="color : #FFD43B" ></i></button>
                            <p id = "rate">${Math.floor(movie.vote_average * 10)}%</p>
                            <h6>${movie.release_date}</h6>
                            </div>
                        </div>`
            }
        }
        else {
            cards.innerHTML += ` <div class="card">
                             <div class="overlay"><i class="fa-regular fa-circle-play svg" style="color: #e8ebef;"></i></div>
                            <img src="${imgPath}${movie.poster_path}" alt="">
                            <div class = "movie-title"">
                            <a href="../details.html" class="link-tag"  onclick="getId(${movie.id})">${movie.title}</a>
                            
                            <button class="w-25 button"  class="link-tag"  onclick="setWatchList(${movie.id})"><i class="fa-solid fa-bookmark border-0"  style="color :#ffd43b4d"></i></button>
                            <p id = "rate">${Math.floor(movie.vote_average * 10)}%</p>
                            <h6>${movie.release_date}</h6>
                            </div>
                        </div>`
        }


    };

    // buttonEl.addEventListener("click", () => {
    //     buttonEl.style.color = "#FFD43B"
    // })

    movieShowAllEl.innerHTML = `<a href="./trendingmovie.html" id="play"><i class="fa-solid fa-greater-than"></i></a>`

    function darkMode() {

        const bodyTag = document.getElementsByTagName("body")[0]
        const tagLink = document.querySelectorAll('.link-tag');
        const data = document.querySelectorAll('h6')



        const light = document.querySelector("#light")

        light.addEventListener("click", () => {

            localStorage.setItem("dark", false)
            bodyTag.style.backgroundColor = "white"
            bodyTag.style.color = "black "
            tagLink.forEach((link) => {

                link.style.color = "black"
            })
            data.forEach((link) => {

                link.style.color = "#a12626"
            })
        })
        const dark = document.querySelector("#black")
        dark.addEventListener("click", () => {
            localStorage.setItem("dark", true)
            bodyTag.style.backgroundColor = "black"
            bodyTag.style.color = "white"
            tagLink.forEach((link) => {

                link.style.color = "#ffff00f0"
            })
            // data.forEach((link) => {

            //     link.style.color = "#ffff00f0"
            // })
        })


        const getDarkMode = localStorage.getItem("dark")

        if (getDarkMode === "false") {
            bodyTag.style.backgroundColor = "white"
            bodyTag.style.color = "black "
            tagLink.forEach((link) => {

                link.style.color = "black"
            })
            data.forEach((link) => {

                link.style.color = "#a12626"
            })
        }
        else {
            bodyTag.style.backgroundColor = "black"
            bodyTag.style.color = "white"
            tagLink.forEach((link) => {

                link.style.color = "#ffff00f0"
            })
            // data.forEach((link) => {

            //     link.style.color = "#a12626"
            // })
        }
    }

    darkMode()



}
displayTrendingMovie()






//  Display people

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
    const peopleData = await fetch('https://api.themoviedb.org/3/person/popular?language=en-US&page=1', peopleTrending)
    const data = await peopleData.json();
    return data
}


const imgPathPeople = "https://image.tmdb.org/t/p/w500/"
async function displayTrendingPeople() {
    const trendingList = await trendingPeople()
    const result = trendingList.results
    for (const people of result.slice(1, 10)) {

        cardsPeople.innerHTML += ` <div class="card">
                    <img src="${imgPathPeople}${people.profile_path}" alt="">
                    <div class = "movie-title">
                         <a href="./peopledetail.html" class="link-tag"  onclick="getPeopleId(${people.id})">${people.name}</a>
                    </div>
                </div>`
    };

    peopleShowAllEl.innerHTML = `<a href="./trendingpeople.html" id="play"><i class="fa-solid fa-greater-than"></i></a>`

    function darkMode() {

        const bodyTag = document.getElementsByTagName("body")[0]
        const tagLink = document.querySelectorAll('.link-tag');
        const data = document.querySelectorAll('h6')



        const light = document.querySelector("#light")

        light.addEventListener("click", () => {

            localStorage.setItem("dark", false)
            bodyTag.style.backgroundColor = "white"
            bodyTag.style.color = "black "
            tagLink.forEach((link) => {

                link.style.color = "black"
            })
            data.forEach((link) => {

                link.style.color = "#a12626"
            })
        })
        const dark = document.querySelector("#black")
        dark.addEventListener("click", () => {
            localStorage.setItem("dark", true)
            bodyTag.style.backgroundColor = "black"
            bodyTag.style.color = "white"
            tagLink.forEach((link) => {

                link.style.color = "#ffff00f0"
            })
            // data.forEach((link) => {

            //     link.style.color = "#ffff00f0"
            // })
        })


        const getDarkMode = localStorage.getItem("dark")

        if (getDarkMode === "false") {
            bodyTag.style.backgroundColor = "white"
            bodyTag.style.color = "black "
            tagLink.forEach((link) => {

                link.style.color = "black"
            })
            data.forEach((link) => {

                link.style.color = "#a12626"
            })
        }
        else {
            bodyTag.style.backgroundColor = "black"
            bodyTag.style.color = "white"
            tagLink.forEach((link) => {

                link.style.color = "#ffff00f0"
            })
            // data.forEach((link) => {

            //     link.style.color = "#a12626"
            // })
        }
    }

    darkMode()
}

displayTrendingPeople()





function getTvId(id) {
    window.sessionStorage.setItem("tv_id", id)
}

const tv = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMThlN2FmOTViZWM1NGVhMTljOTBlNGE3ZmE0MGUwNCIsIm5iZiI6MTcyNTgyNzQyMS44NzE5Mywic3ViIjoiNjZkY2I0YmZmZjllOWQwNDc5YjkyNzY3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.fjqYQgF7d_LP9nQ_J4mMC2bhOB4VoE4xDZzAXNDveQE'
    }
};



async function tvShow() {
    const tvShowData = await fetch('https://api.themoviedb.org/3/trending/tv/day?language=en-US', tv)
    const data = await tvShowData.json();
    return data
}


const imgPathTv = "https://image.tmdb.org/t/p/w500/"
async function displayTvShow() {
    const trendingList = await tvShow()
    const result = trendingList.results
    for (const show of result.slice(1, 10)) {
        tvShowEl.innerHTML += ` <div class="card">
                   
                        <img src="${imgPathTv}${show.poster_path}" alt="">
                        <div class = "movie-title">
                            <a href="../detailstv.html" class="tag"  onclick="getTvId(${show.id})">${show.name}</a>
                            <p>origin country is : ${show.origin_country[0]}</p>
                            <p>first air date is : ${show.first_air_date}</p>
                            <p>Overview is  : </p>
                            <p>${show.overview.split(' ').join(" ").slice(1, 100)}</p>
                            <p>Vote Average : ${show.vote_average}</p>
                        </div>
                    </div>`
    };
    tvShowAllEl.innerHTML = `<a href="./trendingtv.html" id="play"><i class="fa-solid fa-greater-than"></i></a>`


};
displayTvShow()





onAir.addEventListener("click", () => {
    tvShowEl.innerHTML = ""
    onAir.classList = "nav-link  tv-link"
    trend.classList.remove("tv-link")

    async function onair() {

        const tvShowData = await fetch('https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1', tv)
        const data = await tvShowData.json();
        return data

    }

    async function displayOnAir() {
        const trendingList = await onair()
        const result = trendingList.results
        for (const show of result.slice(1, 10)) {
            tvShowEl.innerHTML += ` <div class="card">
                   
                        <img src="${imgPathTv}${show.poster_path}" alt="">
                        <div class = "movie-title" id="${show.id}">
                            <a href="../detailstv.html" class="link-tag" onclick="getTvId(${show.id})">${show.name}</a>
                            <p>origin country is : ${show.origin_country[0]}</p>
                            <p>first air date is : ${show.first_air_date}</p>
                            <p>Overview is  : </p>
                            <p>${show.overview.split(' ').slice(0, 5).join(" ")}</p>
                            <p>Vote Average : ${show.vote_average}</p>
                        </div>
                    </div>`
        };
        tvShowAllEl.innerHTML = ` <a href="./onairtv.html" id="play"><i class="fa-solid fa-greater-than"></i></a>`

    }
    displayOnAir()

})
trend.addEventListener("click", () => {
    trend.classList = "nav-link  tv-link"
    onAir.classList.remove("tv-link")
    tvShowEl.innerHTML = ""

    async function tvShow() {
        const tvShowData = await fetch('https://api.themoviedb.org/3/trending/tv/day?language=en-US', tv)
        const data = await tvShowData.json();
        return data
    }


    const imgPathTv = "https://image.tmdb.org/t/p/w500/"
    async function displayTvShow() {
        const trendingList = await tvShow()
        const result = trendingList.results
        for (const show of result.slice(1, 10)) {
            tvShowEl.innerHTML += ` <div class="card">
                   
                        <img src="${imgPathTv}${show.poster_path}" alt="">
                        <div class = "movie-title" id="${show.id}">
                            <a href="../detailstv.html" class="tag-link"  onclick="getTvId(${show.id})" >${show.name}</a>
                            <p>origin country is : ${show.origin_country[0]}</p>
                            <p>first air date is : ${show.first_air_date}</p>
                            <p>Overview is  : </p>
                            <p>${show.overview.split(' ').join(" ").slice(1, 100)}</p>
                            <p>Vote Average : ${show.vote_average}</p>
                        </div>
                    </div>`

        };
        tvShowAllEl.innerHTML = `<a href = "./trendingtv.html" id = "play" > <i class="fa-solid fa-greater-than"></i></a>`


    };
    displayTvShow()

})









