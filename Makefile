.PHONY: deploy

deploy:
	git add .
	git commit -am "${commit}" -S
	git push -u origin master