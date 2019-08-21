rm -rf deploy
npm install
npm run build 
npm prune --production
mkdir deploy
zip -r deploy/nest-lambda.zip dist/ node_modules
aws cloudformation package --template-file nest-lambda.yaml --s3-bucket ohandourabucketlamda --output-template-file deploy/nest-lambda.out.yaml
aws cloudformation deploy --template-file deploy/nest-lambda.out.yaml --stack-name nest-lambda --capabilities CAPABILITY_IAM