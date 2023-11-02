let isEditText = false;
let isEditImage = false;

const editTextButton = document.getElementById('edit-text');
const editImgButton = document.getElementById('edit-img');
// const addButton = document.getElementById('add');
// const deleteButton = document.getElementById('delete');

document.addEventListener('DOMContentLoaded', function () {
    editTextButton.addEventListener('click', function () {
        // alert('Edit text button clicked');
        toggleMode('edit-text');
    });

    editImgButton.addEventListener('click', function () {
        // alert('Edit text image clicked');
        toggleMode('edit-img');
    });

    // addButton.addEventListener('click', function () {
    //     alert('Add button clicked');
    // });

    // deleteButton.addEventListener('click', function () {
    //     alert('Delete button clicked');
    // });
});

function toggleMode(action){
    const textEntries = document.querySelectorAll('p'); //perhaps add more elements onto this to change them
    const imageEntries = document.querySelectorAll('img');

    if(action === 'edit-text'){
        //remove the others
        isEditImage = false;
        editImgButton.classList.remove('active');
        imageEntries.forEach((entry) => {
            entry.removeEventListener('click', selectEntry);
        });

        // if we click it again
        if(editTextButton.classList.contains('active')){
            editTextButton.classList.remove('active');
            isEditText = false;

            //what removes the ability
            textEntries.forEach((entry) => {
                entry.removeEventListener('click', selectEntry);
            });
        }

        else{
            isEditText = true;
            editTextButton.classList.add('active');

            //what allows to select text stuff
            textEntries.forEach((entry) => {
                entry.addEventListener('click', selectEntry);
            });
        }
    }

    else if(action === 'edit-img'){ 
        isEditText = false;
        editTextButton.classList.remove('active');
        textEntries.forEach((entry) => {
            entry.removeEventListener('click', selectEntry);
        });

        if(editImgButton.classList.contains('active')){
            editImgButton.classList.remove('active');
            isEditImage = false;

            imageEntries.forEach((entry) => {
                entry.removeEventListener('click', selectEntry);
            });
        }

        else{
            isEditImage = true;
            editImgButton.classList.add('active');

            imageEntries.forEach((entry) => {
                entry.addEventListener('click', selectEntry);
            });
        }
    }

}

function selectEntry(event) {
    const clickedElement = event.target;
    let contentToDisplay = '';

    if(isEditText == true){
        contentToDisplay = clickedElement.textContent;
    }
    else if(isEditImage == true){
        contentToDisplay = clickedElement.alt;
    }

    let userResponse = prompt(`You selected: ${contentToDisplay}. \n\nDo you want to add changes? (yes/no)`);
    
    if (userResponse && userResponse.toLowerCase() === 'yes') {
        // Add your logic to apply changes here. For now, just alerting.
        alert('Changes will be applied.');
    } else {
        alert('No changes applied.');
    }
}