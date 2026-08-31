import chalk from "chalk";
import transporter from "../config/nodemailer.config.js";

const emailSend = async(userEmail,subject,html)=>{  //here we are sending email and these are parameters for sending email
    try {
        
        await transporter.sendMail({   //in the transpoter obj there is a function called sendmail
            from: `SHERAZ COMPONY <${process.env.SMTP_USER}>`,
            subject: subject,
            to: userEmail,
            html:html,
        })
        console.log(chalk.blueBright.bgGreen("email send successfully")) //checking if email is send
        return true;
    } catch (error) {
        console.log(chalk.red.bgBlack("failed to snd the mail"))        //checking if email is not send
        console.log(chalk.red("Error details:", error.message))         //log the actual error message
    }
}

export default emailSend;