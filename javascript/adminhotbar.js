let isEditText = false;
let isEditImage = false;
let isDelAcr = false;

// enables a 2 click button system
let manipulateClick = false;
let cancelClick = false;

//admin buttons
const editTextButton = document.getElementById('edit-text');
const editImgButton = document.getElementById('edit-img');
const addAcrButton = document.getElementById('add-acr');
const delAcrButton = document.getElementById('del-acr');
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
const imageLabel = document.getElementById('image-label');  
const imageChange = document.getElementById('image-change'); 
const imageCancel = document.getElementById('image-cancel');
const uploadedImage = document.getElementById('uploaded-image');

//service edit
let isServiceName = '';
let isServiceDesc = '';

//career edit
let isCareerName = '';

//facility edit
let isFacilityDesc = '';

//acredditation edit
let isAcrImage = '';

//accreditations add
const acrSpace = document.getElementById('acr-space'); 
const acrUpload = document.getElementById('acr-upload');
const acrLabel = document.getElementById('acr-label'); 
const acrAdd = document.getElementById('acr-submit'); 
const acrCancel = document.getElementById('acr-submit-cancel');
const acrImage = document.getElementById('acr-uploaded-image');

//accreditations delete
const acrDelSpace = document.getElementById('acrdel-space');
const acrDel = document.getElementById('acr-del'); 
const acrDelCancel = document.getElementById('acr-del-cancel');

