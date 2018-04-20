import { Component, OnInit } from '@angular/core';
import { ClientService } from './../../services/client.service'
import { Client } from './../../models/client.model'
import { DatepickerOptions } from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/fr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html'
})
export class ClientRegisterComponent implements OnInit {

  client: Client = {
    Id: 0,
    Document: null,
    Name: '',
    LastName: '',
    BirthDate: new Date()
  }
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


  constructor(public _clientService: ClientService,private activadedRoute:ActivatedRoute,
    private router:Router,) { }

  ngOnInit() {

  }

  validateRegister(): boolean {

    //Validacion para el campo Documento
    if (String(this.client.Document) == '') {
      alert('Debe digitar un documento valido!')
      return false;
    }
    if (this.client.Document == null) {
      alert('Debe digitar un documento valido!')
      return false;
    }

    //Validacion para el campo apellidos
    if (this.client.Name.length == 0) {
      alert('Debe digitar un nombre valido!')
      return false;
    }

    //Validacion para el campo apellidos
    if (this.client.LastName.length == 0) {
      alert('Debe digitar un apellido valido!')
      return false;
    }

    //Validacion de fecha de nacimiento
    if (this.calcularEdad(this.client.BirthDate) < 18) {
      alert("Debe ser mayor de 18 años")
      return false;
    }

    return true;
  }

  calcularEdad(fecha: Date): number {
    let hoy = new Date();
    let cumpleanos = new Date(fecha);
    let edad: number = hoy.getFullYear() - cumpleanos.getFullYear();
    let m: number = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }

    return edad;
  }


  clientRegister() {

    if (this.validateRegister()) {
      this.loading = true
      this._clientService.getClient(this.client.Document).subscribe(clients => {
        if (clients.length > 0) {
          alert("Este documento ya existe como cliente registrado, por favor cambielo")
          this.loading = false
        } else {
          this._clientService.addClient(this.client).subscribe(clients => {
            if (clients["status"]=="success"){
              alert("Ha sido registrado, ahora procederemos con los datos de su empleo")
              this.loading = false
              this.router.navigate(['company-data', this.client.Document])
              this.cleanForm();
            }else{
              alert(clients["message"])
            }
            

          });
          
        }
      })
    }
  }

  cleanForm() {
    this.client.Id = 0
    this.client.Document = null
    this.client.Name = ''
    this.client.LastName = ''
    this.client.BirthDate = new Date()
  }

}
