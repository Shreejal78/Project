var body = document.getElementById("body")
var root = document.querySelector(":root")
var r = document.getElementById("ireset")
var opn = document.getElementById("contxtopn");
var rootstyle = getComputedStyle(root)
var sbg = rootstyle.getPropertyValue("--song")
var phc = rootstyle.getPropertyValue("--phc")
var ph = rootstyle.getPropertyValue("--ph")
var edt = document.getElementById("edit")
var img = document.getElementById("image")
var cimg = document.getElementById("cimg")
var isrc = document.getElementById("isrc")
var submit = document.getElementById("submit")
var sh = document.getElementById("sh")
var sw = document.getElementById("sw")
var t = document.getElementById("theme")
var cir = document.getElementById("circle");
var close = document.getElementById("close")
var contact = document.getElementById("contactover")
const result = document.getElementById('result');
const startBtn = document.getElementById('start-btn');
var assis = document.getElementById("assis")
var thm = localStorage.getItem("theme");
if (thm == "dark") {
  body.style.backgroundColor = "#222";
  body.style.color = "white";
  edt.style.background = "transparent"
  root.style.setProperty("--ph", "#222")
  root.style.setProperty("--phc", "white")
  root.style.setProperty("--song", "#333")
  cir.style.left = "34px"
  cimg.src = "full-moon.png";
} else {
  body.style.backgroundColor = "white";
  body.style.color = "black";
  edt.style.background = "transparent";
  root.style.setProperty("--ph", "#fff")
  root.style.setProperty("--phc", "#333")
  root.style.setProperty("--song", "#EFEFEF")
  cir.style.left = "0px"
  cimg.src = "sun.png";
}
t.addEventListener("click", function() {
  var theme = localStorage.getItem("theme")
  if (theme == "dark") {
    body.style.backgroundColor = "white";
    body.style.color = "black";
    cir.style.left = "0px";
    cimg.src = "sun.png"
    edt.style.background = "transparent";
    root.style.setProperty("--phc", "#333")
    root.style.setProperty("--ph", "#fff")
    root.style.setProperty("--song", "#EFEFEF")
    localStorage.setItem("theme", "light")
  } else {
    body.style.backgroundColor = "#222";
    body.style.color = "white";
    cir.style.left = "34px";
    cimg.src = "full-moon.png";
    edt.style.background = "transparent"
    root.style.setProperty("--phc", "white")
    root.style.setProperty("--ph", "#222")
    root.style.setProperty("--song", "#333")
    localStorage.setItem("theme", "dark")
  }
})
var p = document.getElementById("pop");
var bp = document.getElementById("backpop")

function pop() {
  if (p.style.left == "-9rem") {
    p.style.left = "0rem";
    bp.style.display = "block";
    body.style.overflow = "hidden";
  } else {
    bp.style.display = "hidden";
    p.style.left = "-9rem"
    body.style.overflow = "visible"
  }
}
bp.addEventListener("click", () => {
  bp.style.display = "none";
  body.style.overflow = "visible";
  p.style.left = "-9rem";
})

isrc.addEventListener("change", function() {
  img.src = URL.createObjectURL(isrc.files[0])
  if (img.src != "") {
    r.style.display = "block";
  } else {
    r.style.display = "none"
  }
})
document.addEventListener("copy", (event) => {
  const sdata = window.getSelection().toString()
  event.clipboardData.setData("text/plain", "⚠️This text cannot be copied !!")
})
sh.addEventListener("input", function() {
  img.style.height = sh.value + 'px';
})
sw.addEventListener("input", function() {
  img.style.width = sw.value + 'px';
})
edt.addEventListener("input", function() {
  img.style.background = edt.value;
  img.style.borderRadius = edt.value + 'px';
})
edt.addEventListener("focusout", function() {
  edt.value = ""
})

document.querySelector("body").addEventListener("mousemove", eyeball());

function eyeball() {
  const eye = document.querySelectorAll(".eye")
  eye.forEach(function(eye) {
    let x = (eye.getBoundingClientRect().left) + (eye.clientWidth / 2);
    let y = (eye.getBoundingClientRect().top) + (eye.clientHeight / 2);
    let radian = Math.atan2(event.pageX - x, event.pageY - y);
    let rotation = (radian * (180 / Math.PI) * -1) + 270;
    eye.style.transform = "rotation(" + rotation + "deg)"
  })
}

submit.addEventListener("click", function() {
  contact.style.display = "none";
})
opn.addEventListener("click", function() {
  contact.style.display = "flex";
})
close.addEventListener("click", function() {
  contact.style.display = "none"
})

function removeimg() {
  img.src = ""
  r.style.display = "none"
  sw.value = "175";
  img.style.background = "transparent";
  sh.value = "175";
  img.style.height = "100px"
  img.style.width = "100px"
  img.style.borderRadius = "0"
}
// Select the target element
const targetElement = document.getElementById('loader');

