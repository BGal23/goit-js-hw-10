import {fetchBreeds, fetchCatByBreed} from "./cat-api"

const selectCat = document.querySelector(".breed-select");
const catBox = document.querySelector(".cat-info")
const err = document.querySelector(".error");
const loader = document.querySelector(".loader");

fetchBreeds(selectCat.value)
    .then(data => {
        catsList(data)
    })
    .catch(error => {
        err.style.display = "block"
        return console.log(error)
    })


const catsList = (list) => {
    list.forEach(element => {
        const newCat = document.createElement("option");
        selectCat.append(newCat)
        newCat.value = element.id
        newCat.textContent = element.name
})}

const catFoto = () => {
    loader.style.display = "block"
    catBox.style.display = "none"
    fetchCatByBreed(selectCat.value)
    .then(data => {
        catInfo(data)
    })
    .catch(error => {
        loader.style.display = "none"
        err.style.display = "block"
        return console.log(error)
    })
}

const catInfo = (img) => {
    fetchBreeds(selectCat.value)
        .then(data => {
            const info = data.find(option => option.id === selectCat.value)
            catBox.innerHTML = `
            <h2>${info.name}</h2>
            <img src="${img.url}"height="400"></img>
            <p>${info.description}</p>
            <p><b>Temperament: </b>${info.temperament}</p>`
            catBox.style.display = "block"
            loader.style.display = "none"
        })
        .catch(error => {
            return console.log(error)
        })
}

selectCat.addEventListener("input", catFoto)