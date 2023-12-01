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
const addCarButton = document.getElementById('add-car');
const addFacButton = document.getElementById('add-fac');

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

//careers add
const carSpace = document.getElementById('car-space'); 
const carTitle = document.getElementById('car-title-area'); 
const carDesc = document.getElementById('car-desc-area'); 
const carAdd = document.getElementById('car-submit'); 
const carCancel = document.getElementById('car-submit-cancel');

//careers edit
let isCarTitle = '';
let isCarDesc = '';

//careers delete
const carDelButton = document.querySelectorAll('.car-del-button'); 
const carDelSpace = document.getElementById('cardel-space');
const carDel = document.getElementById('car-del'); 
const carDelCancel = document.getElementById('car-del-cancel');

//facility add
const facSpace = document.getElementById('fac-space'); 
const facUpload = document.getElementById('fac-upload');
const facLabel = document.getElementById('fac-label');
const facDesc = document.getElementById('fac-desc-area');  
const facAdd = document.getElementById('fac-submit'); 
const facCancel = document.getElementById('fac-submit-cancel');
const facImage = document.getElementById('fac-uploaded-image');

//facility edit
let isFacDesc = '';
let isFacImage = '';

//facilities delete
const facDelButton = document.querySelectorAll('.fac-del-button'); 
const facDelSpace = document.getElementById('facdel-space');
const facDel = document.getElementById('fac-del'); 
const facDelCancel = document.getElementById('fac-del-cancel');

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

    addCarButton.addEventListener('click', function () {
        toggleMode('add-car');
    });

    addFacButton.addEventListener('click', function () {
        toggleMode('add-fac');
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

            else if(isCarTitle == true || isCarDesc == true){
                try {
                    fetch('/editCareers', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ updatedContent, elementID, isCarTitle, isCarDesc }),
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

            else if(isFacDesc == true){
                try {
                    fetch('/editFacilities', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ updatedContent, elementID, isFacDesc }),
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

            else if(isFacImage == true){
                try {
                    const response = await fetch('/editFac', {
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

    carTitle.addEventListener('input', () => {
        if (carTitle.value !== '' && carDesc.value !== '') {
          carAdd.style.display = 'block';
        } 
        
        else {
            carAdd.style.display = 'none';
        }
      });
      
    carDesc.addEventListener('input', () => {
        if (carTitle.value !== '' && carDesc.value !== '') {
            carAdd.style.display = 'block';
        } 
        
        else {
            carAdd.style.display = 'none';
        }
    });

    carCancel.addEventListener('click', function () { 
        if (!cancelClick) {
            carCancel.textContent = 'Are you sure you want to Cancel?';
            cancelClick = true;
        } else {
            //place actions here
            carSpace.style.visibility = 'hidden';
            addCarButton.classList.remove('active');

            //reset button text and confirmation state
            carCancel.textContent = 'Cancel';
            cancelClick = false;

            carAdd.textContent = 'Submit';
            manipulateClick = false;
        }
    });

    carAdd.addEventListener('click', async function () {

        if (!manipulateClick) {
            carAdd.textContent = 'Are you sure you want to Submit?';
            manipulateClick = true;
        } else {
            //place actions here
            const jobTitle = carTitle.value;
            const jobDesc = carDesc.value;
            
            try {
                fetch('/addCar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ jobTitle, jobDesc }),
                })
                .then(response => {
                    if (response.ok) {
                        // Reload the page if the fetch operation is successful
                        location.reload();
                    } else {
                        console.error('Upload request failed:', response.status, response.statusText);
                    }
                });
            } catch (error) {
                console.error('Error during upload:', error);
            }

            //reset button text and confirmation state
            carAdd.textContent = 'Submit';
            manipulateClick = false;

            carCancel.textContent = 'Cancel';
            cancelClick = false;
        }
    });
    
    facUpload.addEventListener('change', (event) => {

        const file = facUpload.files[0];
        if (file) {
            fileName = file.name;
            const reader = new FileReader();
            reader.onload = function(e) {
                facImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }

        facLabel.textContent = file.name;
        //displays the submit button

        if (facDesc.value !== '' && facLabel.value !== '') {
            facAdd.style.display = 'block';
        } 
        
        else {
            facAdd.style.display = 'none';
        }
    });

    facDesc.addEventListener('input', () => {
        if (facDesc.value !== '' && facLabel.value !== '') {
            facAdd.style.display = 'block';
        } 
        
        else {
            facAdd.style.display = 'none';
        }
    });

    facCancel.addEventListener('click', function () { 
        if (!cancelClick) {
            facCancel.textContent = 'Are you sure you want to Cancel?';
            cancelClick = true;
        } else {
            //place actions here
            facSpace.style.visibility = 'hidden';
            addFacButton.classList.remove('active');

            //reset button text and confirmation state
            facCancel.textContent = 'Cancel';
            cancelClick = false;

            facAdd.textContent = 'Submit';
            manipulateClick = false;
        }
    });

    facAdd.addEventListener('click', async function () {

        if (!manipulateClick) {
            facAdd.textContent = 'Are you sure you want to Submit?';
            manipulateClick = true;
        } else {
            //place actions here
            const updatedContent = fileName;
            const facValue = facDesc.value;
        
            const imageUploadInput = document.getElementById('fac-upload');
            const imageFile = imageUploadInput.files[0]; // get the selected file
            const formData = new FormData();
            formData.append('updatedContent', updatedContent);
            formData.append('facValue', facValue);
            formData.append('fac-upload', imageFile); // use the actual file, not a URL
            
            try {
                const response = await fetch('/addFac', {
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
            facAdd.textContent = 'Submit';
            manipulateClick = false;

            facCancel.textContent = 'Cancel';
            cancelClick = false;
        }
    });

    //delete buttons for careers and facilities

    carDelCancel.addEventListener('click', function () { 
        if (!cancelClick) {
            carDelCancel.textContent = 'Are you sure you want to Cancel?';
            cancelClick = true;
        } else {
            //place actions here
            carDelSpace.style.visibility = 'hidden';

            //reset button text and confirmation state
            carDelCancel.textContent = 'Cancel';
            cancelClick = false;

            carDel.textContent = 'Submit';
            manipulateClick = false;
        }
    });

    carDel.addEventListener('click', async function () {

        if (!manipulateClick) {
            carDel.textContent = 'Are you sure you want to Proceed?';
            manipulateClick = true;
        } else {
            try {
                fetch('/delCar', {
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
            carDel.textContent = 'Proceed';
            manipulateClick = false;

            carDelCancel.textContent = 'Cancel';
            cancelClick = false;
        }
    });


    carDelButton.forEach((button) => {
        button.addEventListener('click', async function () {
          carDelSpace.style.visibility = 'visible';
          elementID = button.id; 
        });
    });

    facDelCancel.addEventListener('click', function () { 
        if (!cancelClick) {
            facDelCancel.textContent = 'Are you sure you want to Cancel?';
            cancelClick = true;
        } else {
            //place actions here
            facDelSpace.style.visibility = 'hidden';

            //reset button text and confirmation state
            facDelCancel.textContent = 'Cancel';
            cancelClick = false;

            facDel.textContent = 'Submit';
            manipulateClick = false;
        }
    });

    facDel.addEventListener('click', async function () {

        if (!manipulateClick) {
            facDel.textContent = 'Are you sure you want to Proceed?';
            manipulateClick = true;
        } else {
            try {
                fetch('/delFac', {
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
            facDel.textContent = 'Proceed';
            manipulateClick = false;

            facDelCancel.textContent = 'Cancel';
            cancelClick = false;
        }
    });

    facDelButton.forEach((button) => {
        button.addEventListener('click', async function () {
          facDelSpace.style.visibility = 'visible';
          elementID = button.id; 
        });
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
        addCarButton.classList.remove('active');
        addFacButton.classList.remove('active');

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
        addCarButton.classList.remove('active');
        addFacButton.classList.remove('active');

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
        addCarButton.classList.remove('active');
        addFacButton.classList.remove('active');

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
        addCarButton.classList.remove('active');
        addFacButton.classList.remove('active');

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

    else if(action === 'add-car'){ 
        isEditText = false;
        isEditImage = false;
        isDelAcr = false;

        editTextButton.classList.remove('active');
        editImgButton.classList.remove('active');
        delAcrButton.classList.remove('active');
        addAcrButton.classList.remove('active');
        addFacButton.classList.remove('active');

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

        addCarButton.classList.add('active');
        carSpace.style.visibility = 'visible';
    }

    else if(action === 'add-fac'){ 
        isEditText = false;
        isEditImage = false;
        isDelAcr = false;

        editTextButton.classList.remove('active');
        editImgButton.classList.remove('active');
        delAcrButton.classList.remove('active');
        addAcrButton.classList.remove('active');
        addCarButton.classList.remove('active');

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

        addFacButton.classList.add('active');
        facSpace.style.visibility = 'visible';

        facAdd.style.display = 'none';
        facLabel.textContent = "Upload Image";
        facImage.src = ''; 
    }

}

function selectEntry(event) {
    const clickedElement = event.target;
    isServiceName = false;
    isServiceDesc = false;
    isAcrImage = false;
    isCarTitle = false;
    isCarDesc = false;
    isFacDesc = false;
    isFacImage = false;

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

            else if (classes.includes('careerTitle') == true) {
                isCarTitle = true;
            }

            else if(classes.includes('careerDesc') == true){
                isCarDesc = true;
            }

            else if(classes.includes('facilityDesc') == true){
                isFacDesc = true;
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

            if(classes.includes('facilityImage') == true){
                isFacImage = true;
            }
        }
    }

    else if(isDelAcr == true){ 
        elementID = clickedElement.id;
        acrDelSpace.style.visibility = 'visible';
    }
}