const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPauseBtn');

let isPlaying = false;

function togglePlayPause() {
  if (isPlaying) {
    audio.pause();
    playPauseBtn.innerHTML = '&#9208;'; // Play symbol
  } else {
    audio.play();
    playPauseBtn.innerHTML = '&#9209;'; // Pause symbol
  }
  isPlaying = !isPlaying;
}

function prevSong() {
  // Add logic if multiple songs
  audio.currentTime = 0;
}

function nextSong() {
  // Add logic if multiple songs
  audio.currentTime = audio.duration;
}
