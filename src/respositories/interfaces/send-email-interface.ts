export interface SendEmailInterface {
  sendEmail(email: string, token: string): Promise<void>;
}
