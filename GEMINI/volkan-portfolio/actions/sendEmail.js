// actions/sendEmail.js
"use server"; // BU SATIR ÇOK ÖNEMLİ: Bu kodun sadece sunucuda çalışacağını garanti eder.

// Basit bir validasyon fonksiyonu
const validateString = (value, maxLength) => {
  if (!value || typeof value !== "string" || value.length > maxLength) {
    return false;
  }
  return true;
};

export const sendEmail = async (formData) => {
  const senderEmail = formData.get("senderEmail");
  const message = formData.get("message");

  // 1. Sunucu Tarafı Validasyon (Asla sadece front-end'e güvenme)
  if (!validateString(senderEmail, 500)) {
    return { error: "Geçersiz E-posta adresi." };
  }
  if (!validateString(message, 5000)) {
    return { error: "Mesaj çok uzun veya geçersiz." };
  }

  // 2. Simüle Edilmiş Backend İşlemi (Buraya ileride Resend API gelecek)
  try {
    // Gerçek hayatta burada mail atacağız: await resend.emails.send(...)
    // Şimdilik network gecikmesini simüle ediyoruz:
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Sunucuya gelen mesaj:", message);
    console.log("Gönderen:", senderEmail);

    return { success: true };
  } catch (error) {
    return { error: "Bilinmeyen bir hata oluştu." };
  }
};