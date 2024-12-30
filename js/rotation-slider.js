const cards = document.querySelectorAll(".card");
const infoTitle = document.getElementById("card-title");
const infoDescription = document.getElementById("card-description");
const infoLink = document.getElementById("card-link");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

let currentIndex = 2; // Третья карточка по умолчанию
let autoPlayInterval;

function updateCards() {
  cards.forEach((card, index) => {
    card.className = "card"; // Сброс всех классов
    const relativeIndex = (index - currentIndex + cards.length) % cards.length;

    if (relativeIndex === 0) {
      card.classList.add("active");
      infoTitle.textContent = card.dataset.title;
      infoDescription.textContent = card.dataset.description;
      infoLink.href = card.dataset.link;
    } else if (relativeIndex === 1 || relativeIndex === -4) {
      card.classList.add("right-1");
    } else if (relativeIndex === 2 || relativeIndex === -3) {
      card.classList.add("right-2");
    } else if (relativeIndex === -1 || relativeIndex === 4) {
      card.classList.add("left-1");
    } else if (relativeIndex === -2 || relativeIndex === 3) {
      card.classList.add("left-2");
    }
  });
}

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  updateCards();
  restartAutoPlay();
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % cards.length;
  updateCards();
  restartAutoPlay();
});

function autoPlay() {
  autoPlayInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCards();
  }, 3000); // Интервал 3 секунды
}

function restartAutoPlay() {
  clearInterval(autoPlayInterval);
  autoPlay();
}

// Инициализация
updateCards();
autoPlay();
