import dates from './dates.js'

const timelineCardsContainer = document.querySelector('#timeline-cards-container');
const navBar = document.querySelector('#nav')
const indicator = document.querySelector('#nav-indicator')


const renderTimeline = () => {
    const renderedDates = dates.map((date, index) => {
        if (date.modifierClass) {
            let id = 0
            const imgAndDesc = date.img.map(img => {
                id++
                return `<div class="timeline__img-desc right-stack" id="${date.modifierClass}-${id}">                                                            
                            <div class="timeline__card-img__modified"><img src="${img.src}" alt=""  width="768"></div>                            
                            <p class="timeline__card-modified-par">${img.description}</p>
                        </div>
                        `
            }).join("")
            return `<div class="timeline__card-section__${date.modifierClass} event" id="${date.modifierClass}">
                    <div class="timeline__card-modified ">
                        <p class="timeline__card-modified-date">${date.date}</p>
                        <h2 class="timeline__card-modified-title">${date.title}</h3>
                        <div class="timeline__card-modified-img-container" id="${date.modifierClass}-slider">
                            <button type="button" class="timeline__modified-slides-button" id="${date.modifierClass}-previous-btn">←</button>
                            <div class="timeline__card-modified-slider-container">
                            ${imgAndDesc}
                            </div>
                            <button type="button" class="timeline__modified-slides-button" id="${date.modifierClass}-next-btn">→</button>
                        </div>
                    </div>
                </div>`
        }else {
            const dateId = convertDate(date.date)
            const imgAndDesc = date.img.map(img => {
                return `<img src="${img.src}" alt=""  width="768"></img>`
            }).join("");
            return `<div class="timeline__section" id="${dateId}-${index}">
                        <div class="timeline__card">
                            <p class="timeline__card-date">${date.date}</p>
                            <h2 class="timeline__card-title">${date.title}</h3>
                            <div class="timeline__card-imgs">
                                ${imgAndDesc}
                            </div>
                            <p class="timeline__card-par">${date.description}</p>
                        </div>
                    </div>`
        }}).join(" ")

    timelineCardsContainer.innerHTML = renderedDates
    setTimeout(() => {
        selectFirstImgInEvents();
        modifierCardsStack('camping-trip');
        modifierCardsStack('upper-table-rock');
        modifierCardsStack('pumpkin-patch');
        modifierCardsStack('san-diego');
        

    }, 50)
}

const convertDate = (dateStr) => {
    const cleanedDateString = dateStr.replace(/(\d+)(st|nd|rd|th)/, '$1');
    const date = new Date(cleanedDateString)

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0')
    return `${month}-${year}`
}


const changeEventImg = (event, direction) => {
    const modifier = timelineCardsContainer.querySelector(`#${event}`)
    const slider = modifier.querySelector(`#${event}-slider`)
    const sliderImgs = modifier.querySelectorAll('.timeline__card-modified-slider-container > div')
    const selectedImg = [...sliderImgs].findIndex(img => img.classList.contains('selected'));
    const currentImg = sliderImgs[selectedImg]
    console.log(currentImg)
    const newSlide = direction === 'next' 
        ? slider.querySelector(`#${event}-${selectedImg + 2}`)
        : slider.querySelector(`#${event}-${selectedImg}`)

    if (!newSlide) return 
    sliderImgs.forEach(img => img.classList.remove('selected'))
    if ( direction === 'next')  {
        currentImg.classList.add('left-stack')
        newSlide.classList.remove('right-stack')
        newSlide.classList.add('selected')
        newSlide.style.transform = '';
        newSlide.style.zIndex = '';
        modifierCardsStack(event) 
        
    }else {
        currentImg.classList.add('right-stack')
        newSlide.classList.remove('left-stack')
        newSlide.classList.add('selected')
        newSlide.style.transform = '';
        newSlide.style.zIndex = '';
        modifierCardsStack(event)
    }
    
}

const selectFirstImgInEvents = () => {
    const eventCards = timelineCardsContainer.querySelectorAll('.event')

    eventCards.forEach(card => {
        const imgContainer = card.querySelector('.timeline__card-modified-img-container')
        const firstImg =  imgContainer.querySelector('.timeline__card-modified-slider-container > div:first-child')
        firstImg.classList.remove('right-stack')
        firstImg.classList.add('selected')
    })
}

