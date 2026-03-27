import dates from './dates.js'

const timelineCardsContainer = document.querySelector('#timeline-cards-container');



const renderTimeline = () => {
    const renderedDates = dates.map(date => {
        if (date.modifierClass) {
            let id = 0
            const imgAndDesc = date.img.map(img => {
                id++
                return `<div class="timeline__img-desc right-stack" id="${date.modifierClass}-${id}">                                                            
                            <div class="timeline__card-img"><img src="${img.src}" alt=""  width="768"></div>                            
                            <p class="timeline__card-par">${img.description}</p>
                        </div>
                        `
            }).join("")
            return `<div class="timeline__card-container timeline__card-container__${date.modifierClass} event" id="${date.modifierClass}">
                    <div class="timeline__card ">
                        <p class="timeline__card-date">${date.date}</p>
                        <h2 class="timeline__card-title">${date.title}</h3>
                        <div class="timeline__card-modifier-img-container" id="${date.modifierClass}-slider">
                            <button type="button" class="timeline__modifier-slides-button" id="${date.modifierClass}-previous-btn">←</button>
                            <div class="timeline__card-modifier-slider-container">
                            ${imgAndDesc}
                            </div>
                            <button type="button" class="timeline__modifier-slides-button" id="${date.modifierClass}-next-btn">→</button>
                        </div>
                    </div>
                </div>`
        }else return `<div class="timeline__card-container">
                    <div class="timeline__card ">
                        <p class="timeline__card-date">${date.date}</p>
                        <div class="timeline__card-img"><img src="${date.img}" alt=""  width="768"></div>
                        <h2 class="timeline__card-title">${date.title}</h3>
                        <p class="timeline__card-par">${date.description}</p>
                    </div>
                </div>`
    }).join(" ")

    timelineCardsContainer.innerHTML = renderedDates
    setTimeout(() => {
        selectFirstImgInEvents()
        centerCards()

    }, 50)
}

const changeEventImg = (event, direction) => {
    const modifier = timelineCardsContainer.querySelector(`#${event}`)
    const slider = modifier.querySelector(`#${event}-slider`)
    const sliderImgs = modifier.querySelectorAll('.timeline__card-modifier-slider-container > div')
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
        const imgContainer = card.querySelector('.timeline__card-modifier-img-container')
        const firstImg =  imgContainer.querySelector('.timeline__card-modifier-slider-container > div:first-child')
        firstImg.classList.remove('right-stack')
        firstImg.classList.add('selected')
    })
}

const centerCards = () => {
    const timelineCards = timelineCardsContainer.querySelectorAll('.timeline__card');
    timelineCards.forEach(item => {
        const cardHeight = item.clientHeight
        
        item.style.top = `calc(55vh - ${cardHeight / 2}px)`
    })
}

const modifierCardsStack = (el) => {
    const modifier = document.querySelector(`#${el}`)
    const sliderContainer = modifier.querySelector('.timeline__card-modifier-slider-container');
    const rightStack = sliderContainer.querySelectorAll('.timeline__img-desc.right-stack');
    const leftStack = sliderContainer.querySelectorAll('.timeline__img-desc.left-stack');
    
    for (let i = 0; i < rightStack.length; i++) {
        if (rightStack.length >= 33) {
            rightStack[i].style.transform = `translate(${160 + i * 0.45}%, ${5 + i * .2}rem) rotate(25deg) scale(0.6) rotateY(-90deg)`
        }else if (rightStack.length >= 19) {
            rightStack[i].style.transform = `translate(${160 + i * 0.5}%, ${7 + i * .2}rem) rotate(25deg) scale(0.6) rotateY(-90deg)`
        }else {
            rightStack[i].style.transform = `translate(${160 + i}%, ${7 + i * .3}rem) rotate(25deg) scale(0.6) rotateY(-90deg)`;
        }
        rightStack[i].style.zIndex = `${rightStack.length - [i]}`;
    }
    for (let i = 0; i < leftStack.length; i++) {
        const distanceFromLast = leftStack.length - 1 - i

        if (leftStack.length >= 33) {
            leftStack[i].style.transform = `translate(${-60 - distanceFromLast * 0.45}%, ${5 + distanceFromLast * .2}rem) rotate(-25deg) scale(0.6) rotateY(90deg)`
        }else if (leftStack.length >= 19) {
            leftStack[i].style.transform = `translate(${-60 - distanceFromLast * 0.5}%, ${7 + distanceFromLast * .2}rem) rotate(-25deg) scale(0.6) rotateY(90deg)`
        }else {
            leftStack[i].style.transform = `translate(${-60 - distanceFromLast}%, ${7 + distanceFromLast * .3}rem) rotate(-25deg) scale(0.6) rotateY(90deg)`;
        }
        leftStack[i].style.zIndex = `${[i]}`;
    }
    
}


timelineCardsContainer.addEventListener('click', (e) => {
    if (e.target.id === 'camping-trip-next-btn') {
        changeEventImg('camping-trip', 'next')
        centerCards()
    }else if (e.target.id === 'camping-trip-previous-btn') {
        changeEventImg('camping-trip', 'previous')
        centerCards()
    }else if (e.target.id === 'upper-table-rock-next-btn') {
        changeEventImg('upper-table-rock', 'next')
        centerCards()
    }else if (e.target.id === 'upper-table-rock-previous-btn') {
        changeEventImg('upper-table-rock', 'previous')
        centerCards()
    }
})

window.addEventListener('scroll', () => {

})

document.addEventListener('DOMContentLoaded', () => {
    renderTimeline()
    setTimeout(() => {
        modifierCardsStack('camping-trip')
        modifierCardsStack('upper-table-rock')
    }, 100)
})