import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Technician } from 'app/models/technician.model';
import { TechniciansService } from 'app/services/technicians.service';
import Swal from 'sweetalert2';

declare var jQuery: any;

@Component({
  selector: 'app-technicians',
  templateUrl: './technicians.component.html',
  styleUrls: ['./technicians.component.css']
})
export class TechniciansComponent implements OnInit {

  @ViewChild('createTechnicianModal') createTechnicianModal: ElementRef;

  technicians: Technician[] = [];

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
    technicianValues.documentID = technicianValues.documentID.toString();
    this.technicianForm.markAllAsTouched();
    
    if (this.technicianForm.valid) {
      console.log(technicianValues);
      this.techniciansService.createTechnician(technicianValues).subscribe(resp => {
        console.log(resp);
        jQuery(this.createTechnicianModal?.nativeElement).modal('hide');
        this.getTechnicians();
        this.technicianForm.reset();
      });
    } 

  }

  getTechnicians() {
    this.techniciansService.getTechnicians().subscribe(resp => {
      console.log(resp);
      this.technicians = resp;
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