const modifierCardsStack = (el) => {
    const modifier = timelineCardsContainer.querySelector(`#${el}`)
    const sliderContainer = modifier.querySelector('.timeline__card-modified-slider-container');
    const rightStack = sliderContainer.querySelectorAll('.timeline__img-desc.right-stack');
    const leftStack = sliderContainer.querySelectorAll('.timeline__img-desc.left-stack');
    
    for (let i = 0; i < rightStack.length; i++) {
        if (rightStack.length >= 19) {
            rightStack[i].style.transform = `translate(${160 + i * 0.5}%, ${5 + i * .2}rem) rotate(25deg) scale(0.6) rotateY(-110deg)`
        }else {
            rightStack[i].style.transform = `translate(${160 + i}%, ${5 + i * .3}rem) rotate(25deg) scale(0.6) rotateY(-110deg)`;
        }
        rightStack[i].style.zIndex = `${rightStack.length - [i]}`;
    }
    for (let i = 0; i < leftStack.length; i++) {
        const distanceFromLast = leftStack.length - 1 - i

        if (leftStack.length >= 19) {
            leftStack[i].style.transform = `translate(${-160 - distanceFromLast * 0.5}%, ${5 + distanceFromLast * .2}rem) rotate(-25deg) scale(0.6) rotateY(110deg)`
        }else {
            leftStack[i].style.transform = `translate(${-160 - distanceFromLast}%, ${5 + distanceFromLast * .3}rem) rotate(-25deg) scale(0.6) rotateY(110deg)`;
        }
        leftStack[i].style.zIndex = `${[i]}`;
    }
    
}

const changeNavMonthOnclick = (el) => {
    if (!el) return
    const months = navBar.querySelectorAll('.nav__buttons')
    months.forEach(month => month.classList.remove('selected'))
    el.classList.add('selected')
    
    // measure the clicked button and slide indicator to it
    const btnLeft = el.offsetLeft
    const btnWidth = el.offsetWidth

    indicator.style.transform = `translateX(${btnLeft}px)`
    indicator.style.width = `${btnWidth}px`
}
/* 
const changeNavMonthOnScroll = (entries, observer) => {
    entries = document.querySelectorAll('.timeline__section, .event')
    console.log(entries)
} */

const getImgNaturalWidth = (src) => {
    return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => resolve(img.naturalWidth)
        img.src = src
    })
}


timelineCardsContainer.addEventListener('click', (e) => {
    if (e.target.id === 'camping-trip-next-btn') {
        changeEventImg('camping-trip', 'next')
        
    }else if (e.target.id === 'camping-trip-previous-btn') {
        changeEventImg('camping-trip', 'previous')
       
    }else if (e.target.id === 'upper-table-rock-next-btn') {
        changeEventImg('upper-table-rock', 'next')
        
    }else if (e.target.id === 'upper-table-rock-previous-btn') {
        changeEventImg('upper-table-rock', 'previous')
    }else if (e.target.id === 'pumpkin-patch-previous-btn') {
        changeEventImg('pumpkin-patch', 'previous')
    }else if (e.target.id === 'pumpkin-patch-next-btn') {
        changeEventImg('pumpkin-patch', 'next')
    }else if (e.target.id === 'san-diego-previous-btn') {
        changeEventImg('san-diego', 'previous')
    }else if (e.target.id === 'san-diego-next-btn') {
        changeEventImg('san-diego', 'next')
    }
})

navBar.addEventListener('click', (e) => {
    const button = e.target.closest('.nav__buttons');
    console.log(button)
    changeNavMonthOnclick(button)
})

document.addEventListener('DOMContentLoaded', () => {
    renderTimeline()
    const defaultSelected = navBar.querySelector('.nav__buttons.selected')
    if (defaultSelected) changeNavMonthOnclick(defaultSelected)

    
    
})


const songs = [
    './.vscode/Audio/m&s.mp3',
    './.vscode/Audio/coming-up.mp3',
    './.vscode/Audio/city.mp3'
];

let currentSong = 0;
const player = document.getElementById('audio-player');

const playSong = (index) => {
    player.src = songs[index];
    player.play();
}


player.addEventListener('ended', () => {
    currentSong = (currentSong + 1) % songs.length;
    playSong(currentSong);
});