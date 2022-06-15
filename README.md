# lambda_pdf_generator

A lambda function that will take html as a input and return pdf buffer

# For Local testing

if you want to test this lambda on your local follow these given commands. it will use docker lambci and return you PDF buffer.

```
docker build -t lambci docker
rm -rf node_modules
docker run --rm -v "$PWD":/var/task lambci npm install --production
docker run --network host -e --rm -v "$PWD":/var/task lambci/lambda:nodejs12.x index.handler '{"html":"<b>Hello</>"}'
```
