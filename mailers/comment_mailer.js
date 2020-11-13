const nodemailer = require("../config/nodemailer");

module.exports.newComment=async (comment)=> {
    try{
        console.log(comment);
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'adarshchaudhary434@gmail.com', // sender address
    to:comment.user.email, // list of receivers
    subject: "comment published", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}catch(err){
    console.log(err,'error in sending mail');
    return;
}

}

