import axios from "axios";
axios.defaults.headers.common["live_oiJWdZviVlbnAIfHszSzp2umobU27xezVTg2ey2mGvs5e8u3PEIDjOEU4QlU78Wp"] = "key"

const selectCat = document.querySelector(".breed-select");

const options = {
    //"x-api-key": "key"
}
const fetchBreeds = () => {
    fetch("https://api.thecatapi.com/v1/breeds", options)
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
}

const showCat = () => {
    console.log(selectCat.value)
}
fetchBreeds()
selectCat.addEventListener("input", showCat)