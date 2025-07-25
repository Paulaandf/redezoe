import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // ✅ necessário para ngModel
import { AppComponent } from './app.component';
import { EventosComponent } from './pagina/eventos/eventos.component';
import { AppRoutingModule } from './app.routes'; // ajuste o caminho conforme necessário

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay())
  ]
};



@NgModule({
  declarations: [
   
   
    // outros componentes também!
  ],
  imports: [
    BrowserModule,
    FormsModule,
    
  ],
  providers: [],
  bootstrap: []
})
export class AppModule {}