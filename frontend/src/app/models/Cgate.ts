export interface Cgate {
  cg_name: string;
  cg_comments: string;
  cg_state: string;
  cg_parent_group: string;
  cg_login_user: string;
  cg_login_password: string;
  cg_change_password_option: string;
  cg_client_ident: string;
  cg_client_password: string;
  cg_server_ident: string;
  cg_tls_sprof: string;
  cg_tls_client_auth: string;
  cg_tls_sprof_user_param: string;
  cg_root_dir: string;
  cg_home_dir: string;
  cg_http_home_page: string;
  cg_http_list_template: string;
  cg_server_password: string;
  cg_rights_nb: string;
  [key: string]: string | { [key: string]: string };
}
