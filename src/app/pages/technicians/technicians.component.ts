import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Technician } from 'app/models/technician.model';
import { TechniciansService } from 'app/services/technicians.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-technicians',
  templateUrl: './technicians.component.html',
  styleUrls: ['./technicians.component.css']
})
export class TechniciansComponent implements OnInit {

  @ViewChild('createTechnicianModal') createTechnicianModal: ElementRef;

  technicians: Technician[] = [
    {
      technicianID: '10',
      documentID: '1001012532',
      name: 'Stiwar',
      lastname: 'Salazar',
      sector: 'Microelectrónica',
      birthday: '28/04/1998',
      address: 'Calle 30 #20 - 12',
      email: 'ssalazar@gmail.com',
      phone: '+573123458909'
    },
    {
      technicianID: '10',
      documentID: '1001012532',
      name: 'Stiwar',
      lastname: 'Salazar',
      sector: 'Microelectrónica',
      birthday: '28/04/1998',
      address: 'Calle 30 #20 - 12',
      email: 'ssalazar@gmail.com',
      phone: '+573123458909'
    },
    {
      technicianID: '10',
      documentID: '1001012532',
      name: 'Stiwar',
      lastname: 'Salazar',
      sector: 'Microelectrónica',
      birthday: '28/04/1998',
      address: 'Calle 30 #20 - 12',
      email: 'ssalazar@gmail.com',
      phone: '+573123458909'
    },
    {
      technicianID: '10',
      documentID: '1001012532',
      name: 'Stiwar',
      lastname: 'Salazar',
      sector: 'Microelectrónica',
      birthday: '28/04/1998',
      address: 'Calle 30 #20 - 12',
      email: 'ssalazar@gmail.com',
      phone: '+573123458909'
    },
  ];

  technicianForm = new FormGroup({
    documentID: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    sector: new FormControl('', Validators.required),
    birthday: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10)])
  })


  constructor(private techniciansService: TechniciansService) { }

  ngOnInit(): void {
    this.getTechnicians()
  }

  createTechnician() {
    let technicianValues = this.technicianForm.value;
    this.technicianForm.markAllAsTouched();
    
    if (this.technicianForm.valid) {
      console.log(technicianValues);
      this.techniciansService.createTechnician(technicianValues).subscribe(resp => {
        console.log(resp);
        this.createTechnicianModal.nativeElement.style.display = 'none';
        this.technicianForm.reset();
      });
    } 

  }

  getTechnicians() {
    this.techniciansService.getTechnicians().subscribe(resp => {
      this.technicians = resp;
      console.log(resp);
    })
  }

  viewTechnician(technicianID: string) {
    this.techniciansService.getTechnicianInfo(technicianID).subscribe(resp => {
      this.technicians = resp;
      console.log(resp);
    })
  }

  deleteTechnician(technicianID: string) {
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
        this.techniciansService.deleteTechnician(technicianID).subscribe(resp => {
          console.log(resp);
          this.getTechnicians();
        })
      }
    });
  }

}
