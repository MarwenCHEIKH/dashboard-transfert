import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HTTPService } from 'src/app/services/http-service/http.service';

@Component({
  selector: 'app-create-vfd',
  templateUrl: './create-vfd.component.html',
  styleUrls: ['./create-vfd.component.css'],
})
export class CreateVfdComponent {
  directoryForm: any;

  constructor(private fb: FormBuilder, private httpService: HTTPService) {
    this.directoryForm = this.fb.group({
      dir_path: ['', Validators.required],
      alias: [''],
      comments: [''],
      mount_point: [false],
      mount_dir_path: [''],
      user_attribute: [''],
      mailbox_recording: ['Y'],
      filename_display_option: ['XFB'],
      filename_duplicate_policy: ['duplicate'],
      env: ['UAT'],
    });
  }
  onSubmit() {
    // Send the formData to the backend using a service or HttpClient
    const directoryData = this.directoryForm.value;

    this.httpService.post(directoryData, 'vfd/create-directory').subscribe(
      (response) => {
        // Handle the successful response here
        console.log('Success:', response);
      },
      (error) => {
        // Handle the error here
        console.error('Error:', error);
      }
    );
  }
}
