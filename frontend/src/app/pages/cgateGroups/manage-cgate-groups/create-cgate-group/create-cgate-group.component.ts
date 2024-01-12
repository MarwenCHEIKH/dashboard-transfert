import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, tap } from 'rxjs';
import { CGateGroupService } from 'src/app/services/cGateGroup-service/c-gate-group.service';

@Component({
  selector: 'app-create-cgate-group',
  templateUrl: './create-cgate-group.component.html',
  styleUrls: ['./create-cgate-group.component.css'],
})
export class CreateCgateGroupComponent {
  cGateGroupform!: FormGroup;
  activeTab: string = 'general-tab';
  enteredVfdValues: any[] = [];
  enteredCallingAddressValues: any[] = [];
  selectedItems: any[] = [];
  cGateGroups: any[] = [];

  constructor(
    private fb: FormBuilder,
    private cgateGroupService: CGateGroupService
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
      state: ['E'],
      protocol: [''],
      called_address: [''],
      called_sap: ['*'],
      HTTP_hostname: [''],
      template_site: [''],
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

  onSubmit() {
    const vfd_rights: any[] = [];
    const calling_addresses: any[] = [];
    this.enteredVfdValues.forEach((value) => {
      const vfd_right = `${value.dir_path}: ${value.file_pattern}:${value.subdir_inheritance}:${value.dir_rights}:${value.file_rights}`;
      vfd_rights.push(vfd_right);
    });
    const vfd_rights_str = vfd_rights.join(';');
    console.log(this.enteredCallingAddressValues);
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
      protocol: this.cGateGroupform.value.protocol,
      called_addr: this.cGateGroupform.value.called_address,
      sap: this.cGateGroupform.value.called_sap,
      http_host_name: this.cGateGroupform.value.HTTP_hostname,
      template_site: this.cGateGroupform.value.template_site,
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
    this.cgateGroupService
      .createCGateGroup(formDataObject)
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
