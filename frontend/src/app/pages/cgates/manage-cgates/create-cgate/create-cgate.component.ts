import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, tap } from 'rxjs';
import { CGateGroupService } from 'src/app/services/cGateGroup-service/c-gate-group.service';
import { CgateService } from 'src/app/services/cGate-service/cgate.service';

@Component({
  selector: 'app-create-cgate',
  templateUrl: './create-cgate.component.html',
  styleUrls: ['./create-cgate.component.css'],
})
export class CreateCgateComponent {
  cGateGroupform!: FormGroup;
  activeTab: string = 'general-tab';
  enteredVfdValues: any[] = [];
  enteredCallingAddressValues: any[] = [];
  selectedItems: any[] = [];
  cGateGroups: any[] = [];
  showFields = false;
  showLoginFields = false;
  showClientFields = false;
  passwordConfirmed: {
    [key: string]: boolean;
  } = {
    login: true,
    client: true,
  };

  constructor(
    private fb: FormBuilder,
    private cgateGroupService: CGateGroupService,
    private cgateService: CgateService
  ) {}
  ngOnInit(): void {
    this.initializeForm();
    this.loadCGateGroups();
  }
  initializeForm(): void {
    this.cGateGroupform = this.fb.group({
      name: ['', [Validators.required]],
      comments: [''],
      parent_cgateGroup: [''],
      state: ['U'],
      login_user: [''],
      change_password_option: [''],
      login_password: ['', [Validators.required]],
      confirm_login_password: ['', [Validators.required]],
      client_password: ['', [Validators.required]],
      confirm_client_password: ['', [Validators.required]],
      client_ident: [''],
      server_ident: [''],
      tls_client_auth: [''],
      tls_sprof: [''],
      tls_sprof_user_param: [''],
      remote_public_key_alias: [''],
      remote_public_key_group: [''],
      remote_subject_cert_alias: [''],
      remote_issuer_cert_alias: [''],
      remote_subject_name_pattern: [''],
      remote_issuer_name_pattern: [''],
      root_dir: [''],
      home_dir: [''],
      usr_param1: [''],
      usr_param2: [''],
      http_home_page: [''],
      http_list_template: [''],
      max_upload_rate: ['0'],
      max_upload_requests_rate: ['0'],
      max_upload_file_size: ['0'],
      max_download_rate: ['0'],
      max_download_requests_rate: ['0'],
      command_sensitivity: ['0'],
      ftpcs_list_fields: ['0'],
      dir_path: [''],
      file_pattern: [''],
      subdir_inheritance: [''],
      dir_rights_list: [false],
      dir_rights_create: [false],
      dir_rights_remove: [false],
      file_rights_read: [false],
      file_rights_delete: [false],
      file_rights_write: [false],
      calling_address_pattern: [''],
      access: [''],
    });
  }
  toggleActive(tabId: string): void {
    this.activeTab = tabId;
  }
  getDirRightsString(): string {
    const dirRightsList = this.cGateGroupform.get('dir_rights_list')
      ?.value as boolean;
    const dirRightsCreate = this.cGateGroupform.get('dir_rights_create')
      ?.value as boolean;
    const dirRightsRemove = this.cGateGroupform.get('dir_rights_remove')
      ?.value as boolean;

    let dirRightsString = '';

    if (dirRightsRemove) {
      dirRightsString += 'R';
    }
    if (dirRightsList) {
      dirRightsString += 'L';
    }
    if (dirRightsCreate) {
      dirRightsString += 'C';
    }

    return dirRightsString;
  }
  getFileRightsString(): string {
    const fileRightsRead = this.cGateGroupform.get('file_rights_read')
      ?.value as boolean;
    const fileRightsDelete = this.cGateGroupform.get('file_rights_delete')
      ?.value as boolean;
    const fileRightsWrite = this.cGateGroupform.get('file_rights_write')
      ?.value as boolean;

    let fileRightsString = '';

    if (fileRightsRead) {
      fileRightsString += 'R';
    }
    if (fileRightsDelete) {
      fileRightsString += 'D';
    }
    if (fileRightsWrite) {
      fileRightsString += 'W';
    }

    return fileRightsString;
  }

  displayValues(type: string) {
    let valuesToDisplay: any;

    if (type === 'vfd_rights') {
      valuesToDisplay = {
        dir_path: this.cGateGroupform.get('dir_path')?.value,
        file_pattern: this.cGateGroupform.get('file_pattern')?.value,
        subdir_inheritance: this.cGateGroupform.get('subdir_inheritance')?.value
          ? 'Y'
          : 'N',
        dir_rights: this.getDirRightsString(),
        file_rights: this.getFileRightsString(),
      };

      // Push the extracted values to the enteredVfdValues array
      this.enteredVfdValues.push(valuesToDisplay);
    } else if (type === 'calling_address') {
      valuesToDisplay = {
        calling_address_pattern: this.cGateGroupform.get(
          'calling_address_pattern'
        )?.value,
        access: this.cGateGroupform.get('access')?.value ? 'yes' : 'no',
      };

      // Push the extracted values to the enteredCallingAddressValues array
      this.enteredCallingAddressValues.push(valuesToDisplay);
    }
  }

  onCheckboxChange(value: any) {
    const index = this.selectedItems.findIndex((item) => item === value);

    if (index === -1) {
      // If not found, add to selected items
      this.selectedItems.push(value);
    } else {
      // If found, remove from selected items
      this.selectedItems.splice(index, 1);
    }
  }

