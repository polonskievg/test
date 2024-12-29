document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  // Функция для плавного появления контента (FadeIn)
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

  // Функция для мгновенного скрытия контента
  const hideImmediately = (element) => {
    element.style.display = "none";
    element.style.opacity = 0;
    element.style.maxHeight = 0;
    element.style.transition = "none";
  };

  // Обработчик переключения табов
  const handleTabSwitch = (button, index) => {
    tabButtons.forEach((btn, i) => {
      const panel = tabPanels[i];
      if (btn === button) {
        btn.classList.add("active");
        fadeIn(panel);
      } else {
        btn.classList.remove("active");
        hideImmediately(panel);
      }
    });
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
      if (isMobile) {
        const btn = document.querySelector(`[data-tab="${panel.id}"]`);
        btn.insertAdjacentElement("afterend", panel);
      } else {
        document.querySelector(".tabs").appendChild(panel);
        panel.style.display = "block"; // На десктопе панели всегда видны
      }
    });
  };

  // Инициализация
  adjustPanelsForDevice();
  window.addEventListener("resize", adjustPanelsForDevice);
});
