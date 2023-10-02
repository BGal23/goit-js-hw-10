import axios from 'axios';
const key = "live_oiJWdZviVlbnAIfHszSzp2umobU27xezVTg2ey2mGvs5e8u3PEIDjOEU4QlU78Wp"
axios.defaults.headers.common['x-api-key'] = key

const basic = "https://api.thecatapi.com/v1/"

const fetchBreeds = () => {
    return axios
    .get(`${basic}breeds?api_key=${key}`)
    .then(response => {
            return response.data; 
    })
    .catch(error => {
        error.style.display = "block"
        return console.log(error)
    })
}

const fetchCatByBreed = (breedId) => {
    return axios
    .get(`${basic}images/search?breed_ids=${breedId}&api_key=${key}`)
    .then(response => {
        return response.data[0]
    })
    .catch(error => {
        return console.log(error)
    })
}

export {fetchBreeds, fetchCatByBreed}