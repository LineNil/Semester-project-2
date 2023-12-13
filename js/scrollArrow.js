document.addEventListener('DOMContentLoaded', function () {
  const scrollButton = document.getElementById('scrollButton');

  if (scrollButton) {
    console.log('Scroll button found.');

    scrollButton.addEventListener('click', function () {
      console.log('Scroll button clicked.');

      console.log('Before scrollTo');
      window.scroll({
        top: 0,
        behavior: 'smooth'
      });
      console.log('After scrollTo');
    });
  } else {
    console.log('Scroll button not found.');
  }
});
