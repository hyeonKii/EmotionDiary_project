import * as nodeMailer from "nodemailer";
const senderInfo = require("../lib/senderinfo.json");
const sendMail = async (receiverEmail: string, emailpw: string, content: string) => {
    const transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: { user: senderInfo.user, pass: senderInfo.pass },
    });

    const mailOptions = {
        to: receiverEmail,
        subject: "가입 인증 메일",
        html: `
        ${content}<br/>
        ${emailpw}
        `,
    };
    await transporter.sendMail(mailOptions);
};
export default sendMail;
