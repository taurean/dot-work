import { useState, useRef } from "react";

export const PronounceGuide = () => {
    const [playing, setIsPlaying] = useState<boolean>(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const mp3Path = `https://cdn.taurean.work/name%20pronounciation%20guide.mp3`;

    const handleOnClick = () => {
        audioRef.current = new Audio(mp3Path);
        audioRef.current.onended = () => setIsPlaying(false);

        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
            setIsPlaying(true);
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = "";
                audioRef.current = null;
            }
        };
    };

    return (
        <>
            <button onClick={handleOnClick}>Pronounce tor-ee-ehn</button>
        </>
    );
};
