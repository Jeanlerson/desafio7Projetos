document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault()

    let input = document.querySelector('#searchInput').value

    if(input !== '') {
        clearInfor()
        showWarning('Carregando...')

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=61047fafc09c604727355bc6936c6b07&units=metric&lang=pt_br`
        
        let results = await fetch(url)
        let json = await results.json()

        if(json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempMax: json.main.temp_max,
                tempMin: json.main.temp_min,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })
        } else {
            clearInfor()
            showWarning('Localização não encontrada')
        }
    } else {
        clearInfor()
    }
})

function showInfo(json) {
    showWarning('')

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`
    document.querySelector('.tempInfo').innerHTML = `${json.temp.toFixed(0)} <sup>ºC</sup>`
    document.querySelector('.tempMax .tempInfo').innerHTML = `${json.tempMax.toFixed(0)} <sup>ºC</sup>`
    document.querySelector('.tempMin .tempInfo').innerHTML = `${json.tempMin.toFixed(0)} <sup>ºC</sup>`
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`

    document.querySelector('.resultado').style.display = 'block'
}

function clearInfor() {
    showWarning('')
    document.querySelector('.resultado').style.display = 'none'
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg
}