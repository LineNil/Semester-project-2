//////////////søke

 // Få referansen til søkefeltet og søkeknappen
 const searchInput = document.getElementById('searchInput');


   // Legg til en hendelseslytter for tastetrykk i søkefeltet
   searchInput.addEventListener('input', handleSearch);


   function handleSearch() {
    // Få søketeksten fra søkefeltet
    const searchText = searchInput.value.toLowerCase();

    // Gå gjennom hver auksjon og legg til/fjern "hide"-klassen basert på søketeksten
    auctionContainer.childNodes.forEach((auctionDiv) => {
      const auctionTitleText = auctionDiv.querySelector('.listing-heading').textContent.toLowerCase();
      const auctionDescriptionText = auctionDiv.querySelector('.listing-description').textContent.toLowerCase();

      const shouldShow = auctionTitleText.includes(searchText) || auctionDescriptionText.includes(searchText);
      if (shouldShow) {
        auctionDiv.classList.remove('hide');
      } else {
        auctionDiv.classList.add('hide');
      }
    });
  }
