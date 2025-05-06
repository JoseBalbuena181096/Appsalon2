
import {createTransporter} from "../config/nodemailer.js";

export async function sendEmailVerification({name, email, token}){
    const transporter = createTransporter(
        process.env.SMTP_HOST,
        process.env.SMTP_PORT,
        process.env.SMTP_USER,
        process.env.SMTP_PASS
    );
    // enviar el correo
    const info = await transporter.sendMail({
        from: "AppSalon <cuentas@appsalon.com>",
        to: email,
        subject: 'Confirmar tu cuenta de AppSalon',
        text: 'Confirma tu cuenta en AppSalon',
        html: `<h1>Confirma tu cuenta en AppSalon</h1>
        <p>Para confirmar tu cuenta, por favor, da click en el siguiente enlace:</p>
        <a href="${process.env.FRONTEND_URL}/auth/confirmar-cuenta/${token}">Confirmar Cuenta</a>
        <p>Si tu no creaste esta cuenta, puedes ignorar este correo</p>
        `
    });

    console.log('Correo enviado', info.messageId);
}