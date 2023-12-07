/**
 * Event listener for the 'DOMContentLoaded' event.
 *
 * @function
 */
document.addEventListener('DOMContentLoaded', function () {
    /**
   * The opening container element.
   *
   * @type {HTMLElement}
   */

  var openingContainer = document.querySelector('.opening-container');

    /**
   * Hides the opening container after a delay or when the container is clicked.
   *
   * @function
   */
  function hideOpeningContainer() {
    openingContainer.style.display = 'none';
  }

  setTimeout(hideOpeningContainer, 8000);

  openingContainer.addEventListener('click', hideOpeningContainer);
});