  removeValues(type: string) {
    // Remove selected items based on the provided type
    if (type === 'vfd_rights') {
      this.selectedItems.forEach((item) => {
        const index = this.enteredVfdValues.indexOf(item);
        if (index !== -1) {
          this.enteredVfdValues.splice(index, 1);
        }
      });
    } else if (type === 'calling_address') {
      this.selectedItems.forEach((item) => {
        const index = this.enteredCallingAddressValues.indexOf(item);
        if (index !== -1) {
          this.enteredCallingAddressValues.splice(index, 1);
        }
      });
    }

    // Clear selected items
    this.selectedItems = [];
  }

  clearList(type: string) {
    // Clear the list based on the provided type
    if (type === 'vfd_rights') {
      this.enteredVfdValues = [];
    } else if (type === 'calling_address') {
      this.enteredCallingAddressValues = [];
    }
  }
  showPasswordFields(section: string): void {
    if (section === 'login') {
      this.showLoginFields = !this.showLoginFields;
      this.showClientFields = false; // Reset client fields
    } else if (section === 'client') {
      this.showClientFields = !this.showClientFields;
      this.showLoginFields = false; // Reset login fields
    }

    this.showFields = this.showLoginFields || this.showClientFields;
  }

  confirmPasswordMatch(section: string): void {
    const passwordControl =
      section === 'login' ? 'login_password' : 'client_password';
    const confirmControl =
      section === 'login'
        ? 'confirm_login_password'
        : 'confirm_client_password';

    const password = this.cGateGroupform.get(passwordControl)?.value;
    const confirm = this.cGateGroupform.get(confirmControl)?.value;

    this.passwordConfirmed[section] = password === confirm;
  }

  onSubmit() {
    const vfd_rights: any[] = [];
    const calling_addresses: any[] = [];
    this.enteredVfdValues.forEach((value) => {
      const vfd_right = `${value.dir_path}: ${value.file_pattern}:${value.subdir_inheritance}:${value.dir_rights}:${value.file_rights}`;
      vfd_rights.push(vfd_right);
    });
    const vfd_rights_str = vfd_rights.join(';');

    this.enteredCallingAddressValues.forEach((value) => {
      const calling_address = `${value.calling_address_pattern}:${value.access}`;
      calling_addresses.push(calling_address);
    });
    const calling_address_str = calling_addresses.join(';');

    const formDataObject = {
      name: this.cGateGroupform.value.name,
      comments: this.cGateGroupform.value.comments,
      parent_group: this.cGateGroupform.value.parent_cgateGroup,
      state: this.cGateGroupform.value.state,
      login_user: this.cGateGroupform.value.login_user,
      change_password_option: this.cGateGroupform.value.change_password_option,
      login_password: this.cGateGroupform.value.login_password,
      client_password: this.cGateGroupform.value.client_password,
      server_ident: this.cGateGroupform.value.server_ident,
      client_ident: this.cGateGroupform.value.client_ident,
      tls_client_auth: this.cGateGroupform.value.tls_client_auth,
      tls_sprof: this.cGateGroupform.value.tls_sprof,
      tls_sprof_user_param: this.cGateGroupform.value.tls_sprof_user_param,
      remote_public_key_alias:
        this.cGateGroupform.value.remote_public_key_alias,
      remote_public_key_group:
        this.cGateGroupform.value.remote_public_key_group,
      remote_subject_cert_alias:
        this.cGateGroupform.value.remote_subject_cert_alias,
      remote_issuer_cert_alias:
        this.cGateGroupform.value.remote_issuer_cert_alias,
      remote_subject_name_pattern:
        this.cGateGroupform.value.remote_subject_name_pattern,
      remote_issuer_name_pattern:
        this.cGateGroupform.value.remote_issuer_name_pattern,
      ftpcs_list_fields: this.cGateGroupform.value.ftpcs_list_fields,
      root_dir: this.cGateGroupform.value.root_dir,
      home_dir: this.cGateGroupform.value.home_dir,
      user_param1: this.cGateGroupform.value.usr_param1,
      user_param2: this.cGateGroupform.value.usr_param2,
      http_home_page: this.cGateGroupform.value.http_home_page,
      http_list_template: this.cGateGroupform.value.http_list_template,
      max_download_rate: parseInt(this.cGateGroupform.value.max_download_rate),
      max_download_requests_rate: parseInt(
        this.cGateGroupform.value.max_download_requests_rate
      ),
      max_upload_rate: parseInt(this.cGateGroupform.value.max_upload_rate),
      max_upload_requests_rate: parseInt(
        this.cGateGroupform.value.max_upload_requests_rate
      ),
      max_upload_file_size: parseInt(
        this.cGateGroupform.value.max_upload_file_size
      ),
      command_sensitivity: this.cGateGroupform.value.command_sensitivity,
      add_vfd_right: vfd_rights_str,
      add_calling_addr: calling_address_str,
    };
    console.log(formDataObject);
    this.cgateService
      .createCGate(formDataObject)
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
  loadCGateGroups() {
    this.cgateGroupService
      .getAllCGateGroups()
      .pipe(
        tap((response) => {
          console.log('Response:', response);
          this.cGateGroups = response;
        }),
        catchError((error) => {
          console.error('Error:', error);
          throw error;
        })
      )
      .subscribe();
  }
}
