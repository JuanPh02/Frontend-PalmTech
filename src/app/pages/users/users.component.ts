import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'app/models/user.model';
import { UsersService } from 'app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @ViewChild('createUserModal') createUserModal: ElementRef;

  users: User[] = []

  userForm = new FormGroup({
    documentType: new FormControl('', Validators.required),
    documentID: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10)])
  })

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.getUsers()
  }

  createUser() {
    let userValues = this.userForm.value;
    this.userForm.markAllAsTouched();
    if (this.userForm.valid) {
      console.log(userValues);
      this.usersService.createUser(userValues).subscribe(resp => {
        console.log(resp);
        this.createUserModal.nativeElement.style.display = 'none';
        this.userForm.reset();
      });
    } 

  }

  getUsers() {
    this.usersService.getUsers().subscribe(resp => {
      this.users = resp;
      console.log(resp);
    })
  }

  viewUser(email: string) {
    this.usersService.getUsers().subscribe(resp => {
      this.users = resp;
      console.log(resp);
    })
  }

  deleteUser(email: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersService.deleteUser(email).subscribe(resp => {
          console.log(resp);
          this.getUsers();
        })
      }
    });
  }

}
