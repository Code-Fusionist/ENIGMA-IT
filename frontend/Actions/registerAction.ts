'use server'

import prisma from "@/prisma/index";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";

export async function registerAction(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const designation = formData.get('designation') as string;
    const team = formData.get('team') as string;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                designation,
                team,
            }
        });

        revalidatePath('/register');
        return { success: true, message: 'User registered successfully', data: user };
    } catch (error) {
        return { success: false, message: 'Failed to register user' };
    }
}


