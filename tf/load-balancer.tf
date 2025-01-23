resource "aws_lb" "site" {
  name               = "${var.env.name}-pine-site-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = var.env.name == "prod" ? ["sg-07ee307f580a4da18"] : ["sg-0598be1a7fa0bcf89"]
  subnets            = var.env.name == "prod" ? ["subnet-083f989dcb1a55770","subnet-00a1e34b07a68772d"] : ["subnet-070a9533d1c726727","subnet-0419a3ab412e65df6"]
  enable_http2       = true
  ip_address_type    = "ipv4"
  idle_timeout       = 242
}


resource "aws_lb_listener" "http-redirect-to-https" {

  load_balancer_arn = aws_lb.site.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = 443
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

resource "aws_lb_listener" "https" {

  load_balancer_arn = aws_lb.site.arn
  port              = 443 
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = "arn:aws:acm:us-west-2:192279148113:certificate/54739dec-cd31-48ca-ad83-3f0be8e18779"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.site.arn
  }
}

##CURRENTLY NOT USING THESE SECURITY GROUPS
resource "aws_security_group" "lb" {
  name   = "${var.env.name}/site/lb"
  vpc_id = var.env.name == "prod" ? "vpc-06da9c9b7ed0f3321" : "vpc-06c9f1fc8cb7f6555"
}

resource "aws_security_group_rule" "lb-https-from-world" {
  security_group_id = aws_security_group.lb.id
  cidr_blocks       = ["0.0.0.0/0"]
  type              = "ingress"
  protocol          = "tcp"
  from_port         = 443
  to_port           = 443
}

resource "aws_security_group_rule" "lb-http-from-world" {
  security_group_id = aws_security_group.lb.id
  cidr_blocks       = ["0.0.0.0/0"]
  type              = "ingress"
  protocol          = "tcp"
  from_port         = 80
  to_port           = 80
}

#Make this more specific
resource "aws_security_group_rule" "lb-http-to-service" {
  security_group_id        = aws_security_group.lb.id
  cidr_blocks              = ["0.0.0.0/0"]
  type                     = "egress"
  from_port                = 0
  to_port                  = 65535
  protocol                 = "-1"
}


