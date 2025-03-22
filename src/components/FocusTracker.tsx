import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import * as faceDetection from '@tensorflow-models/face-detection';
import { Brain, Focus, Bell } from 'lucide-react';

const FocusTracker: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [detector, setDetector] = useState<faceDetection.FaceDetector | null>(null);
  const [isFocused, setIsFocused] = useState(true);
  const [focusTime, setFocusTime] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [unfocusedTime, setUnfocusedTime] = useState(0);

  useEffect(() => {
    const loadModel = async () => {
      await tf.ready();
      const model = await faceDetection.createDetector(
        faceDetection.SupportedModels.MediaPipeFaceDetector,
        { runtime: 'tfjs' }
      );
      setDetector(model);
    };
    loadModel();
  }, []);

  useEffect(() => {
    if (!isTracking || !detector || !webcamRef.current?.video) return;

    let interval = setInterval(async () => {
      const video = webcamRef.current!.video;
      const faces = await detector.estimateFaces(video!);
      const newIsFocused = faces.length > 0;

      setIsFocused(newIsFocused);

      if (newIsFocused) {
        setFocusTime(prev => prev + 1);
        setUnfocusedTime(0);
      } else {
        setUnfocusedTime(prev => prev + 1);
        if (unfocusedTime === 5) { // Alert after 5 seconds
          new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3').play();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [detector, isTracking, unfocusedTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="relative">
        <Webcam
          ref={webcamRef}
          className="rounded-lg shadow-lg"
          mirrored
          style={{ width: '640px', height: '480px' }}
        />
        <div className="absolute top-4 right-4 bg-white/90 rounded-full p-3">
          {isFocused ? (
            <Focus className="w-6 h-6 text-green-500" />
          ) : (
            <Bell className="w-6 h-6 text-red-500 animate-bounce" />
          )}
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={() => setIsTracking(!isTracking)}
          className={`px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 ${
            isTracking
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          <Brain className="w-5 h-5" />
          <span>{isTracking ? 'Stop Tracking' : 'Start Tracking'}</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Focus Statistics</h3>
          <span className="text-gray-500">Session Time: {formatTime(focusTime)}</span>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Current Status:</span>
            <span className={isFocused ? 'text-green-500' : 'text-red-500'}>
              {isFocused ? 'Focused' : 'Distracted'}
            </span>
          </div>
          {!isFocused && unfocusedTime > 0 && (
            <div className="text-red-500 text-sm">
              You've been unfocused for {unfocusedTime} seconds!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FocusTracker;
