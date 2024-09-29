'use client';

import React from 'react'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function TeamWelcome() {
    useGSAP(() => {
        const tl = gsap.timeline();
        tl.from('.team-welcome', { opacity: 0, y: 20, duration: 1, ease: "power2.out" });
    });

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Welcome to the team</h1>
        </div>
    )
}