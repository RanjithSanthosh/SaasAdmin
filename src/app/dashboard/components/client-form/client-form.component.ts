import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css'
})
export class ClientFormComponent implements OnInit {

  clientObj: any = {
    Client_Code: '',
    Client_Name: '',
    Address: '',
    State: '',
    Mobile: '',
    Alternate_Mobile: '',
    Email: '',
    Contact_Person: '',
    Creation_Date: '',
    Subscription_Start: '',
    Subscription_End: '',
    App_Login: '',
    App_Pwd: '',
    Db_Name: '',
    Status: 'Active',
    Version_Type: 'Standard',
    Own_Server: 'No'
  };

  errors: any = {};
  isSubmitting: boolean = false;
  isEditMode: boolean = false;

  constructor(private router: Router) {
    // Check navigation state for edit data
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['clientData']) {
      this.clientObj = { ...navigation.extras.state['clientData'] };
      this.isEditMode = true;
    }
  }

  ngOnInit(): void {
    // Fallback if accessed via history directly (e.g. reload not supported for state usually, but for navigation it is)
    // If constructed above, this might be redundant but safe.
    if (!this.isEditMode && history.state.clientData) {
      this.clientObj = { ...history.state.clientData };
      this.isEditMode = true;
    }
  }

  validateForm(): boolean {
    this.errors = {};
    let isValid = true;

    // Client_Code: string 20 chars
    if (!this.clientObj.Client_Code) {
      this.errors.Client_Code = 'Client Code is required';
      isValid = false;
    } else if (this.clientObj.Client_Code.length > 20) {
      this.errors.Client_Code = 'Client Code must be max 20 chars';
      isValid = false;
    }

    // Client_Name: string 50 chars
    if (!this.clientObj.Client_Name) {
      this.errors.Client_Name = 'Client Name is required';
      isValid = false;
    } else if (this.clientObj.Client_Name.length > 50) {
      this.errors.Client_Name = 'Client Name must be max 50 chars';
      isValid = false;
    }

    // Address: string 200 chars
    if (!this.clientObj.Address) {
      this.errors.Address = 'Address is required';
      isValid = false;
    } else if (this.clientObj.Address.length > 200) {
      this.errors.Address = 'Address must be max 200 chars';
      isValid = false;
    }

    // State: string 50 chars
    if (!this.clientObj.State) {
      this.errors.State = 'State is required';
      isValid = false;
    } else if (this.clientObj.State.length > 50) {
      this.errors.State = 'State must be max 50 chars';
      isValid = false;
    }

    // Mobile: string 12 chars
    if (!this.clientObj.Mobile) {
      this.errors.Mobile = 'Mobile is required';
      isValid = false;
    } else if (this.clientObj.Mobile.length > 12) {
      this.errors.Mobile = 'Mobile must be max 12 chars';
      isValid = false;
    }

    // Alternate_Mobile: string 12 chars
    if (this.clientObj.Alternate_Mobile && this.clientObj.Alternate_Mobile.length > 12) {
      this.errors.Alternate_Mobile = 'Alternate Mobile must be max 12 chars';
      isValid = false;
    }

    // Email: string 50 chars
    if (!this.clientObj.Email) {
      this.errors.Email = 'Email is required';
      isValid = false;
    } else if (this.clientObj.Email.length > 50) {
      this.errors.Email = 'Email must be max 50 chars';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.clientObj.Email)) {
      this.errors.Email = 'Invalid email format';
      isValid = false;
    }

    // Contact_Person: string 50 chars
    if (!this.clientObj.Contact_Person) {
      this.errors.Contact_Person = 'Contact Person is required';
      isValid = false;
    } else if (this.clientObj.Contact_Person.length > 50) {
      this.errors.Contact_Person = 'Contact Person must be max 50 chars';
      isValid = false;
    }

    // Creation_Date: date
    if (!this.clientObj.Creation_Date) {
      this.errors.Creation_Date = 'Creation Date is required';
      isValid = false;
    }

    // Subscription_Start: date
    if (!this.clientObj.Subscription_Start) {
      this.errors.Subscription_Start = 'Subscription Start Date is required';
      isValid = false;
    }

    // Subscription_End: date
    if (!this.clientObj.Subscription_End) {
      this.errors.Subscription_End = 'Subscription End Date is required';
      isValid = false;
    }

    // App_Login: string 20 chars
    if (!this.clientObj.App_Login) {
      this.errors.App_Login = 'App Login is required';
      isValid = false;
    } else if (this.clientObj.App_Login.length > 20) {
      this.errors.App_Login = 'App Login must be max 20 chars';
      isValid = false;
    }

    // App_Pwd: string 20 chars
    if (!this.clientObj.App_Pwd) {
      this.errors.App_Pwd = 'App Password is required';
      isValid = false;
    } else if (this.clientObj.App_Pwd.length > 20) {
      this.errors.App_Pwd = 'App Password must be max 20 chars';
      isValid = false;
    }

    // Db_Name: string 20 chars
    if (!this.clientObj.Db_Name) {
      this.errors.Db_Name = 'DB Name is required';
      isValid = false;
    } else if (this.clientObj.Db_Name.length > 20) {
      this.errors.Db_Name = 'DB Name must be max 20 chars';
      isValid = false;
    }

    return isValid;
  }

  onSave() {
    if (this.validateForm()) {
      this.isSubmitting = true;
      console.log('Form Submitted', this.clientObj);
      // Simulate API call
      setTimeout(() => {
        this.isSubmitting = false;
        alert(this.isEditMode ? 'Client Updated Successfully!' : 'Client Created Successfully!');
        this.router.navigate(['dashboard/saas-client']);
      }, 1000);
    } else {
      console.log('Validation Failed');
    }
  }

  onCancel() {
    this.router.navigate(['dashboard/saas-client']);
  }
}
