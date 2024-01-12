import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, tap } from 'rxjs';
import { SshConnectionService } from 'src/app/services/ssh-connection/ssh-connection.service';

@Component({
  selector: 'app-connect-to-server',
  templateUrl: './connect-to-server.component.html',
  styleUrls: ['./connect-to-server.component.css'],
})
export class ConnectToServerComponent {
  connectionForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private sshService: SshConnectionService
  ) {}
  ngOnInit() {
    this.connectionForm = this.fb.group({
      host: ['', Validators.required],
      port: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      env: ['', Validators.required],
    });
  }
  onSubmit() {
    console.log(this.connectionForm.value);
    this.sshService
      .sendConfig(this.connectionForm.value)
      .pipe(
        tap((response) => {
          console.log('Response:', response);
        }),
        catchError((error) => {
          console.error('Error:', error);
          throw error;
        })
      )
      .subscribe();
  }
}
