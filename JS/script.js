const heroTitle = document.querySelector('#hero-title')

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