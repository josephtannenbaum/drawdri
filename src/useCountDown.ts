import { useState, useEffect, useCallback } from "react";

const useCountdown = (secs: number) => {
  const milliseconds = secs * 1000;
  const [countdownDate, setCountdownDate] = useState(
    new Date().getTime() + milliseconds
  );
  const [timeLeft, setTimeLeft] = useState(milliseconds);
  const [isOn, setIsOn] = useState(false);
  const start = useCallback(() => {
    setCountdownDate(new Date().getTime() + timeLeft);
    setIsOn(true);
  }, [timeLeft]);
  const pause = useCallback(() => setIsOn(false), []);

  const toggle = useCallback(
    (choice: boolean) => {
      if (choice) {
        start();
      } else {
        pause();
      }
    },
    [pause, start]
  );
  const reset = useCallback(() => {
    setCountdownDate(new Date().getTime() + milliseconds);
    setTimeLeft(milliseconds);
    setIsOn(true);
  }, [milliseconds]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isOn) {
        setTimeLeft(countdownDate - new Date().getTime());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countdownDate, isOn]);

  return {
    timeLeftMs: timeLeft,
    timeLeft: getTimeLeft(timeLeft),
    isOn,
    toggle,
    start,
    pause,
    reset,
  };
};

const getTimeLeft = (countDownMs: number) => {
  const countDown = Math.round(countDownMs / 1000) * 1000;

  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};

export { useCountdown };
