##THESE SECURITY GROUPS CURRENTLY ARE NOT USED

resource "aws_security_group" "site" {
  name   = "${var.env.name}/site"
  vpc_id = var.env.name == "prod" ? "vpc-06da9c9b7ed0f3321" : "vpc-06c9f1fc8cb7f6555"
}

#Make this more specific
resource "aws_security_group_rule" "api-http-to-world" {
  security_group_id = aws_security_group.site.id
  type              = "egress"
  cidr_blocks       = ["0.0.0.0/0"]
  from_port         = 0
  to_port           = 65535
  protocol          = "-1"
}

#Make this more specific
resource "aws_security_group_rule" "ingress-from-self" {
  security_group_id        = aws_security_group.site.id
  source_security_group_id = aws_security_group.site.id
  type                     = "ingress"
  from_port                = 0
  to_port                  = 65535
  protocol                 = "-1"
}

#Make this more specific
resource "aws_security_group_rule" "ingress-from-lb" {
  security_group_id        = aws_security_group.site.id
  source_security_group_id = aws_security_group.lb.id
  type                     = "ingress"
  from_port                = 0
  to_port                  = 65535
  protocol                 = "-1"
}
