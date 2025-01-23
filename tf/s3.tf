resource "aws_s3_bucket" "django-static" {
  bucket = "${var.env.name}-pinesports-django-static"
}

resource "aws_s3_bucket_cors_configuration" "django_static_cors" {
  bucket = aws_s3_bucket.django-static.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["PUT","POST","DELETE","GET","HEAD"]
    allowed_origins = ["*"]  # Add your development origin here
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
}

resource "aws_s3_bucket_public_access_block" "django_static_public_access" {
  bucket                  = aws_s3_bucket.django-static.id
  block_public_acls       = false    # Set to false to allow ACLs
  block_public_policy     = false    # Optional, based on your security requirements
  ignore_public_acls      = false    # Allow the use of public ACLs on objects
  restrict_public_buckets = false
}

resource "aws_s3_bucket_lifecycle_configuration" "bot-cache-ttl" {
  bucket = aws_s3_bucket.django-static.id

  rule {
    id     = "cacheTTL"
    status = "Enabled"

    filter {
      prefix = "cache/"
    }

    expiration {
      days = 1
    }
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "django-static" {
  bucket = aws_s3_bucket.django-static.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"  # Use SSE-S3 encryption instead of KMS
    }
  }
}

resource "aws_s3_bucket_policy" "django_static_policy" {
  bucket = aws_s3_bucket.django-static.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.django-static.arn}/*"
      }
    ]
  })
}
