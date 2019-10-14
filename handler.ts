// import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { config, S3 } from 'aws-sdk';

config.update({ region: 'us-east-1' });
const s3 = new S3({ apiVersion: '2006-03-01' });

export const listBuckets = (_event, _context, callback) => {
  s3.listBuckets(function (err, data) {
    if (!err) {
      callback(null, { statusCode: 200, body: JSON.stringify(data['Buckets']) });
    } else {
      callback(null, { statusCode: 500, body: JSON.stringify(err) });
     }
  });
}

export const listBucketObjects = (event, _context, callback) => {
  s3.listObjects({ Bucket: event.pathParameters.bucket }, function (err, data) {
    if (!err) {
      callback(null, { statusCode: 200, body: JSON.stringify(data) });
    } else {
      callback(null, { statusCode: 500, body: JSON.stringify(err) });
    }
  });
}
