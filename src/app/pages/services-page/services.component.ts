import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Service } from 'app/models/service.model';
import { ServicesService } from 'app/services/services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  @ViewChild('createServiceModal') createServiceModal: ElementRef;

  services: Service[] = [
    {
      serviceID: 'f1243f',
      category: 'Reemplazo',
      brand: 'Apple',
      model: 'Iphone 12',
      imei: '1609437859230385',
      damage: 'Display',
      description: 'Reemplazo de Display',
      price: 750.000,
      customerName: 'Camilo Estrada',
      customerPhoneNumber: '+573024502343',
      customerEmail: 'camiloes@hotmail.com'
    },
    {
      serviceID: 'f1243f',
      category: 'Reemplazo',
      brand: 'Apple',
      model: 'Iphone 12',
      imei: '1609437859230385',
      damage: 'Display',
      description: 'Reemplazo de Display',
      price: 750.000,
      customerName: 'Camilo Estrada',
      customerPhoneNumber: '+573024502343',
      customerEmail: 'camiloes@hotmail.com'
    },
    {
      serviceID: 'f1243f',
      category: 'Reemplazo',
      brand: 'Apple',
      model: 'Iphone 12',
      imei: '1609437859230385',
      damage: 'Display',
      description: 'Reemplazo de Display',
      price: 750.000,
      customerName: 'Camilo Estrada',
      customerPhoneNumber: '+573024502343',
      customerEmail: 'camiloes@hotmail.com'
    },
    {
      serviceID: 'f1243f',
      category: 'Reemplazo',
      brand: 'Apple',
      model: 'Iphone 12',
      imei: '1609437859230385',
      damage: 'Display',
      description: 'Reemplazo de Display',
      price: 750.000,
      customerName: 'Camilo Estrada',
      customerPhoneNumber: '+573024502343',
      customerEmail: 'camiloes@hotmail.com'
    },
  ];

  serviceForm = new FormGroup({
    category: new FormControl('', Validators.required),
    brand: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    imei: new FormControl('', Validators.required),
    damage: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl(0, Validators.required),
    customerName: new FormControl('', Validators.required),
    customerPhoneNumber: new FormControl('', [Validators.required, Validators.minLength(10)]),
    customerEmail: new FormControl('', [Validators.required, Validators.email])
  })

  constructor(private servicesService: ServicesService) { }

  ngOnInit(): void {
    this.getServices()
  }

  createService() {
    let serviceValues = this.serviceForm.value;
    this.serviceForm.markAllAsTouched();

    if (this.serviceForm.valid) {
      console.log(serviceValues);
      this.servicesService.createService(serviceValues).subscribe(resp => {
        console.log(resp);
        this.createServiceModal.nativeElement.style.display = 'none';
        this.serviceForm.reset();
      });
    } 

  }

  getServices() {
    this.servicesService.getServices().subscribe(resp => {
      this.services = resp;
      console.log(resp);
    })
  }

  viewService(serviceID: string) {
    this.servicesService.getServiceInfo(serviceID).subscribe(resp => {
      this.services = resp;
      console.log(resp);
    })
  }

  deleteService(serviceID: string) {
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
        this.servicesService.deleteService(serviceID).subscribe(resp => {
          console.log(resp);
          this.getServices();
        })
      }
    });
  }
}
