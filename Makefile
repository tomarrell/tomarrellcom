.PHONY: clean build run

clean:
	rm -r ./build

build: clean
	@echo "-> Building image..."
	@mkdir build
	@cp -R css fonts images js favicon.ico gpg.asc index.html ./build
	@docker build -t tomarrellcom .

run: build
	@echo "-> Killing any old container, starting a new one..."
	@-docker kill tomarrellcom
	@-docker rm tomarrellcom
	@docker run -d -p 8080:80/tcp  --name tomarrellcom tomarrellcom
