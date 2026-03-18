const heroTitle = document.querySelector('#hero-title')
const timelineCardsContainer = document.querySelector('#timeline-cards-container');

const dates = [
    {
        date: "September 1st, 2025",
        img: './Images/D3460AF6-40E4-46A2-9F1F-C56EFFEC0BCC_1_105_c.jpeg',
        title: 'Your Birthday',
        description: 'We got massages, made homemade pasta, and had the best spaghetti dinner with jalepeno bread! 26 never looked so good'
    },
    {
        date: "October 15th, 2025",
        img: './Images/6EA551D6-A407-4C4E-8575-B44494C9C1E3_1_102_o.jpeg',
        title: 'Scary House',
        description: "I don't like haunted house very much but I had so much fun on this day with you. The pumkin patch was great and the evening was such a good memory. Even waiting in line to get into the haunted house is a great time with you."
    },
    {
        date: "April 10th, 2025",
        img: './Images/48E8BFAB-6D6E-4ED2-AC1E-02439EA48A25_1_105_c.jpeg',
        title: 'Upper Table Rock Hike',
        description: "Spring sprang and so do I when I'm with you."
    },
    {
        date: "June 28th, 2025",
        img: './Images/2F41D630-9080-453F-B6BC-2EF8D2356533_4_5005_c.jpeg',
        title: 'Camping Trip',
        description: 'Every night we froze our butts off but this night we enjoyed some wine and played games in out tent'
    }
]

const renderTimeline = () => {
    const renderedDates = dates.map(date => {
        return `<div class="timeline__card-container">
                    <div class="timeline__card">
                        <p class="timeline__card-date">${date.date}</p>
                        <div class="timeline__card-img"><img src="${date.img}" alt=""  width="500"></div>
                        <h3 class="timeline__card-title">${date.title}</h3>
                        <p class="timeline__card-par">${date.description}</p>
                    </div>
                </div>`
    }).join(" ")

    timelineCardsContainer.innerHTML = renderedDates
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