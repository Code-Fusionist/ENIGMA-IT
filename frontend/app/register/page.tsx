"use client";

import registerFormSchema from "@/constants/register-form-schema";
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { registerAction } from "@/Actions/registerAction";
import TeamWelcome from "@/components/TeamWelcome";

const Page = () => {
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [showForm, setShowForm] = useState(false);
    const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const bannerRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [isRegistered, setIsRegistered] = useState(false);

    useGSAP(() => {
        const tl = gsap.timeline();

        letterRefs.current.forEach((ref, index) => {
            if (ref) {
                tl.from(ref, {
                    y: index % 2 === 0 ? -100 : 100,
                    opacity: 0,
                    duration: 1,
                    ease: "power2.out",
                }, index * 0.1);
            }
        });

        tl.to(bannerRef.current, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                setShowForm(true);
                gsap.fromTo(formRef.current, 
                    { opacity: 0, y: 50 },
                    { opacity: 1, y: 0, duration: 1, ease: "power2.out"}
                );
            }
        });

        tl.to(bannerRef.current, {
            display: 'none',
            duration: 0,
            delay: 1
        });

        tl.to(formRef.current, {
            width: '100%',
            height: '100%',
            duration: 0.5,
            ease: "power2.inOut"
        });
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formDataInstance = new FormData();
            for (const [key, value] of Object.entries(formData)) {
                formDataInstance.append(key, value);
            }
            await registerAction(formDataInstance);
            setIsRegistered(true);
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (isRegistered) {
        return <TeamWelcome />;
    }

    return (
        <div className="w-screen h-screen bg-gradient-to-br from-neutral-900 to-teal-800 text-white p-4 flex items-center justify-center overflow-hidden">
            <div className="w-full max-w-6xl">
                <div id="banner" ref={bannerRef} className="text-center mb-8">
                    <h1 className="uppercase text-[20vw] font-bold stroke-2 stroke-amber-500">
                        {"ENIGMA".split('').map((letter, index) => (
                            <span
                                key={index}
                                ref={(el: HTMLSpanElement | null) => {
                                    letterRefs.current[index] = el;
                                }}
                                className="inline-block"
                            >
                                {letter}
                            </span>
                        ))}
                    </h1>
                </div>
                {showForm && (
                    <div className="flex w-full">
                        <div className="w-11/12 pr-8">
                            <form onSubmit={handleSubmit} ref={formRef} className="w-full mt-8 space-y-6 transition-all duration-500 ease-in-out">
                                <div className="grid grid-cols-2 gap-6">
                                    {registerFormSchema.map((field, index) => (
                                        <div key={field.name} className={`flex flex-col ${index % 2 === 0 && index === registerFormSchema.length - 1 ? 'col-span-2' : ''}`}>
                                            <label htmlFor={field.name} className="mb-2 font-semibold">
                                                {field.label}
                                            </label>
                                            <input
                                                onChange={(e) => handleChange(e)}
                                                type={field.type}
                                                id={field.name}
                                                name={field.name}
                                                placeholder={field.placeholder}
                                                required={field.required}
                                                className="p-3 rounded bg-neutral-800 text-white border border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-300 w-full"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-3 px-6 bg-teal-600 hover:bg-teal-700 rounded text-white font-semibold transition-colors text-lg"
                                >
                                   Join Team 
                                </button>
                            </form>
                        </div>
                        {/* <div className="w-1/12 bg-black text-white flex items-center justify-center">
                            <h2 className="text-4xl font-bold text-white transform -rotate-90">ENIGMA</h2>
                        </div> */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;