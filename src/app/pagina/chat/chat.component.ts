import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  imports: [CommonModule,FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent   implements OnInit {
  devocional = {
    nome: '',
    amigo: '',
    reflexao: ''
  };

  versiculo = {
    referencia: 'Filipenses 4:13',
    texto: 'Posso todas as coisas naquele que me fortalece.'
  };

  mensagem: string = '';
  historico: any[] = [];
item: any;

  ngOnInit() {
    const salvo = localStorage.getItem('historicoDevocional');
    if (salvo) {
      this.historico = JSON.parse(salvo);
    }
  }

  salvarDevocional() {
    const hoje = new Date();
    const dataFormatada = hoje.toLocaleDateString('pt-BR');

    const novoDevocional = {
      ...this.devocional,
      data: dataFormatada
    };

    this.historico.unshift(novoDevocional);
    localStorage.setItem('historicoDevocional', JSON.stringify(this.historico));

    this.mensagem = '✅ Devocional salvo com sucesso!';
    this.devocional = { nome: '', amigo: '', reflexao: '' };

    setTimeout(() => this.mensagem = '', 5000);
  }

}