import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    });
  }
  onRegister() {
    const val = this.registerForm.value;
    console.log(val);
    if (val.password !== val.passwordConfirm) {
      window.alert('password not confirmed');
      return;
    }
    if (val.username && val.email && val.password && val.passwordConfirm) {
      this.authService
        .register(val.username, val.email, val.password)
        .subscribe((res: any) => {
          console.log(res);
          this.authService
            .login(val.username, val.password)
            .subscribe((res) => {
              const token = res.token;
              this.authService.setToken(token);
              this.router.navigateByUrl('/home');
            });
        });
    }
  }
}
