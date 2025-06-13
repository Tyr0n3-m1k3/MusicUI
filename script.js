document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('audio');
    const replayBtn = document.getElementById('replay-btn);
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
    
    /// Updated playlist with new color names
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
            artist: "Tyler, The Creator, Kali Uchis",
            audioSrc: "assets/audio/see-you-again.mp3",
            albumArt: "assets/covers/see-you-again.png",
            color: "orange"
        },
        {
            title: "CN Tower",
            artist: "PARTYNEXTDOOR, Drake",
            audioSrc: "assets/audio/cn-tower.mp3",
            albumArt: "assets/covers/cn-tower.png",
            color: "red"
        },
        {
            title: "Nokia",
            artist: "Drake, PARTYNEXTDOOR",
            audioSrc: "assets/audio/Nokia.mp3",
            albumArt: "assets/covers/Nokia.png",
            color: "dark-green"  // Changed from green
        }, 
        {
            title: "Hello?",
            artist: "Clairo, Rejjie Snow",
            audioSrc: "assets/audio/hello.mp3",
            albumArt: "assets/covers/hello.png",
            color: "green"  // Changed from luminous-green
        },
        {
            title: "Hello Miss Johnson",
            artist: "Jack Harlow",
            audioSrc: "assets/audio/hello-miss-johnson.mp3",
            albumArt: "assets/covers/hello-miss-johnson.png",
            color: "dark-maroon"
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
        
        // Update background color and play button
        backgroundEl.className = 'background ' + song.color;
        playBtn.className = 'control-btn play-btn ' + song.color;
        
        if (isPlaying) {
            audio.play().catch(e => console.log("Auto-play prevented:", e));
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
    }
    
    // Play/Pause
    function togglePlay() {
        if (isPlaying) {
            audio.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            audio.play().catch(e => {
                console.log("Playback prevented:", e);
                // Fallback: User interaction was needed, so we'll set isPlaying to true
                isPlaying = true;
                togglePlay();
            });
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
        if (isPlaying) {
            audio.play().catch(e => console.log("Auto-play prevented:", e));
        }
    }
    
    // Previous song
    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        loadSong(currentSongIndex);
        if (isPlaying) {
            audio.play().catch(e => console.log("Auto-play prevented:", e));
        }
    }

    // Replay song
    function replaySong() {
        audio.currentTime = 0;
        if (isPlaying) {
            togglePlay();
        }
        // Add visual feedback
        replayBtn.innerHTML = '<i class="fas fa-redo" style="color:#00ff7f;"></i>';
        setTimeout(() => {
            replayBtn.innerHTML = '<i class="fas fa-redo"></i>';
        },300);
    }
    
    // Event listeners
    replayBtn.addEventListener('click',replaySong);
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

    // Handle potential autoplay restrictions
    document.body.addEventListener('click', function initialPlay() {
        audio.play().then(() => {
            // If autoplay works, pause immediately and remove listener
            audio.pause();
            document.body.removeEventListener('click', initialPlay);
        }).catch(e => {
            console.log("Initial autoplay prevented, waiting for user interaction");
        });
    }, { once: true });
});
