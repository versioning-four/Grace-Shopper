const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const path = require('path')
const helpers = require('./handlebar-helpers')
const dotenv = require('dotenv')
dotenv.config()

const options = {
  viewEngine: {
    extname: '.hbs',
    helpers,
    layoutsDir: path.join(__dirname, 'views', 'email'),
    partialsDir: path.join(__dirname, 'views', 'email'),
    defaultLayout: 'template'
  },
  viewPath: path.join(__dirname, 'views', 'email'),
  extName: '.hbs'
}

const mailTransporter = nodemailer.createTransport(
  {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD
    }
  },
  {
    from: 'Grace-Shopper	<grace.shopperv4@gmail.com>'
  }
)
mailTransporter.use('compile', hbs(options))

module.exports = mailTransporter
