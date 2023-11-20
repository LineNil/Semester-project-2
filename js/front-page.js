document.addEventListener('DOMContentLoaded', function () {
  var openingContainer = document.querySelector('.opening-container');

  function hideOpeningContainer() {
    openingContainer.style.display = 'none';
  }

  setTimeout(hideOpeningContainer, 8000);

  openingContainer.addEventListener('click', hideOpeningContainer);
});
