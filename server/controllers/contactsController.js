import SendmailTransport from 'nodemailer/lib/sendmail-transport/index.js';
import ApiError from '../error/apiError.js';
import nodemailer from 'nodemailer';

class ContactsController {
  async create(req, res, next) {
    try {
      const { fullname, date, phone, email } = req.body;

      const transporter = nodemailer.createTransport({
        host: 'smtp.mail.ru',
        port: 465,
        secure: true,
        auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: `${process.env.NODEMAILER_USER}`,
        to: `${process.env.NODEMAILER_ADDRESSE}`,
        replyTo: `${email}`,
        subject: 'Заявка на экскурсию',
        text: `${fullname} ${phone} ${date} ${email}`,
        html: `
        <p> ФИО: ${fullname}</p>
        <p> Телефон: ${phone}</p>
        <p> Дата: ${date}</p>
        <p> Почта: ${email}</p>
        `,
      });

      return res.status(200).send({
        status: 200,
        message: 'Успешная отправка',
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

const contactsController = new ContactsController();

export default contactsController;
