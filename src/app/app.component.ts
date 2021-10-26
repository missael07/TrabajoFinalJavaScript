import { Component } from '@angular/core';
import { EventManager } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 title = 'calculadora';
  resultado = '';
  operador = '';
  valor1 = '';
  valor = '0';
  btnText = 'Landscape';
  lastOperation = '';
  isFinishOperation = false;
  containDot = false;
  isLandscape = false;
  isAdvanceOperation = false;

constructor(private eventManager: EventManager) {
    const removeGlobalEventListener = this.eventManager.addGlobalEventListener(
      'document',
      'keydown',
      (ev) => {
        switch (ev.key) {
        case 'Enter':
            this.finishOperation();
            break;
        case 'Backspace':
            this.resetValues();
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            this.setOperator(ev.key);
            break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
        case '.':
            this.setValue(ev.key);
            break;
        }
      }
    );
  }

  changeOrientation = () => {
    this.isLandscape = !this.isLandscape;
    this.btnText = this.isLandscape ? 'Vertical' : 'Landscape';
  }

  setValue = (value) => {

    if (this.isFinishOperation === true) {
      this.valor = value;
      this.isFinishOperation = false;
    }
    else {
      if (!this.valor && value.includes('.')) {
        this.containDot = true;
        this.valor = ('0' + value).toString();
      }
      else {
        this.valor = this.valor === '0' ? value : this.valor + value.toString();
      }
    }
  }

  resetValues = () => {
    this.valor = '0';
    this.operador = '';
    this.isFinishOperation = false;
    this.lastOperation = '';
  }

  negativePositive = () => this.valor = (parseFloat(this.valor) * -1).toString();

  getPercentage = () => this.valor = (parseFloat(this.valor) / 100).toString();

  setOperator = (operator) => {
    this.valor1 = this.valor;
    this.operador = operator;
    this.containDot = false;
    this.valor = '';

  }

  finishOperation = () => {

    this.lastOperation = '';
    if (this.operador !== '%') {
      this.hasOperator(this.operador);
      this.isFinishOperation = true;
      this.containDot = false;
    }
    else {
      this.getPercentage();
    }
  }

  hasOperator = (operador) => {
    switch (operador) {
      case '+':
         this.lastOperation = `${this.valor} + ${this.valor1}=`;
         this.valor = (parseFloat(this.valor) + parseFloat(this.valor1)).toString();
         break;
       case '-':
         this.lastOperation = `${this.valor1} - ${this.valor}=`;
         this.valor = (parseFloat(this.valor1) - parseFloat(this.valor)).toString();
         break;
       case '*':
         this.lastOperation = `${this.valor} * ${this.valor1}=`;
         this.valor = (parseFloat(this.valor) * parseFloat(this.valor1)).toString();
         break;
      case '/':
         this.lastOperation = `${this.valor1} / ${this.valor}=`;
         this.valor = (parseFloat(this.valor1) / parseFloat(this.valor)).toString();
         break;
    }
  }

  pi = () => {
    this.lastOperation = '';
    this.valor = Math.PI.toString();
  }

  power = (powerToRise) => {
    this.isAdvanceOperation = true;
    this.lastOperation = `${this.valor} ^ ${powerToRise}=`;
    this.valor = Math.pow(parseInt(this.valor, 10), powerToRise).toString();
  }

  root = (rootToGet) => {
    this.isAdvanceOperation = true;
    this.lastOperation = rootToGet === 2 ? '√' : '3√';
    this.lastOperation += `${this.valor}=`;
    this.valor = rootToGet === 2 ? Math.sqrt(parseInt(this.valor, 10)).toString() :  Math.pow(parseInt(this.valor, 10), 1 / 3).toString();
  }
}
