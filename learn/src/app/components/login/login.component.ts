import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  hide = true;
  get f() {
    return this.loginForm.controls;
  }
  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.userService.signin(this.loginForm.value).subscribe(
      data => {
        if (data === null) {
          alert('Email or Password est incorrect');
        } else if (!data.token) {
          alert('Authentication échoué. Attendez la vérification de votre compte');
        } else {
          console.log('Login successful');
          console.log('Data.user.role:', data.user.role);
          const role = data.user.role;
          switch (role) {
            case 'admin':
              this.router.navigate(['Admin/dashboard']);
              break;
            case 'etudiant':
              this.router.navigate(['Etud/dashboard']);
              break;
            case 'enseignant':
              this.router.navigate(['Ens/dashboard']);
              break;
            default:
              console.log('Unknown role:', data);
              alert('Unknown user role');
              break;
          }
        }
      },
      err => {
        alert('Login failed');
      }
    );
  }  
}