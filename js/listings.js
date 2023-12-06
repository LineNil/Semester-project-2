const ApiUrl = 'https://api.noroff.dev/api/v1';
const listingsUrl = '/auction/listings?_bids=true';

//funksjon for å logge ut///////////////////////////////
function logoutUser(){
  localStorage.removeItem('accessToken');
  localStorage.removeItem('profile');
  localStorage.removeItem('userAvatar');

  window.location.href = '../index.html';
}
///////////////////////////////////////////////////////////

export async function fetchWithToken(url) {
  try {
    const token = localStorage.getItem('accessToken');
    const getData = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, getData);
    const json = await response.json();

    console.log('API Response:', json);

    const auctionContainer = document.getElementById('auctionContainer');

    json.forEach((auction) => {
      if (auction.title && auction.media && auction.media.length) {








        ////////////////////avatar/////////////////



        //////////////////////////rad 1 auksjoner////////////////////////////////////
        const auctionDiv = document.createElement('div');
        auctionDiv.classList.add('row', 'pt3', 'right-col', 'mt-5');

        const listingsDiv = document.createElement('div');
        listingsDiv.classList.add('col-md-6', 'bg-listing', 'p-3', 'ps-5', 'pe-5', 'g-0');
        auctionDiv.appendChild(listingsDiv);
      
// Sjekk om media informasjon er tilgjengelig og gyldig
if (auction.media && auction.media.length > 0) {
  auction.media.forEach((mediaUrl) => {
    const auctionImg = document.createElement('img');
    auctionImg.src = mediaUrl;
    auctionImg.classList.add('listing-img', 'profile-img');
    listingsDiv.appendChild(auctionImg);
  });
} else {
  console.error('Media information missing or invalid in auction');
}

        const auctionTitle = document.createElement('h4');
        auctionTitle.textContent = `Title: ${auction.title}`;
        auctionTitle.classList.add('listing-heading', 'pt-2');
        listingsDiv.appendChild(auctionTitle);

        const auctionDescription = document.createElement('p');
        auctionDescription.textContent = `Description: ${auction.description}`;
        auctionDescription.classList.add('listing-description', 'mt-3');
        listingsDiv.appendChild(auctionDescription);
     


        /////////////////////////////rad 2 bud///////////////////////////////////


        const bidsDiv = document.createElement('div');
        bidsDiv.classList.add('col-md-5', 'bg-listing','font-bid', 'g-0');

      
        const bidsContainer = document.createElement('div');
        bidsContainer.classList.add('container', 'p-4');
        bidsDiv.appendChild(bidsContainer);

        const deadlineRow = document.createElement('div');
        deadlineRow.classList.add('row');
        bidsContainer.appendChild(deadlineRow);

        const deadlineDiv = document.createElement('div');
        deadlineDiv.classList.add('col-md-12', 'd-flex', 'justift-content-center');
        deadlineRow.appendChild(deadlineDiv);

        const deadline = document.createElement('p');
        deadline.textContent = `Closes in:`;
        deadline.classList.add('deadline', 'pe-1', 'm-0');
        deadline.id = 'deadline';
        deadlineDiv.appendChild(deadline);

        const deadlineCount = document.createElement('p');
        deadlineCount.textContent = `${auction.endsAt}`;
        deadlineCount.classList.add('deadline', 'm-0');
        deadlineDiv.appendChild(deadlineCount);

        const deadlineWarning = document.createElement('p');
        deadlineWarning.textContent = `No bids will be placed after bid end.`;
        deadlineWarning.classList.add('bid-Warning');
        deadlineRow.appendChild(deadlineWarning);





        /////////////////Legge til bud////////////////////////////////////

        //boks for å plassere bud
        const placeBidContainer = document.createElement('div');
        placeBidContainer.classList.add('container');
        bidsDiv.appendChild(placeBidContainer);


        //diven for bud skjema
        const bidCard = document.createElement('div');
        bidCard.classList.add('bid-card', 'p-3');
        bidsDiv.appendChild(bidCard);


        //oppretter skjema for budgiving
        const bidForm = document.createElement('form');
        bidCard.appendChild(bidForm);


        // Opprett en div for form-group
        const formGroupDiv = document.createElement('div');
        formGroupDiv.classList.add('form-group');
        bidForm.appendChild(formGroupDiv);


        // Opprett en label for inndatafeltet
       const bidLabel = document.createElement('label');
       bidLabel.textContent = 'Your Bid:';
       bidLabel.setAttribute('for', 'bidAmount');
       bidLabel.classList.add('mb-2');
       formGroupDiv.appendChild(bidLabel);


      
       // Opprett inndatafeltet
       const bidInput = document.createElement('input');
       bidInput.type = 'text';
       bidInput.classList.add('form-control');
       bidInput.id = 'bidAmount';
       bidInput.placeholder = 'Enter your bid amount - NOK';
       bidInput.required = true;
       bidLabel.appendChild(bidInput);


       //knapp for å legge inn bud
       const placeBidButton = document.createElement('button');
       placeBidButton.type = 'button';
       placeBidButton.classList.add('btn', 'place-bid-btn', 'mt-4');
       placeBidButton.textContent = 'Place bid';
       bidForm.appendChild(placeBidButton);


       // Legg til hendelseslytter for Place bid-knappen
      placeBidButton.addEventListener('click', async function () {
        try {


       // Hent verdien fra budinndatafeltet
       const bidAmount = bidInput.value.trim();


      // Sjekk om budbeløpet er gyldig
        if (!bidAmount || isNaN(bidAmount) || bidAmount <= 0) {
         console.error('Invalid bid amount');
        return;
      }


    // Opprett et budobjekt
    const bidData = {
      amount: parseFloat(bidAmount), // Konverter til flyttall avhengig av API-krav
    };


    // Utfør en POST-forespørsel til auksjons-APIet for å legge inn et bud
    const response = await fetch(`${ApiUrl}/auction/listings/${auction.id}/bids`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Legg til autorisasjon hvis nødvendig
      },
      body: JSON.stringify(bidData),
    });

    if (response.ok) {
      const newBid = await response.json();
      console.log('New Bid:', newBid);
      alert('Bid placed successfully!');
    
    } else {
      console.error('Error placing bid:', response.statusText);
      
    }
  } catch (error) {
    console.error('Error placing bid:', error);
    
  }
});

/////////////////////////////////////////////////////////////////////////////////









       const bidWarningDiv = document.createElement('div');
       bidWarningDiv.classList.add('d-flex', 'mt-3');
       bidForm.appendChild(bidWarningDiv);

      const questionIcon = document.createElement('i');
      questionIcon.classList.add('fa-regular', 'fa-circle-question');
      bidWarningDiv.appendChild(questionIcon);

      const bidWarningText = document.createElement('p');
      bidWarningText.textContent = 'Bidding info';
      bidWarningText.classList.add('bid-warning', 'ms-2');
      bidWarningDiv.appendChild(bidWarningText);   

      const previousBidsDiv = document.createElement('div');
      previousBidsDiv.classList.add('previous-bids', 'pt-3');
      bidsDiv.appendChild(previousBidsDiv);
      
      const previousBidsP = document.createElement('p');
      previousBidsP.textContent = 'Previous bids';
      previousBidsDiv.appendChild(previousBidsP);
      
      const commentBidContainer = document.createElement('div');
      commentBidContainer.classList.add('comment-bid-container', 'd-flex', 'flex-column', 'ms-4');
      previousBidsDiv.appendChild(commentBidContainer);
      
      /////////////////////////////////////////////////////////////////////////////////////////7
      
      if (auction._count && auction._count.bids > 0 && auction.bids && auction.bids.length > 0) {
        auction.bids.forEach((bid) => {
          const bidderBid = document.createElement('div');
          bidderBid.textContent = `${bid.bidderName}: ${bid.amount}`;
          bidderBid.classList.add('active-bid', 'me-2');
          commentBidContainer.appendChild(bidderBid);
      
          
        });
      } else {
        // Display a message if there are no previous bids
        const noBidsMessage = document.createElement('div');
        noBidsMessage.textContent = 'No previous bids';
        commentBidContainer.appendChild(noBidsMessage);
      
        console.log('No previous bids');
      }



////////////////////////////////////////////////////////

        auctionContainer.appendChild(auctionDiv);
        auctionDiv.appendChild(bidsDiv);
        bidsDiv.appendChild(placeBidContainer);
      }
    });
  } catch (error) {
    console.log(error);
  }
}


// //////////Legg til en event listener for utloggingsknappen///////////////////
document.addEventListener('DOMContentLoaded', function () {
  const logoutButton = document.getElementById('logout');
  if (logoutButton) {
    logoutButton.addEventListener('click', logoutUser);
  }


  fetchWithToken(ApiUrl  + listingsUrl);
});
