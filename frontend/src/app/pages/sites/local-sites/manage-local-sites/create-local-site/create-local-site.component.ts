import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, tap } from 'rxjs';
import { SitesService } from 'src/app/services/site-service/sites.service';

@Component({
  selector: 'app-create-local-site',
  templateUrl: './create-local-site.component.html',
  styleUrls: ['./create-local-site.component.css'],
})
export class CreateLocalSiteComponent {
  siteForm!: FormGroup;
  activeTab: string = 'general-tab';

  constructor(private fb: FormBuilder, private siteService: SitesService) {}
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.siteForm = this.fb.group({
      alias: ['', [Validators.required]],
      proto_ident: [''],
      comments: [''],
      mail_address: [''],
      dir_path: [''],
      auth_obj_type: [''],
      auth_obj_name: [''],
      password: [''],
      usr_param1: [''],
      usr_param2: [''],
    });
  }
  toggleActive(tabId: string): void {
    this.activeTab = tabId;
  }

  onSubmit() {
    const formDataObject = {
      alias: this.siteForm.value.alias,
      comments: this.siteForm.value.comments,
      proto_ident: this.siteForm.value.proto_ident,
      mail_address: this.siteForm.value.mail_address,
      dir_path: this.siteForm.value.dir_path,
      auth_obj_type: this.siteForm.value.auth_obj_type,
      auth_obj_name: this.siteForm.value.auth_obj_name,

      user_param1: this.siteForm.value.usr_param1,
      user_param2: this.siteForm.value.usr_param2,
    };
    console.log(formDataObject);
    this.siteService
      .createLocSite(formDataObject)
      .pipe(
        tap((response) => {
          console.log('Response:', response.commandString);
        }),
        catchError((error) => {
          console.error('Error:', error);
          // Rethrow the error after logging
          throw error;
        })
      )
      .subscribe();
  }
}
