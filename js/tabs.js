document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  // Переключение табов
  const switchTab = (button, index) => {
    const isMobile = window.innerWidth <= 768;

    // Для мобильных устройств
    if (isMobile) {
      const isActive = button.classList.contains("active");

      // Убираем активность со всех табов и скрываем контент
      tabButtons.forEach((btn, i) => {
        btn.classList.remove("active");
        tabPanels[i].classList.remove("active");
      });

      // Если таб неактивен, активируем его
      if (!isActive) {
        button.classList.add("active");
        tabPanels[index].classList.add("active");

        // Перемещаем контент под соответствующую кнопку
        button.insertAdjacentElement("afterend", tabPanels[index]);
      }
    } else {
      // Для десктопов: активным может быть только один таб
      tabButtons.forEach((btn, i) => {
        btn.classList.remove("active");
        tabPanels[i].classList.remove("active");
      });

      button.classList.add("active");
      tabPanels[index].classList.add("active");
    }
  };

  // Инициализация табов
  const initializeTabs = () => {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      // На мобильных устройствах все табы неактивны, контент скрыт
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabPanels.forEach((panel) => panel.classList.remove("active"));
    } else {
      // На десктопах первый таб активен
      tabButtons.forEach((btn, i) => {
        if (i === 0) {
          btn.classList.add("active");
          tabPanels[i].classList.add("active");
        } else {
          btn.classList.remove("active");
          tabPanels[i].classList.remove("active");
        }
      });

      // Перемещаем весь контент в общий блок под табами
      const tabsContainer = document.querySelector(".tabs");
      tabPanels.forEach((panel) => tabsContainer.appendChild(panel));
    }
  };

  // Добавляем обработчики для переключения табов
  tabButtons.forEach((button, index) => {
    button.addEventListener("click", () => switchTab(button, index));
  });

  // Инициализация при загрузке
  initializeTabs();

  // Обновление при изменении ширины экрана
  window.addEventListener("resize", initializeTabs);
});
