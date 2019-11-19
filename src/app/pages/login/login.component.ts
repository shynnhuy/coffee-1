import { AuthService } from './../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private service: AuthService, private router: Router) { }

  ngOnInit() {

    this.form = this.fb.group({
      email: ["", [
        Validators.required,
        Validators.email
      ]],
      password: ["", [
        Validators.required
      ]]
    })
  }

  emailSignIn() {
    // this.service.emailLogin(this.form.value);
  }

  googleSignIn() {
    this.service.googleLogin()
  }
}
