# Configure the Datadog provider
provider "datadog" {
  api_key = data.terraform_remote_state.core.outputs.datadog.api-key
  app_key = data.terraform_remote_state.core.outputs.datadog.app-key
}

resource "aws_cloudwatch_log_subscription_filter" "dd-log-stream-filter" {
  name            = "${var.env.name}-log-stream-filter"
  log_group_name  = aws_cloudwatch_log_group.site.name
  role_arn        = data.terraform_remote_state.pine-core.outputs.datadog.cw-to-log-stream-role.arn
  #Only send logs formatted with a level to datadog
  filter_pattern  = "{ $.level = \"INFO\" || $.level = \"WARN\" || $.level = \"ERROR\" }"
  destination_arn = data.terraform_remote_state.pine-core.outputs.datadog.log-stream.arn
}

# resource "aws_cloudwatch_log_subscription_filter" "dd-log-stream-filter-nginx" {
#   name            = "${var.env.name}-log-stream-filter-nginx"
#   log_group_name  = aws_cloudwatch_log_group.nginx.name
#   role_arn        = data.terraform_remote_state.core.outputs.datadog.cw-to-log-stream-role.arn
#   filter_pattern  = ""
#   destination_arn = data.terraform_remote_state.core.outputs.datadog.log-stream.arn
# }