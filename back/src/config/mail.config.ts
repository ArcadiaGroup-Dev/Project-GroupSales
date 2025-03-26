import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

export const mailConfig: MailerOptions = {
  transport: {
    host: process.env.MAIL_HOST,
    port: +process.env.MAIL_PORT,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  },
  defaults: {
    from: `"No Reply" <${process.env.MAIL_FROM}>`,
  },
  template: {
    dir: join(
      __dirname,
      process.env.NODE_ENV === 'production'
        ? '../../dist/templates'
        : '../../src/templates',
    ),
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};
