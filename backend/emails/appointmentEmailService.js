
import {createTransporter} from "../config/nodemailer.js";

export async function sendEmailNewAppointment({date, time}){
    const transporter = createTransporter(
        process.env.SMTP_HOST,
        process.env.SMTP_PORT,
        process.env.SMTP_USER,
        process.env.SMTP_PASS
    );
    // enviar el correo
    const info = await transporter.sendMail({
        from: "AppSalon <citas@appsalon.com>",
        to: "admin@appsalon.com",
        subject: 'AppSalon - Nueva cita',
        text: 'AppSalon - Nueva cita',
        html: `
        <h1>AppSalon - Tienees una nueva cita</h1>
        <p>Ha agendado una cita el día ${date} a las ${time} horas</p>
        `
    });

    console.log('Correo enviado', info.messageId);
}
