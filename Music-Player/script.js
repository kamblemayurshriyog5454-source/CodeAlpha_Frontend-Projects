const songs = [
    {
        title: "Tulasi",
        artist: "Artist One",
        src: "songs/Song1Tulasi.mp3"
    },
    {
        title: "Khat",
        artist: "Artist Two",
        src: "songs/Song2 Khat.mp3"
    },
    {
        title: "Kasturi",
        artist: "Artist Three",
        src: "songs/Song3 Kasturi.mp3"
    }
];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const duration = document.getElementById("duration");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");

let currentSong = 0;
let isPlaying = false;

// Load Song
function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    audio.src = song.src;
}

// Play Song
function playSong() {
    audio.play();
    playBtn.innerText = "⏸";
    isPlaying = true;
}

// Pause Song
function pauseSong() {
    audio.pause();
    playBtn.innerText = "▶";
    isPlaying = false;
}

// Toggle Play
playBtn.addEventListener("click", () => {
    isPlaying ? pauseSong() : playSong();
});

// Next Song
nextBtn.addEventListener("click", () => {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(songs[currentSong]);
    playSong();
});

// Previous Song
prevBtn.addEventListener("click", () => {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(songs[currentSong]);
    playSong();
});

// Update Progress
audio.addEventListener("timeupdate", () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.value = progressPercent;

    const minutes = Math.floor(audio.duration / 60);
    const seconds = Math.floor(audio.duration % 60);
    duration.innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
});

// Seek
progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume Control
volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

// Autoplay Next Song
audio.addEventListener("ended", () => {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(songs[currentSong]);
    playSong();
});

// Create Playlist
songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.innerText = song.title;
    li.addEventListener("click", () => {
        currentSong = index;
        loadSong(song);
        playSong();
    });
    playlist.appendChild(li);
});

// Initial Load
loadSong(songs[currentSong]);
audio.volume = 0.5;