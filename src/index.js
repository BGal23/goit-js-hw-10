import {fetchBreeds, fetchCatByBreed, loader} from "./cat-api"

const selectCat = document.querySelector(".breed-select");
const catBox = document.querySelector(".cat-info")

fetchBreeds(selectCat.value)
    .then(catsList => {
        catsList.forEach(element => {
            const newCat = document.createElement("option");
            selectCat.append(newCat)
            newCat.value = element.id
            newCat.textContent = element.name
        });
    return
    })

const catFoto = () => {
    loader.style.display = "block"
    catBox.style.display = "none"
    fetchCatByBreed(selectCat.value)
    .then(data => {
        catInfo(data)
    })
}

const catInfo = (img) => {
    fetchBreeds(selectCat.value)
        .then(info => {
            catBox.innerHTML = `
            <h2>${info.name}</h2>
            <img src="${img.url}"height="400"></img>
            <p>${info.description}</p>
            <p><b>Temperament: </b>${info.temperament}</p>`
            catBox.style.display = "block"
            loader.style.display = "none"
        })
}

selectCat.addEventListener("input", catFoto)