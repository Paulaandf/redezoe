import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentComponent } from './pagamento.component';

describe('PagamentoComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

// pagamento.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {
  dadosPagamento: any;

  salvarDados(dados: any) {
    this.dadosPagamento = dados;
  }

  obterDados() {
    return this.dadosPagamento;
  }
}
