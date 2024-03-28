import axios from "axios";

class MessageHelper {
  sendMessage(data) {
    const config = {
      method: "post",
      url: `${process.env.BASE_URL}/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`,
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    return axios(config);
  }

  getBasicMessage(recipient, type, content) {
    return JSON.stringify({
      messaging_product: "whatsapp",
      preview_url: false,
      recipient_type: "individual",
      to: recipient,
      type: type,
      [type]: content,
    });
  }

  getTextMessageInput(recipient, text) {
    return this.getBasicMessage(recipient, "text", { body: text });
  }

  sendImageUrl(recipient) {
    return this.getBasicMessage(recipient, "image", { link: "https://placehold.co/600x400/png" });
  }

  sendPdfDocument(recipient) {
    return this.getBasicMessage(recipient, "document", { link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", filename: "dummy.pdf" });
  }

  sendTemplate(recipient) {
    try {
      return this.getBasicMessage(recipient, "template", {
        name: "modela",
        language: { code: "pt_BR" },
        components: [
          { type: "header", parameters: [{ type: "image", image: { link: "https://i.ibb.co/09TzWhf/email-beone-saude.jpg" } }] },
          {
            type: "body",
            parameters: [
              { type: "text", text: "Mauro" },
              { type: "text", text: "oaisiduhoasidjhaspoid" },
            ],
          },
        ],
      });
    } catch (error) {
      console.error("Error sending template:", error);
      return null;
    }
  }
}

export default MessageHelper;
