import React, { useState, useRef, useEffect } from 'react';
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import MotionText from "./MotionText.jsx";

const Events = ({events}) => {
    const [clickedEventId, setClickedEventId] = useState("003");
    const [animateDesc, setAnimateDesc] = useState(null);
    const panelRef = useRef(null);
    const counterRef = useRef(null);

    useGSAP(() => {
        gsap.to(panelRef.current.querySelectorAll('.event-block'), {
            scale: 1,
            duration: 0.5,
            ease: 'power2.out',
            stagger: 0.1,
        });
    }, [clickedEventId]);

    const handleEventClick = (id) => {
        setClickedEventId(id);
        setAnimateDesc(id);
    };

    const clickedEventIndex = clickedEventId ? events.findIndex(event => event.id === clickedEventId) + 1 : 0;
    const totalEvents = events.length;

    return (
        <div className="w-full h-full overflow-x-hidden">
            <div className="font-bold text-[5vw] flex items-center justify-between p-4">
                <MotionText word={clickedEventIndex < 10 ? `0${clickedEventIndex}` : clickedEventIndex} ref={counterRef} />
                <MotionText word={"events"} />
                <MotionText word={`0${totalEvents}`} />
            </div>
            <div
                id="slider-panel"
                ref={panelRef}
                className="flex items-center justify-center p-2 overflow-x-auto no-scrollbar gap-2"
            >
                {events.map((event) => (
                    <div
                        key={event.id}
                        onClick={() => handleEventClick(event.id)}
                        className={`event-block relative flex-shrink-0 ${clickedEventId === event.id ? 'w-[80vw] h-[75vh]' : 'w-[4vw] h-[75vh] grayscale hover:grayscale-0'} flex items-center justify-center transition-all duration-500 ease-in-out cursor-pointer`}
                    >
                        <img
                            src={event.img}
                            alt={event.title}
                            className="object-cover w-full h-full"
                        />
                        <p className="absolute bottom-4 left-2 rotate-90 font-semibold text-[3xl]">{event.id}</p>
                        <div className={`${clickedEventId === event.id ? 'absolute' : 'hidden'} text-center`}>
                            <p className="font-mono text-[3vw] font-semibold">
                                <MotionText word={event.title} />
                            </p>
                            <p>
                                {event.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events;
