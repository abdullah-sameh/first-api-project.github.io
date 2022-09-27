const inputSearch = document.querySelector('input[type="text"]')
const inputBtn = document.querySelector('input[type="button"]')
const result = document.querySelector('.result')

function palestine(nameCountry) {
    fetch(`https://restcountries.com/v3.1/name/palestine?fullText=true`)
        .then(response => response.json())
        .then(data => {
            if (nameCountry === 'israel') result.innerHTML = `<h2>YOU MEAN PALESTINE</h2>`
                result.innerHTML += `
                    <img src=${data[0].flags.svg} alt="flag ${nameCountry}" />
                    <p>map link: 
                        <a href="${data[0].maps['googleMaps']}"  target="_blank">google map</a>
                    </p>
                    <p>مكانتها في قلوب جميع المسلمين ❤️</p>
                    <p>اللهم رد إلينا فلسطين والمسجد الاقصى رداً جميلاً <br/> اللهم أنصر ضعفهم فإنهم ليس لهم سواك</p>
                    <p>it's population: ${data[0].population} mojahid❤️</p>
                    `
                inputSearch.value = ''
        })
}

function fetchName() {
    let nameCountry = inputSearch.value.toLowerCase()
    result.style.color = '#000'
    //! if palestine 
    if (nameCountry === 'palestine' || nameCountry === 'israel') {
        if (nameCountry === 'israel') result.innerHTML = `<h2>YOU MEAN PALESTINE</h2>`
            palestine(nameCountry)
            return
    }
    fetch(`https://restcountries.com/v3.1/name/${nameCountry}?fullText=true`)
        .then(resp => resp.json())
        .then(data => {
            result.innerHTML = `
                <img src=${data[0].flags.svg} alt="flag ${nameCountry}" />
                <p>map link: 
                    <a href="${data[0].maps['googleMaps']}"  target="_blank">google map</a>
                </p>
                <p>it's population: ${data[0].population}</p>
                <p>currency name: ${data[0].currencies[Object.keys(data[0].currencies)].name}</p>
                <p>currency symbol: ${data[0].currencies[Object.keys(data[0].currencies)].symbol}</p>
                `
            inputSearch.value = ''
        })
        .catch(err => {
            result.innerHTML = `please enter a valid name`
            result.style.color = 'red'
            result.style.fontSize = '20px'
            inputSearch.value = ''
        })
}

inputBtn.addEventListener('click', fetchName)
inputSearch.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        fetchName()
    }
})