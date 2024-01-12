export interface DecisionRule {
  rd_name: string;
  rd_type_of_decisionrules: string;
  rd_comments: string;
  rd_execution_type: string;
  rd_link_transfers: string;
  rd_model: string;
  rd_expression: string;
  rd_prop_list_name: string;
  rd_perl_script: string;
  rd_command_line: string;
  rd_xms_connector_out_name: string;
  rd_purge_model: string;
  [key: string]: string | { [key: string]: string };
}
