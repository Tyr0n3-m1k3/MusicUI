document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const audio = document.getElementById('audio');
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const replayBtn = document.getElementById('replay-btn');
    const progressBar = document.querySelector('.progress-bar');
    const currentTimeEl = document.querySelector('.current-time');
    const durationEl = document.querySelector('.duration');
    const songTitleEl = document.querySelector('.song-title');
    const songArtistEl = document.querySelector('.song-artist');
    const albumArtEl = document.getElementById('album-art');
    const backgroundEl = document.querySelector('.background');

    // Playlist with 6 songs
    const playlist = [
        {
            title: "Cold Water",
            artist: "Major Lazer, Justin Bieber, MO",
            audioSrc: "assets/audio/cold-water.mp3",
            albumArt: "assets/covers/cold-water.png",
            color: "blue"
        },
        {
            title: "See You Again",
            artist: "Tyler, the Creator, Kali Uchis",
            audioSrc: "see-you-again.mp3",
            albumArt: "see-you-again.png",
            color: "orange"
        },
        {
            title: "CN Tower",
            artist: "PARTYNEXTDOOR, Drake",
            audioSrc: "cn-tower.mp3",
            albumArt: "cn-tower.png",
            color: "red"
        },
        {
            title: "Nokia",
            artist: "Drake, PARTYNEXTDOOR",
            audioSrc: "Nokia.mp3",
            albumArt: "Nokia.png",
            color: "dark-green"
        },
        {
            title: "Hello?",
            artist: "Clairo, Rejjie Snow",
            audioSrc: "hello.mp3",
            albumArt: "hello.png",
            color: "green"
        },
        {
            title: "Hello Miss Johnson",
            artist: "Jack Harlow",
            audioSrc: "hello-miss-johnson.mp3",
            albumArt: "hello-miss-johnson.png",
            color: "dark-maroon"
        }
    ];

    let currentSongIndex = 0;
    let isPlaying = false;

    // Load song function
    function loadSong(index) {
        const song = playlist[index];
        
        songTitleEl.textContent = song.title;
        songArtistEl.textContent = song.artist;
        albumArtEl.src = song.albumArt;
        audio.src = song.audioSrc;
        
        // Update background and play button color
        backgroundEl.className = 'background ' + song.color;
        playBtn.className = 'control-btn play-btn ' + song.color;
        
        // Auto-play if already playing
        if (isPlaying) {
            audio.play().catch(e => console.log("Auto-play prevented:", e));
        }
    }

    // Play/Pause toggle
    function togglePlay() {
        if (isPlaying) {
            audio.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            audio.play().catch(e => {
                console.log("Playback prevented:", e);
                isPlaying = true; // Ensure state sync
                togglePlay();
            });
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    }

    // Replay current song
    function replaySong() {
        audio.currentTime = 0;
        
        // Visual feedback
        replayBtn.innerHTML = '<i class="fas fa-redo" style="color: #00ff7f;"></i>';
        setTimeout(() => {
            replayBtn.innerHTML = '<i class="fas fa-redo"></i>';
        }, 300);
        
        // Auto-play if paused
        if (!isPlaying) {
            togglePlay();
        }
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

    // Seek functionality
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    }

    // Change song functions
    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        loadSong(currentSongIndex);
        if (isPlaying) audio.play().catch(e => console.log("Auto-play prevented:", e));
    }

    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        loadSong(currentSongIndex);
        if (isPlaying) audio.play().catch(e => console.log("Auto-play prevented:", e));
    }

    // Event listeners
    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    replayBtn.addEventListener('click', replaySong);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', nextSong);
    progressBar.addEventListener('click', setProgress);

    // Initialize player
    loadSong(currentSongIndex);

    // Handle mobile autoplay restrictions
    document.body.addEventListener('click', function initPlay() {
        audio.play().then(() => {
            audio.pause();
            document.body.removeEventListener('click', initPlay);
        }).catch(e => console.log("Initial play interaction needed"));
    }, { once: true });
});
