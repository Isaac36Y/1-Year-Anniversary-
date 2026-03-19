const heroTitle = document.querySelector('#hero-title')
const timelineCardsContainer = document.querySelector('#timeline-cards-container');

const dates = [
    {
        date: "September 1st, 2025",
        modifierClass: null,
        title: 'Your Birthday',
        description: 'We got massages, made homemade pasta, and had the best spaghetti dinner with jalepeno bread! 26 never looked so good',
        img: './Images/D3460AF6-40E4-46A2-9F1F-C56EFFEC0BCC_1_105_c.jpeg'
    },
    {
        date: "October 15th, 2025",
        modifierClass: null,
        title: 'Scary House',
        description: "I don't like haunted house very much but I had so much fun on this day with you. The pumkin patch was great and the evening was such a good memory. Even waiting in line to get into the haunted house is a great time with you.",
        img: './Images/6EA551D6-A407-4C4E-8575-B44494C9C1E3_1_102_o.jpeg'
    },
    {
        date: "April 10th, 2025",
        modifierClass: null,
        title: 'Upper Table Rock Hike',
        description: "Spring sprang and so do I when I'm with you.",
        img: './Images/48E8BFAB-6D6E-4ED2-AC1E-02439EA48A25_1_105_c.jpeg'
    },
    {
        date: "June 28th, 2025",
        modifierClass: 'camping-trip',
        title: 'Camping Trip',
        description: null,
        img: [
            { src: './Images/2F41D630-9080-453F-B6BC-2EF8D2356533_4_5005_c.jpeg', description: "Our wine and games night. I probably won at uno😉"},
            { src: './Images/1968CDC9-8A1F-4C70-99E4-5AD206764BAC_1_102_o.jpeg', description: "Best breakfaast a camper could ask for. Nice boots"},
            { src: './Images/3D023E7B-40C8-45D7-97E5-29EF475C199F_1_102_o.jpeg', description: "A waterfall hike along the creek"}
        ]
    },
    {
        date: "June 28th, 2025",
        modifierClass: null,
        title: 'Camping Trip',
        description: 'Every night we froze our butts off but this night we enjoyed some wine and played games in out tent',
        img: './Images/AC8332FB-ED4B-46E9-8CF2-6555A49C155A_1_102_o.jpeg'
    }
]

const renderTimeline = () => {
    const renderedDates = dates.map(date => {
        if (date.modifierClass) {
            const imgAndDesc = date.img.map(img => {
                return `<div>
                            <div class="timeline__card-img"><img src="${img.src}" alt=""  width="500"></div>
                            <p class="timeline__card-par">${img.description}</p>
                        </div>
                        `
            }).join("")
            return `<div class="timeline__card-container timeline__card-container__${date.modifierClass} event">
                    <div class="timeline__card ">
                        <p class="timeline__card-date">${date.date}</p>
                        <h2 class="timeline__card-title">${date.title}</h3>
                        <div class="timeline__card-modifier-img-container">
                        ${imgAndDesc}
                        </div>
                    </div>
                </div>`
        }else return `<div class="timeline__card-container">
                    <div class="timeline__card ">
                        <p class="timeline__card-date">${date.date}</p>
                        <div class="timeline__card-img"><img src="${date.img}" alt=""  width="500"></div>
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

const selectFirstImgInEvents = () => {
    const eventCards = timelineCardsContainer.querySelectorAll('.event')

    eventCards.forEach(card => {
        const imgContainer = card.querySelector('.timeline__card-modifier-img-container')
        const firstImg =  imgContainer.firstElementChild
        firstImg.classList.add('selected')
    })
}

const centerCards = () => {
    const timelineCards = timelineCardsContainer.querySelectorAll('.timeline__card');
    timelineCards.forEach(item => {
        const cardHeight = item.clientHeight
        
        item.style.top = `calc(50vh - ${cardHeight / 2}px)`
    })
    
}

const titleDisapearOnScroll = () => {
    if (window.scrollY > 350) {
        heroTitle.style.display = 'none'
    }else {
        heroTitle.style.display = 'block'
    }
}



window.addEventListener('scroll', () => {
    titleDisapearOnScroll()
})

document.addEventListener('DOMContentLoaded', () => {
    renderTimeline()
    
})