variable "env" {
  description = "Environment settings"
  type = object({
    name = string
  })
}

variable "site" {
  description = "Site Settings"
  type = object({
    cpu          = number
    memory       = number
  })

  default = {
    cpu          = "2048"
    memory       = "16384"
  }
}

variable "app-version" {
  description = "Version of Site"
  type        = string
}

variable "dns" {
  description = "DNS configuration for API"
  type = object({
    domain = string
  })

  default = {
    domain = "pine-sports-test"
  }
}

variable "anthropic" {
  type = object({
    key = string
  })
}

variable "aws" {
  type = object({
    id = string
    secret = string
    bucket = string
  })
}

variable "email" {
  type = object({
    user = string
    password = string
  })
}

variable "gemini" {
  type = object({
    key = string
  })
}

variable "openai" {
  type = object({
    key = string
  })
}

variable "perplexity" {
  type = object({
    key = string
  })
}

variable "serp" {
  type = object({
    key = string
  })
}

variable "rds" {
  type = object({
    host = string
    password = string
  })
}

variable "stripe" {
  type = object({
    pub-key = string
    secret-key = string
    endpoint = string
    essential-mo = string
    essential-yr = string
    premium-mo = string 
    premium-yr = string
    ultimate-mo = string
    ultimate-yr = string
    premium-discord = string
    customer-portal = string
    cancel-coupon = string
  })
}

variable "supabase" {
  type = object({
    key = string
    url = string
  })
}

variable "charts" {
  type = object({
    bucket = string
    url = string
  })
}

variable "domain" {
  type = object({
    name = string
  })
}

variable "discord" {
  type = object({
    client-id = string
    client-secret = string
    redirect-uri = string 
    guild-id = string
    bot-token = string
    role-id = string
  })
}

variable "sendgrid" {
  type = object({
    api-key = string
    welcome-email = string
    cancel-email = string 
  })
}

variable "django" {
  type = object({
    debug = bool
    secret = string
    static-bucket = string
  })
}

variable "sharpsports" {
  type = object({
    key = string
  })
}

variable "deepseek" {
  type = object({
    key = string
  })
}



