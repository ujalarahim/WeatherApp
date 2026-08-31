function resetPasswordEmailTemplate(username, resetToken) {
    const resetLink = `${process.env.APP_URL}/reset-password/${resetToken}`;

    return `
    <div style="background-color: #f4f7f6; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px 0;">
        <div style="
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,0.05);
            border: 1px solid #eeeeee;
        ">
            <div style="background: linear-gradient(135deg, #FF5722 0%, #ff8a50 100%); padding: 40px 0; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">Password Reset</h1>
            </div>

            <div style="padding: 40px 30px; text-align: center;">
                <p style="font-size: 18px; color: #333333; margin-bottom: 20px;">Hi <strong>${username}</strong>,</p>
                
                <p style="font-size: 16px; color: #555555; line-height: 1.6; margin-bottom: 30px;">
                    We received a request to reset the password for your account. No changes have been made yet.
                    <br>Please click the button below to proceed.
                </p>

                <p style="
                    background-color: #FF5722;
                    color: #ffffff;
                    padding: 15px 32px;
                    text-decoration: none;
                    border-radius: 6px;
                    font-weight: bold;
                    display: inline-block;
                    font-size: 16px;
                    box-shadow: 0 4px 6px rgba(255, 87, 34, 0.2);
                    transition: background-color 0.3s;
                ">
                http://localhost:2000/api/v1/auth/reset-password/${resetToken}
                </p>

                <p style="margin-top: 30px; font-size: 14px; color: #999;">
                    This link will expire in <strong>10 minutes</strong>.
                </p>
                
                <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

                <p style="font-size: 12px; color: #aaa;">
                    If you did not request a password reset, you can safely ignore this email. Only a person with access to your email can reset your password.
                </p>
            </div>

            <div style="background-color: #fafafa; padding: 20px; text-align: center; border-top: 1px solid #eeeeee;">
                <p style="margin: 0; font-size: 12px; color: #bbbbbb;">
                    © ${new Date().getFullYear()} UCONNECT INTERS. All rights reserved.
                </p>
            </div>
        </div>
    </div>
    `;
}

export { resetPasswordEmailTemplate };