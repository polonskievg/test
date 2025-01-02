function openPopup(videoUrl) {
  const overlay = document.getElementById("overlay");
  const iframe = document.getElementById("youtubeVideo");

  // Устанавливаем URL видео
  iframe.src = videoUrl;

  // Показываем попап
  overlay.classList.add("visible");
  overlay.classList.remove("hidden");
}

function closePopup() {
  const overlay = document.getElementById("overlay");
  const iframe = document.getElementById("youtubeVideo");

  // Прячем попап
  overlay.classList.remove("visible");
  overlay.classList.add("hidden");

  // Останавливаем видео, очищая src
  iframe.src = "";
}
