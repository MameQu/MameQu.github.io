// Add a click event listener to the pull-up box header
var pullHeader = document.querySelector('.pullshowheader');
var pullBox = document.querySelector('.pullbox');
pullHeader.addEventListener('click', function() {
  pullBox.classList.toggle('pullbox-active');
});


var imageContainer = document.querySelector('.image-container');
var isDragging = false;
var startPosition = 0;
var currentScrollPosition = 0;

imageContainer.addEventListener('mousedown', startDrag);
imageContainer.addEventListener('mousemove', drag);
imageContainer.addEventListener('mouseup', endDrag);
imageContainer.addEventListener('mouseleave', endDrag);

imageContainer.addEventListener('touchstart', startDrag);
imageContainer.addEventListener('touchmove', drag);

function startDrag(event) {
  isDragging = true;
  startPosition = getPositionX(event);
  currentScrollPosition = imageContainer.scrollLeft;
}

function drag(event) {
  if (!isDragging) return;
  event.preventDefault();
  var currentPosition = getPositionX(event);
  var distance = currentPosition - startPosition;
  imageContainer.scrollLeft = currentScrollPosition - distance;
}

function endDrag() {
  isDragging = false;
}

function getPositionX(event) {
  if (event.type.startsWith('touch')) {
    return event.touches[0].clientX;
  }
  return event.clientX;
}


var promptOverlay = document.querySelector('.prompt-overlay');
var confirmButton = document.querySelector('.confirm');
var changeNameTextarea = document.querySelector('.changeName');
var displayName = "";
var Folders = {};
var newName, setNameButton, target, tindexOf, textLines, displayName;


var makeUpdate = function() {
  if (target.className == "setFolderName") {
    if (newName !== "") {
      $(".filetile").append($("<button class='peer' onclick=\"OpenPrompt(this);$('.promptName').text('paste links to your assets');\"></button>").text(newName));
    }
  }
  if (target.className == "peer") {
    textLines = $(".changeName").val().split(/\r?\n/);
    displayName = textLines.join('\n');
     $('.changeName').val(displayName);
    $.extend(Folders, { [document.querySelectorAll(".peer")[Array.from(document.querySelectorAll(".peer")).indexOf(target)].textContent]: textLines });
    $(".image-wrapper").empty();
    Folders[document.querySelectorAll(".peer")[Array.from(document.querySelectorAll(".peer")).indexOf(target)].textContent
].forEach(function(textLine) {
      $(".image-wrapper").append(
        '<div class="charcard"><img src="' +
        textLine +
        '"></img><span class="charname">Name</span><button class="setName" onclick="OpenPrompt(this);$(\'.promptName\').text(\'Set Name\');">x</button></div>'
      );
    });
  }
}

var OpenPrompt = function(button) {
  target = button;
  changeNameTextarea.value = displayName;
  promptOverlay.style.display = 'block';
  changeNameTextarea.focus();
};


confirmButton.addEventListener('click', function() {
  newName = changeNameTextarea.value.trim();
  promptOverlay.style.display = 'none';
  makeUpdate();
});

promptOverlay.addEventListener('click', function(event) {
  if (event.target === promptOverlay) {
    promptOverlay.style.display = 'none';
  }
});

var sidePeek = document.querySelector('.sidepeek');
var sidePeekHead = document.querySelector('.sidepeekhead');
var sideContent = document.querySelector('.sidecontent');

sidePeekHead.addEventListener('click', function() {
  sidePeek.classList.toggle('sidepeek-active');
});

sideContent.addEventListener('scroll', function() {
  sideContent.classList.add('sidecontent-scrolling');
});

sideContent.addEventListener('transitionend', function() {
  sideContent.classList.remove('sidecontent-scrolling');
});
