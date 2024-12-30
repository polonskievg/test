// ScrollFixedTopMenu
let lastScrollTop = 0;
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScrollTop) {
    header.classList.add("hidden");
  } else {
    header.classList.remove("hidden");
  }

  lastScrollTop = Math.max(50, currentScroll);
});

// MobileMenu
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  mobileMenu.classList.toggle("active");
}

let currentAngle = 0;

function rotateSlider(direction) {
  const slider = document.getElementById("slider");
  currentAngle += direction * 72; // 360 / 5 = 72 градусов
  slider.style.transform = `rotate(${currentAngle}deg)`;
}

// Accordion

const accItems = document.querySelectorAll(".accordion__item");

accItems.forEach((acc) => acc.addEventListener("click", toggleAcc));

function toggleAcc() {
  accItems.forEach((item) =>
    item != this ? item.classList.remove("accordion__item--active") : null
  );

  if (this.classList != "accordion__item--active") {
    this.classList.toggle("accordion__item--active");
  }
}
