const nodeMailer = require("../config/nodemailer");

module.exports.newComment=(comment) => {
    
  console.log(comment);
  console.log('inside mailers');
   
   let htmlString=nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');
  // send mail with defined transport object
 nodeMailer.transporter.sendMail({
    from: 'adarshchaudhary434@gmail.com', // sender address
    to:comment.user.email, // list of receivers
    subject: "comment published!",// Subject line
    // text: "Hello world?", // plain text body
    html:htmlString, // html body
 },(err,info) =>
    {
      if(err){console.log(err,'error in sending mails'); return}
      console.log('message sent',info);
      return;
    });
}

