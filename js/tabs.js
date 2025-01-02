document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  // Функция для плавного появления контента
  const fadeIn = (element) => {
    element.style.display = "block";
    element.style.opacity = 0;
    element.style.maxHeight = 0;
    element.style.transition = "opacity 0.4s ease, max-height 0.4s ease";

    requestAnimationFrame(() => {
      element.style.opacity = 1;
      element.style.maxHeight = element.scrollHeight + "px";
    });
  };

  // Функция для скрытия контента
  const hideImmediately = (element) => {
    element.style.opacity = 0;
    element.style.maxHeight = 0;
    element.style.transition = "opacity 0.4s ease, max-height 0.4s ease";
  };

  // Обработчик переключения табов
  const handleTabSwitch = (button, index) => {
    const isMobile = window.innerWidth <= 768;
    const isActive = button.classList.contains("active");

    if (isMobile && isActive) {
      // На мобильных: если таб активен, закрываем его
      button.classList.remove("active");
      hideImmediately(tabPanels[index]);
    } else {
      // Убираем активные классы
      tabButtons.forEach((btn, i) => {
        btn.classList.remove("active");
        hideImmediately(tabPanels[i]);
      });

      // Активируем текущий таб
      button.classList.add("active");
      fadeIn(tabPanels[index]);
    }
  };

  // Добавление событий на кнопки табов
  tabButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      handleTabSwitch(button, index);
    });
  });

  // Адаптация на мобильных/десктопах
  const adjustPanelsForDevice = () => {
    const isMobile = window.innerWidth <= 768;

    tabPanels.forEach((panel) => {
      const button = document.querySelector(`[data-tab="${panel.id}"]`);
      if (isMobile) {
        // На мобильных контент размещается сразу после кнопки
        button.insertAdjacentElement("afterend", panel);
      } else {
        // На десктопах контент размещается под кнопками
        document.querySelector(".tabs").appendChild(panel);
      }
    });
  };

  // Инициализация
  adjustPanelsForDevice();
  window.addEventListener("resize", adjustPanelsForDevice);
});
