import * as nodeMailer from "nodemailer";
const senderInfo = require("../config/senderInfo.json");
const sendMail = async (receiverEmail: string) => {
    const transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: { user: senderInfo.user, pass: senderInfo.pass },
    });

    const mailOptions = {
        to: receiverEmail,
        subject: "가입 인증 메일",
        html: `
      가입확인 버튼를 누르시면 가입 인증이 완료됩니다.<br/>
      <form action="#" method="POST">
        <button>가입확인</button>
      </form>  
      `,
    };
    await transporter.sendMail(mailOptions);
};
export default sendMail;
