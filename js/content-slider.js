document
  .querySelectorAll(".content-slider-container")
  .forEach((sliderContainer) => {
    const track = sliderContainer.querySelector(".slider-track");
    const slides = Array.from(sliderContainer.querySelectorAll(".slide"));
    const btnPrev = sliderContainer.querySelector(".slider-btn.prev");
    const btnNext = sliderContainer.querySelector(".slider-btn.next");
    const dotsContainer = sliderContainer.querySelector(".slider-dots");

    let currentIndex = 0;
    const slideCount = slides.length;

    // Добавляем точки, если включен класс with-dots
    if (sliderContainer.classList.contains("with-dots")) {
      slides.forEach((_, index) => {
        const dot = document.createElement("div");
        if (index === currentIndex) dot.classList.add("active");
        dot.addEventListener("click", () => {
          currentIndex = index;
          updateSlider();
        });
        dotsContainer.appendChild(dot);
      });
    }

    const dots = Array.from(dotsContainer.children);

    function updateSlider() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
      });
    }

    btnNext?.addEventListener("click", () => {
      if (currentIndex < slideCount - 1) {
        currentIndex++;
      } else {
        currentIndex = 0; // Возврат к первому слайду
      }
      updateSlider();
    });

    btnPrev?.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = slideCount - 1; // Переход к последнему слайду
      }
      updateSlider();
    });

    // Свайп для мобильных устройств
    let startX = 0;
    let isDragging = false;

    track.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    });

    track.addEventListener("touchmove", (e) => {
      if (!isDragging) return;
      const currentX = e.touches[0].clientX;
      const deltaX = startX - currentX;

      if (deltaX > 50 && currentIndex < slideCount - 1) {
        currentIndex++;
        isDragging = false;
      } else if (deltaX > 50 && currentIndex === slideCount - 1) {
        currentIndex = 0; // Возврат к первому слайду при свайпе вправо
        isDragging = false;
      } else if (deltaX < -50 && currentIndex > 0) {
        currentIndex--;
        isDragging = false;
      } else if (deltaX < -50 && currentIndex === 0) {
        currentIndex = slideCount - 1; // Переход к последнему слайду при свайпе влево
        isDragging = false;
      }
      updateSlider();
    });

    track.addEventListener("touchend", () => {
      isDragging = false;
    });
  });
