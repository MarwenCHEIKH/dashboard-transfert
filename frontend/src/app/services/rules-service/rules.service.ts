import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HTTPService } from '../http-service/http.service';

interface Argument {
  name: string;
  type: 'string' | 'enum' | 'numeric';
}

@Injectable({
  providedIn: 'root',
})
export class RulesService {
  argumentsList: Argument[] = [
    { name: 'acknowledgement_option', type: 'enum' },
    { name: 'appli', type: 'string' },
    { name: 'appli_user_param1', type: 'string' },
    { name: 'appli_user_param2', type: 'string' },
    { name: 'block_size', type: 'numeric' },
    { name: 'called_address', type: 'string' },
    { name: 'called_SAP', type: 'string' },
    { name: 'cgate_user_param1', type: 'string' },
    { name: 'cgate_user_param2', type: 'numeric' },
    { name: 'content_id', type: 'string' },
    { name: 'content_type', type: 'string' },
    { name: 'data_code', type: 'numeric' },
    { name: 'dest_alias', type: 'string' },
    { name: 'destination', type: 'string' },
    { name: 'dir_path', type: 'string' },
    { name: 'direction', type: 'enum' },
    { name: 'dir_name', type: 'string' },
    { name: 'f_bytes', type: 'numeric' },
    { name: 'file_component', type: 'string' },
    { name: 'file_label', type: 'string' },
    { name: 'file_name', type: 'string' },
    { name: 'file_org', type: 'string' },
    { name: 'file_size', type: 'numeric' },
    { name: 'file_type', type: 'string' },
    { name: 'full_state', type: 'string' },
    { name: 'group', type: 'string' },
    { name: 'http_host_name', type: 'string' },
    { name: 'integer_user_param1', type: 'numeric' },
    { name: 'integer_user_param2', type: 'numeric' },
    { name: 'integer_user_param3', type: 'numeric' },
    { name: 'integer_user_param4', type: 'numeric' },
    { name: 'integer_user_param5', type: 'numeric' },
    { name: 'ipmid_user_id', type: 'string' },
    { name: 'last_end_reason', type: 'numeric' }, // Numeric is treated as integer
    { name: 'local_agent', type: 'string' },
    { name: 'message_id', type: 'string' },
    { name: 'mail_xpriority', type: 'numeric' }, // Numeric is treated as integer
    { name: 'mode', type: 'enum' },
    { name: 'mts_id', type: 'string' },
    { name: 'multi_nb_ok', type: 'numeric' }, // Numeric is treated as integer
    { name: 'multi_nb_total', type: 'numeric' }, // Numeric is treated as integer
    { name: 'multi_state', type: 'string' },
    { name: 'newline_convention', type: 'enum' },
    { name: 'org_alias', type: 'string' },
    { name: 'originator', type: 'string' },
    { name: 'p1.originator', type: 'string' },
    { name: 'p1.recipient', type: 'string' },
    { name: 'p2.ipmId.user', type: 'string' },
    { name: 'p2.bodyPartType', type: 'string' },
    { name: 'p2.importance', type: 'string' },
    { name: 'p2.sensitivity', type: 'string' },
    { name: 'padding', type: 'string' },
    { name: 'param1', type: 'string' },
    { name: 'param2', type: 'string' },
    { name: 'protocol', type: 'enum' },
    { name: 'rcv_appli', type: 'string' },
    { name: 'rcv_msg', type: 'string' },
    { name: 'rcv_text', type: 'string' },
    { name: 'rcv_user', type: 'string' },
    { name: 'rec_count', type: 'numeric' }, // Numeric is treated as integer
    { name: 'rec_fmt', type: 'string' },
    { name: 'rec_len', type: 'numeric' }, // Numeric is treated as integer
    { name: 'receipt_nack_msg', type: 'string' },
    { name: 'receipt_reply_by_xfer', type: 'string' },
    { name: 'receipt_reply_to_xfer', type: 'string' },
    { name: 'receipt_request', type: 'string' },
    { name: 'receipt_request_sync', type: 'string' },
    { name: 'receipt_request_to', type: 'string' },
    { name: 'receipt_sent_mode', type: 'enum' },
    { name: 'receipt_subtype', type: 'enum' },
    { name: 'receipt_type', type: 'enum' },
    { name: 'recipient_receipt_notif_request', type: 'enum' },
    { name: 'recipient_reply_request', type: 'string' },
    { name: 'remote_agent', type: 'string' },
    { name: 'route_state', type: 'enum' },
    { name: 'signed_eerp', type: 'string' },
    { name: 'sap', type: 'string' },
    { name: 'site_user_param1', type: 'string' },
    { name: 'site_user_param2', type: 'string' },
    { name: 'smtp_bcc', type: 'string' },
    { name: 'smtp_cc', type: 'string' },
    { name: 'smtp_from', type: 'string' },
    { name: 'smtp_subject', type: 'string' },
    { name: 'smtp_to', type: 'string' },
    { name: 'snd_appli', type: 'string' },
    { name: 'snd_text', type: 'string' },
    { name: 'snd_user', type: 'string' },
    { name: 'state', type: 'string' },
    { name: 'string_user_param1', type: 'string' },
    { name: 'string_user_param2', type: 'string' },
    { name: 'string_user_param3', type: 'string' },
    { name: 'string_user_param4', type: 'string' },
    { name: 'string_user_param5', type: 'string' },
    { name: 'text_file', type: 'string' },
    { name: 'time_of_last_access', type: 'string' },
    { name: 'tls_cipher_suite', type: 'string' },
    { name: 'tls_client_auth', type: 'string' },
    { name: 'tls_server_auth', type: 'string' },
    { name: 'tls_sprof', type: 'string' },
    { name: 'tmp_dea_id', type: 'string' },
    { name: 'trade_compress', type: 'string' },
    { name: 'trade_compress_algo', type: 'string' },
    { name: 'trade_delivery_mode', type: 'enum' },
    { name: 'trade_dest', type: 'string' },
    { name: 'trade_dest_alias', type: 'string' },
    { name: 'trade_encrypt', type: 'string' },
    { name: 'trade_encrypt_dn', type: 'string' },
    { name: 'trade_encryption_algo', type: 'string' },
    { name: 'trade_file_encoded', type: 'string' },
    { name: 'trade_format', type: 'string' },
    { name: 'trade_key_encryption_algo', type: 'string' },
    { name: 'trade_org', type: 'string' },
    { name: 'trade_org_alias', type: 'string' },
    { name: 'trade_receipt_content_type', type: 'string' },
    { name: 'trade_receipt_message_id', type: 'string' },
    { name: 'trade_receipt_mic', type: 'string' },
    { name: 'trade_receipt_mic_algo', type: 'string' },
    { name: 'trade_receipt_recipient', type: 'string' },
    { name: 'trade_receipt_request_type', type: 'string' },
    { name: 'trade_receipt_sign_algo', type: 'string' },
    { name: 'trade_receipt_signature', type: 'string' },
    { name: 'trade_remote_destination', type: 'string' },
    { name: 'trade_request_type', type: 'string' },
    { name: 'trade_sign', type: 'string' },
    { name: 'trade_sign_algo', type: 'enum' },
    { name: 'trade_sign_dn', type: 'string' },
    { name: 'trade_state', type: 'string' },
    { name: 'type', type: 'string' },
    { name: 'ua_rn_id', type: 'string' },
    { name: 'unprocessed_dir_path', type: 'string' },
    { name: 'unprocessed_file_component', type: 'string' },
    { name: 'username', type: 'string' },
    { name: 'user_processed', type: 'string' },
    { name: 'user_state', type: 'string' },
    { name: 'virtual_file_desc', type: 'string' },
    { name: 'x_bytes', type: 'numeric' },
    { name: 'x_data_code', type: 'string' },
    { name: 'x_rec_fmt', type: 'string' },
    { name: 'x_rec_len', type: 'numeric' },
    { name: 'xfer_data_code', type: 'string' },
    { name: 'xfer_duplicated', type: 'string' },
    { name: 'xfer_ident', type: 'string' },
    { name: 'xfer_rec_fmt', type: 'string' },
    { name: 'xfer_rec_len', type: 'numeric' },
    { name: 'yday', type: 'numeric' },
  ];

