import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConvertDate } from 'src/app/models/classes/convert-date';
import { AuthService } from 'src/app/services/auth.service';
import { CountryListService } from 'src/app/services/country-list.service';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss'],
})
export class UserAccountComponent implements OnInit {
  UserProfileForm!: FormGroup;
  model: any = {};
  productList = [
    {
      id: '1',
      productImage: '',
      title: 'Product 1',
      quantity: 2,
      price: 2000,
      orderDate: new Date('2023/03/02'),
      updatedDate: new Date(),
      cost: 4000,
    },
  ];
  currentUser: any;
  userProfile: any;
  userEmail!: string;
  isUploading!: boolean;

  //   <td>
  //   <div style="max-width: 30px; max-height: 30px; overflow: hidden;">
  //       <img [src]="category.featuredImg" alt="" class="img-fluid">
  //   </div>
  // </td>
  // <!-- <td>Silver stones arabic lace</td> -->
  // <td>{{ category.title | titlecase }}</td>
  // <td>{{ category.createdBy | titlecase }}</td>
  // <td>{{ category.createdDate | date}}</td>
  // <td>{{ category.updatedDate | date}}</td>

  countryList!: any;
  gender: any[] = ['male', 'female'];
  constructor(
    private _userProfileSvc: UserProfileService,
    private fb: FormBuilder,
    private _countryListSvc: CountryListService
  ) {}

  ngOnInit(): void {
    this.getUserProfile();
    this.buildForm();
    this.getCountryList();
  }

  onSelectImage($event: any) {
    let file = $event.target.files[0];
    let formData = new FormData();
    formData.append('profileImage', file);

    this.isUploading = true;
    this._userProfileSvc.updateUserProfileImage(formData).subscribe({
      next: (response) => {
        console.log('response: ', response);
        this.getUserProfile();
        this.isUploading = false;
      },
      error: (error) => {
        if (error) {
          console.error('Error: ', error);
          this.isUploading = false;
        }
      },
    });
  }

  get address(): any {
    return this.UserProfileForm.get('address');
  }

  buildForm() {
    this.UserProfileForm = this.fb.group({
      firstName: '',
      lastName: '',
      gender: '',
      dob: '',
      nationality: '',
      phone: '',
      address: this.fb.group({
        addressLine: '',
        city: '',
        state: '',
        country: '',
      }),
    });
  }

  setForm(profile: any) {
    this.UserProfileForm.controls['firstName'].setValue(profile?.firstName);
    this.UserProfileForm.controls['lastName'].setValue(profile?.lastName);
    this.UserProfileForm.controls['gender'].setValue(profile?.gender);
    this.UserProfileForm.controls['phone'].setValue(profile?.phone);
    this.UserProfileForm.controls['dob'].setValue(
      new ConvertDate(profile?.dob).getDAteWithoutTime()
    );
    this.UserProfileForm.controls['nationality'].setValue(profile?.nationality);
    this.address.controls['addressLine']?.setValue(
      profile?.address?.addressLine
    );
    this.address.controls['city']?.setValue(profile?.address?.city);
    this.address.controls['state']?.setValue(profile?.address?.state);
    this.address.controls['country']?.setValue(profile?.address?.country);
  }

  getCountryList() {
    this._countryListSvc.getCountryList().subscribe({
      next: (response) => {
        console.log('countryList: ', response);
        if (!response && !response?.data) return;
        this.countryList = response.data.sort((a: any, b: any) =>
          a.name.localeCompare(b.name)
        );
      },
      error: (error) => {
        if (error) {
          console.log('error: ', error);
        }
      },
    });
  }

  getUserProfile() {
    this._userProfileSvc.getUserProfile().subscribe({
      next: (response: any) => {
        if (response) {
          console.log('response', response);
          if (response && response?.profile)
            console.log('response?.profile: ', response?.profile);
          this.userProfile = response?.profile;
          this.userEmail = this.userProfile?.user.email;
          this.setForm(this.userProfile);
        }
      },
      error: (error: Response) => {
        if (error) {
          if (error.status == 409) alert('Auth failed!');
          else {
            alert('An unexpected error occurred.');
            console.log('Error: ', error);
          }
        }
      },
    });
  }

  saveProfile(data: any) {
    console.log('data: ', data);
    this._userProfileSvc.updateUserProfile(data).subscribe({
      next: (response: any) => {
        console.log('response: ', response);
      },
      error(err) {
        if (err) {
          console.error('Error: ', err);
        }
      },
    });
  }

  onDeleteCategory(Order: any) {}
}
