import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { MapMarker } from "../../../../node_modules/@angular/google-maps/index";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contato',
  standalone: true,
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css'],
  imports: [NgFor,NgIf,CommonModule,FormsModule]
})

export class ContatoComponent {
  categoriaSelecionada: string | null = null;
  celulaSelecionada: any = null;

  agendamento = {
    nome: '',
    whatsapp: ''
  };

  categorias = [
    { tipo: 'jovens', titulo: 'Células de Jovens' },
    { tipo: 'adultos', titulo: 'Células de Adultos' },
    { tipo: 'casais', titulo: 'Células de Casais' }
  ];

  celulasPorCategoria: any = {
    jovens: [
      {
        nome: 'Geração Eleita',
        lider: 'João Victor',
        telefone: '(11) 95224-9136',
        endereco: 'Rua das Flores, 123 - Bairro A',
        dia: 'Terças-feiras',
        historia: 'Grupo jovem fundado em 2015, focado no crescimento espiritual e comunhão.'
      },
      {
        nome: 'Avivados',
        lider: 'Rebeca Silva',
        telefone: '(11) 94605-4191',
        endereco: 'Av. Central, 456 - Bairro B',
        dia: 'Quartas-feiras',
        historia: 'Grupo que promove adoração e fortalecimento na fé para jovens.'
      }
    ],
    adultos: [
      {
        nome: 'Firmes na Fé',
        lider: 'Carlos Santos',
        telefone: '(11) 93456-7890',
        endereco: 'Rua Esperança, 789 - Bairro C',
        dia: 'Segundas-feiras',
        historia: 'Célula para adultos com foco em estudo bíblico profundo e apoio mútuo.'
      }
    ],
    casais: [
      {
        nome: 'Juntos em Cristo',
        lider: 'Ana e Pedro Rocha',
        telefone: '(11) 94567-8901',
        endereco: 'Rua do Amor, 101 - Bairro D',
        dia: 'Sextas-feiras',
        historia: 'Grupo dedicado a fortalecer casais na caminhada cristã e no amor conjugal.'
      }
    ]
  };

  selecionarCategoria(tipo: string): void {
    this.categoriaSelecionada = tipo;
    this.celulaSelecionada = null;
  }

  selecionarCelula(celula: any): void {
    this.celulaSelecionada = celula;

    // limpa o agendamento quando selecionar outra célula
    this.agendamento = { nome: '', whatsapp: '' };
  }

  agendarVisita(event: Event): void {
    event.preventDefault();

    if (!this.agendamento.nome.trim() || !this.agendamento.whatsapp.trim()) {
      alert('Por favor, preencha seu nome e WhatsApp para agendar a visita.');
      return;
    }

    const msg =
      `Olá, ${this.celulaSelecionada.lider}! Gostaria de agendar uma visita à célula "${this.celulaSelecionada.nome}".\n` +
      `Meu nome é ${this.agendamento.nome} e meu WhatsApp é ${this.agendamento.whatsapp}.\n` +
      `Por favor, entre em contato comigo para combinarmos os detalhes.`;

    const telLider = this.celulaSelecionada.telefone.replace(/\D/g, '');
    const urlWhats = `https://wa.me/${telLider}?text=${encodeURIComponent(msg)}`;

    window.open(urlWhats, '_blank');
  }

  getTituloCategoria(tipo: string): string {
    const cat = this.categorias.find(c => c.tipo === tipo);
    return cat ? cat.titulo : '';
  }
}