# Policy document for allowing ECS to assume the execution role
data "aws_iam_policy_document" "execution" {
  statement {
    sid     = "AllowECSAssume"
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

# Policy document for allowing ECS to assume the site role
data "aws_iam_policy_document" "site-assume-role" {
  statement {
    sid     = "AllowECSAssume"
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

# Policy document for ECR access permissions
data "aws_iam_policy_document" "ecr_access" {
  statement {
    sid     = "AllowECRAccess"
    effect  = "Allow"
    actions = [
      "ecr:GetAuthorizationToken",
      "ecr:BatchCheckLayerAvailability",
      "ecr:GetDownloadUrlForLayer",
      "ecr:BatchGetImage"
    ]
    resources = ["*"]
  }
}

# Policy document for CloudWatch Logs permissions
data "aws_iam_policy_document" "cloudwatch_logs_access" {
  statement {
    sid     = "AllowCloudWatchLogsAccess"
    effect  = "Allow"
    actions = [
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ]
    resources = ["*"]
  }
}

# Execution role with assume role policy
resource "aws_iam_role" "execution" {
  name               = "${var.env.name}-execution"
  assume_role_policy = data.aws_iam_policy_document.execution.json
}

# ECR access policy
resource "aws_iam_policy" "ecr_access_policy" {
  name        = "${var.env.name}-ecr-access-policy"
  description = "Policy to allow ECS tasks to pull images from ECR"
  policy      = data.aws_iam_policy_document.ecr_access.json
}

# CloudWatch Logs access policy
resource "aws_iam_policy" "cloudwatch_logs_policy" {
  name        = "${var.env.name}-cloudwatch-logs-policy"
  description = "Policy to allow ECS tasks to create log streams and put log events in CloudWatch Logs"
  policy      = data.aws_iam_policy_document.cloudwatch_logs_access.json
}

# Attach ECR access policy to the execution role
resource "aws_iam_role_policy_attachment" "attach_ecr_policy_to_execution" {
  role       = aws_iam_role.execution.name
  policy_arn = aws_iam_policy.ecr_access_policy.arn
}

# Attach CloudWatch Logs access policy to the execution role
resource "aws_iam_role_policy_attachment" "attach_cloudwatch_logs_policy_to_execution" {
  role       = aws_iam_role.execution.name
  policy_arn = aws_iam_policy.cloudwatch_logs_policy.arn
}

# Pine-site role with assume role policy
resource "aws_iam_role" "pine-site" {
  name               = "${var.env.name}-pine-site"
  assume_role_policy = data.aws_iam_policy_document.site-assume-role.json
}