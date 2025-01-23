data "terraform_remote_state" "account" {
  backend = "remote"

  config = {
    organization = "sharpsports"

    workspaces = {
      name = "pine-aws-account"
    }
  }
}

data "terraform_remote_state" "pine-core" {
  backend = "remote"

  config = {
    organization = "sharpsports"

    workspaces = {
      name = "pine-core-${var.env.name}"
    }
  }
}

provider "aws" {
  access_key = data.terraform_remote_state.account.outputs.terraform-user.id
  secret_key = data.terraform_remote_state.account.outputs.terraform-user.secret
  region     = "us-west-2"
}


data "aws_region" "active" {
  name = "us-west-2"
}