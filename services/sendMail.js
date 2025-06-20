import nodemailer from "nodemailer"
import ejs from "ejs"
async function sendMail(email, url, fullName,temppassword, content) { 
    let testAccount = await nodemailer.createTestAccount();
  
    
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.USER,  
        pass: process.env.PASS
      },
    });
    
   
     const data = await ejs.renderFile(content,{fullName, url,temppassword});
      const options = {
        from: "Support@logseller.com",
        to: email,
        subject: 'Reset Password',
        html: data
      }
      transporter.sendMail(options, (err,info) => {
        if(err){
            console.log(err)
            throw Error(err);
        }
        else{ 
    console.log("Message sent: %s", info.messageId); 
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));  
        }
        return {message: 'message Sent'}
      })
      
  
  }
  export default sendMail;