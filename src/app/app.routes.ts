import { Routes } from '@angular/router';
import { HomeComponent } from './pagina/home/home.component';
import { ContatoComponent } from './pagina/contato/contato.component';
import { MenuComponent } from './pagina/menu/menu.component';
import { ListaComponent } from './pagina/lista/lista.component';
import { ChatComponent } from './pagina/chat/chat.component';
import { EventosComponent } from './pagina/eventos/eventos.component';
import { LojaComponent } from './pagina/loja/loja.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'contato', component: ContatoComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'lista', component: ListaComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'eventos', component: EventosComponent },
  { path: 'loja', component: LojaComponent }
];

