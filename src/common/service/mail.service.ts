import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';


@Injectable()
export class EmailService {
    constructor() { }

    async sendEmailVerification(email: string, email_code: string): Promise<boolean> {

        // if (model && model.emailToken) {
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: '1111111xxxxxwilfred94@ethereal.email',
                pass: '11111111xxxxxxfTxmZ9yq785ajYft6g'
            }
        });
        let url = 'test.com'
        let mailOptions = {
            from: email,
            to: email, // list of receivers (separated by ,)
            subject: 'Verify Email',
            text: 'Verify Email',
            html: `Hi! <br><br> Thank you for joining<br><br> <a href=${url}/auth/email/verify/${email_code}>Click here to activate your account</a>`
        };


        var sent = await new Promise<boolean>(async function (resolve, reject) {
            return await transporter.sendMail(mailOptions, async (error, info) => {
                if (error) {
                    console.log('Message sent: %s', error);
                    return reject(false);
                }
                console.log('Message sent: %s', info.messageId);
                resolve(true);
            });
        })

        return sent;
    }
    //     else {
    //     throw new HttpException('REGISTER.USER_NOT_REGISTERED', HttpStatus.FORBIDDEN);
    // }

}