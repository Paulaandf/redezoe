import express from 'express';
import { createTransport } from 'nodemailer';
import cors from 'cors';
import { json } from 'body-parser';

const app = express();
app.use(cors());
app.use(json());

app.post('/enviar-carne', async (req, res) => {
  const { nome, email, evento, parcelas, vencimento, valorTotal, chavePix } = req.body;

  const valorParcela = (valorTotal / parcelas).toFixed(2);

  let corpoEmail = `
    <h3>Olá ${nome},</h3>
    <p>Segue o carnê do evento <strong>${evento}</strong>.</p>
    <p><strong>Total:</strong> R$ ${valorTotal} em ${parcelas}x de R$ ${valorParcela}</p>
    <p><strong>Data de vencimento da 1ª parcela:</strong> ${vencimento}</p>
    <h4>🔑 Chave PIX:</h4>
    <p>${chavePix}</p>
    <hr>
    <p>As parcelas seguintes vencem mensalmente a partir da primeira data.</p>
  `;

  const transporter = createTransport({
    service: 'gmail',
    auth: {
      user: 'paulaafarias96@gmail.com',
      pass: 'Bu@637959'
    }
  });

  try {
    await transporter.sendMail({
      from: '"Equipe de Eventos" <paulaafarias96@gmail.com>',
      to: email,
      subject: `Carnê de pagamento - ${evento}`,
      html: corpoEmail
    });

    res.status(200).json({ mensagem: 'Carnê enviado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao enviar o carnê.' });
  }
});

app.listen(8080, () => {
  console.log('Servidor rodando na porta 8080');
});

function enviarFormulario(event, evento) {
  event.preventDefault();

  const id = evento.includes("LEGACS") ? "1" : "2";
  const nome = document.getElementById("nome" + id).value;
  const email = document.getElementById("email" + id).value;
  const parcelas = document.getElementById("parcelasCarne" + id)?.value || 1;
  const vencimento = document.getElementById("vencimentoCarne" + id)?.value || "";
  const metodo = document.getElementById("pagamento" + id).value;

  const valorEvento = evento.includes("LEGACS") ? 100 : 50;
  const chavePix = evento.includes("LEGACS") ? "chavepix-LEGACS" : "chavepix-ACAMP";

  if (metodo === "boleto") {
    fetch('http://localhost:8080/enviar-carne', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome,
        email,
        evento,
        parcelas,
        vencimento,
        valorTotal: valorEvento,
        chavePix
      })
    })
    .then(response => response.json())
    .then(data => alert(data.mensagem))
    .catch(() => alert("Erro ao enviar o carnê."));
  } else {
    alert(`Inscrição realizada para: ${evento}\nPagamento via ${metodo} simulado.`);
  }
}
