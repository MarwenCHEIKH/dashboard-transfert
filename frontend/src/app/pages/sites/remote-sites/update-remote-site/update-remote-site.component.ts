import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, tap } from 'rxjs';
import { SitesService } from 'src/app/services/site-service/sites.service';

@Component({
  selector: 'app-update-remote-site',
  templateUrl: './update-remote-site.component.html',
  styleUrls: ['./update-remote-site.component.css'],
})
export class UpdateRemoteSiteComponent {
  siteForm!: FormGroup;
  activeTab: string = 'general-tab';
  remoteSites: [] = [];

  constructor(private fb: FormBuilder, private siteService: SitesService) {}
  ngOnInit(): void {
    this.initializeForm();
    this.loadRemoteSites();
  }

  initializeForm(): void {
    this.siteForm = this.fb.group({
      alias: ['', [Validators.required]],
      protocol: [''],
      proto_ident: [''],
      group: [''],
      username: [''],
      partner_Remote_alias: [''],
      comments: [''],
      dir_path: [''],
      init_sender: [''],
      resp_sender: [''],
      init_receiver: [''],
      resp_receiver: [''],
      init_mode: [''],
      trace_mode: [],
      resp_mode: [''],
      data_size_max: [''],
      init_conn_max: [''],
      init_conn_count: [''],
      retry_count_max: [''],
      retry_delay_min: [''],
      retry_delay_max: [''],
      sentinel_transfer_filter: [''],
      commpath_used: [''],
      comm_type: ['TCPIP'],
    });
  }
  toggleActive(tabId: string): void {
    this.activeTab = tabId;
  }
  loadRemoteSites() {
    this.siteService
      .getAllRemoteSites()
      .pipe(
        tap((response) => {
          console.log('Response:', response);
          this.remoteSites = response;
        }),
        catchError((error) => {
          console.error('Error:', error);
          throw error;
        })
      )
      .subscribe();
  }

  onSubmit() {
    const formDataObject = {
      alias: this.siteForm.value.alias,
      protocol: this.siteForm.value.protocol,
      group: this.siteForm.value.group,
      username: this.siteForm.value.username,
      partner_Remote_alias: this.siteForm.value.partner_Remote_alias,
      init_sender: this.siteForm.value.init_sender ? 'Y' : 'N',
      resp_sender: this.siteForm.value.resp_sender ? 'Y' : 'N',
      init_receiver: this.siteForm.value.init_receiver ? 'Y' : 'N',
      resp_receiver: this.siteForm.value.resp_receiver ? 'Y' : 'N',
      init_mode: this.siteForm.value.init_mode ? 'Y' : 'N',
      trace_mode: this.siteForm.value.trace_mode ? 'Y' : 'N',
      resp_mode: this.siteForm.value.resp_mode ? 'Y' : 'N',
      data_size_max: this.siteForm.value.data_size_max,
      init_conn_max: this.siteForm.value.init_conn_max,
      init_conn_count: this.siteForm.value.init_conn_count,
      retry_count_max: this.siteForm.value.retry_count_max,
      retry_delay_min: this.siteForm.value.retry_delay_min,
      retry_delay_max: this.siteForm.value.retry_delay_max,
      sentinel_transfer_filter: this.siteForm.value.sentinel_transfer_filter,
      commpath_used: this.siteForm.value.commpath_used,
      comm_type: this.siteForm.value.comm_type,
      comments: this.siteForm.value.comments,
      proto_ident: this.siteForm.value.proto_ident,
      dir_path: this.siteForm.value.dir_path,
    };

    this.siteService
      .updateRemoteSite(formDataObject)
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
