import axios from "axios";

class MessageHelper {
  // Função para enviar uma mensagem através da API do WhatsApp.
  // Parâmetros:
  // - data: Objeto contendo os dados da mensagem a ser enviada.
  // Retorna: Uma promessa que resolve para a resposta da API.
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

  // Função para criar uma mensagem básica para o WhatsApp.
  // Parâmetros:
  // - recipient: Número do destinatário.
  // - type: Tipo de mensagem (text, image, document, template).
  // - content: Conteúdo da mensagem, dependendo do tipo.
  // Retorna: Uma string JSON representando a mensagem.
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

  // Função para criar uma mensagem de texto para o WhatsApp.
  // Parâmetros:
  // - recipient: Número do destinatário.
  // - text: Texto da mensagem.
  // Retorna: Uma string JSON representando a mensagem de texto.
  getTextMessageInput(recipient, text) {
    return this.getBasicMessage(recipient, "text", { body: text });
  }

  // Função para enviar uma imagem via URL para o WhatsApp.
  // Parâmetros:
  // - recipient: Número do destinatário.
  // Retorna: Uma string JSON representando a mensagem de imagem.
  sendImageUrl(recipient) {
    return this.getBasicMessage(recipient, "image", { link: "https://placehold.co/600x400/png" });
  }

  // Função para enviar um documento PDF para o WhatsApp.
  // Parâmetros:
  // - recipient: Número do destinatário.
  // Retorna: Uma string JSON representando a mensagem de documento.
  sendPdfDocument(recipient) {
    return this.getBasicMessage(recipient, "document", { link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", filename: "dummy.pdf" });
  }

  // Função para enviar um template de mensagem para o WhatsApp.
  // Parâmetros:
  // - recipient: Número do destinatário.
  // - name: Nome a ser incluído no template.
  // - phone: Telefone a ser incluído no template.
  // Retorna: Uma string JSON representando a mensagem de template.
  sendTemplate(recipient, name, phone) {
    try {
      return this.getBasicMessage(recipient, "template", {
        name: "modela",
        language: { code: "pt_BR" },
        components: [
          { type: "header", parameters: [{ type: "image", image: { link: "https://i.ibb.co/09TzWhf/email-beone-saude.jpg" } }] },
          {
            type: "body",
            parameters: [
              { type: "text", text: name },
              { type: "text", text: phone },
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
