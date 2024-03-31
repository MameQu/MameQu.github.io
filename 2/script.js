const fileInput = document.getElementById('fileInput');
const mediaContainer = document.getElementById('mediaContainer');

document.querySelectorAll('input[name="mediatype"]').forEach((radio) => {
    radio.addEventListener('change', handleMediaTypeChange);
});

function handleMediaTypeChange(event) {
    displaySelectedMedia(event.target.value);
}

function displaySelectedMedia(mediaType) {
    mediaContainer.innerHTML = ''; // Clear existing media

    const files = fileInput.files;
    if (!files || files.length === 0) {
        return;
    }

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if ((mediaType === 'image' && file.type.startsWith('image/'))
            || (mediaType === 'video' && file.type.startsWith('video/'))
            || mediaType === 'both') {
            const mediaElement = file.type.startsWith('image/')
                ? createImageElement(file)
                : createVideoElement(file);
            mediaContainer.appendChild(mediaElement);
        }
    }
}

function createImageElement(file) {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    img.alt = file.name;
    return img;
}

function createVideoElement(file) {
    const video = document.createElement('video');
    video.src = URL.createObjectURL(file);
    video.controls = true;
    video.autoplay = false;
    video.loop = true;
    return video;
}

fileInput.addEventListener('change', () => {
    displaySelectedMedia(document.querySelector('input[name="mediatype"]:checked').value);
});
