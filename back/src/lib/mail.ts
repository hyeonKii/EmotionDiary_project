import * as nodeMailer from "nodemailer";
import ejs from "ejs";
import senderInfo from "./senderinfo.json";

let emailTemplate: string;

const sendMail = async (
    receiverEmail: string,
    emailpw: string,
    content: string,
    subject: string
) => {
    ejs.renderFile(
        "src/lib/mailtemplete.ejs",
        { subject, content, emailpw },
        (err: any, data: any) => {
            if (err) {
                console.log(err);
            }
            emailTemplate = data;
        }
    );

    const transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: { user: senderInfo.user, pass: senderInfo.pass },
    });

    const mailOptions = {
        to: receiverEmail,
        subject: `${subject}`,
        html: emailTemplate,
    };
    await transporter.sendMail(mailOptions);
};
export default sendMail;
