import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Customer} from "../customer";
import {CustomerService} from "../customer.service";
import {AbstractControl,  ValidationErrors, ValidatorFn} from "@angular/forms";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {JsonPipe} from "@angular/common";
import { PhoneNumberUtil, PhoneNumber } from 'google-libphonenumber';
@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html'
})
export class CustomerEditComponent implements OnInit {
  id!: string;
  customer!: Customer;
  feedback: any = {};
   customerForm = new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [Validators.required, PhoneNumberValidator('US')]),
    email: new FormControl('', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
     ),
    bankAccountNumber: new FormControl('', Validators.required),

  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService) {
  }


  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: any) =>
        of(params.get('id'))
      )
    ).subscribe((id: number) => {
      if (id < 1) {
        this.customer = new Customer();
      } else {
        this.customerService.findById(id).subscribe(customer => {
          console.log(customer);
          this.customerForm.patchValue({
            id: customer.id,
            firstName: customer.firstname,
            lastName: customer.lastname,
            dateOfBirth: customer.dateOfBirth,
            email: customer.email,
            phoneNumber: customer.phoneNumber,
            bankAccountNumber: customer.bankAccountNumber,
          })  ;
        });
      }
    });



  }

  add() {
    console.log(this.customerForm.value )
    this.customerService.insert( this.customerForm.value ).subscribe(
      customer => {

        this.feedback = {type: 'success', message: 'Save was successful!'};
        setTimeout(() => {
          this.router.navigate(['/customer']);
        }, 1000);
      },
      err => {
        this.feedback = {type: 'warning', message: 'Error saving'};
      }
    );
  }

  edit() {
    console.log(this.customerForm.value )
    this.customerService.update(this.customerForm.value).subscribe(
      customer => {
        this.customer = customer;
        this.feedback = {type: 'success', message: 'Save was successful!'};
        setTimeout(() => {
          setTimeout(() => {
            this.router.navigate(['/customer'])
          }, 1000);
        }, 1000);
      },
      err => {
        this.feedback = {type: 'warning', message: 'Error saving'};
      }
    );
  }

  cancel() {
    this.router.navigate(['/customer']);
  }

  save(customer: Customer) {

    if(!this.customerForm.valid) {
      return;
    }
    if (confirm('Are you sure?')) {
      if (this.customerForm.controls['id'].value>0) {
        this.edit();
      } else {
        this.add();
      }
    }

  }


}
const phoneNumberUtil = PhoneNumberUtil.getInstance();
// @ts-ignore
export function PhoneNumberValidator(regionCode: string = 'IR' as string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    let validNumber = false;
    try {
      const phoneNumber = phoneNumberUtil.parseAndKeepRawInput(
        control.value, regionCode
      );
      validNumber = phoneNumberUtil.isValidNumber(phoneNumber);
    } catch (e) { }

    return validNumber ? [] : { 'wrongNumber': { value: control.value } };
  }
}
