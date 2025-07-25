import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
  standalone: true,
  imports: [NgFor,NgIf,CommonModule,FormsModule],
})
 
export class EventosComponent {

  valorEvento = 650;
  pagamentoSelecionado: 'pix' | 'boleto' | 'cartao' | '' = '';
  parcelasDisponiveis = [1, 2, 3, 4, 5, 6];
  parcelasCalculadas: { numero: number; valor: number; data: Date }[] = [];
  qrCodePix = 'https://api.qrserver.com/v1/create-qr-code/?data=retiro@zoe.com&size=150x150';

  @ViewChild('vencimentoInput', { static: false }) vencimentoInput!: ElementRef<HTMLInputElement>;
  @ViewChild('nomeInput', { static: false }) nomeInput!: ElementRef<HTMLInputElement>;
  @ViewChild('whatsappInput', { static: false }) whatsappInput!: ElementRef<HTMLInputElement>;
  @ViewChild('cpfInput', { static: false }) cpfInput!: ElementRef<HTMLInputElement>;
  @ViewChild('cartaoNumero', { static: false }) cartaoNumero!: ElementRef<HTMLInputElement>;
  @ViewChild('cartaoValidade', { static: false }) cartaoValidade!: ElementRef<HTMLInputElement>;
  @ViewChild('cartaoCVC', { static: false }) cartaoCVC!: ElementRef<HTMLInputElement>;

  dataVencimento!: string;
  exibirPixPorParcela = false;
  parcelaSelecionada: number | null = null;
  valorParcelaSelecionada!: number;

  mostrar(opcao: 'pix' | 'boleto' | 'cartao') {
    this.pagamentoSelecionado = opcao;
    this.parcelasCalculadas = [];
    this.parcelaSelecionada = null;
  }

  atualizarParcelas(event: Event) {
    const selectParcelas = (event.target as HTMLElement).closest('form')?.querySelector('#parcelas') as HTMLSelectElement;
    const inputVencimento = (event.target as HTMLElement).closest('form')?.querySelector('#vencimento') as HTMLInputElement;

    if (!selectParcelas || !inputVencimento) return;

    this.dataVencimento = inputVencimento.value;
    const numParcelas = Number(selectParcelas.value);
    const dataBase = new Date(this.dataVencimento);

    if (isNaN(numParcelas) || !dataBase.getTime()) {
      this.parcelasCalculadas = [];
      return;
    }

    const valorParcela = this.valorEvento / numParcelas;
    const parcelas: { numero: number; valor: number; data: Date }[] = [];

    for (let i = 0; i < numParcelas; i++) {
      const dataParcela = new Date(dataBase);
      dataParcela.setMonth(dataParcela.getMonth() + i);
      parcelas.push({
        numero: i + 1,
        valor: valorParcela,
        data: dataParcela,
      });
    }

    this.parcelasCalculadas = parcelas;
    this.exibirPixPorParcela = this.pagamentoSelecionado === 'boleto';
  }

  alternarDetalhesPix(parcelaNumero: number) {
    if (this.parcelaSelecionada === parcelaNumero) {
      this.parcelaSelecionada = null;
      this.valorParcelaSelecionada = 0;
    } else {
      this.parcelaSelecionada = parcelaNumero;

      const parcela = this.parcelasCalculadas.find(p => p.numero === parcelaNumero);
      this.valorParcelaSelecionada = parcela ? parcela.valor : 0;
    }
  }

 enviarInscricao(event: Event) {
  event.preventDefault();

  const nome = this.nomeInput.nativeElement.value.trim();
  const whatsapp = this.whatsappInput.nativeElement.value.trim();
  const cpf = this.cpfInput.nativeElement.value.trim();

  if (!nome || !whatsapp || !cpf) {
    alert('Por favor, preencha todos os dados pessoais.');
    return;
  }

  if (!this.pagamentoSelecionado) {
    alert('Por favor, selecione a forma de pagamento.');
    return;
  }

  if (this.pagamentoSelecionado === 'cartao') {
    const numero = this.cartaoNumero.nativeElement.value.trim();
    const validade = this.cartaoValidade.nativeElement.value.trim();
    const cvc = this.cartaoCVC.nativeElement.value.trim();

    if (!numero || !validade || !cvc) {
      alert('Por favor, preencha os dados do cartão.');
      return;
    }
  }

  let parcelasTexto = '';
  if (this.pagamentoSelecionado === 'boleto' && this.parcelasCalculadas.length > 0) {
    parcelasTexto = '\nParcelas:\n';
    this.parcelasCalculadas.forEach(parcela => {
      const dataFormatada = parcela.data.toLocaleDateString('pt-BR');
      parcelasTexto += `  Parcela ${parcela.numero}: R$ ${parcela.valor.toFixed(2)} - Vencimento: ${dataFormatada}\n`;
    });
  }

  const mensagem = encodeURIComponent(
    `Nova inscrição:\nNome: ${nome}\nWhatsApp: ${whatsapp}\nCPF: ${cpf}\nPagamento: ${this.pagamentoSelecionado.toUpperCase()}${parcelasTexto}`
  );

  const whatsappLider = '+5511946054191';
  const linkWhatsapp = `https://api.whatsapp.com/send?phone=${whatsappLider}&text=${mensagem}`;
  window.open(linkWhatsapp, '_blank');

  alert('Inscrição enviada com sucesso!');

  // Limpar inputs
  this.nomeInput.nativeElement.value = '';
  this.whatsappInput.nativeElement.value = '';
  this.cpfInput.nativeElement.value = '';
  if (this.pagamentoSelecionado === 'cartao') {
    this.cartaoNumero.nativeElement.value = '';
    this.cartaoValidade.nativeElement.value = '';
    this.cartaoCVC.nativeElement.value = '';
  }

  // Resetar variáveis internas
  this.pagamentoSelecionado = '';
  this.parcelasCalculadas = [];
  this.parcelaSelecionada = null;
  this.valorParcelaSelecionada = 0;
  this.dataVencimento = '';
}

}