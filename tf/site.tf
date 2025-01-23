locals {
  min-desired-count = var.env.name == "prod" ? 4 : 1
  desired-count     = var.env.name == "prod" ? 4 : 1
  max-desired-count = var.env.name == "prod" ? 8 : 1
}

resource "aws_ecr_repository" "site" {
  name                 = "${var.env.name}-pine-site"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

# Fargate Service
resource "aws_ecs_service" "site" {
  name                   = "${var.env.name}-pine-site"
  cluster                = var.env.name == "prod" ? "pinesports-prod-Cluster" : "pinesports-cfn-ecs-cluster-website-Cluster"
  desired_count          = local.desired-count
  task_definition        = aws_ecs_task_definition.site.arn
  launch_type            = "FARGATE"
  enable_execute_command = true

  lifecycle {
    ignore_changes = [
      desired_count
    ]
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.site.arn
    container_name   = "pine-site"  
    container_port   = 8000    
  }

  network_configuration {
    subnets          = var.env.name == "prod" ? ["subnet-08ce1cb420fe007a3","subnet-04e26514f44e477da"] : ["subnet-03949dd9add95ca30","subnet-0e2a4d864cceaa999"]
    assign_public_ip = false
    security_groups = var.env.name == "prod" ? ["sg-04150e7c8ff053166"] : ["sg-08c9c9aaa48c17ff7"]
  }
}

# Service Definition
resource "aws_ecs_task_definition" "site" {
  family                   = "${var.env.name}-pine-site"
  cpu                      = var.site.cpu
  memory                   = var.site.memory
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  execution_role_arn       = aws_iam_role.execution.arn
  task_role_arn            = aws_iam_role.pine-site.arn
  runtime_platform {
    cpu_architecture       = "X86_64"
    operating_system_family = "LINUX"
  }

  container_definitions = <<EOF
[
  {
    "name": "pine-site",
    "image": "${aws_ecr_repository.site.repository_url}:${var.app-version}",
    "memory": ${var.site.memory},
    "portMappings": [
      {
        "containerPort": 8000,
        "hostPort": 8000,
        "protocol": "tcp"
      }
    ],
    "secrets": [],
    "environment": [
      {
        "name": "DJANGO_SETTINGS_MODULE",
        "value": "djPine.settings"
      },
      {
        "name": "ANTHROPIC_API_KEY",
        "value": "${var.anthropic.key}"
      },
      {
        "name": "AWS_ACCESS_KEY_ID",
        "value": "${var.aws.id}"
      },
      {
        "name": "AWS_SECRET_ACCESS_KEY",
        "value": "${var.aws.secret}"
      },
      {
        "name": "AWS_STORAGE_BUCKET_NAME",
        "value": "${var.aws.bucket}"
      },
      {
        "name": "EMAIL_HOST_PASSWORD",
        "value": "${var.email.password}"
      },
      {
        "name": "EMAIL_HOST_USER",
        "value": "${var.email.user}"
      },
      {
        "name": "GEMINI_API_KEY",
        "value": "${var.gemini.key}"
      },
      {
        "name": "OPENAI_API_KEY",
        "value": "${var.openai.key}"
      },
      {
        "name": "PERPLEXITY_API_KEY",
        "value": "${var.perplexity.key}"
      },
      {
        "name": "RDS_DB_NAME",
        "value": "pine_server_db"
      },
      {
        "name": "RDS_HOSTNAME",
        "value": "${var.rds.host}"
      },
      {
        "name": "RDS_PASSWORD",
        "value": "${var.rds.password}"
      },
      {
        "name": "RDS_PORT",
        "value": "5432"
      },
      {
        "name": "RDS_USERNAME",
        "value": "postgres"
      },
      {
        "name": "SERP_API_KEY",
        "value": "${var.serp.key}"
      },
      {
        "name": "STRIPE_ENDPOINT_WEBHOOK_SECRET",
        "value": "${var.stripe.endpoint}"
      },
      {
        "name": "STRIPE_PUBLISHABLE_KEY",
        "value": "${var.stripe.pub-key}"
      },
      {
        "name": "STRIPE_SECRET_KEY",
        "value": "${var.stripe.secret-key}"
      },
      {
        "name": "SUPABASE_API_KEY",
        "value": "${var.supabase.key}"
      },
      {
        "name": "SUPABASE_URL",
        "value": "${var.supabase.url}"
      },
      {
        "name": "USER_CHARTS_BUCKET_S3",
        "value": "${var.charts.bucket}"
      },
      {
        "name": "USER_CHARTS_BUCKET_URL",
        "value": "${var.charts.url}"
      },
      {
        "name": "DOMAIN_URL",
        "value": "${var.domain.name}"
      },
      {
        "name": "ESSENTIAL_MONTHLY_PRICE_ID",
        "value": "${var.stripe.essential-mo}"
      },
      {
        "name": "ESSENTIAL_YEARLY_PRICE_ID",
        "value": "${var.stripe.essential-yr}"
      },
      {
        "name": "PREMIUM_MONTHLY_PRICE_ID",
        "value": "${var.stripe.premium-mo}"
      },
      {
        "name": "PREMIUM_YEARLY_PRICE_ID",
        "value": "${var.stripe.premium-yr}"
      },
      {
        "name": "ULTIMATE_MONTHLY_PRICE_ID",
        "value": "${var.stripe.ultimate-mo}"
      },
      {
        "name": "ULTIMATE_YEARLY_PRICE_ID",
        "value": "${var.stripe.ultimate-yr}"
      },
      {
        "name": "PREMIUM_DISCORD_PRICE_ID",
        "value": "${var.stripe.premium-discord}"
      },
      {
        "name": "DISCORD_CLIENT_ID",
        "value": "${var.discord.client-id}"
      },
      {
        "name": "DISCORD_CLIENT_SECRET",
        "value": "${var.discord.client-secret}"
      },
      {
        "name": "DISCORD_REDIRECT_URI",
        "value": "${var.discord.redirect-uri}"
      },
      {
        "name": "DISCORD_GUILD_ID",
        "value": "${var.discord.guild-id}"
      },
      {
        "name": "DISCORD_BOT_TOKEN",
        "value": "${var.discord.bot-token}"
      },
      {
        "name": "DISCORD_SUBSCRIBER_ROLE_ID",
        "value": "${var.discord.role-id}"
      },
      {
        "name": "STRIPE_CUSTOMER_PORTAL_URL",
        "value": "${var.stripe.customer-portal}"
      },
      {
        "name": "SENDGRID_API_KEY",
        "value": "${var.sendgrid.api-key}"
      },
      {
        "name": "WELCOME_EMAIL_TEMPLATE_ID",
        "value": "${var.sendgrid.welcome-email}"
      },
      {
        "name": "CANCEL_EMAIL_TEMPLATE_ID",
        "value": "${var.sendgrid.cancel-email}"
      },
      {
        "name": "CANCEL_COUPON_ID",
        "value": "${var.stripe.cancel-coupon}"
      },
      {
        "name": "DJANGO_DEBUG",
        "value": "${var.django.debug}"
      },
      {
        "name": "DJANGO_SECRET_KEY",
        "value": "${var.django.secret}"
      },
      {
        "name": "AWS_DJANGO_STATIC_BUCKET",
        "value": "${var.django.static-bucket}"
      },
      {
        "name": "SS_API_KEY",
        "value": "${var.sharpsports.key}"
      },
      {
        "name": "DEEPSEEK_API_KEY",
        "value": "${var.deepseek.key}"
      }
    ],
    "essential": true,
    "volumesFrom": [],
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-region": "${data.aws_region.active.name}",
        "awslogs-group": "${aws_cloudwatch_log_group.site.name}",
        "awslogs-stream-prefix": "${var.env.name}"
      }
    }
  }
]
EOF
}

