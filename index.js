const qrcode = require("qrcode-terminal");

const { Client, LocalAuth } = require("whatsapp-web.js");

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

const options = ["1", "2", "3", "4", "5", "menu"];

const menu = `[1] - Camisas \n [2] - Regatas \n [3] - Acessórios \n [4] - Seja uma equipe parceira \n [5] - Atendimento personalizado \n \n Nosso Instagram: https://www.instagram.com/vista.jitsu/`;
const voltar = `\n \n Digite [menu] para ver as opções...`;
var wanttotalk = false;

let customers = [];

client.on("message", async (message) => {
  console.log(message);

  const customer = {
    name: message._data.notifyName,
    number: message._data.from.split("@")[0],
  };

  if (!wanttotalk) {
    if (!customers.some((c) => c.name === customer.name)) {
      //Primeira vez !
      await message.reply(`Olá ${customer.name}, \n Bem-vindo a JITSU STORE ! \n Em que podemos ajudá-lo ? \n \n ${menu}`);
      customers.push(customer);
    } else {
      if (options.some((o) => message.body === o)) {
        if (message.body.toLowerCase() === "menu") {
          await message.reply(`Aqui estão nossas opções: ${menu}`);
        }
        if (message.body === "1") {
          await message.reply(`Camisas 100% Algodão \n Tamanhos: [P ao XGG]  e [G1 a G4] \n Várias cores ! \n Confira em --> https://jitsu.com.br/?cat=street ${voltar}`);
        }
        if (message.body === "2") {
          await message.reply(`Regatas 100% Algodão \n Tamanhos: [P ao XGG]  e [G1 a G4] \n Várias cores ! \n Confira em --> https://jitsu.com.br/?cat=regatas ${voltar}`);
        }
        if (message.body === "3") {
          await message.reply(`Canecas personalizadas com tema de Jiu-Jitsu \n Confira em --> https://jitsu.com.br/?cat=canecas ${voltar}`);
        }
        if (message.body === "4") {
          await message.reply(`Quer ser uma equipe parceira ? \n Preencha seus dados neste formulário: https://jitsudev.github.io/suaequipe/# ${voltar}`);
        }
        if (message.body === "5") {
          wanttotalk = true;
          await message.reply(`Aguarde um momento...`);
        }
      } else {
        await message.reply(`Opção inválida ! ${voltar}`);
      }
    }
  }
});

client.initialize();
