import React, { useEffect, useState } from 'react';
import './TitleTypewriter.css'; // Import the new CSS file

const TITLES = [
    "Game Developer",
    "Web Developer",
    "Software Engineer",
    "Tech Enthusiast",
    "Creative Coder",
];

const ANIMATION_INTERVAL = 50; // Update every 100ms

const CURSOR_FLASH_INTERVAL = 500; // Flash every 500ms
const WAIT_AFTER_TYPING = 1500; // Wait after typing before deleting
const WAIT_AFTER_DELETING = 1000; // Wait after deleting before typing next title
const CHARACTER_TYPING_SPEED = 100; // Speed of typing each character
const CHARACTER_DELETING_SPEED = 50; // Speed of deleting each character

const _CURSOR_FLASH_COUNTDOWN = Math.ceil(CURSOR_FLASH_INTERVAL / ANIMATION_INTERVAL);
const _WAIT_AFTER_TYPING_COUNTDOWN = Math.ceil(WAIT_AFTER_TYPING / ANIMATION_INTERVAL);
const _WAIT_AFTER_DELETING_COUNTDOWN = Math.ceil(WAIT_AFTER_DELETING / ANIMATION_INTERVAL);
const _CHARACTER_TYPING_SPEED_COUNTDOWN = Math.ceil(CHARACTER_TYPING_SPEED / ANIMATION_INTERVAL);
const _CHARACTER_DELETING_SPEED_COUNTDOWN = Math.ceil(CHARACTER_DELETING_SPEED / ANIMATION_INTERVAL);

// Replace enum Phase with a union type
// enum Phase {
//     Typing,
//     WaitAfterTyping,
//     Deleting,
//     WaitAfterDeleting,
// }
type Phase = 'Typing' | 'WaitAfterTyping' | 'Deleting' | 'WaitAfterDeleting';

interface AnimationData {
    phase: Phase;

    currentText: string;
    currentIndex: number;

    cursorFlashCounter: number;
    cursorFlashCooldown: number;

    waitCooldown: number;
    characterCooldown: number;
}

const TitleTypewriter: React.FC = () => {
    const [animationData, setAnimationData] = useState<AnimationData>({
        phase: 'Typing',
        currentText: "",
        currentIndex: 0,
        cursorFlashCounter: 0,
        cursorFlashCooldown: 0,
        waitCooldown: 0,
        characterCooldown: 0,
    });

    useEffect(() => {
        const typeInterval = setInterval(() => {
            const new_animationData = { ...animationData };

            // Update cursor flash logic only when idle
            if (
                new_animationData.phase === 'WaitAfterTyping' ||
                new_animationData.phase === 'WaitAfterDeleting'
            ) {
                new_animationData.cursorFlashCooldown--;
                if (new_animationData.cursorFlashCooldown <= 0) {
                    new_animationData.cursorFlashCounter++;
                    new_animationData.cursorFlashCooldown = _CURSOR_FLASH_COUNTDOWN; // Reset cooldown
                }
            } else {
                // Ensure cursor remains solid while typing or deleting
                new_animationData.cursorFlashCounter = 0;
                new_animationData.cursorFlashCooldown = _CURSOR_FLASH_COUNTDOWN;
            }

            switch (new_animationData.phase) {
                case 'Typing':
                    if (new_animationData.characterCooldown > 0) {
                        new_animationData.characterCooldown--;
                    } else {
                        const currentTitle = TITLES[new_animationData.currentIndex];
                        new_animationData.currentText += currentTitle[new_animationData.currentText.length];
                        new_animationData.characterCooldown = _CHARACTER_TYPING_SPEED_COUNTDOWN - 1 + Math.floor(Math.random() * 2); // Add slight variation to typing speed
                        if (new_animationData.currentText === currentTitle) {
                            new_animationData.phase = 'WaitAfterTyping';
                            new_animationData.waitCooldown = _WAIT_AFTER_TYPING_COUNTDOWN; // Adjust wait time after typing
                        }
                    }
                    break;

                case 'WaitAfterTyping':
                    if (new_animationData.waitCooldown > 0) {
                        new_animationData.waitCooldown--;
                    } else {
                        new_animationData.phase = 'Deleting';
                    }
                    break;

                case 'Deleting':
                    if (new_animationData.characterCooldown > 0) {
                        new_animationData.characterCooldown--;
                    } else {
                        new_animationData.currentText = new_animationData.currentText.slice(0, -1);
                        new_animationData.characterCooldown = _CHARACTER_DELETING_SPEED_COUNTDOWN - 1; // Adjust deleting speed
                        if (new_animationData.currentText === "") {
                            new_animationData.phase = 'WaitAfterDeleting';
                            new_animationData.waitCooldown = _WAIT_AFTER_DELETING_COUNTDOWN; // Adjust wait time after deleting
                            new_animationData.currentIndex = (new_animationData.currentIndex + 1) % TITLES.length;
                        }
                    }
                    break;

                case 'WaitAfterDeleting':
                    if (new_animationData.waitCooldown > 0) {
                        new_animationData.waitCooldown--;
                    } else {
                        new_animationData.phase = 'Typing';
                    }
                    break;

                default:
                    break;
            }

            setAnimationData(new_animationData);
        }, ANIMATION_INTERVAL);
        return () => clearInterval(typeInterval);
    }, [animationData]);

    return (
        <div className="title-typewriter terminal-style">
            <span className={`typewriter-text ${animationData.phase === 'Typing' || animationData.phase === 'Deleting' ? 'typing' : ''}`}>
                <span className="animated-text">{animationData.currentText}</span>
                <span className="cursor">&nbsp;</span>
            </span>
        </div>
    );
};

export default TitleTypewriter;