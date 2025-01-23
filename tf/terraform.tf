terraform {
  backend "remote" {
    organization = "sharpsports"

    workspaces {
      prefix = "pine-site-"
    }
  }
}
