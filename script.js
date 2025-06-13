document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('audio');
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.querySelector('.progress-bar');
    const currentTimeEl = document.querySelector('.current-time');
    const durationEl = document.querySelector('.duration');
    const songTitleEl = document.querySelector('.song-title');
    const songArtistEl = document.querySelector('.song-artist');
    const albumArtEl = document.getElementById('album-art');
    const backgroundEl = document.querySelector('.background');
    
    // Song playlist
    const playlist = [
        {
            title: "COLD WATER",
            artist: "Major Lazer, Justin Bieber, MO",
            audioSrc: "cold-water.mp3", // Replace with your file
            albumArt: "cold-water.jpg", // Replace with your file
            color: "purple"
        },
        {
            title: "See You Again",
            artist: "Tyler, The Creator,Kali Uchis",
            audioSrc: "see-you-again.mp3", // Replace with your file
            albumArt: "see-you-again.png", // Replace with your file
            color: "orange"
        },
        {
            title: "CN Tower",
            artist: "PARTYNEXTDOOR, Drake",
            audioSrc: "cn-tower.mp3", // Replace with your file
            albumArt: "cn-tower.png", // Replace with your file
            color: "red"
        }
    ];
    
    let currentSongIndex = 0;
    let isPlaying = false;
    
    // Load song
    function loadSong(index) {
        const song = playlist[index];
        
        songTitleEl.textContent = song.title;
        songArtistEl.textContent = song.artist;
        albumArtEl.src = song.albumArt;
        audio.src = song.audioSrc;
        
        // Update background color
        backgroundEl.className = 'background ' + song.color;
        playBtn.className = 'control-btn play-btn ' + song.color;
        
        if (isPlaying) {
            audio.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
    }
    
    // Play/Pause
    function togglePlay() {
        if (isPlaying) {
            audio.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            audio.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    }
    
    // Update progress bar
    function updateProgress(e) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.setProperty('--progress', `${progressPercent}%`);
        
        // Update time display
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;
        
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`;
        
        if (duration) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
    
    // Set progress bar when clicked
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    }
    
    // Next song
    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        loadSong(currentSongIndex);
    }
    
    // Previous song
    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        loadSong(currentSongIndex);
    }
    
    // Event listeners
    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', nextSong);
    progressBar.addEventListener('click', setProgress);
    
    // Initialize
    loadSong(currentSongIndex);
    
    // Initialize duration when metadata is loaded
    audio.addEventListener('loadedmetadata', () => {
        const durationMinutes = Math.floor(audio.duration / 60);
        let durationSeconds = Math.floor(audio.duration % 60);
        if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    });
});
