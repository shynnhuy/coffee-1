import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  selected;
  constructor(private fb: FormBuilder, public service: AuthService, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      displayName: ["", [
        Validators.required
      ]],
      email: ["", [
        Validators.required,
        Validators.email,
        // CustomValidator.email(this.afs)
      ]],
      password: ["", [
        Validators.required
      ]]
    })
  }

  get displayName() {
    return this.form.get('displayName');
  }

  get email() {
    return this.form.get('email');
  }


  register() {
    console.log(this.form.value)
  }

  // active() {
  //   this.toast.show('I am a success toast', {
  //     classname: 'bg-success text-light',
  //     delay: 2000,
  //     autohide: true,
  //     headertext: 'Toast Header'
  //   });
  //   this.router.navigate(['/'])
  // }

}
