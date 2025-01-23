terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "4.65.0"
    }
    datadog = {
      source = "datadog/datadog"
    }
  }
  required_version = ">= 0.13"
}