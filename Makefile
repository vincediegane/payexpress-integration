.PHONY: deploy

node_modules: package.json
	yarn install

dev: node_modules
	yarn dev

deploy:
	git add .
	git commit -am "${commit}" -S
	git push -u origin master