import { useEffect, useState } from 'react';

export function useTimer(deadline: number) {
  const [timeLeft, setTimeLeft] = useState(deadline);
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    // exit early if the time is up
    if (isTimeUp) return;

    // create a timer that updates the time left every second
    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => {
        // if the previous time is 0, then the time is up
        if (prevTime === 0) {
          setIsTimeUp(true);
          clearInterval(timerId);
          return 0;
        }
        // otherwise, decrement the previous time by 1
        return prevTime - 1;
      });
    }, 1000); // fixed interval of 1 second

    // clear the timer when the component unmounts or the time is up
    return () => clearInterval(timerId);
  }, [isTimeUp]);

  return [timeLeft, isTimeUp];
}
