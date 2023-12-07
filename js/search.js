/**
 * Represents the input element for search.
 * @type {HTMLInputElement}
 */
 const searchInput = document.getElementById('searchInput');

 /**
 * Event listener for the 'input' event on the search input.
 * Triggers the handleSearch function when the input changes.
 */
   searchInput.addEventListener('input', handleSearch);

 /**
 * Handles the search functionality.
 */
   function handleSearch() {

   /**
   * The text entered in the search input, converted to lowercase.
   * @type {string}
   */
    const searchText = searchInput.value.toLowerCase();

    auctionContainer.childNodes.forEach((auctionDiv) => {

     /**
     * The text content of the auction title, converted to lowercase.
     * @type {string}
     */
      const auctionTitleText = auctionDiv.querySelector('.listing-heading').textContent.toLowerCase();

      /**
     * The text content of the auction description, converted to lowercase.
     * @type {string}
     */
      const auctionDescriptionText = auctionDiv.querySelector('.listing-description').textContent.toLowerCase();

      /**
     * Indicates whether the auction should be shown based on the search criteria.
     * @type {boolean}
     */
      const shouldShow = auctionTitleText.includes(searchText) || auctionDescriptionText.includes(searchText);
      if (shouldShow) {
        auctionDiv.classList.remove('hide');
      } else {
        auctionDiv.classList.add('hide');
      }
    });
  }
