import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-loja',
  imports: [NgFor,NgIf,FormsModule,CommonModule],
  templateUrl: './loja.component.html',
  styleUrl: './loja.component.css'
})
export class LojaComponent {
enviarPedido(_t5: { nome: string; descricao: string; preco: number; imagem: string; }) {
throw new Error('Method not implemented.');
}
  produtos = [
    {
      nome: 'Bíblia Sagrada',
      descricao: 'Versão com letras grandes e capa dura.',
      preco: 59.90,
      imagem: 'assets/biblia.jpeg'
    },
    {
      nome: 'Camiseta Fé',
      descricao: 'Camiseta com versículo estampado.',
      preco: 39.90,
      imagem: 'assets/camiseta.jpeg'
    },

    {
      nome: 'Caneca fé',
      descricao: 'café com Deus.',
      preco: 59.90,
      imagem: 'assets/caneca.jpeg'
      
    }
  ];

  produtoSelecionadoIndex: number | null = null;
  frete: number | null = null;
  total: number = 0;
  valorParcela: number = 0;
  vencimentos: string[] = [];
  pedidoEnviado = false;
  pixCopiado = false;

  dados: any = {
    quantidade: 1,
    nome: '',
    telefone: '',
    endereco: '',
    cep: '',
    tipoEntrega: '',
    pagamento: '',
    parcelas: 2,
    vencimento: ''
  };

  parcelas = [ 2, 3, 4, 5, 6];

  selecionarProduto(produto: any, index: number) {
    if (this.produtoSelecionadoIndex === index) {
      this.produtoSelecionadoIndex = null;
    } else {
      this.produtoSelecionadoIndex = index;
      this.dados = {
        quantidade: 1,
        nome: '',
        telefone: '',
        endereco: '',
        cep: '',
        tipoEntrega: '',
        pagamento: '',
        parcelas: 1,
        vencimento: ''
      };
      this.frete = null;
      this.total = produto.preco;
      this.valorParcela = produto.preco;
      this.vencimentos = [];
      this.pedidoEnviado = false;
      this.pixCopiado = false;
    }
  }

  verificarEntrega() {
    if (this.dados.tipoEntrega === 'igreja') {
      this.frete = 0;
      this.calcularTotal();
    }
  }

  calcularFrete() {
    this.frete = 10;
    this.calcularTotal();
  }

  calcularTotal() {
    if (this.produtoSelecionadoIndex === null) return;
    const precoUnitario = this.produtos[this.produtoSelecionadoIndex].preco;
    const subtotal = precoUnitario * (this.dados.quantidade || 1);
    const valorFrete = this.frete || 0;
    this.total = subtotal + valorFrete;

    if (this.dados.pagamento === 'boleto' || this.dados.pagamento === 'cartao' || this.dados.pagamento === 'pix') {
      const parcelas = this.dados.parcelas || 1;
      this.valorParcela = this.total / parcelas;
    } else {
      this.valorParcela = 0;
    }
  }

  atualizarPagamento() {
    this.vencimentos = [];

    if (this.dados.pagamento === 'pix') {
      this.dados.parcelas = 1;
      this.valorParcela = 0;
    }

    this.calcularTotal();
  }

  gerarDatasParcelas() {
    this.vencimentos = [];
    if (this.dados.vencimento && this.dados.parcelas) {
      const dataInicial = new Date(this.dados.vencimento);
      for (let i = 0; i < this.dados.parcelas; i++) {
        const dataParcela = new Date(dataInicial);
        dataParcela.setMonth(dataParcela.getMonth() + i);
        this.vencimentos.push(dataParcela.toLocaleDateString('pt-BR'));
      }
    }
  }

  

  copiarPix() {
    const chavePix = '123.456.789/0001-87';
    navigator.clipboard.writeText(chavePix).then(() => {
      this.pixCopiado = true;
      setTimeout(() => {
        this.pixCopiado = false;
      }, 3000);
    });
  }

  finalizarCompra() {
    this.pedidoEnviado = true;

    const resumo = `
🛍️ *Novo Pedido - Loja Zoe* 🛍️

👤 Nome: ${this.dados.nome}
📱 Telefone: ${this.dados.telefone}
🏡 Endereço: ${this.dados.endereco}
🚚 Entrega: ${this.dados.tipoEntrega === 'entrega' ? 'Em casa' : 'Retirada na igreja'}
📦 Produto: ${this.produtos[this.produtoSelecionadoIndex!].nome}
🔢 Quantidade: ${this.dados.quantidade}
💰 Total: R$ ${this.total.toFixed(2)}
💳 Pagamento: ${this.dados.pagamento}
${this.dados.pagamento !== 'pix' ? `📆 Parcelas: ${this.dados.parcelas}x de R$ ${this.valorParcela.toFixed(2)}` : ''}
    `.trim();

    // Enviar para admin (11958398723)
    window.open(`https://wa.me/5511958398723?text=${encodeURIComponent(resumo)}`, '_blank');

    // Enviar confirmação para o comprador
      const numeroCliente = this.dados.telefone.replace(/\D/g, '');
  if (numeroCliente.length >= 10) {
    const textoCliente = `
Olá ${this.dados.nome}! Recebemos seu pedido na Loja Zoe. Estamos preparando com carinho. Deus te abençoe! 🙌

📦 Produto: ${this.produtos[this.produtoSelecionadoIndex!].nome}
🔢 Quantidade: ${this.dados.quantidade}
💰 Total: R$ ${this.total.toFixed(2)}
💳 Pagamento: ${this.dados.pagamento}
${this.dados.pagamento !== 'pix' ? `📆 Parcelas: ${this.dados.parcelas}x de R$ ${this.valorParcela.toFixed(2)}` : ''}
    `.trim();

    window.open(`https://wa.me/55${numeroCliente}?text=${encodeURIComponent(textoCliente)}`, '_blank');
  }

    setTimeout(() => {
      this.pedidoEnviado = false;
      this.produtoSelecionadoIndex = null;
    }, 5000);
  }

  

  cancelar() {
    this.produtoSelecionadoIndex = null;
  }
}