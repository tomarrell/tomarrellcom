.PHONY: clean build run

clean:
	rm -r ./build

build: clean
	mkdir build
	cp -R css fonts images js favicon.ico index.html ./build
	docker build -t tomarrellcom .

run: build
	@-docker kill tomarrellcom
	@-docker rm tomarrellcom
	docker run -d -p 8080:80/tcp  --name tomarrellcom tomarrellcom
