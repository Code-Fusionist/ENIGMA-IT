// src/app/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"; // Shadcn UI Button component
import { Plus } from "lucide-react"; // Using lucide-react for icons

const menuItems = ["Blog", "Member", "Events", "Contact"];

export default function Sidebar() {
    const [activeTab, setActiveTab] = useState<string>("");

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="h-full bg-black text-white flex flex-col justify-between p-4 w-64">
                <div>
                    <div className="text-lg font-bold mb-6">Admin</div>
                    <div className="space-y-2">
                        {menuItems.map((item) => (
                            <Button
                                key={item}
                                variant={activeTab === item ? "default" : "ghost"}
                                className={`w-full justify-start ${activeTab === item ? "bg-gray-800" : "hover:bg-gray-700 hover:text-white"
                                    }`}
                                onClick={() => setActiveTab(item)}
                            >
                                {item}
                            </Button>
                        ))}
                    </div>
                </div>
                <div className="space-y-4">
                    {/* Replace adminItems with a login button */}
                    <Button
                        variant="ghost"
                        size="lg"
                        className="w-full justify-start hover:bg-gray-700 hover:text-white"
                    >
                        {/* You can replace the icon here with a login-related icon */}
                        <Plus className="mr-2 h-5 w-5 text-gray-400" />
                        Login
                    </Button>
                </div>
            </div>
        </div>
    );
}