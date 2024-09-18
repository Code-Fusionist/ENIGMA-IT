import { useRef } from 'react';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Events from "./components/Events.jsx";
gsap.registerPlugin(useGSAP);

function App() {
    const events = [
        {
            id: "001",
            title: "Event 1",
            tag: "this is tag 1",
            desc: "This is a sample description of the event 1",
            img: "https://cdn.prod.website-files.com/65d910f775d51ff5a0fc3b32/65dde1a007126bf212fe96a0_Andy-Lee%E2%80%99s-greatest-golf-challenge-Cover.webp",
        },
        {
            id: "002",
            title: "Event 2",
            tag: "this is tag 2",
            desc: "This is a sample description of the event 2",
            img: "https://cdn.prod.website-files.com/65d910f775d51ff5a0fc3b32/65dde1a007126bf212fe96a0_Andy-Lee%E2%80%99s-greatest-golf-challenge-Cover.webp",
        },
        {
            id: "003",
            title: "Event 3",
            tag: "this is tag 3",
            desc: "This is a sample description of the event 3",
            img: "https://cdn.prod.website-files.com/65d910f775d51ff5a0fc3b32/65dde1a007126bf212fe96a0_Andy-Lee%E2%80%99s-greatest-golf-challenge-Cover.webp",
        },
        {
            id: "004",
            title: "Event 4",
            tag: "this is tag 4",
            desc: "This is a sample description of the event 4",
            img: "https://cdn.prod.website-files.com/65d910f775d51ff5a0fc3b32/65dde1a007126bf212fe96a0_Andy-Lee%E2%80%99s-greatest-golf-challenge-Cover.webp",
        },
        {
            id: "005",
            title: "Event 5",
            tag: "this is tag 5",
            desc: "This is a sample description of the event 5",
            img: "https://cdn.prod.website-files.com/65d910f775d51ff5a0fc3b32/65dde1a007126bf212fe96a0_Andy-Lee%E2%80%99s-greatest-golf-challenge-Cover.webp",
        },
    ];
    return (
        <div className={"font-inter w-screen h-screen bg-black text-white overflow-x-hidden"}>
            <Events events={events} />
        </div>
    )
}
export default App;