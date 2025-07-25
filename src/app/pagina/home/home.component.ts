import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  {
  carrossel = [
    {
      img: 'assets/img1.jpeg',
      alt: 'Unidos pelo propósito',
      titulo: 'Quem Somos',
      texto: 'Somos a juventude que acredita no propósito, na transformação e no poder das conexões.'
    },
    {
      img: 'assets/img3.jpeg',
      alt: 'Vivendo a fé com alegria',
      titulo: 'Vivendo a fé com alegria',
      texto: 'Aqui na Rede, cada jovem tem espaço, cada história tem valor e cada encontro carrega propósito.'
    },
    {
      img: 'assets/img4.jpeg',
      alt: 'Conectados em amor',
      titulo: 'Conectados em amor',
      texto: 'Somos um movimento de fé, amizade e impacto.'
    },
    {
      img: 'assets/img5.jpeg',
      alt: 'Movimento que transforma',
      titulo: 'Movimento que transforma',
      texto: 'Nos reunimos para crescer juntos, servir com alegria e viver o amor de Deus de forma real.'
    },
    {
      img: 'assets/img6.jpeg',
      alt: 'Crescendo juntos',
      titulo: 'Crescendo juntos',
      texto: 'Seja bem-vindo à nossa família!'
    }
  ];

  lideres = [
    {
      foto: 'assets/lider1.jpg',
      nome: 'Pr. Everton Ribeiro',
      cargo: 'Pastor Principal',
      descricao: 'Fundador da Rede Zoe, dedicado a guiar a juventude com amor e sabedoria.'
    },
    {
      foto: 'assets/lider1.jpg',
      nome: 'Pra. Miria Ribeiro',
      cargo: 'Pastora Principal',
      descricao: 'Co-fundadora da Rede Zoe, conduz com graça e cuidado espiritual.'
    },
    {
      foto: 'assets/lider2.jpg',
      nome: 'teste',
      cargo: 'Líder de Jovens',
      descricao: 'Organiza eventos e discipulado, inspira os jovens a viverem uma fé ativa.'
    },
    {
      foto: 'assets/lider3.jpg',
      nome: 'Victor Silva',
      cargo: 'Discipulador',
      descricao: 'Promove estudos bíblicos e acompanha os jovens no crescimento espiritual.'
    },
    {
      foto: 'assets/lider3.jpg',
      nome: 'Rebeca Silva',
      cargo: 'Discipuladora',
      descricao: 'Ajuda no desenvolvimento espiritual dos jovens, com foco na comunhão e crescimento.'
    }
  ];
currentYear = new Date().getFullYear();

}

