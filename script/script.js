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

// Tabs
const tabs = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".tab-content");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));

    tab.classList.add("active");
    const target = document.getElementById(`tab-${tab.dataset.tab}`);
    target.classList.add("active");
  });
});

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

// Slider Gallery

document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll(".slider");

  sliders.forEach((slider) => {
    const track = slider.querySelector(".slider-track");
    const slides = slider.querySelectorAll(".slide");
    const prevBtn = slider.querySelector(".slider-btn.prev");
    const nextBtn = slider.querySelector(".slider-btn.next");
    const dotsContainer = slider.querySelector(".slider-dots");

    let currentIndex = 0;
    let startX = 0;
    let currentX = 0;
    let isSwiping = false;

    // Инициализация точек
    slides.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (index === 0) dot.classList.add("active");
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll(".dot");

    const updateSlider = () => {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
      });
    };

    const goToNextSlide = () => {
      currentIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
      updateSlider();
    };

    const goToPrevSlide = () => {
      currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
      updateSlider();
    };

    // Слушатели кнопок
    nextBtn.addEventListener("click", goToNextSlide);
    prevBtn.addEventListener("click", goToPrevSlide);

    // Слушатели для точек
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentIndex = index;
        updateSlider();
      });
    });

    // Слушатели для свайпа
    track.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      isSwiping = true;
    });

    track.addEventListener("touchmove", (e) => {
      if (!isSwiping) return;
      currentX = e.touches[0].clientX;
    });

    track.addEventListener("touchend", () => {
      if (!isSwiping) return;

      const deltaX = currentX - startX;

      if (deltaX > 50) {
        goToPrevSlide();
      } else if (deltaX < -50) {
        goToNextSlide();
      }

      isSwiping = false;
    });
  });
});
