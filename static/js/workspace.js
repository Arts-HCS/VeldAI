function requestImage(){
    fetch('/api/image')
        .then(resp => resp.json())
        .then(data => {
            if (data.filename){
                const imagePath = '/photos/'+ data.filename;
                const imageSet = document.getElementById('labelImage');
                const filenameTextSpace = document.getElementById('filenameTextSpace');
                filenameTextSpace.innerText = data.filename
                imageSet.src = imagePath;
                imageSet.setAttribute('filename', data.filename);

            }
            if (data.filesize){
                const filenameTextSpace = document.getElementById('filenameTextSpace');
                fileSizeTextSpace.innerText = `${data.filesize} KB`;
            }
        })
}

// When JS makes a fetch for /api/image, python responds creating a list of the images in the photos folder, randonmly selecting one and returning it to JS as a JSON. Then JS receives the JSON with the name of an image and puts it in the img src. 

function uploadLabel(){
    const labelInput = document.getElementById('labelInput');
    const labelText = labelInput.value;
    const labelImage = document.getElementById('labelImage');
    const imageFilename = labelImage.getAttribute('filename');

    if (!labelText){
        alert('Please enter a label');
        return;
    }

    fetch('/api/label', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({imageFilename, labelText})
    })
    .then(resp => resp.json())
    .then(() => {
        labelInput.value = '';
        requestImage();
    })
}

//When the user sends their answer, uploadLabel() makes sure a label has been written on the input and then makes a fetch to pass the labeled text and the image filename to python so that it can store in the .csv.

function skipImage(){
    const labelInput = document.getElementById('labelInput');
    requestImage();
    labelInput.value = '';
}

document.addEventListener('DOMContentLoaded', ()=>{
    requestImage();
    const submitButton = document.getElementById('submitButton');
    const skipButton = document.getElementById('skipButton');


    submitButton.addEventListener('click', ()=>{
        uploadLabel();
    })
    skipButton.addEventListener('click', ()=>{
        skipImage();
    })
 
})

const labelInput = document.getElementById('labelInput');
labelInput.addEventListener('keydown', (e)=>{
    if (e.key == 'Enter'){
        uploadLabel();
    }
})