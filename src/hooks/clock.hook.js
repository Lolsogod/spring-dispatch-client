import React from "react";

export const useDate = () => {
    const paraTimes = [
        ['08:00', '09:30'],
        ['09:45', '11:15'],
        ['11:30', '13:00'],
        ['13:40', '15:10'],
        ['15:20', '16:50'],
        ['17:00', '18:30']
    ]

    const locale = 'en';
    const [today, setDate] = React.useState(new Date());

    const isInRange = (value, range) => {
        return value >= range[0] && value <= range[1];
    }
    const getNum = time =>{
        for (let i = 0; i < paraTimes.length; i++) {
            if(isInRange(time, paraTimes[i]))
                return i+1
        }
        return -1
    }


    React.useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 60 * 1000);
        return () => {
            clearInterval(timer);
        }
    }, []);

    const day = today.toLocaleDateString(locale, { weekday: 'long' });
    const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, { month: 'long' })}\n\n`;

    //const hour = today.getHours();

    const time = today.toLocaleTimeString(locale, { hour: 'numeric', hour12: false, minute: 'numeric' });
    let paraNum = 2;

    return {date, time, paraNum, paraTimes, getNum, isInRange};
};