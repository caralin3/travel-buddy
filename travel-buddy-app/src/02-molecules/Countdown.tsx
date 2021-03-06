import moment from 'moment';
import React from 'react';

export interface CountdownProps {
  date: string;
}

export const Countdown: React.FC<CountdownProps> = ({ date }) => {
  const INTERVAL = 1000;
  const intervalRef = React.useRef<NodeJS.Timer>();

  const [days, setDays] = React.useState(0);
  const [hours, setHours] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    const getCountdown = () => {
      const eventTime = moment(date);
      const now = moment();
      let duration = moment.duration(eventTime.diff(now));

      if (eventTime.isSameOrBefore(now)) {
        if (!!intervalRef && !!intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      } else {
        const durationDays = Math.floor(duration.asDays());
        duration.subtract(moment.duration(durationDays, 'days'));

        const durationHours = duration.hours();
        duration.subtract(moment.duration(durationHours, 'hours'));

        const durationMinutes = duration.minutes();
        duration.subtract(moment.duration(durationMinutes, 'minutes'));

        const durationSeconds = duration.seconds();
        duration.subtract(moment.duration(durationSeconds, 'seconds'));

        setDays(durationDays);
        setHours(durationHours);
        setMinutes(durationMinutes);
        setSeconds(durationSeconds);
      }
    };

    intervalRef.current = setInterval(getCountdown, INTERVAL);

    return () => {
      if (!!intervalRef && !!intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [date]);

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div>
        <p className="h2 m-0">{days}</p>
        <p>days</p>
      </div>
      <div>
        <p className="h2 px-3">:</p>
      </div>
      <div>
        <p className="h2 m-0">{hours}</p>
        <p>hours</p>
      </div>
      <div>
        <p className="h2 px-3">:</p>
      </div>
      <div>
        <p className="h2 m-0">{minutes}</p>
        <p>minutes</p>
      </div>
      <div>
        <p className="h2 px-3">:</p>
      </div>
      <div>
        <p className="h2 m-0">{seconds}</p>
        <p>seconds</p>
      </div>
    </div>
  );
};
