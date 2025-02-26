import type { definition } from "./types";

// Function to shuffle array - executes on the server for each request
export const shuffleArray = (originalArray: definition[]) => {
    const shuffledArray = [...originalArray];
    for (
        let currentIndex = shuffledArray.length - 1;
        currentIndex > 0;
        currentIndex--
    ) {
        const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
        [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
            shuffledArray[randomIndex],
            shuffledArray[currentIndex],
        ];
    }
    return shuffledArray;
};
