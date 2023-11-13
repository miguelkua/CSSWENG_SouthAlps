let isEditText = false;
let isEditImage = false;

//admin buttons
const editTextButton = document.getElementById('edit-text');
const editImgButton = document.getElementById('edit-img');
// const addButton = document.getElementById('add');
// const deleteButton = document.getElementById('delete');

let elementID = '';
let fileName = '';

//text edit 
const textSpace = document.getElementById('text-space');
const textArea = document.getElementById('text-area');
const textChange = document.getElementById('text-change');
const textCancel = document.getElementById('text-cancel');

//image edit 
const imageSpace = document.getElementById('image-space'); 
const imageUpload = document.getElementById('image-upload'); 
const imageChange = document.getElementById('image-change'); 
const imageCancel = document.getElementById('image-cancel');
const uploadedImage = document.getElementById('uploaded-image');

//service edit
let isServiceName = '';
let isServiceDesc = '';

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

    textChange.addEventListener('click', function () {
        const updatedContent = textArea.value;

        if(isServiceName == true || isServiceDesc == true){
            try {
                fetch('/editServices', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ updatedContent, elementID, isServiceName, isServiceDesc }),
                })
                .then(response => {
                    if (response.ok) {
                        // Reload the page if the fetch operation is successful
                        location.reload();
                    } else {
                        console.error('Update service request failed:', response.status, response.statusText);
                    }
                });
            } catch (error) {
                console.error('Error during updating services:', error);
            }
        }

        else{
            try {
                fetch('/editText', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ updatedContent, elementID }),
                })
                .then(response => {
                    if (response.ok) {
                        // Reload the page if the fetch operation is successful
                        location.reload();
                    } else {
                        console.error('Update request failed:', response.status, response.statusText);
                    }
                });
            } catch (error) {
                console.error('Error during update:', error);
            }
        }
    });

    //this previews the image
    imageUpload.addEventListener('change', function() {
        const file = imageUpload.files[0];
        if (file) {
            fileName = file.name;
            const reader = new FileReader();
            reader.onload = function(e) {
                uploadedImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    imageCancel.addEventListener('click', function () { 
        imageSpace.style.visibility = 'hidden';
    });

    imageChange.addEventListener('click', async function () {
        const updatedContent = fileName;
        
        const imageUploadInput = document.getElementById('image-upload');
        const imageFile = imageUploadInput.files[0]; // get the selected file
        const formData = new FormData();
        formData.append('updatedContent', updatedContent);
        formData.append('elementID', elementID);
        formData.append('image-upload', imageFile); // use the actual file, not a URL
    
        try {
            const response = await fetch('/editImage', {
                method: 'POST',
                body: formData,
            });
    
            if (response.ok) {
                location.reload();
            } else {
                console.error('Update request failed:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error during update:', error);
        }
    });
    
    
    // addButton.addEventListener('click', function () {
    //     alert('Add button clicked');
    // });

    // deleteButton.addEventListener('click', function () {
    //     alert('Delete button clicked');
    // });
});

function toggleMode(action){
    const textEntries = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6'); //perhaps add more elements onto this to change them
    const imageEntries = document.querySelectorAll('img');

    if(action === 'edit-text'){
        //remove the others
        isEditImage = false;
        editImgButton.classList.remove('active');
        imageEntries.forEach((entry) => {
            entry.classList.remove('img-highlight');
            entry.removeEventListener('click', selectEntry);
        });

        // if we click it again
        if(editTextButton.classList.contains('active')){
            editTextButton.classList.remove('active');
            isEditText = false;

            //what removes the ability
            textEntries.forEach((entry) => {
                entry.classList.remove('text-highlight');
                entry.removeEventListener('click', selectEntry);
            });
        }

        else{
            isEditText = true;
            editTextButton.classList.add('active');

            //what allows to select text stuff
            textEntries.forEach((entry) => {
                if (!entry.classList.contains('admin')) {
                    entry.classList.add('text-highlight'); //its in style.css
                }
                entry.addEventListener('click', selectEntry);
            });
        }
    }

    else if(action === 'edit-img'){ 
        isEditText = false;
        editTextButton.classList.remove('active');
        textEntries.forEach((entry) => {
            entry.classList.remove('text-highlight');
            entry.removeEventListener('click', selectEntry);
        });

        if(editImgButton.classList.contains('active')){
            editImgButton.classList.remove('active');
            isEditImage = false;

            imageEntries.forEach((entry) => {
                entry.classList.remove('img-highlight');
                entry.removeEventListener('click', selectEntry);
            });
        }

        else{
            isEditImage = true;
            editImgButton.classList.add('active');

            imageEntries.forEach((entry) => {
                if (!entry.classList.contains('admin')) {
                    entry.classList.add('img-highlight');
                }
                entry.addEventListener('click', selectEntry);
            });
        }
    }

}

function selectEntry(event) {
    const clickedElement = event.target;
    isServiceName = false;
    isServiceDesc = false;

    if(isEditText == true){
        //if its not one of the admin buttons
        if (!clickedElement.classList.contains('admin')) {
            //general edit text 
            elementID = clickedElement.id;
            textArea.value  = clickedElement.textContent;
            textSpace.style.visibility = 'visible';

            //edit services
            const classes = Array.from(clickedElement.classList);

            if(classes.includes('serviceName') == true){
                isServiceName = true;
            }

            else if(classes.includes('serviceDesc') == true){
                isServiceDesc = true;
            }
        }
    }

    else if(isEditImage == true){
        if (!clickedElement.classList.contains('admin')) {
            fileName = clickedElement.alt; // default in case no file is uploaded
            elementID = clickedElement.id;
            imageUpload.value = '';
            uploadedImage.src = clickedElement.src; //just for preview
            imageSpace.style.visibility = 'visible';
        }
    }
}