interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}

const users: User[] = [
    { id: "1", name: "soumay", email: "soumay@gmail.com", password: "soumay-enigma" },
    { id: "2", name: "keshav", email: "keshav@gmail.com", password: "keshav-enigma" },
    { id: "3", name: "abdus", email: "abdus@gmail.com", password: "abdus-enigma" },
];

export default users;
