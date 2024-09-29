interface RegisterFormSchema {
    name: string;
    type: string;
    placeholder: string;
    label: string;
    required: boolean;
}

const registerFormSchema: RegisterFormSchema[] = [
    {
        name: "name",
        type: "text",
        placeholder: "Name",
        label: "Name",
        required: true,
    },
    {
        name: "email",
        type: "email",
        placeholder: "Email",
        label: "Email",
        required: true,
    },
    {
        name: "password",
        type: "password",
        placeholder: "Password",
        label: "Password",
        required: true,
    },
    {
        name: "designation",
        type: "text",
        placeholder: "Designation",
        label: "Designation",
        required: true,
    },
    {
        name: "team",
        type: "text",
        placeholder: "Team",
        label: "Team",
        required: true,
    },
]

export default registerFormSchema;