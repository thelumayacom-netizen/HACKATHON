import { Resend } from 'resend';

const resend = new Resend('re_5ppbjvPL_L7p7ZZDacffgRBC2UR7B9wWv');

export const emailService = {
  async sendBattleInvitation(inviterEmail: string, inviteeEmail: string, battleId: string) {
    try {
      const acceptUrl = `${window.location.origin}/battle-response?id=${battleId}&action=accept`;
      const declineUrl = `${window.location.origin}/battle-response?id=${battleId}&action=decline`;
      
      const subject = 'You\'ve been challenged to a Financial Battle on StackX!';
      const content = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0a0a0a; color: #ffffff;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #00ffff; font-size: 32px; margin-bottom: 10px;">StackX Battle Challenge</h1>
            <div style="width: 60px; height: 4px; background: linear-gradient(90deg, #00ffff, #40e0d0); margin: 0 auto;"></div>
          </div>
          
          <div style="background: linear-gradient(135deg, rgba(0,255,255,0.1), rgba(0,0,0,0.8)); padding: 25px; border-radius: 12px; border: 1px solid rgba(0,255,255,0.2); margin-bottom: 25px;">
            <h2 style="color: #00ffff; margin-top: 0; font-size: 24px;">You've Been Challenged!</h2>
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 15px;">
              <strong>${inviterEmail}</strong> has challenged you to a <strong>Savings Battle</strong> on StackX!
            </p>
            <p style="font-size: 14px; color: #cccccc; line-height: 1.5;">
              This is a friendly competition to see who can save more money over the next 30 days. 
              Track your expenses, build better financial habits, and compete with your friend!
            </p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <table style="margin: 0 auto;">
              <tr>
                <td style="padding: 0 10px;">
                  <a href="${acceptUrl}" 
                     style="display: inline-block; background: linear-gradient(135deg, #00ffff, #40e0d0); 
                            color: #000000; text-decoration: none; padding: 15px 30px; 
                            border-radius: 8px; font-weight: bold; font-size: 16px;">
                    Accept Challenge
                  </a>
                </td>
                <td style="padding: 0 10px;">
                  <a href="${declineUrl}" 
                     style="display: inline-block; background: transparent; 
                            color: #ffffff; text-decoration: none; padding: 15px 30px; 
                            border: 2px solid #666666; border-radius: 8px; font-weight: bold; font-size: 16px;">
                    Decline
                  </a>
                </td>
              </tr>
            </table>
          </div>
          
          <div style="background-color: rgba(255,255,255,0.05); padding: 20px; border-radius: 8px; margin: 25px 0;">
            <h3 style="color: #00ffff; margin-top: 0; font-size: 18px;">What happens next?</h3>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="margin-bottom: 10px; padding-left: 20px; position: relative;">
                <span style="position: absolute; left: 0; color: #00ffff;">✓</span>
                Accept the challenge to start competing
              </li>
              <li style="margin-bottom: 10px; padding-left: 20px; position: relative;">
                <span style="position: absolute; left: 0; color: #00ffff;">✓</span>
                Track your daily expenses and savings
              </li>
              <li style="margin-bottom: 10px; padding-left: 20px; position: relative;">
                <span style="position: absolute; left: 0; color: #00ffff;">✓</span>
                See real-time progress in your StackX dashboard
              </li>
              <li style="margin-bottom: 10px; padding-left: 20px; position: relative;">
                <span style="position: absolute; left: 0; color: #00ffff;">✓</span>
                Winner gets bragging rights and XP rewards!
              </li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #333333;">
            <p style="font-size: 14px; color: #888888; margin: 0;">
              This invitation will expire in 7 days. Join StackX to start building better financial habits!
            </p>
            <p style="font-size: 12px; color: #666666; margin: 10px 0 0 0;">
              - The StackX Team
            </p>
          </div>
        </div>
      `;

      await resend.emails.send({
        from: 'StackX <noreply@stackx.com>',
        to: inviteeEmail,
        subject: subject,
        html: content,
      });

      console.log(`Battle invitation sent successfully to ${inviteeEmail}`);
      return { success: true };
    } catch (error) {
      console.error(`Error sending battle invitation:`, error);
      return { success: false, error: error.message };
    }
  },

  async sendBattleResponse(inviterEmail: string, inviteeEmail: string, action: 'accepted' | 'declined') {
    try {
      const subject = action === 'accepted' 
        ? `${inviteeEmail} accepted your battle challenge!`
        : `${inviteeEmail} declined your battle challenge`;
        
      const content = action === 'accepted' ? `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0a0a0a; color: #ffffff;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #00ffff; font-size: 32px; margin-bottom: 10px;">Challenge Accepted!</h1>
            <div style="width: 60px; height: 4px; background: linear-gradient(90deg, #00ffff, #40e0d0); margin: 0 auto;"></div>
          </div>
          
          <div style="background: linear-gradient(135deg, rgba(0,255,255,0.1), rgba(0,0,0,0.8)); padding: 25px; border-radius: 12px; border: 1px solid rgba(0,255,255,0.2); margin-bottom: 25px;">
            <h2 style="color: #00ff00; margin-top: 0; font-size: 24px;">Battle is ON! 🔥</h2>
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 15px;">
              <strong>${inviteeEmail}</strong> has accepted your battle challenge!
            </p>
            <p style="font-size: 14px; color: #cccccc; line-height: 1.5;">
              The 30-day savings battle has officially begun. Log into StackX to track your progress and see who's winning!
            </p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${window.location.origin}/gamification" 
               style="display: inline-block; background: linear-gradient(135deg, #00ffff, #40e0d0); 
                      color: #000000; text-decoration: none; padding: 15px 30px; 
                      border-radius: 8px; font-weight: bold; font-size: 16px;">
              View Battle Progress
            </a>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #333333;">
            <p style="font-size: 14px; color: #888888; margin: 0;">
              May the best saver win! Good luck with your financial challenge.
            </p>
            <p style="font-size: 12px; color: #666666; margin: 10px 0 0 0;">
              - The StackX Team
            </p>
          </div>
        </div>
      ` : `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0a0a0a; color: #ffffff;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #ff6b6b; font-size: 32px; margin-bottom: 10px;">Challenge Declined</h1>
            <div style="width: 60px; height: 4px; background: #ff6b6b; margin: 0 auto;"></div>
          </div>
          
          <div style="background: rgba(255,107,107,0.1); padding: 25px; border-radius: 12px; border: 1px solid rgba(255,107,107,0.2); margin-bottom: 25px;">
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 15px;">
              <strong>${inviteeEmail}</strong> has declined your battle challenge.
            </p>
            <p style="font-size: 14px; color: #cccccc; line-height: 1.5;">
              No worries! You can always challenge them again later or invite other friends to compete.
            </p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${window.location.origin}/gamification" 
               style="display: inline-block; background: linear-gradient(135deg, #00ffff, #40e0d0); 
                      color: #000000; text-decoration: none; padding: 15px 30px; 
                      border-radius: 8px; font-weight: bold; font-size: 16px;">
              Challenge Someone Else
            </a>
          </div>
        </div>
      `;

      await resend.emails.send({
        from: 'StackX <noreply@stackx.com>',
        to: inviterEmail,
        subject: subject,
        html: content,
      });

      console.log(`Battle response notification sent to ${inviterEmail}`);
      return { success: true };
    } catch (error) {
      console.error(`Error sending battle response notification:`, error);
      return { success: false, error: error.message };
    }
  }
};