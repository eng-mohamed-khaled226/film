const parentEl = document.querySelector(".detail")
const imageEl = document.querySelector("#image")
const cardsRec = document.querySelector("#cards-rec")
const cardsTv = document.querySelector("#cards-tv")

const imgUrl = "https://image.tmdb.org/t/p/w500/"


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

const detail = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMThlN2FmOTViZWM1NGVhMTljOTBlNGE3ZmE0MGUwNCIsIm5iZiI6MTcyNTgyNzQyMS44NzE5Mywic3ViIjoiNjZkY2I0YmZmZjllOWQwNDc5YjkyNzY3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.fjqYQgF7d_LP9nQ_J4mMC2bhOB4VoE4xDZzAXNDveQE'
    }
};

let personId = sessionStorage.getItem("person_id")


async function detailPerson() {

    const details = await fetch(`https://api.themoviedb.org/3/person/${personId}?language=en-US`, detail);
    const data = await details.json();
    return data

}

async function displayDetail() {
    const personDetail = await detailPerson()

    parentEl.innerHTML += `<div class="content d-flex">
                            <div class="w-25">
                                <img src="${imgUrl}${personDetail.profile_path}" class="w-100">
                            </div>
                            <div class="w-75 info">
                                <h1>Name : ${personDetail.name}</h1>
                                <p>Also Know : ${personDetail.also_known_as}</p>
                                <h4>Birthday : ${personDetail.birthday}</h4>
                                <h4>Place Of Birth : ${personDetail.place_of_birth}</h4>
                                <p>Biography : ${personDetail.biography.split('').join('').slice(1, 500)}</p>
                                

                            </div>
                        </div>`

}

displayDetail()






async function imagePerson() {

    const image = await fetch(`https://api.themoviedb.org/3/person/${personId}/images`, detail);
    const data = await image.json();
    return data

}

async function displayImagePerson() {
    const imagesPerson = await imagePerson()

    for (let image of imagesPerson.profiles) {
        imageEl.innerHTML += ` <div class="card-cast "  >

                    <img src="${imgUrl}${image.file_path}" alt="" >

                    </div>
                </div>`
    };

}

displayImagePerson()


function getId(id) {
    window.sessionStorage.setItem("video-id", id)
}


async function movie() {

    const image = await fetch(`https://api.themoviedb.org/3/person/${personId}/movie_credits?language=en-US`, detail);
    const data = await image.json();
    return data

}

async function displayMovies() {
    const rec = await movie()
    const result = rec.cast
    console.log(result);
    for (let recommend of result) {
        cardsRec.innerHTML += ` <div class="card" >

                    <img src="${imgUrl}${recommend.poster_path}" alt="">
                    <div class = "movie-title my-2">
                    <a href="../details.html" class = "link-tag" onclick ="getId(${recommend.id})">${recommend.title}</a>
                    <p id = "rate">${Math.floor(recommend.vote_average * 10)}%</p>
                    <h6>${recommend.release_date}</h6>
                    </div>
                </div>`
    };
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


displayMovies()


function getTvId(id) {
    window.sessionStorage.setItem("tv_id", id)
}

async function recommendations() {

    const image = await fetch(`https://api.themoviedb.org/3/person/${personId}/tv_credits?language=en-US`, detail);
    const data = await image.json();
    return data

}

async function displayRecommendations() {
    const rec = await recommendations()
    const result = rec.cast
    console.log(result);
    for (let recommend of result) {
        cardsTv.innerHTML += ` <div class="card" id=>

                    <img src="${imgUrl}${recommend.poster_path}" alt="" class="h-75">
                    <div class = "movie-title my-2" id=>
                    <a href="../detailstv.html" class = "link-tag" onclick="getTvId(${recommend.id})">${recommend.name}</a>
                    <p id = "rate">${Math.floor(recommend.vote_average * 10)}%</p>
                    <h6>${recommend.first_air_date}</h6>
                    </div>
                </div>`
    };
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


displayRecommendations()

