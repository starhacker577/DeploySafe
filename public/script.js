// Player state
let currentSongIndex = 0;
let isPlaying = false;
let audio = new Audio();

// Song list from filenames
const songs = [
  { name: 'hawa hawa', path: 'songs/hawa hawa.mp3' },
  { name: 'kaho na kaho', path: 'songs/kaho na kaho .mp3' },
  { name: 'kyun faya kyun', path: 'songs/kyun faya kyun.mp3' },
  { name: 'phir se ud chala', path: 'songs/phir se ud chala.mp3' },
  { name: 'tum ho paas mere', path: 'songs/tum ho paas mere.mp3' }
];

// DOM elements
const menuOpen = document.getElementById('menu-open');
const menuClose = document.getElementById('menu-close');
const sidebar = document.querySelector('.container .sidebar');
const playBtn = document.querySelector('.play-button');
const songList = document.querySelector('.music-list .items');
const currentSongDisplay = document.querySelector('.song-info h3');
const currentArtistDisplay = document.querySelector('.song-info h5');

// Initialize player
function initPlayer() {
  // Create song list
  songs.forEach((song, index) => {
    const songElement = document.createElement('div');
    songElement.className = 'item';
    songElement.innerHTML = `
      <div class="info">
        <p>${index + 1}</p>
        <img src="assets/song-${(index % 4) + 1}.png">
        <div class="details">
          <h5>${song.name}</h5>
          <p>${song.name.split(' ')[0]}</p>
        </div>
      </div>
      <div class="actions">
        <p>03:45</p>
        <div class="icon">
          <i class='bx bxs-right-arrow'></i>
        </div>
        <i class='bx bxs-plus-square'></i>
      </div>
    `;
    songElement.addEventListener('click', () => playSong(index));
    songList.appendChild(songElement);
  });

  // Set first song
  loadSong(currentSongIndex);
}

// Load song
function loadSong(index) {
  audio.src = songs[index].path;
  currentSongDisplay.textContent = songs[index].name;
  currentArtistDisplay.textContent = songs[index].name.split(' ')[0];
}

// Play song
function playSong(index) {
  if (index !== currentSongIndex) {
    currentSongIndex = index;
    loadSong(index);
  }
  audio.play();
  isPlaying = true;
  playBtn.className = 'bx bx-pause play-button';
}

// Event listeners
playBtn.addEventListener('click', () => {
  if (isPlaying) {
    audio.pause();
    playBtn.className = 'bx bxs-right-arrow play-button';
  } else {
    audio.play();
    playBtn.className = 'bx bx-pause play-button';
  }
  isPlaying = !isPlaying;
});

document.querySelector('.bx-first-page').addEventListener('click', () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  playSong(currentSongIndex);
});

document.querySelector('.bx-last-page').addEventListener('click', () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  playSong(currentSongIndex);
});

// Volume control
const volumeSlider = document.querySelector('.volume-slider');
volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

// Initialize
menuOpen.addEventListener('click', () => sidebar.style.left = '0');
menuClose.addEventListener('click', () => sidebar.style.left = '-100%');
initPlayer();

// Set initial volume
audio.volume = 0.7;
