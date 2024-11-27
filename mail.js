const nodemailer = require('nodemailer')

exports.mailsend = (name, email,category,grievance) => {
    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hero99492@gmail.com',
            pass: 'vyzn wrhz iscz smtn'
        }
    });

    const mailOptions = {
        from: email, // Sender's email
        to: 'hero99492@gmail.com', // Superhero's email
        subject: `New Grievance Submitted by ${name}`,
        text: `You have received a new grievance:\n\nName: ${name}\nEmail: ${email}\nGrievance: ${grievance}\nThreat levels:${category}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};