  private argumentOperatorsMap = {
    string: [
      '=',
      '#',
      '<',
      '>',
      '<=',
      '>=',
      'includes',
      'excludes',
      '=NULL',
      '#NULL',
    ],
    numeric: [
      '=',
      '#',
      '<',
      '>',
      '<=',
      '>=',
      'includes',
      'excludes',
      '[]',
      '][',
      '=NULL',
      '#NULL',
    ],
    enum: ['=', '#', 'includes', 'excludes', '=NULL', '#NULL'],
  };

  constructor(private httpService: HTTPService) {}
  getOperatorsForArgument(argumentName: string): string[] | undefined {
    const argument = this.argumentsList.find(
      (arg) => arg.name === argumentName
    );
    if (argument) {
      // Use type assertion here
      return (this.argumentOperatorsMap as any)[argument.type];
    }
    return undefined;
  }

  getArgumentNames(): string[] {
    return this.argumentsList.map((arg) => arg.name);
  }
  createRule(formDataObject: any): Observable<any> {
    return this.httpService.post(formDataObject, 'rules/create-rule');
  }
  updateRule(formDataObject: any): Observable<any> {
    return this.httpService.post(formDataObject, 'rules/update-rule');
  }
  deleteRule(formdataObject: any): Observable<any> {
    return this.httpService.post(formdataObject, 'rules/delete-rule');
  }
  getRules(): Observable<any> {
    return this.httpService.get('rules/get-rules');
  }
  getRuleByName(name: string): Observable<any> {
    return this.httpService.get(`rules/get-rule?name=${name}`);
  }
  getRulesDetails(): Observable<any> {
    return this.httpService.get('rules/get-rules-details');
  }
}
