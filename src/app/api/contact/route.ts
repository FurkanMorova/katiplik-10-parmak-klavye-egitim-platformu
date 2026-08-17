import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Lütfen tüm alanları doldurunuz.' },
        { status: 400 }
      );
    }

    // Basit e-posta format doğrulaması
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Lütfen geçerli bir e-posta adresi giriniz.' },
        { status: 400 }
      );
    }

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpTo = process.env.SMTP_TO || smtpUser;

    if (!smtpUser || !smtpPass) {
      console.warn('SMTP_USER or SMTP_PASS is not configured in .env');
      return NextResponse.json(
        { error: 'E-posta sunucusu henüz yapılandırılmamış. Lütfen .env dosyasını kontrol ediniz.' },
        { status: 500 }
      );
    }

    // Gmail SMTP Transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: `"${name}" <${smtpUser}>`,
      replyTo: email,
      to: smtpTo,
      subject: `📩 Yeni İletişim Formu Mesajı: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f7f6; padding: 25px; border-radius: 10px;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
            <div style="border-bottom: 2px solid #f59e0b; padding-bottom: 15px; margin-bottom: 20px;">
              <h2 style="color: #111827; margin: 0;">📩 ParmakAkademi İletişim Bildirimi</h2>
            </div>
            
            <p style="font-size: 15px; color: #374151; margin-bottom: 8px;"><strong>Gönderen Adı:</strong> ${name}</p>
            <p style="font-size: 15px; color: #374151; margin-bottom: 8px;"><strong>E-Posta Adresi:</strong> <a href="mailto:${email}" style="color: #f59e0b;">${email}</a></p>
            <p style="font-size: 15px; color: #374151; margin-bottom: 20px;"><strong>Tarih:</strong> ${new Date().toLocaleString('tr-TR')}</p>
            
            <div style="background-color: #f9fafb; border-left: 4px solid #f59e0b; padding: 15px 20px; border-radius: 4px; margin-top: 15px;">
              <h3 style="color: #1f2937; margin-top: 0; font-size: 15px;">Mesaj İçeriği:</h3>
              <p style="color: #4b5563; font-size: 15px; line-height: 1.7; white-space: pre-wrap; margin: 0;">${message}</p>
            </div>
            
            <div style="margin-top: 25px; font-size: 12px; color: #9ca3af; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 15px;">
              Bu e-posta ParmakAkademi iletişim formu üzerinden otomatik olarak gönderilmiştir.
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Mesajınız başarıyla iletildi!' });
  } catch (error: any) {
    console.error('Contact Form SMTP Error:', error);
    return NextResponse.json(
      { error: 'Mesaj gönderilirken bir hata oluştu: ' + (error.message || 'Bilinmeyen hata') },
      { status: 500 }
    );
  }
}
