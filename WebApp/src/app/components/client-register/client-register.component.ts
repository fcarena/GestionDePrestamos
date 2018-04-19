import { Component, OnInit } from '@angular/core';
import { ClientService } from './../../services/client.service'
import { Client } from './../../models/client.model'
@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html'
})
export class ClientRegisterComponent implements OnInit {

  client: Client = {
    Id: 0,
    Document: 0,
    Name: '',
    LastName: '',
    BirthDate: new Date("YYYY-MM-DD")
  }

  constructor(public _clientService: ClientService) { }

  ngOnInit() {
  }

  validateRegister(): boolean {

    //Validacion para el campo Documento
    if (this.client.Document == 0) {
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

    return true;
  }

  clientRegister() {
    
    if (this.validateRegister()) {
      /*let ifExist: boolean = false;
      for (var i = 0; i < this.users.length; i++) {
        if (this.users[i].email == this.user.email) {
          ifExistMail = true;
        }
      }
      if (ifExistMail) {
        this.validation.text = "Este email ya existe como usuario registrado, por favor cambielo";
      } else {*/
        this._clientService.addClient(this.client);
        this.cleanForm();
        
      //}
    }
  }

  cleanForm() {
    this.client.Id= 0
    this.client.Document= 0
    this.client.Name= ''
    this.client.LastName= ''
    this.client.BirthDate= new Date()
  }

}
