import { Component, OnInit } from '@angular/core';
import { DatepickerOptions } from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/fr';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientCompany } from './../../models/client-company.model'
import { ClientCompanyService } from './../../services/client-company.service'
import { ClientService } from './../../services/client.service'

@Component({
  selector: 'app-work-data',
  templateUrl: './work-data.component.html'
})
export class WorkDataComponent implements OnInit {
  options: DatepickerOptions = {
    minYear: 1940,
    maxYear: 2000,
    displayFormat: 'yyyy-MM-dd',
    barTitleFormat: 'yyyy-MM-dd',
    dayNamesFormat: 'dd',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    locale: frLocale,
    minDate: new Date(), // Minimal selectable date
    maxDate: new Date(),  // Maximal selectable date
    barTitleIfEmpty: 'Click to select a date'
  };
  loading: boolean = false
  clientId: number
  requestCredit: ClientCompany = {
    IdClient: 0,
    NameCompany: '',
    NitCompany: '',
    Salary: 0,
    AdmissionDate: new Date(),
    CreditAproval: 0
  }
  constructor(public _clientService: ClientService, public _clientCompanyService: ClientCompanyService, private activadedRoute: ActivatedRoute,
    private router: Router, ) { }

  ngOnInit() {
    this.activadedRoute.params.subscribe(params => {
      this.clientId = params['id']
      this.validateClient()
    })
  }

  validateClient() {
    this._clientService.getClient(this.clientId).subscribe(clients => {
      if (clients.length < 1) {
        alert("No esta registrado como cliente, por favor complete el paso 1")
        this.router.navigate(['register'])
      }else{
        this._clientCompanyService.getRequestByClient(this.clientId).subscribe(reqs => {
          if (reqs.length >= 1) {
            alert("Ya ha solicitado creditos en el pasado, no puede solicitar creditos de nuevo")
            this.router.navigate(['register'])
          } 
        })
      }
    })

    
  }

  validateRegister(): boolean {



    //Validacion para el campo NOMBRE
    if (this.requestCredit.NameCompany.length == 0) {
      alert('Debe digitar el nombre de la empresa donde trabaja actalmente!')
      return false;
    }

    //ValidacionrequestCreditpara el BIT
    if (this.requestCredit.NitCompany.length == 0) {
      alert('Debe digitar el NIT de la empresa donde trabaja actalmente!')
      return false;
    }

    //Validacion para el campo Salary
    if (String(this.requestCredit.Salary) == '') {
      alert('Debe digitar un Salario actual!')
      return false;
    }
    if (this.requestCredit.Salary == null) {
      alert('Debe digitar unSalario actual!')
      return false;
    }

    if (this.requestCredit.Salary <= 800000) {
      alert('Debe tener un sueldo superior a $800.000!')
      return false;
    }

    //Validacion de fecha de ingreso
    let anos: number = this.calcularMeses(this.requestCredit.AdmissionDate)
    
    if (anos < 18) {
      alert("Debe tener mas de 18 meses laborando en la empresa")
      return false;
    }

    return true;
  }

  requestRegister() {
    if (this.validateRegister()) {

      if (this.requestCredit.Salary > 800000 && this.requestCredit.Salary <= 1000000) {
        this.requestCredit.CreditAproval = 5000000;
      }

      if (this.requestCredit.Salary > 800000 && this.requestCredit.Salary < 1000000) {
        this.requestCredit.CreditAproval = 5000000;
      }

      if (this.requestCredit.Salary > 1000000 && this.requestCredit.Salary < 4000000) {
        this.requestCredit.CreditAproval = 20000000;
      }

      if (this.requestCredit.Salary > 4000000) {
        this.requestCredit.CreditAproval = 50000000;
      }

      this.loading = true
      this._clientService.getClient(this.clientId).subscribe(clients => {
        if (clients.length < 1) {
          alert("No esta registrado como cliente, por favor complete el paso 1")
          this.loading = false
        } else {
          this._clientCompanyService.getRequestByClient(this.clientId).subscribe(reqs => {
            if (reqs.length >= 1) {
              alert("Ya ha solicitado creditos en el pasado, no puede solicitar creditos de nuevo")
              this.loading = false
            } else {
              this.requestCredit.IdClient = this.clientId
              this._clientCompanyService.addRequestCredit(this.requestCredit).subscribe(clients => {
                if (clients["status"] == "success") {
                  alert(`Su credito ha sido aprobado por ${this.requestCredit.CreditAproval}`)
                  this.loading = false
                  this.router.navigate(['success', this.requestCredit.CreditAproval])
                  this.cleanForm();
                } else {
                  alert(clients["message"])
                }


              });
            }
          })


        }
      })



    }


  }

  cleanForm() {
    this.requestCredit.Salary = 0
    this.requestCredit.CreditAproval = null
    this.requestCredit.NameCompany = ''
    this.requestCredit.NitCompany = ''
    this.requestCredit.AdmissionDate = new Date()
  }

  calcularMeses(fecha: Date): number {
    let hoy = new Date();
    let ingreso = new Date(fecha);


    let origen = ingreso.getUTCFullYear() * 12 + ingreso.getMonth();
    let destino = hoy.getUTCFullYear() * 12 + hoy.getMonth();
    let diferencia = destino - origen;
    return diferencia;

  }


}