// Create a MutationObserver instance
const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
      let hasSpoken = false;
      const now = new Date();
      const hours = now.getHours();
      console.log(hours)
      let greeting;
      if (hours >= 5 && hours < 12) {
        greeting = `Good Morning!, Welcome to the Website`;
      } else if (hours >= 12 && hours < 18) {
        greeting = "Good Afternoon!, Welcome to the Website";
      } else {
        greeting = "Good Evening! , Welcome to the Website";
      }
      const syn = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(greeting);
      console.log("loadeddddd")
      if (!hasSpoken) {
        syn.speak(utterance);
        hasSpoken = true;
        console.log(hasSpoken) // Prevent multiple activations
      }
    }
  }
});

// Configure the observer to watch for attribute changes
const config = {
  attributes: true, // Watch for attribute changes
  attributeFilter: ['style'], // Only watch the 'style' attribute
};

// Start observing the target element
observer.observe(targetElement, config);

// Example: Change the style dynamically
setTimeout(() => {
  targetElement.style.display = 'none';
}, 10000);
if ('webkitSpeechRecognition' in window) {
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';
  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript.trim();
    console.log(transcript)
    result.innerText = event.results[0][0];
    img.style.backgroundColor = transcript.replace(/\s+/g, '');
    result.innerText = transcript;
    const borderRadius = parseInt(transcript, 10);
    if (!isNaN(borderRadius)) {
      img.style.borderRadius = borderRadius + "px";
      result.innerText = borderRadius;
    }
  };

  recognition.onerror = function(event) {
    result.textContent = `Error: ${event.error}`;
  };

  startBtn.onclick = function() {
    result.textContent = 'Listening...';
    recognition.start();
  };
} else {
  result.textContent = 'Speech recognition is not supported in this browser.';
}

function saveImage() {
  const imgElement = document.getElementById("image");

  if (!imgElement.src) {
    alert("Please upload and edit an image before saving!");
    return;
  }

  // Create a temporary canvas to draw the image
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Set canvas size to the image size
  const width = imgElement.width;
  const height = imgElement.height;
  const borderRadius = parseInt(window.getComputedStyle(imgElement).borderRadius, 10);

  canvas.width = width;
  canvas.height = height;

  // Apply border radius and draw the image
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(borderRadius, 0);
  ctx.lineTo(width - borderRadius, 0);
  ctx.quadraticCurveTo(width, 0, width, borderRadius);
  ctx.lineTo(width, height - borderRadius);
  ctx.quadraticCurveTo(width, height, width - borderRadius, height);
  ctx.lineTo(borderRadius, height);
  ctx.quadraticCurveTo(0, height, 0, height - borderRadius);
  ctx.lineTo(0, borderRadius);
  ctx.quadraticCurveTo(0, 0, borderRadius, 0);
  ctx.closePath();
  ctx.clip();

  const img = new Image();
  img.src = imgElement.src;

  img.onload = function() {
    ctx.drawImage(img, 0, 0, width, height);

    // Generate a downloadable link
    const link = document.createElement("a");
    link.download = "edited_image.png"; // Set the file name
    link.href = canvas.toDataURL("image/png"); // Convert canvas to a data URL
    link.click(); // Trigger the download
  };
}


//Music Playerreeeee
const audioElement = document.getElementById('background-audio');
const playPauseBtn = document.getElementById('play-pause-btn');
const progressBar = document.getElementById('progress-bar');
const currentTimeSpan = document.getElementById('current-time');
const totalTimeSpan = document.getElementById('total-time');
const selectElement = document.getElementById('song-select');
const repeatBtn = document.getElementById('repeat-btn');

let repeatMode = localStorage.getItem("mode") || "none"; // Default to "none" if not set

window.onload = () => {
  repeatMode = localStorage.getItem("mode") || "none"; // Ensure repeatMode is loaded correctly
  updateRepeatButton(); // Ensure the repeat button reflects the stored mode

  const savedSong = localStorage.getItem('lastPlayedSong');
  const savedTitle = localStorage.getItem('lastPlayedSongTitle');
  const savedTime = localStorage.getItem('lastPlayedTime');

  if (savedSong && savedTitle) {
    document.getElementById('audio-source').src = savedSong;
    document.getElementById('song-title').textContent = "Now Playing: " + savedTitle;

    [...selectElement.options].forEach((option, index) => {
      if (option.value === savedSong) selectElement.selectedIndex = index;
    });

    audioElement.load();

    if (savedTime) {
      audioElement.currentTime = parseFloat(savedTime);
    }

    playPauseBtn.textContent = "▶";
  }

  setupMediaSession();
};

