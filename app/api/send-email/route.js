import nodemailer from "nodemailer";

export async function POST(req) {
  const { to, subject, html } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"HALO STORE"  <${process.env.EMAIL}>`,
      to,
      subject,
      html,
    });
    return Response.json({ message: "Đã gửi email" });
  } catch (error) {
    console.error("Error sending email:", error);
    return Response.json({ error: "Gửi email thất bại" }, { status: 500 });
  }
}
