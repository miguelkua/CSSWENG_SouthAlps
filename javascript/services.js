// import { log } from "handlebars/runtime";

const addButton = document.getElementById('add-service');
const overlay = document.getElementById('form-overlay');
const addItem = document.getElementById('add-item');
const postForm = document.forms.postForm;

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

document.addEventListener("DOMContentLoaded",() => 
{
  document.querySelector("#submit-item")?.addEventListener("click", function(e)
  {
    e.preventDefault();  // Prevents page refresh

    const url = window.location.href;
    fetch(url + '/add', 
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify
      ({
        name:  postForm.name.value,
        description: postForm.description.value
      })
    })
    .then((res) => 
    {
        if (res.status == 200) 
        { 
          hideOverlay(); 
          window.location.href = url; 
        }
        else { console.log("Error in service registration"); }
    });

  });

  document.querySelectorAll(".delete-service").forEach(button => 
  {
    var ID = button.id;
    button?.addEventListener("click", function(e)
    {
      e.preventDefault();  // Prevents page refresh

      const url = window.location.href;
      fetch(url + '/delete', 
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify
        ({
          _id: ID
        })
      })
      .then((res) => 
      {
          if (res.status == 200) 
          { 
            hideOverlay(); 
            window.location.href = url; 
          }
          else { console.log("Error in service deletion"); }
      });

    })
  });

});