import axios from "axios";
axios.defaults.headers.common["live_oiJWdZviVlbnAIfHszSzp2umobU27xezVTg2ey2mGvs5e8u3PEIDjOEU4QlU78Wp"] = "key"

const basic = "https://api.thecatapi.com/v1/"
const selectCat = document.querySelector(".breed-select");
const catBox = document.querySelector(".cat-info")
let catObj = {};

const fetchBreeds = () => {
    fetch(`${basic}breeds`)
        .then(response => {
            if(!response.ok){
                throw new Error(response.status)
            }
            return response.json()
        })
        .then(data => {
            data.forEach(element => {
                const newCat = document.createElement("option");
                selectCat.append(newCat)
                newCat.value = element.id
                newCat.textContent = element.name
            });
        })
        .catch(error => {
            console.log(error)
        })
        return
}

const fetchCatByBreed = (breedId) => {
    fetch(`${basic}images/search?breed_ids=${breedId}`)
        .then(response => {
            if(!response.ok){
                throw new Error(response.status)
            }
            return response.json()
        })
        .then(data => {
            [catObj] = data
            catBox.innerHTML = `
            <img src="${catObj.url}"height="400"></img>`
        })
        .catch(error => {
            console.log(error)
        })
        return
}

fetchBreeds()

selectCat.addEventListener("input", () => fetchCatByBreed(selectCat.value))