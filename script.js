const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const screen = document.querySelector('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const treatList = document.querySelector('#treat-list')
const board = document.querySelector('#board')
const restartBtn = document.querySelector('#restart')
const wishSet = ['любовь','удача','богатство','успех','добро','радость','крутость','путешествие','уют','отпуск','красота','беззаботность'];
const foodSet = ['пицца','банановое лакомство','торт из Цеха','ролл с осьминогом','дорадо под соусом','салат с колбасой','сосиска в тесте','пончик со сгущёнкой','бургер с луком','гора пельменей','мандариновое пирожное','сыр с плесенью'];
const i1 = getRandomIndex(0, 12);
const i2 = getRandomIndex(0, 12);
let time = 0
let score = 0
let treatId = 0



startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        
    }
})

treatList.addEventListener('click', (event) => {
    if (event.target.classList.contains('treat-btn')) {
        treatId = parseInt(event.target.getAttribute('data-treat'))
        screens[2].classList.add('up')
    }
    startGame()
})

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('tapTreat')) {
        score++
        event.target.remove()
        createTapTreat()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createTapTreat()
    setTime(time)
    
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    }
    else {
         let current = --time
    if (current < 10) {
        current = `0${current}`
    }
    setTime(current)
    }
   
}

function setTime(value) {
    timeEl.innerHTML = `0:${value}`
}


function createTapTreat() {
    const tapTreat = document.createElement('div')
    const size = getRandomNumber(25, 70)
    const {height, width} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    tapTreat.classList.add('tapTreat')
    tapTreat.style.width = `${size}px`
    tapTreat.style.height = `${size}px`
    tapTreat.style.top = `${y}px`
    tapTreat.style.left = `${x}px`
    if (treatId === 1) {
        tapTreat.style.backgroundImage = "url(./img/biscuit-cookie-svgrepo-com.svg)"
    } else {
        tapTreat.style.backgroundImage = "url(./img/pizza-svgrepo-com.svg)"
    }    

    board.append(tapTreat)
}

function finishGame() {   
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h3>Съедено лакомств:<br> ${score} </h3>`    
    makePrediction()
    restartBtn.classList.remove('hide')
    restartBtn.classList.add('restart')
    restartBtn.addEventListener('click', () => {
        // window.location.replace('https://basicnat.github.io/game-feed-corgi/')
        window.location.replace(location)
    })
}

function makePrediction() {
    const phrase = document.createElement('p')
    const photo = document.createElement('div')
        
    photo.classList.add('photo')
    phrase.classList.add('phrase')
    
    if (score > 19) {                 
        photo.style.backgroundImage = 'url(./img/snow-globes-welsh-corgi.jpg)';       
        phrase.innerHTML = `<span>Хорошо, я наелся. Вот моё предсказание:</span><br><br><i>В новом году тебя ждёт ${wishSet[i1]}, если на столе будет ${foodSet[i2]}</i>`       
        
    } else {        
        phrase.textContent = 'Корми ещё! Никаких предсказаний, пока я голоден!'
        photo.style.backgroundImage = 'url(./img/wanecc6v14b51.webp)'        
    }
    
    board.append(photo)
    board.append(phrase)
}

function getRandomNumber (min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomIndex(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)); 
  }


