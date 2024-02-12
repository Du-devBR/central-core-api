import { SendEmailInterface } from "../interfaces/send-email-interface";

export class InMemorySendEmailRepository implements SendEmailInterface {
  private sentEmails: { to: string; token: string }[] = [];

  async sendEmail(email: string, token: string): Promise<void> {
    this.sentEmails.push({ to: email, token });
  }

  emailSent(email: string): boolean {
    return this.sentEmails.some((sentEmail) => sentEmail.to === email);
  }

  clearSentEmails(): void {
    this.sentEmails = [];
  }
}
