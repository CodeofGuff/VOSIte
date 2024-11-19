class AudioPlayer {
    constructor() {
        this.audio = new Audio();
        this.currentTrack = 0;
        this.isPlaying = false;
        
        this.playBtn = document.getElementById('playBtn');
        this.progressBar = document.querySelector('.progress');
        this.currentTimeSpan = document.getElementById('currentTime');
        this.durationSpan = document.getElementById('duration');
        this.tracks = document.querySelectorAll('.track');
        
        this.initializeEvents();
    }

    initializeEvents() {
        this.playBtn.addEventListener('click', () => this.togglePlay());
        
        this.tracks.forEach((track, index) => {
            track.addEventListener('click', () => this.selectTrack(index));
        });

        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('ended', () => this.playNext());
    }

    togglePlay() {
        if (this.isPlaying) {
            this.audio.pause();
            this.playBtn.textContent = 'Play';
        } else {
            this.audio.play();
            this.playBtn.textContent = 'Pause';
        }
        this.isPlaying = !this.isPlaying;
    }

    selectTrack(index) {
        this.currentTrack = index;
        this.tracks.forEach(track => track.classList.remove('active'));
        this.tracks[index].classList.add('active');
        
        const source = this.tracks[index].dataset.src;
        this.audio.src = source;
        this.audio.load();
        
        if (this.isPlaying) {
            this.audio.play();
        }
    }

    updateProgress() {
        const progress = (this.audio.currentTime / this.audio.duration) * 100;
        this.progressBar.style.width = `${progress}%`;
        
        this.currentTimeSpan.textContent = this.formatTime(this.audio.currentTime);
        this.durationSpan.textContent = this.formatTime(this.audio.duration);
    }

    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    playNext() {
        this.currentTrack = (this.currentTrack + 1) % this.tracks.length;
        this.selectTrack(this.currentTrack);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const player = new AudioPlayer();
});
