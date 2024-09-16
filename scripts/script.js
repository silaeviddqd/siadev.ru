document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const container = document.querySelector('.reviews-container');

   container.addEventListener('wheel', (event) => {
       event.preventDefault();
       container.scrollBy({
           top: event.deltaY,
           behavior: 'smooth'
       });
   });

function openPopup() {
    document.getElementById('popup').classList.remove('hidden');
}

function closePopup() {
    document.getElementById('popup').classList.add('hidden');
}