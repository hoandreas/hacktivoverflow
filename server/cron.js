const cron = require('node-cron')
const nodemailer = require('nodemailer')
const User = require('./models/user')
const mongoose = require('mongoose')

require('dotenv').config()

const mongooseConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateindex: true
}

mongoose.connect('mongodb://localhost/hacktiv-overflow', mongooseConfig, function(err) {
  if(err) console.log(`ಥ_ಥ Failed to connect to db`)
  else console.log(`(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ Connected to db `)
})

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD
  }
})

cron.schedule("0 13 25 * *", function() {
  console.log('cron is working lol')
  let data = []
  User.find()
    .then(result => {
      for(let i = 0; i < result.length; i++) {
        data.push(result[i].email)
      }
      let mailOptions = {
        from: process.env.GMAIL_EMAIL,
        to: data,
        subject: 'Testing using CRON',
        text: 'This is an automatically generated email, any replies in here will not be noticed, please refer to our customer service email for further assistance.'
      }
      transporter.sendMail(mailOptions, function(error, info) {
        if(error) {
          console.log(error)
        } else {
          console.log('Email sent!')
        }
      })
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
})