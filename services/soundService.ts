// services/soundService.ts
let audioContext: AudioContext | null = null;
let musicNodes: {
    masterGain: GainNode;
    oscillators: OscillatorNode[];
    lfo: OscillatorNode;
} | null = null;
let isMusicPlaying = false;

const getAudioContext = (): AudioContext | null => {
    if (!audioContext && (window.AudioContext || (window as any).webkitAudioContext)) {
        try {
            audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        } catch (e) {
            console.error("Web Audio API is not supported.", e);
        }
    }
    return audioContext;
};

const playTone = (freq: number, duration: number, volume: number, type: OscillatorType = 'sine') => {
    const context = getAudioContext();
    if (!context) return;
    if (context.state === 'suspended') {
        context.resume();
    }

    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    gainNode.gain.setValueAtTime(0, context.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, context.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(freq, context.currentTime);
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + duration);
};

const playSweep = (startFreq: number, endFreq: number, duration: number, volume: number) => {
    const context = getAudioContext();
    if (!context) return;
    if (context.state === 'suspended') context.resume();

    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(startFreq, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(endFreq, context.currentTime + duration);

    gainNode.gain.setValueAtTime(volume, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.start();
    oscillator.stop(context.currentTime + duration);
};

export const playSendMessage = () => playSweep(700, 900, 0.1, 0.08);

export const playReceiveMessage = () => {
    playTone(800, 0.1, 0.1);
    setTimeout(() => playTone(1100, 0.1, 0.1), 100);
};

export const playSidebarOpen = () => playSweep(400, 600, 0.15, 0.08);
export const playSidebarClose = () => playSweep(600, 400, 0.15, 0.08);

export const playModalOpen = () => playTone(523, 0.2, 0.1);
export const playModalClose = () => playTone(440, 0.2, 0.08);


// --- Ambient Music ---

const playAmbientMusic = () => {
    const context = getAudioContext();
    if (!context || musicNodes) return;
    if (context.state === 'suspended') context.resume();

    const masterGain = context.createGain();
    masterGain.gain.setValueAtTime(0, context.currentTime);
    masterGain.connect(context.destination);

    // Frequencies for a calm C Major 7 chord, spread across octaves
    const frequencies = [130.81, 207.65, 261.63, 392.00]; 
    const oscillators: OscillatorNode[] = [];

    // LFO for volume modulation (tremolo)
    const lfo = context.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.05, context.currentTime); // very slow
    const lfoGain = context.createGain();
    lfoGain.gain.setValueAtTime(0.03, context.currentTime);
    lfo.connect(lfoGain);
    lfo.start();

    frequencies.forEach(freq => {
        const osc = context.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, context.currentTime);
        
        const oscGain = context.createGain();
        oscGain.gain.setValueAtTime(0.05 + (Math.random() * 0.05), context.currentTime); // Individual volume with slight variation

        osc.connect(oscGain);
        lfoGain.connect(oscGain.gain); // LFO modulates individual oscillator gain
        oscGain.connect(masterGain);
        
        osc.start();
        oscillators.push(osc);
    });

    masterGain.gain.linearRampToValueAtTime(0.1, context.currentTime + 5); // Fade in over 5 seconds

    musicNodes = { masterGain, oscillators, lfo };
};

const stopAmbientMusic = () => {
    if (!musicNodes || !audioContext) return;
    
    const { masterGain, oscillators, lfo } = musicNodes;
    const fadeOutTime = 2; // 2 seconds fade out
    
    masterGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + fadeOutTime);
    
    setTimeout(() => {
        oscillators.forEach(osc => osc.stop());
        lfo.stop();
        masterGain.disconnect();
        musicNodes = null;
    }, fadeOutTime * 1000);
};

export const toggleAmbientMusic = (): boolean => {
    if (isMusicPlaying) {
        stopAmbientMusic();
        isMusicPlaying = false;
    } else {
        playAmbientMusic();
        isMusicPlaying = true;
    }
    return isMusicPlaying;
};