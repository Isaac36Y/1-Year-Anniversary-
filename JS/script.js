import dates from './dates.js'

const timelineCardsContainer = document.querySelector('#timeline-cards-container');
const navBar = document.querySelector('#nav')
const indicator = document.querySelector('#nav-indicator')
const player = document.getElementById('audio-player');
const loadScreen = document.querySelector('#load')

let timerDone = false;
let pageLoaded = false;

setTimeout(() => {
    timerDone = true;
    tryReveal();
}, 8000);

const tryReveal = () => {
    if (timerDone && pageLoaded) {
        const par = loadScreen.querySelector('p');
        par.innerText = 'Click Anywhere to Begin'
        loadScreen.addEventListener('click', () => {
            playSong(currentSong)
            loadScreen.classList.add('selected')
            document.documentElement.style.overflow = 'auto'
        })
    }
}

const songs = [
    './Audio/song1.mp3',
    './Audio/song2.mp3',
    './Audio/song3.mp3',
    './Audio/song4.mp3',
    './Audio/song5.mp3'
];

let currentSong = 0;

const playSong = (index) => {
    player.src = songs[index];
    player.play();
}


player.addEventListener('ended', () => {
    currentSong = (currentSong + 1) % songs.length;
    playSong(currentSong);
});




const renderTimeline = () => {
    const renderedDates = dates.map((date, index) => {
        const dateId = convertDate(date.date)
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
            return `<div class="timeline__card-section__${date.modifierClass} event" data-event="${date.modifierClass}" id="${dateId}-${index}">
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
    const modifier = timelineCardsContainer.querySelector(`[data-event="${event}"]`)
    const slider = modifier.querySelector(`#${event}-slider`)
    const sliderImgs = modifier.querySelectorAll('.timeline__card-modified-slider-container > div')
    const selectedImg = [...sliderImgs].findIndex(img => img.classList.contains('selected'));
    const currentImg = sliderImgs[selectedImg]
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
    const modifier = timelineCardsContainer.querySelector(`[data-event="${el}"]`)
    const sliderContainer = modifier.querySelector('.timeline__card-modified-slider-container');
    const rightStack = sliderContainer.querySelectorAll('.timeline__img-desc.right-stack');
    const leftStack = sliderContainer.querySelectorAll('.timeline__img-desc.left-stack');
    const descriptions = sliderContainer.querySelectorAll('.timeline__img-desc > .timeline__card-modified-par')
    
    descriptions.forEach(desc => desc.innerText.length >= 1 ? desc.style.maskImage = "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" : '')
    
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

const adjustImgOrientations = () => {
    const imgs = timelineCardsContainer.querySelectorAll('.timeline__card-imgs img')
    
    imgs.forEach(img => {
        const applyOrientation = () => {
            if (img.naturalWidth > img.naturalHeight) {
                // horizontal image — flip width and height
                img.style.width = '38rem'
                img.style.height = '30rem'
            } else {
                // vertical image — keep default
                img.style.width = '30rem'
                img.style.height = '38rem'
            }
        }

        if (img.complete) {
            // image already loaded (cached)
            applyOrientation()
        } else {
            // wait for image to load before checking dimensions
            img.addEventListener('load', applyOrientation)
        }
    })
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

const updateNavOnScroll = () => {
    const sections = timelineCardsContainer.querySelectorAll('.timeline__section, .event')

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const dateEl = entry.target.querySelector('.timeline__card-date, .timeline__card-modified-date')
                if (!dateEl) return

                const dateParts = dateEl.textContent.trim().split(' ')
                const monthName = dateParts[0].toLowerCase()
                const year = dateParts[dateParts.length - 1]

                const monthNumber = (new Date(`${monthName} 1, ${year}`).getMonth() + 1).toString().padStart(2, '0')
                
                const navButtons = navBar.querySelectorAll('.nav__buttons')
                const matchingBtn = [...navButtons].find(btn => {
                    const href = btn.closest('a')?.getAttribute('href') || ''
                    return href.includes(`${monthNumber}-${year}`)
                })

                if (matchingBtn) changeNavMonthOnclick(matchingBtn)
            }
        })
    }, {
        threshold: 0.1,
       /*  rootMargin: '-10% 0px -60% 0px' */
    })

    sections.forEach(section => observer.observe(section))
}
/* entries = document.querySelectorAll('.timeline__section, .event') */
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


document.addEventListener('DOMContentLoaded', () => {
    renderTimeline()
    const defaultSelected = navBar.querySelector('.nav__buttons.selected')
    if (defaultSelected) changeNavMonthOnclick(defaultSelected)
    setTimeout(() => {
        updateNavOnScroll()
        adjustImgOrientations()
    }, 200)
    
    
})

window.addEventListener('load', () => {
    pageLoaded = true;
    tryReveal();
});