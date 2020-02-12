import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html'
})
export class CalendarComponent implements OnInit {

  private historicoActive: boolean = false;
  private agendadoActive: boolean = false;
  private notasActive: boolean = false;
  private mainActive: boolean = true;
  private availableDay: boolean = false;
  private monthNow: number = 0;
  private monthCurrentString: String = "";
  private todayDate: number = Date.now();

  private t: Date = new Date();

  constructor() { }

  ngOnInit() {
    this.getMonthCurrentNumber();
  }

  getMonthCurrentNumber() {
    let monthNumber: number = this.getMonth();
    this.AddMonthString(monthNumber);
  }

  getMonth(): number {
    let dateNow: Date = new Date();
    let monthNumber: number = dateNow.getMonth() + 1;
    this.monthNow = monthNumber;
    return this.monthNow;
  }

  AddMonthString(monthNumber: number) {
    let option: number = monthNumber;
    switch (option) {
      case 1:
        this.monthCurrentString = 'Janeiro';
        break;
      case 2:
        this.monthCurrentString = 'Fevereiro';
        break;
      case 3:
        this.monthCurrentString = 'Março';
        break;
      case 4:
        this.monthCurrentString = 'Abril';
        break;
      case 5:
        this.monthCurrentString = 'Maio';
        break;
      case 6:
        this.monthCurrentString = 'Junho';
        break;
      case 7:
        this.monthCurrentString = 'Julho';
        break;
      case 8:
        this.monthCurrentString = 'Agosto';
        break;
      case 9:
        this.monthCurrentString = 'Setembro';
        break;
      case 10:
        this.monthCurrentString = 'Outubro';
        break;
      case 11:
        this.monthCurrentString = 'Novembro';
        break;
      case 12:
        this.monthCurrentString = 'Dezembro';
        break;
      default:
        this.monthCurrentString = 'Problema no Mês';
    }

  }

  isActiveHistorico() {
    this.historicoActive = true;
    this.agendadoActive = false;
    this.notasActive = false;
    this.mainActive = false;
  }

  isActiveAgendados() {
    this.agendadoActive = true;
    this.historicoActive = false;
    this.notasActive = false;
    this.mainActive = false
  }

  isActiveNotas() {
    this.notasActive = true;
    this.historicoActive = false;
    this.agendadoActive = false;
    this.mainActive = false;
  }

  btnPrevious() {
    //this.monthCurrentString    
    this.monthNow -= 1;
    if (this.monthNow > 0 && this.monthNow < 13)
      this.AddMonthString(this.monthNow);
    else if (this.monthNow < 1)
      this.monthNow = 1;    
  }

  btnNext() {
    this.monthNow += 1;
    if (this.monthNow > 0 && this.monthNow < 13)
      this.AddMonthString(this.monthNow);    
    else if (this.monthNow > 12)
      this.monthNow = 12;
  }

}