function playNextSong() {
  const currentIndex = selectElement.selectedIndex;
  const nextIndex = (currentIndex + 1) % selectElement.options.length;
  selectElement.selectedIndex = nextIndex;
  changeSong();
}

function playPreviousSong() {
  const currentIndex = selectElement.selectedIndex;
  const previousIndex = (currentIndex - 1 + selectElement.options.length) % selectElement.options.length;
  selectElement.selectedIndex = previousIndex;
  changeSong();
}

function changeSong() {
  const selectedOption = selectElement.options[selectElement.selectedIndex];
  document.getElementById('audio-source').src = selectedOption.value;
  document.getElementById('song-title').textContent = "Now Playing: " + selectedOption.getAttribute('data-title');

  audioElement.load();
  audioElement.play();
  playPauseBtn.textContent = "❚❚";

  localStorage.setItem('lastPlayedSong', selectedOption.value);
  localStorage.setItem('lastPlayedSongTitle', selectedOption.getAttribute('data-title'));

  updateMediaSession(selectedOption.getAttribute('data-title'));
}

function togglePlayPause() {
  if (audioElement.paused) {
    audioElement.play();
    playPauseBtn.textContent = "❚❚";
  } else {
    audioElement.pause();
    playPauseBtn.textContent = "▶";
  }
}
assis.addEventListener("click", () => {
  audioElement.pause()
})

function toggleRepeat() {
  let newMode = (repeatMode === "all") ? "one" : (repeatMode === "one") ? "none" : "all";
  localStorage.setItem("mode", newMode);
  repeatMode = newMode;
  updateRepeatButton();
}


function updateRepeatButton() {
  if (repeatMode === "all") {
    repeatBtn.textContent = "🔁"; // Repeat all songs
  } else if (repeatMode === "one") {
    repeatBtn.textContent = "🔂"; // Repeat one song
  } else {
    repeatBtn.textContent = "➡"; // Sequential play (no repeat)
  }
}

audioElement.addEventListener('ended', () => {
  if (repeatMode === "one") {
    audioElement.currentTime = 0;
    audioElement.play();
  } else if (repeatMode === "all") {
    playNextSong();
  } else {
    const currentIndex = selectElement.selectedIndex;
    if (currentIndex < selectElement.options.length - 1) {
      playNextSong();
    } else {
      audioElement.currentTime = 0;
      selectElement.selectedIndex = 0;
      const selectedOption = selectElement.options[selectElement.selectedIndex];
      document.getElementById('audio-source').src = selectedOption.value;
      document.getElementById('song-title').textContent = "Now Playing: " + selectedOption.getAttribute('data-title');

      audioElement.load();
      playPauseBtn.textContent = "❚❚";

      localStorage.setItem('lastPlayedSong', selectedOption.value);
      localStorage.setItem('lastPlayedSongTitle', selectedOption.getAttribute('data-title'));

      updateMediaSession(selectedOption.getAttribute('data-title'));
      playPauseBtn.textContent = "▶";
      progressBar.value = 0;
      currentTimeSpan.textContent = formatTime(0);
      totalTimeSpan.textContent = formatTime(0);
      audioElement.pause();
    }
  }
});

audioElement.addEventListener('timeupdate', () => {
  const { currentTime, duration } = audioElement;

  if (!isNaN(duration)) {
    const progressPercent = (currentTime / duration) * 100;
    progressBar.value = progressPercent;
    progressBar.style.background = `linear-gradient(to right, red ${progressPercent}%, #ddd ${progressPercent}%)`;

    currentTimeSpan.textContent = formatTime(currentTime);
    totalTimeSpan.textContent = formatTime(duration);
    localStorage.setItem('lastPlayedTime', currentTime);
  }
});

progressBar.addEventListener('input', () => {
  if (!isNaN(audioElement.duration)) {
    audioElement.currentTime = (progressBar.value / 100) * audioElement.duration;
  }
});

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function setupMediaSession() {
  if ('mediaSession' in navigator) {
    navigator.mediaSession.setActionHandler('play', () => {
      audioElement.play();
      playPauseBtn.textContent = "❚❚";
    });
    navigator.mediaSession.setActionHandler('pause', () => {
      audioElement.pause();
      playPauseBtn.textContent = "▶";
    });
    navigator.mediaSession.setActionHandler('nexttrack', playNextSong);
    navigator.mediaSession.setActionHandler('previoustrack', playPreviousSong);
    updateMediaSession(localStorage.getItem('lastPlayedSongTitle'));
  }
}

function updateMediaSession(title) {
  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: title || "Select a song to play",
      artist: "Unknown Artist",
      album: "Unknown Album",
      artwork: [
        { src: "music-abstract-with-headphones-horizontal-wallpaper-photo.jpg", sizes: "512x512", type: "image/jpeg" }
      ]
    });
  }
}