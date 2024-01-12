import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HTTPService } from 'src/app/services/http-service/http.service';

@Component({
  selector: 'app-update-vfd',
  templateUrl: './update-vfd.component.html',
  styleUrls: ['./update-vfd.component.css'],
})
export class UpdateVfdComponent {
  updateDirectoryForm!: FormGroup;
  selectedDirectory!: string;
  directories: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HTTPService
  ) {}
  ngOnInit(): void {
    this.updateDirectoryForm = this.formBuilder.group({
      dir_path: [''],
      new_alias: [''],
      comments: [''],
      mount_point: [''],
      mount_dir_path: [''],
      user_attribute: [''],
      mailbox_recording: ['Y'],
      filename_display_option: ['XFB'],
      filename_duplicate_policy: ['duplicate'],
      env: ['UAT'],
    });
    this.loadDirectories();
  }

  loadDirectories() {
    this.httpService.get('vfd/get-directories').subscribe(
      (response) => {
        // Handle the successful response here
        console.log('Success:', response);
        this.directories = response as any[];
      },
      (error) => {
        // Handle the error here
        console.error('Error:', error);
      }
    );
  }

  onSubmit() {
    this.updateDirectoryForm.get('dir_path')?.setValue(this.selectedDirectory);
    // Handle form submission here

    const formData = {
      dir_path: this.selectedDirectory,
      ...this.updateDirectoryForm.value,
    };

    this.httpService.post(formData, 'vfd/update-directory').subscribe(
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
