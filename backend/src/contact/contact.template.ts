export function buildContactEmail(
  name: string,
  email: string,
  message: string,
): string {
  const messageHtml = message
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>');

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f7f6f3;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f7f6f3;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border:1px solid #e5e2db;border-radius:8px;overflow:hidden;">

          <tr>
            <td style="background-color:#d4537e;padding:24px 32px;">
              <p style="margin:0;font-size:11px;font-weight:500;color:#fbeaf0;letter-spacing:2px;text-transform:uppercase;">Portfolio</p>
              <p style="margin:6px 0 0;font-size:20px;font-weight:600;color:#ffffff;">Nouveau message</p>
            </td>
          </tr>

          <tr>
            <td style="padding:32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f7f6f3;border-radius:6px;margin-bottom:24px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0 0 4px;font-size:11px;color:#aaaaaa;letter-spacing:1px;text-transform:uppercase;">De</p>
                    <p style="margin:0;font-size:15px;font-weight:600;color:#1a1a1a;">${name}</p>
                    <p style="margin:2px 0 0;font-size:13px;color:#666666;">${email}</p>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 12px;font-size:11px;color:#aaaaaa;letter-spacing:1px;text-transform:uppercase;">Message</p>
              <p style="margin:0;font-size:14px;color:#1a1a1a;line-height:1.7;border-left:3px solid #d4537e;padding-left:16px;">${messageHtml}</p>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;padding-top:24px;border-top:1px solid #e5e2db;">
                <tr>
                  <td>
                    <a href="mailto:${email}?subject=Re: votre message" style="display:inline-block;background-color:#d4537e;color:#ffffff;text-decoration:none;font-size:13px;font-weight:500;padding:10px 20px;border-radius:6px;">Répondre à ${name}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:16px 32px;border-top:1px solid #e5e2db;">
              <p style="margin:0;font-size:11px;color:#aaaaaa;">hammouyameriem.dev</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
