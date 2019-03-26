.PHONY: clean build run

clean:
	rm -rf ./build

cleanS3:
	@echo "-> Scrubbing S3..."
	aws s3 rm s3://tomarrell.com --recursive
	@echo "-> S3 clean..."

build: clean
	@echo "-> Building image..."
	@mkdir build
	@cp -R css fonts images js favicon.ico gpg.asc index.html ./build
	@docker build -t tomarrellcom .

upload: cleanS3 build
	@echo "-> Copying built files to S3..."
	aws s3 cp ./build s3://tomarrell.com --recursive --acl public-read

run: build
	@echo "-> Killing any old container, starting a new one..."
	@-docker kill tomarrellcom || true
	@-docker rm tomarrellcom
	@docker run -d -p 8080:80/tcp  --name tomarrellcom tomarrellcom
