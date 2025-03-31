import { MailerOptions } from '@nestjs-modules/mailer'; 
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { resolve } from 'path';
console.log('Ruta de plantillas:', resolve(
  __dirname,
  process.env.NODE_ENV === 'production'
    ? '../../dist/templates'
    : '../../src/templates'
));

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
    dir: resolve(
      __dirname,
      process.env.NODE_ENV === 'production'
        ? '../../dist/templates' // Asegúrate de que esta ruta esté correcta en producción
        : '../../src/templates'   // Ruta para desarrollo
    ),
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};
