import logger from '@services/logger';
import { IMail } from './types';

export class MailSender {
  // eslint-disable-next-line class-methods-use-this -- TODO
  async sendEmail(mail: IMail): Promise<void> {
    logger.debug('Sending email', mail);
  }
}
