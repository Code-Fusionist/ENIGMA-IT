import {Request, response, Response} from "express";
import {UserMailResponse} from "../dtos/userResponse.dtos";
import {UserMailRequest} from "../dtos/userMailRequest.dtos";
import {generateId} from "../utils/GenId";
import prisma from "../prisma";
import nodemailer from "nodemailer";
import {EmailReceiver} from "../dtos/emailReceiver.dtos";

export const confirmRSVP = async (req: Request<{ token: string }>, res: Response) : Promise<void> => {
    const { token } = req.params;
    console.log(token);
    try {
        const user = await prisma.user.update({
            where: { receiverToken: token },
            data: { isRSVP: true },
        });
        const view: string = `<h2>${user.name}</h2><br/><p>Your Participation is confirmed!</p>`;
        res.status(200).send(view); // Changed to 200
    } catch (err) {
        console.log("Error Confirming Participation");
        res.status(500).json({
            message: "Error during confirming participation",
        });
    }
};

export const sendEntries = async (req: Request<{}, {}, UserMailRequest>, res: Response<UserMailResponse>): Promise<void> => {
    const {emails} = req.body;

    const formattedData: { email: string, name: string, receiverToken: string }[] = emails.map(user => ({
        name: user.name,
        email: user.email,
        receiverToken: generateId(),
    }));

    try {
        await prisma.user.createMany({
            data: formattedData,
        });
        res.status(201).json({
            message: "Entries Pushed to database",
            data: formattedData
        });
    } catch (err) {
        console.log("Error pushing data");
        res.status(500).json({
            message: "Unable to Push data to database",
            data: []
        });
    }
};

export const sendMail = async (req: Request, res: Response<UserMailResponse>): Promise<void> => {
    try {
        const mailsInDB = await prisma.user.findMany();
        console.log(`Response Type: ${typeof mailsInDB}`);
        console.log(mailsInDB);
        const { subject } = req.body;
        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 465,
            secure: true,
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.USER_EMAIL_PASS
            }
        });

        if(Array.isArray(mailsInDB)) {
            mailsInDB.forEach((mail)=> {
                const userEmail :string = mail.email
                const loopBackLink: string = `${process.env.BASE_URL}/api/user/rsvp/${mail.receiverToken}`;
                const receiver: EmailReceiver = {
                    data: `<html><body><button><a href=${loopBackLink}>Click Me</a></button></body></html>`,
                    from: process.env.USER_EMAIL as string,
                    subject: subject,
                    to: userEmail
                }

                transporter.sendMail(receiver, (error, emailResponse) => {
                    if(error) throw error;
                    console.log(`SUCCESS: Email send to ${receiver.to} | EMAIL RESPONSE: ${emailResponse}`);
                    res.status(200).json({message: `Mail sent to user: ${mail.name}`, data: []});
                })
            })
        }
        else {
            res.status(404).json({
                message: "Received Response is not Array",
                data: []
            });
        }
    } catch (err) {
        console.log("Unable to fetch emails form database");
        res.status(500).json({
            message: "Unable to fetch emails form the database",
            data: []
        });
    }
}

