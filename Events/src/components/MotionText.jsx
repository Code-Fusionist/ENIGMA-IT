import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const MotionText = ({ word = "Default" }) => {
    const containerRef = useRef();

    useGSAP(() => {
        gsap.from(".letter", {
            duration: 0.5,
            stagger: 0.1,
            y: -2000,
            ease: "power4.out",
        });
    }, { scope: containerRef });

    return (
        <div>
            <div ref={containerRef} className="text-container flex items-center justify-center overflow-hidden">
                {Array.from(word).map((letter, index) => (
                    <span key={index} className="letter uppercase h-min font-bold">{letter}</span>
                ))}
            </div>
        </div>
    );
};

export default MotionText;
