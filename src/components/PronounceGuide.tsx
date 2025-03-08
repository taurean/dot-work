import { useState, useRef, useEffect } from "react";
import styles from "./PronounceGuide.module.css";

export const PronounceGuide = () => {
  const [playing, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mp3Path = "https://cdn.taurean.work/name%20pronounciation%20guide.mp3";

  // Create audio object on component mount
  useEffect(() => {
    audioRef.current = new Audio(mp3Path);
    audioRef.current.onended = () => setIsPlaying(false);
  }, []);

  const handleOnClick = () => {
    if (!audioRef.current) return;

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
      className={`button ${styles.pronounceButton} ${playing ? styles.isPlaying : ""}`}
    >
      <span data-visually-hidden>Pronounce</span>
      <span>tor-ee-ehn</span>
    </button>
  );
};
