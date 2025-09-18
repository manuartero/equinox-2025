const mobileMenuCheckbox = document.getElementById('mobile-menu-checkbox');
const mobileMenu = document.querySelector('aside');
const menuLinks = mobileMenu.querySelectorAll('a[href^="#"]');

menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenuCheckbox.checked = false;
  });
});

mobileMenu.addEventListener('click', (evt) => {
  if (evt.target === mobileMenu) {
    mobileMenuCheckbox.checked = false;
  }
});
