let isEditText = false;
let isEditImage = false;

//admin buttons
const editTextButton = document.getElementById('edit-text');
const editImgButton = document.getElementById('edit-img');
// const addButton = document.getElementById('add');
// const deleteButton = document.getElementById('delete');

//text edit functions
const textSpace = document.getElementById('text-space');
const textArea = document.getElementById('text-area');
const textChange = document.getElementById('text-change');
const textCancel = document.getElementById('text-cancel');

document.addEventListener('DOMContentLoaded', function () {
    editTextButton.addEventListener('click', function () {
        toggleMode('edit-text');
    });

    editImgButton.addEventListener('click', function () {
        toggleMode('edit-img');
    });

    textCancel.addEventListener('click', function () {
        textSpace.style.visibility = 'hidden';
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
        textArea.value  = contentToDisplay;
        textSpace.style.visibility = 'visible';
    }

    else if(isEditImage == true){
        contentToDisplay = clickedElement.alt;
    }
    
    // if (userResponse && userResponse.toLowerCase() === 'yes') {
    //     // Add your logic to apply changes here. For now, just alerting.
    //     alert('Changes will be applied.');
    // } else {
    //     alert('No changes applied.');
    // }
}