document.addEventListener('DOMContentLoaded', function () {
    editTextButton.addEventListener('click', function () {
        toggleMode('edit-text');
    });

    editImgButton.addEventListener('click', function () {
        toggleMode('edit-img');
    });

    addAcrButton.addEventListener('click', function () {
        toggleMode('add-acr');
    });

    delAcrButton.addEventListener('click', function () {
        toggleMode('del-acr');
    });

    textCancel.addEventListener('click', function () {
        if (!cancelClick) {
            textCancel.textContent = 'Are you sure you want to Cancel?';
            cancelClick = true;
        } else {
            //place actions here
            textSpace.style.visibility = 'hidden';

            //reset button text and confirmation state
            textCancel.textContent = 'Cancel';
            cancelClick = false;

            textChange.textContent = 'Change';
            manipulateClick = false;
        }
    });

    textChange.addEventListener('click', function () {
        if (!manipulateClick) {
            textChange.textContent = 'Are you sure you want to Change?';
            manipulateClick = true;
        } else {
            //place actions here
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

            if(isCareerName == true){
                try {
                    fetch('/editCareers', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ updatedContent, elementID, isCareerName}),
                    })
                    .then(response => {
                        if (response.ok) {
                            // Reload the page if the fetch operation is successful
                            location.reload();
                        } else {
                            console.error('Update career request failed:', response.status, response.statusText);
                        }
                    });
                } catch (error) {
                    console.error('Error during updating services:', error);
                }
            }

            if(isFacilityDesc == true){
                try {
                    fetch('/editFacilities', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ updatedContent, elementID, isFacilityDesc}),
                    })
                    .then(response => {
                        if (response.ok) {
                            // Reload the page if the fetch operation is successful
                            location.reload();
                        } else {
                            console.error('Update facility request failed:', response.status, response.statusText);
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

            //reset button text and confirmation state
            textChange.textContent = 'Change';
            manipulateClick = false;

            textCancel.textContent = 'Cancel';
            cancelClick = false;
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

            imageLabel.textContent = file.name;
        }
    });

    imageCancel.addEventListener('click', function () { 
        if (!cancelClick) {
            imageCancel.textContent = 'Are you sure you want to Cancel?';
            cancelClick = true;
        } else {
            //place actions here
            imageSpace.style.visibility = 'hidden';
            imageLabel.textContent = "Edit Image";

            //reset button text and confirmation state
            imageCancel.textContent = 'Cancel';
            cancelClick = false;

            imageChange.textContent = 'Change';
            manipulateClick = false;
        }
    });

    imageChange.addEventListener('click', async function () {

        if (!manipulateClick) {
            imageChange.textContent = 'Are you sure you want to Change?';
            manipulateClick = true;
        } else {
            //place actions here
            const updatedContent = fileName;
        
            const imageUploadInput = document.getElementById('image-upload');
            const imageFile = imageUploadInput.files[0]; // get the selected file
            const formData = new FormData();
            formData.append('updatedContent', updatedContent);
            formData.append('elementID', elementID);
            formData.append('image-upload', imageFile); // use the actual file, not a URL

            if(isAcrImage == true){
                try {
                    const response = await fetch('/editAcr', {
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
            }

            else{
        
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
            }

            //reset button text and confirmation state
            imageChange.textContent = 'Change';
            manipulateClick = false;

            imageCancel.textContent = 'Cancel';
            cancelClick = false;
        }
    });

    //changes the label to the file name
    acrUpload.addEventListener('change', (event) => {

        const file = acrUpload.files[0];
        if (file) {
            fileName = file.name;
            const reader = new FileReader();
            reader.onload = function(e) {
                acrImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }

        acrLabel.textContent = file.name;
        //displays the submit button
        acrAdd.style.display = 'block';
    });

    acrCancel.addEventListener('click', function () { 
        if (!cancelClick) {
            acrCancel.textContent = 'Are you sure you want to Cancel?';
            cancelClick = true;
        } else {
            //place actions here
            acrSpace.style.visibility = 'hidden';
            addAcrButton.classList.remove('active');

            //reset button text and confirmation state
            acrCancel.textContent = 'Cancel';
            cancelClick = false;

            acrAdd.textContent = 'Submit';
            manipulateClick = false;
        }
    });

    acrAdd.addEventListener('click', async function () {

        if (!manipulateClick) {
            acrAdd.textContent = 'Are you sure you want to Submit?';
            manipulateClick = true;
        } else {
            //place actions here
            const updatedContent = fileName;
        
            const imageUploadInput = document.getElementById('acr-upload');
            const imageFile = imageUploadInput.files[0]; // get the selected file
            const formData = new FormData();
            formData.append('updatedContent', updatedContent);
            formData.append('acr-upload', imageFile); // use the actual file, not a URL
            
            try {
                const response = await fetch('/addAcr', {
                    method: 'POST',
                    body: formData,
                });
        
                if (response.ok) {
                    location.reload();
                } else {
                    console.error('Submit request failed:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error during submission:', error);
            }

            //reset button text and confirmation state
            acrAdd.textContent = 'Submit';
            manipulateClick = false;

            acrCancel.textContent = 'Cancel';
            cancelClick = false;
        }
    });

    acrDelCancel.addEventListener('click', function () { 
        if (!cancelClick) {
            acrDelCancel.textContent = 'Are you sure you want to Cancel?';
            cancelClick = true;
        } else {
            //place actions here
            acrDelSpace.style.visibility = 'hidden';

            //reset button text and confirmation state
            acrDelCancel.textContent = 'Cancel';
            cancelClick = false;

            acrDel.textContent = 'Proceed';
            manipulateClick = false;
        }
    });

    acrDel.addEventListener('click', async function () {

        if (!manipulateClick) {
            acrDel.textContent = 'Are you sure you want to Proceed?';
            manipulateClick = true;
        } else {
            try {
                fetch('/delAcr', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ elementID }),
                })
                .then(response => {
                    if (response.ok) {
                        // Reload the page if the fetch operation is successful
                        location.reload();
                    } else {
                        console.error('Delete request failed:', response.status, response.statusText);
                    }
                });
            } catch (error) {
                console.error('Error during deletion:', error);
            }
            
            //reset button text and confirmation state
            acrDel.textContent = 'Proceed';
            manipulateClick = false;

            acrDelCancel.textContent = 'Cancel';
            cancelClick = false;
        }
    });
    
    window.addEventListener('scroll', function() {
        //checks position relative to viewport
        const acrSection = document.getElementById('acrDiv');
        const accreditationsEntries = document.querySelectorAll('.acrImage');
    
        const smartDisplay = acrSection.getBoundingClientRect();
    
        //show the buttons when acrSection is visible
        if (smartDisplay.top >= 0 && smartDisplay.bottom <= window.innerHeight) {
            addAcrButton.style.display = 'block';

            //only display if there are entries
            if (accreditationsEntries.length !== 0) {
                delAcrButton.style.display = 'block';
            }
        } 
        else {
            //prevents certain smart display buttons from disappearing when a prompt is on the screen
            if(getComputedStyle(acrDelSpace).visibility === 'hidden' && 
               getComputedStyle(textSpace).visibility === 'hidden' && 
               getComputedStyle(imageSpace).visibility === 'hidden' && 
               getComputedStyle(acrSpace).visibility === 'hidden'){

                addAcrButton.style.display = 'none';

                delAcrButton.style.display = 'none';
                isDelAcr = false;
                delAcrButton.classList.remove('active');
                accreditationsEntries.forEach((entry) => {
                    entry.classList.remove('del-highlight');
                    entry.removeEventListener('click', selectEntry);
                });
            }
        }
    });
});

function toggleMode(action){
    const textEntries = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6'); //perhaps add more elements onto this to change them
    const imageEntries = document.querySelectorAll('img');
    const accreditationsEntries = document.querySelectorAll('.acrImage');

    if(action === 'edit-text'){
        //remove the others
        isEditImage = false;
        isDelAcr = false;

        editImgButton.classList.remove('active');
        addAcrButton.classList.remove('active');
        delAcrButton.classList.remove('active');

        imageEntries.forEach((entry) => {
            entry.classList.remove('img-highlight');
            entry.removeEventListener('click', selectEntry);
        });

        accreditationsEntries.forEach((entry) => {
            entry.classList.remove('del-highlight');
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
        isDelAcr = false;

        editTextButton.classList.remove('active');
        addAcrButton.classList.remove('active');
        delAcrButton.classList.remove('active');

        textEntries.forEach((entry) => {
            entry.classList.remove('text-highlight');
            entry.removeEventListener('click', selectEntry);
        });

        accreditationsEntries.forEach((entry) => {
            entry.classList.remove('del-highlight');
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

    else if(action === 'add-acr'){ 
        //remove the others
        isEditText = false;
        isEditImage = false;
        isDelAcr = false;

        editTextButton.classList.remove('active');
        editImgButton.classList.remove('active');
        delAcrButton.classList.remove('active');

        textEntries.forEach((entry) => {
            entry.classList.remove('text-highlight');
            entry.removeEventListener('click', selectEntry);
        });

        imageEntries.forEach((entry) => {
            entry.classList.remove('img-highlight');
            entry.removeEventListener('click', selectEntry);
        });

        accreditationsEntries.forEach((entry) => {
            entry.classList.remove('del-highlight');
            entry.removeEventListener('click', selectEntry);
        });
  
        addAcrButton.classList.add('active');
        acrSpace.style.visibility = 'visible';
        //resets to be ready for next upload
        acrAdd.style.display = 'none';
        acrLabel.textContent = "Upload Image";
        acrImage.src = ''; 
        
    }

    else if(action === 'del-acr'){ 
        isEditText = false;
        isEditImage = false;
        editTextButton.classList.remove('active');
        editImgButton.classList.remove('active');
        addAcrButton.classList.remove('active');

        textEntries.forEach((entry) => {
            entry.classList.remove('text-highlight');
            entry.removeEventListener('click', selectEntry);
        });

        imageEntries.forEach((entry) => {
            entry.classList.remove('img-highlight');
            entry.removeEventListener('click', selectEntry);
        });

        if(delAcrButton.classList.contains('active')){
            delAcrButton.classList.remove('active');
            isDelAcr = false;

            accreditationsEntries.forEach((entry) => {
                entry.classList.remove('del-highlight');
                entry.removeEventListener('click', selectEntry);
            });
        }

        else{
            isDelAcr = true;
            delAcrButton.classList.add('active');

            accreditationsEntries.forEach((entry) => {
                entry.classList.add('del-highlight');
                entry.addEventListener('click', selectEntry);
            });
        }
    }

}

function selectEntry(event) {
    const clickedElement = event.target;
    isServiceName = false;
    isServiceDesc = false;
    isCareerName = false;
    isFacilityDesc = true;
    isAcrImage = false;

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

            else if(classes.includes('careerName') == true){
                isCareerName = true;
                alert("Test")
            }

            else if(classes.includes('facilityDesc') == true){
                isFacilityDesc = true;
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

            //edit accreditations
            const classes = Array.from(clickedElement.classList);

            if(classes.includes('acrImage') == true){
                isAcrImage = true;
            }
        }
    }

    else if(isDelAcr == true){ 
        elementID = clickedElement.id;
        acrDelSpace.style.visibility = 'visible';
    }
}