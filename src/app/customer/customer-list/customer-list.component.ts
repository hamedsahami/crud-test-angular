import {Component, OnInit} from "@angular/core";
import {CustomerFilter} from "../customer-filter";
import {Customer} from "../customer";
import {CustomerService} from "../customer.service";
import {Observable} from "rxjs";


@Component({
  selector: 'app-customer',
  templateUrl: 'customer-list.component.html'
})
export class CustomerListComponent implements OnInit {

  filter = new CustomerFilter();
  selectedFlight!: Customer;
  feedback: any = {};

  get customerList(): Customer[] {
    return this.customerService.customerList;
  }

  constructor(private customerService: CustomerService) {
  }

  ngOnInit() {
    this.search();
  }

  search(): void {
    this.customerService.load(this.filter);
  }

  select(selected: Customer): void {
    this.selectedFlight = selected;
  }

  delete(customer: Customer): void {
    if (confirm('Are you sure?')) {
      this.customerService.delete(customer).subscribe(() => {
          this.feedback = {type: 'success', message: 'Delete was successful!'};
          setTimeout(() => {
            this.search();
          }, 1000);
        },
        err => {
          this.feedback = {type: 'warning', message: 'Error deleting.'};
        }
      );
    }
  }


  insert(customer: Customer): void {
    if (confirm('Are you sure?')) {
      this.customerService.insert(customer).subscribe(() => {
          this.feedback = {type: 'success', message: 'Insert was successful!'};
          setTimeout(() => {
            this.search();
          }, 1000);
        },
        err => {
          this.feedback = {type: 'warning', message: 'Error inserting.'};
        }
      );
    }
  }
}
