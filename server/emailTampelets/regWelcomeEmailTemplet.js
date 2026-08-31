function welcomeEmailTemplate(username, useremail) {
    const appUrl = process.env.APP_URL || "http://localhost:3000";

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8" />
        <title>Welcome to Sheraz Compnay</title>
    </head>
    <body style="margin:0; padding:0; background-color:#f4f4f4;">
        
        <!-- Preheader Text (Shows in inbox preview) -->
        <div style="display:none; max-height:0; overflow:hidden;">
            Welcome to Sheraz Compnay! Start exploring your dashboard today.
        </div>

        <div style="
            font-family: Arial, sans-serif; 
            max-width: 600px; 
            margin: 40px auto; 
            padding: 20px; 
            border-radius: 10px;
            background-color: #ffffff;
            color: #333;
        ">
            <h2 style="color: #4CAF50;">
                Welcome to Sheraz Compnay, ${username}! 🎉
            </h2>

            <p>We are thrilled to have you on board.</p>

            <p>Your registered email is: <b>${useremail}</b></p>

            <p>
                Get started by exploring your dashboard, connecting with other interns,
                and making the most out of our platform.
            </p>

            <a href="${appUrl}" style="
                display: inline-block;
                padding: 12px 22px;
                margin-top: 20px;
                background-color: #4CAF50;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                font-weight: bold;
            ">
                Go to Dashboard
            </a>

            <p style="margin-top: 30px; font-size: 12px; color: #888;">
                If you did not sign up for this account, please ignore this email.
            </p>

            <p style="margin-top: 10px; font-size: 12px; color: #888;">
                © ${new Date().getFullYear()}Sheraz Compnay. All rights reserved.
            </p>
        </div>
    </body>
    </html>
    `;
}

export { welcomeEmailTemplate };
