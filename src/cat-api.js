import axios from "axios";
axios.defaults.headers.common["live_oiJWdZviVlbnAIfHszSzp2umobU27xezVTg2ey2mGvs5e8u3PEIDjOEU4QlU78Wp"] = "key";

const basic = "https://api.thecatapi.com/v1/"
const selectCat = document.querySelector(".breed-select");
const catBox = document.querySelector(".cat-info")

const fetchBreeds = (breedId, img) => {
    fetch(`${basic}breeds`)
    .then(response => {
        if(!response.ok){
            throw new Error(response.status)
        }
        return response.json()
    })
    .then(data => {
        if (!breedId) {
            catsList(data)
        }
        else {
            const info = data.find(option => option.id === breedId)
            catInfo(info, img)
        }
    }) 
    .catch(error => {
        console.log(error)
    })
    return
}

const catsList = (catInfo) => {
    catInfo.forEach(element => {
        const newCat = document.createElement("option");
        selectCat.append(newCat)
        newCat.value = element.id
        newCat.textContent = element.name
    });
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
            const img = data[0]
            fetchBreeds(breedId, img)
        })
        .catch(error => {
            console.log(error)
        })
        return
}

const catInfo = (info, img) => {
    catBox.innerHTML = `
        <h2>${info.name}</h2>
        <img src="${img.url}"height="400"></img>
        <p>${info.description}</p>
        <p>${info.temperament}</p>`   
}

fetchBreeds()

selectCat.addEventListener("input", () => fetchCatByBreed(selectCat.value))