const addButton = document.getElementById('add');
const overlay = document.getElementById('form-overlay');
const addItem = document.getElementById('add-item');

function showOverlay() {
  overlay.style.display = 'block';
}

function hideOverlay() {
  overlay.style.display = 'none';
}

addButton.addEventListener('click', showOverlay);

  overlay.addEventListener('click', function(event) {
    if (event.target === overlay) {
      hideOverlay();
    }
  });

  document.addEventListener("DOMContentLoaded",() => {
    document.querySelector("#submit-item")?.addEventListener("click", function(e){
      e.preventDefault();  // Prevents page refresh
      hideOverlay();
    });

   
  });