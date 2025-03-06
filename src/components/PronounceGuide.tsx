import { useState, useRef } from "react";

export const PronounceGuide = () => {
    const [playing, setIsPlaying] = useState<boolean>(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const mp3Path =
        "https://cdn.taurean.work/name%20pronounciation%20guide.mp3";

    const handleOnClick = () => {
        // Create audio object on first click (lazy initialization)
        if (!audioRef.current) {
            audioRef.current = new Audio(mp3Path);
            audioRef.current.onended = () => setIsPlaying(false);
        }

        audioRef.current.pause();
        audioRef.current.currentTime = 0;

        audioRef.current
            .play()
            .then(() => setIsPlaying(true))
            .catch((error) => console.error("Error playing audio:", error));
    };

    return (
        <button
            onClick={handleOnClick}
            className={`button ${playing ? "isPlaying" : ""}`}
        >
            <span data-visually-hidden>Pronounce</span>
            <span>tor-ee-ehn</span>
        </button>
    );
};
