
const nodemailer = require('nodemailer');
const dotenv =  require('dotenv');
const { verify } = require('jsonwebtoken');
dotenv.config();

const  smtOptions =  {
    host :  String(process.env.MAIL_HOST),
    port  :  String(process.env.PORT),
    auth : {
        user :  String(process.env.MAIL_USER ,
            pass =  String(process.env.PASS)),
    }
}
// send email
async function sendEmail({to, 
    subject  ,
    html , 
    from = String(process.env.MAIL_USER)}){
        // tranporter
        const  transporter =  nodemailer.createTestAccount(smtOptions);
        await transporter.sendMail({from ,to ,  subject ,  html});

    }

//  verifcation email

async  function sendVerificationEmail({user ,origin  }){
    let message =  `<p>${user.verificationToken}<p/>`;
    await  sendEmail({
        to : user.email,
        subject :  'Verfication de notre email' ,
         html  :  `<p> Merci de vous  </p>${message}`, 
        from});
}



// login

async function Login({user}){
    let message =  "<><>" ; 
    await verify({user : user.email ,});
}


// forget password

async function ForgetPassword(email , sujet , htl){
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',port: 465 ,service :"gmail",auth: {user:process.env.USER_MAIL,pass: process.env.PASS},
        tls: {rejectUnauthorized: false},
      });
    var mailOptions = {from: String("aymarbly559@gmail.com"),to: email,subject: sujet, 
      html : htl 
    };
    
    transporter.sendMail(mailOptions, (err, info)=>{
          if (err) {
              console.log(err);
          } else {
              console.log( info.response)};
          }
        )
}

module.exports = {sendVerificationEmail , Login , ForgetPassword} ; 
