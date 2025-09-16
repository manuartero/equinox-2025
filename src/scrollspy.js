

const links = Array.from(document.querySelectorAll('aside a[href^="#"]'))
const sections = Array.from(document.querySelectorAll('section'))

const observer = new IntersectionObserver(onIntersect, {
  root: null,
  rootMargin: '0px',
  threshold: [0.5, 1]
})

sections.forEach((section) => {
  observer.observe(section)
})

links.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault()

    const sectionId = link.getAttribute('href')
    history.pushState(null, null, sectionId)

    sectionId && smoothScrollToSection(sectionId)
  })
})

scrollToCurrentHash()
window.addEventListener('hashchange', scrollToCurrentHash)

function scrollToCurrentHash() {
  const sectionId = window.location.hash
  smoothScrollToSection(sectionId)
}

function smoothScrollToSection(sectionId) {
  const section = sections.find(
    (section) => `#${section.id}` === sectionId
  )

  window.scrollTo({
    top: section.offsetTop,
    behavior: 'smooth'
  })
}

function onIntersect(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const section = entry.target
      const sectionId = `#${section.id}`

      const link = links.find((link) => link.getAttribute('href') === sectionId)

      highlightLink(link)
    }
  })
}

function highlightLink(targetLink) {
  links.forEach((link) => {
    if (link === targetLink) {
      link.classList.add('highlighted')
    } else {
      link.classList.remove('highlighted')
    }
  })
}
