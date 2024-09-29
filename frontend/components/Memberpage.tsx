"use client";
import Member from "../components/members";
import Sidebar from "../components/slidebar";
import React from "react";



export default function MemberPage() {


    return (
        <main className="flex h-screen">
            <Sidebar />

            <div className="flex-1 bg-gray-100">
                <Member />
            </div>
        </main>
    );
}
