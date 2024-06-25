document.body.addEventListener('keyup', (event) => {
    playSound(event.code.toLowerCase())
})

document.querySelector('.composer button').addEventListener('click', () => {
    let song = document.querySelector('#input').value

    if(song !== '') {
        let songArrey = song.split('')
        playComposition(songArrey)
    }
})

function playSound(sound) {
    let audioElement = document.querySelector(`#s_${sound}`)
    let keyElement = document.querySelector(`div[data-key="${sound}"]`)

    if(audioElement) {
        audioElement.currentTime = 0
        audioElement.play()
    }

    if(keyElement) {
        keyElement.classList.add('active')

        setTimeout(() => {
            keyElement.classList.remove('active')
        }, 300)
    }
}

function playComposition(songArrey) {
    let wait = 0

    for(let songItem of songArrey) {
        setTimeout(() => {
            playSound(`key${songItem.toLowerCase()}`)
        }, wait)
        
        wait += 250
    }
}