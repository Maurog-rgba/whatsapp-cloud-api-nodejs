const axios = require("axios");

function sendMessage(data) {
  var config = {
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

function getTextMessageInput(recipient, text) {
  return JSON.stringify({
    messaging_product: "whatsapp",
    preview_url: false,
    recipient_type: "individual",
    to: recipient,
    type: "text",
    text: {
      body: text,
    },
  });
}

function sendImageUrl(recipient) {
  return JSON.stringify({
    messaging_product: "whatsapp",
    preview_url: false,
    recipient_type: "individual",
    to: recipient,
    type: "image",
    image: {
      link: "https://placehold.co/600x400/png",
    },
  });
}

function sendPdfDocument(recipient) {
  return JSON.stringify({
    messaging_product: "whatsapp",
    preview_url: false,
    recipient_type: "individual",
    to: recipient,
    type: "document",
    document: {
      link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      filename: "dummy.pdf",
    },
  });
}

function sendTemplate(recipient) {
  try {
    return JSON.stringify({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: recipient,
      type: "template",
      template: {
        name: "modela",
        language: {
          code: "pt_BR",
        },
        components: [
          {
            type: "header",
            parameters: [
              {
                type: "image",
                image: {
                  link: "https://placehold.co/600x400",
                },
              },
            ],
          },
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: "Mauro",
              },
              {
                type: "text",
                text: "oaisiduhoasidjhaspoid",
              },
            ],
          },
        ],
      },
    });
  } catch (error) {
    console.error("Error sending template:", error);
    return null;
  }
}

module.exports = {
  sendMessage: sendMessage,
  sendImageUrl: sendImageUrl,
  sendPdfDocument: sendPdfDocument,
  getTextMessageInput: getTextMessageInput,
  sendTemplate: sendTemplate,
};
