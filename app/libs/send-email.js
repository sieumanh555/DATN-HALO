export async function sendOrderConfirmation(order, userEmail) {
  const emailContent = {
    to: userEmail,
    subject: `Xác nhận đơn hàng #${order.uniqueKey}`,
    html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); padding: 30px;">
        <h2 style="color: #2c3e50;">HALO STORE</h2>
        <p style="font-size: 16px; color: #333333;">Xin chào quý khách,</p>
        <p style="font-size: 16px; color: #333333;">
          Cảm ơn quý khách đã tin tưởng và đặt hàng tại <strong>HALO STORE</strong>.
        </p>
        <p style="font-size: 16px; color: #333333;">
          Đơn hàng của quý khách <strong>#${order.uniqueKey}</strong> đã được tiếp nhận và đang được xử lý.
        </p>
        <hr style="margin: 20px 0;" />
        <p style="font-size: 14px; color: #555555;">
          Chúng tôi sẽ thông báo khi đơn hàng được giao đến cho quý khách.
        </p>
        <p style="font-size: 14px; color: #555555;">
          Mọi thắc mắc xin liên hệ email: <a href="mailto:support@halostore.com">support@halostore.com</a>.
        </p>
        <p style="margin-top: 30px; font-size: 14px; color: #999999;">
          Trân trọng,<br />
          Đội ngũ HALO STORE
        </p>
      </div>
    </div>
  `,
  };

  try {
    const res = await fetch(`/api/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailContent),
    });

    const data = await res.json();
    console.log("Email gửi thành công:", data);
  } catch (error) {
    console.error("Gửi email thất bại:", error);
  }
}
