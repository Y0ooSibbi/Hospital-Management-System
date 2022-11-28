const express = require("express");
const router = new express.Router();
const nodemailer = require("nodemailer");
const mailConfig = require('../config/mailConfig');




// send mail
router.post("/sendMail",  (req, res) => {

    const { uuid, to,subjectOfMail,dataOfMail } = req.body;
    try {
        mailConfig.forEach(element => {
            if(element.uuid==uuid){
                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: element.user,
                        pass: element.pass
                    }
                });
        
                const mailOptions = {
                    from: element.user,
                    to: to,
                    subject: subjectOfMail,
                    html: dataOfMail
                };
        
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("Error" + error)
                    } else {
                        console.log("Email sent:" + info.response);
                        res.status(201).json({status:201,info})
                    }
                })

            }
        });

        

    } catch (error) {
        console.log("Error" + error);
        res.status(401).json({status:401,error})
    }
});


module.exports = router;