document.addEventListener('DOMContentLoaded', () => {
    feather.replace(); 

    const playPauseButton = document.getElementById('play-pause');
    const audio = document.getElementById('audio');
    const songDuration = document.getElementById('song-duration');
    const lyricsContainer = document.getElementById('lyrics-container');
    const rightPages = document.querySelectorAll('.right-page');
    let currentPage = 0;
    let lyricsInterval;

    const lyrics = [
        { time: 6, text: "I see forever in your eyes" },
        { time: 10, text: "I feel okay when I see you smile," },
        { time: 16, text: "Smile :)" },
        { time: 19, text: "Wishing on dandelions all of the time" },
        { time: 22, text: "Praying to God that one day you'll be mine" },
        { time: 25, text: "Wishing on dandelions all of the time" },
        { time: 29, text: "All of the time" },
        { time: 33, text: "Dandelion, into the wind you go" },
        { time: 36, text: "Won't you let my darling know?" }
    ];

    playPauseButton.addEventListener('click', () => {
        togglePlay();
    });

    function togglePlay() {
        if (audio.paused) {
            audio.play();
            playPauseButton.innerHTML = '<i data-feather="pause"></i>'; 
            feather.replace(); 
            displayDuration(); 
            syncLyricsWithPages(); 
        } else {
            audio.pause();
            playPauseButton.innerHTML = '<i data-feather="play"></i>';
            feather.replace(); 
            clearInterval(lyricsInterval);
        }
    }

    function displayDuration() {
        audio.addEventListener('timeupdate', () => {
            const currentTime = formatTime(audio.currentTime);
            const duration = formatTime(audio.duration);
            songDuration.textContent = `${currentTime} / ${duration}`;
        });
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    function syncLyricsWithPages() {
        lyricsInterval = setInterval(() => {
            const currentTime = Math.floor(audio.currentTime);
            const currentLyric = lyrics.find(lyric => lyric.time === currentTime);

            if (currentLyric) {
                lyricsContainer.textContent = currentLyric.text;
                showPage(lyrics.indexOf(currentLyric));
            }
        }, 1000);
    }

    function showPage(pageIndex) {
        rightPages.forEach((page, index) => {
            if (index === pageIndex) {
                page.style.transform = 'rotateY(0deg)';
                page.style.zIndex = 2;
                page.style.visibility = 'visible';
            } else if (index < pageIndex) {
                page.style.transform = 'rotateY(-180deg)';
                page.style.zIndex = 1;
                page.style.visibility = 'visible';
            } else {
                page.style.transform = 'rotateY(0deg)';
                page.style.zIndex = 0;
                page.style.visibility = 'hidden';
            }
        });
    }
});
