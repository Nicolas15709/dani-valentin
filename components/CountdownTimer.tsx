import React, { useEffect, useState } from 'react';
import { TARGET_DATE } from '../constants';
import { Calendar, Clock } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = TARGET_DATE.getTime() - new Date().getTime();
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center bg-gradient-to-br from-pink-100 to-red-100 rounded-xl p-4 shadow-md min-w-[80px]">
      <div className="text-3xl md:text-4xl font-bold text-red-500 tabular-nums">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-xs md:text-sm text-gray-600 font-semibold uppercase tracking-wide mt-1">
        {label}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Clock className="text-pink-500 w-6 h-6" />
        <h3 className="text-xl md:text-2xl font-bold text-gray-800">
          Cuenta Regresiva para Nuestra Cita
        </h3>
        <Calendar className="text-pink-500 w-6 h-6" />
      </div>
      
      <div className="flex justify-center gap-3 md:gap-4 flex-wrap">
        <TimeUnit value={timeLeft.days} label="Días" />
        <TimeUnit value={timeLeft.hours} label="Horas" />
        <TimeUnit value={timeLeft.minutes} label="Minutos" />
        <TimeUnit value={timeLeft.seconds} label="Segundos" />
      </div>
    </div>
  );
};

export default CountdownTimer;
