//import axios from "axios";
//axios.defaults.headers.common["live_oiJWdZviVlbnAIfHszSzp2umobU27xezVTg2ey2mGvs5e8u3PEIDjOEU4QlU78Wp"] = "key";

const key = "live_oiJWdZviVlbnAIfHszSzp2umobU27xezVTg2ey2mGvs5e8u3PEIDjOEU4QlU78Wp"
// nie wiem czy dobrze dodałem klucz bo nie wiem jak to sprawdzić czy jest dobrze dodany

const basic = "https://api.thecatapi.com/v1/"
const loader = document.querySelector(".loader");
const selectCat = document.querySelector(".breed-select");
const error = document.querySelector(".error");
const catBox = document.querySelector(".cat-info")
// też nie udał mi sie podzielić kodu na dwa pliki z racji tego że nie wiem jak 
// wywołać funkcje w cat-api i żeby otwożyła sie w index i na odwrót 

const fetchBreeds = (breedId, img) => {
    fetch(`${basic}breeds?api_key=${key}`)
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
        error.style.display = "block"
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
    return
}

const fetchCatByBreed = (breedId) => {
    loader.style.display = "block"
    catBox.style.display = "none"
    fetch(`${basic}images/search?breed_ids=${breedId}&api_key=${key}`)
    .then(response => {
        if(!response.ok){
            throw new Error(response.status)
        }
            error.style.display = "none"
            return response.json()
        })
        .then(data => {
            const img = data[0]
            fetchBreeds(breedId, img)
        })
        .catch(problem => {
            loader.style.display = "none"
            error.style.display = "block"
            console.log(problem)
        })
        return
}

const catInfo = (info, img) => {
    catBox.innerHTML = `
        <h2>${info.name}</h2>
        <img src="${img.url}"height="400"></img>
        <p>${info.description}</p>
        <p><b>Temperament: </b>${info.temperament}</p>`  
        setTimeout(() => {
            catBox.style.display = "block"
            loader.style.display = "none"
        },0)
        return
    }

// wiem że to opóźnienie setTimeout nie wygląda dobrze ale nie wiem jak zrobić to
// w ten sposób aby otwierało sie to na końcu kolejki 

fetchBreeds()
selectCat.addEventListener("input", () => fetchCatByBreed(selectCat.value))