NAME := pine-sports-site
SHELL := /bin/bash
VERSION := $(shell cat VERSION)
COMMIT_SHA := $(shell git rev-parse HEAD)
platform="linux/amd64"

.PHONY: login build publish release

login:
	aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 192279148113.dkr.ecr.us-west-2.amazonaws.com

build:
	docker build --platform ${platform} -t ${env}-pine-site .

build-react:
	cd front-end/chat/ && npm install && npm run build-$(env)

publish:
	docker tag $(env)-pine-site:latest 192279148113.dkr.ecr.us-west-2.amazonaws.com/$(env)-pine-site:$(VERSION)
	docker push 192279148113.dkr.ecr.us-west-2.amazonaws.com/$(env)-pine-site:$(VERSION)

publish-candidate:
	docker tag $(env)-pine-site:latest 192279148113.dkr.ecr.us-west-2.amazonaws.com/$(env)-pine-site:$(VERSION)-$(COMMIT_SHA)
	docker push 192279148113.dkr.ecr.us-west-2.amazonaws.com/$(env)-pine-site:$(VERSION)-$(COMMIT_SHA)

release-candidate:
	ghr -t $$GITHUB_TOKEN -u sharpsports -r $(NAME) -c $(COMMIT_SHA) v$(VERSION)-$(COMMIT_SHA) Dockerfile