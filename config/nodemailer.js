const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
module.exports.nodemailer=async ()=>{
  
try{
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service:'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'adts625@gmail.com', // generated ethereal user
      pass: 'Aadi@764', // generated ethereal password
      },
     });
    }catch(err){
    console.log(err,'error in creating nodemailer');
    return;
       };

  }

