export interface RuleTable {
  rt_name: string;
  rt_status: string;
  rt_type_of_rules_table: string;
  rt_default_execution_type: string;
  rt_link_transfers: string;
  rt_comments: string;
  rt_default_model: string;
  rt_default_perl_script: string;
  rt_default_command_line: string;
  rt_restrict_processing: string;
  rt_restrict_processing_on_state: string;
  rt_restrict_processing_on_direction: string;
  rt_restrict_processing_on_type: string;
  rt_restrict_processing_on_mode: string;
  rt_restrict_processing_on_protocol: string;
  rt_log_level: string;
  rt_is_rules_table_exclusive: string;
  rt_is_user_exits_activated: string;
  rt_default_purge_model: string;
  [key: string]: string;
}
