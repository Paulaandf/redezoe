import { Component } from '@angular/core';
import { NgIf,NgFor } from '@angular/common';
@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PaymentComponent {
mensagem: any;
p: any;
pagarPix() {
throw new Error('Method not implemented.');
}
  // 🎉 Dados do evento
  eventTitle = 'Encontro da Fé 2025';

  // 🙋 Dados do formulário
  pagamentoData = {
    name: '',
    email: '',
    metodo: 'pix', // padrão
    installments: 1,
    cardNumber: '',
    expiry: '',
    cvv: ''
  };

  // 🔑 Chave PIX fixa (pode ser dinâmica se quiser)
  pixKey = 'pix@minhaigreja.com.br';
i: any;
pagamentoForm: any;

  // 📦 Método para enviar os dados
  submitPayment() {
    console.log('✅ Pagamento enviado com os seguintes dados:');
    console.table(this.pagamentoData);
    alert(`Pagamento para o evento "${this.eventTitle}" enviado com sucesso!`);
  }
}