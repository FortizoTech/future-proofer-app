import { useState, useRef, useCallback } from 'react';

export interface VoiceRecorderState {
    isRecording: boolean;
    duration: number;
    audioBlob: Blob | null;
    transcription: string;
    isTranscribing: boolean;
    error: string | null;
}

export const useVoiceRecorder = () => {
    const [state, setState] = useState<VoiceRecorderState>({
        isRecording: false,
        duration: 0,
        audioBlob: null,
        transcription: '',
        isTranscribing: false,
        error: null,
    });

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    const startRecording = useCallback(async () => {
        try {
            // High-fidelity audio constraints
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true,
                    sampleRate: 44100,
                },
            });

            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            chunksRef.current = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunksRef.current.push(e.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
                setState(prev => ({ ...prev, audioBlob: blob, isRecording: false }));
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setState(prev => ({ ...prev, isRecording: true, duration: 0, error: null, audioBlob: null, transcription: '' }));

            timerRef.current = setInterval(() => {
                setState(prev => ({ ...prev, duration: prev.duration + 1 }));
            }, 1000);
        } catch (err: any) {
            setState(prev => ({ ...prev, error: 'Microphone access denied or not available.' }));
            console.error('Recording Error:', err);
        }
    }, []);

    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
        }
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const cancelRecording = useCallback(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
        }
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        setState(prev => ({ ...prev, isRecording: false, duration: 0, audioBlob: null }));
    }, []);

    const transcribeAudio = async (blob: Blob) => {
        setState(prev => ({ ...prev, isTranscribing: true, error: null }));
        try {
            const formData = new FormData();
            formData.append('file', blob, 'recording.webm');

            const response = await fetch('/api/transcribe', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Transcription failed');

            const data = await response.json();
            setState(prev => ({ ...prev, transcription: data.text, isTranscribing: false }));
            return data.text;
        } catch (err: any) {
            setState(prev => ({ ...prev, error: 'Failed to transcribe audio.', isTranscribing: false }));
            console.error('Transcription Error:', err);
            return null;
        }
    };

    const setTranscription = (text: string) => {
        setState(prev => ({ ...prev, transcription: text }));
    };

    return {
        ...state,
        startRecording,
        stopRecording,
        cancelRecording,
        transcribeAudio,
        setTranscription,
    };
};
