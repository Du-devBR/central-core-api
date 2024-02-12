import { SendEmailInterface } from "@/respositories/interfaces/send-email-interface";
import transporter from "@/utils/email-configuration";

export class SendEmailConfirmAccount implements SendEmailInterface {
  async sendEmail(email: string, token: string): Promise<void> {
    const mailOptions = {
      from: "dubillstestes@gmail.com",
      to: email,
      subject: "Confirmação de Conta",
      text: "Por favor, clique no link para confirmar sua conta.",
      html: `<p>Por favor, clique no link para confirmar sua conta <br> :  ${token}.</p>`,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {}
  }
}