# Logs
resource "aws_cloudwatch_log_group" "site" {
  name = "/${var.env.name}/pine-site"
}

# LB Target Group
resource "aws_lb_target_group" "site" {
  name                 = "${var.env.name}-site"
  port                 = 8000
  protocol             = "HTTP"
  target_type          = "ip"
  vpc_id               = var.env.name == "prod" ? "vpc-06da9c9b7ed0f3321" : "vpc-06c9f1fc8cb7f6555"
  deregistration_delay = 180

  # Enable sticky sessions
  stickiness {
    enabled = true
    type    = "lb_cookie"
    cookie_duration = 86400  # 1 day in seconds
  }

  health_check {
    path                = "/health/"
    port                = 8000
    interval            = 70
    timeout             = 65
    healthy_threshold   = 2
    unhealthy_threshold = 4
  }
}

# Autoscaling
resource "aws_appautoscaling_target" "site" {
  max_capacity       = local.max-desired-count
  min_capacity       = local.min-desired-count
  resource_id        = "service/${aws_ecs_service.site.cluster}/${aws_ecs_service.site.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"
  count              = var.env.name == "prod" ? 1 : 0 #TODO- confirm?
}

resource "aws_appautoscaling_policy" "site-cpu" {
  name               = "site-cpu-scaling"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.site[0].resource_id
  scalable_dimension = aws_appautoscaling_target.site[0].scalable_dimension
  service_namespace  = aws_appautoscaling_target.site[0].service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageCPUUtilization"
    }

    target_value       = 70
    scale_in_cooldown  = 10
    scale_out_cooldown = 10
  }

  count = var.env.name == "prod" ? 1 : 0
}

resource "aws_appautoscaling_policy" "site-mem" {
  name               = "site-mem-scaling"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.site[0].resource_id
  scalable_dimension = aws_appautoscaling_target.site[0].scalable_dimension
  service_namespace  = aws_appautoscaling_target.site[0].service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageMemoryUtilization"
    }

    target_value       = 70
    scale_in_cooldown  = 10
    scale_out_cooldown = 10
  }

  count = var.env.name == "prod" ? 1 : 0
}