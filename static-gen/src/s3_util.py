
import boto3
import botocore

# helpers related to bucket mangling

BUCKET = 'logpublish'
client = boto3.client('s3')

def daily_files_gen():
    response = client.list_objects_v2(
        Bucket=BUCKET,
        Delimiter='/',
        Prefix='events/prod/'
    )
    while(True):
        for item in response['Contents']:
            yield _rekey(item)
        if not response['IsTruncated']:
            break
        response = client.list_objects_v2(
            Bucket=BUCKET,
            Delimiter='/',
            Prefix='events/prod/',
            ContinuationToken=response['NextContinuationToken'],
            MaxKeys=2 # DEBUG
        )

def _rekey(item):
    return {
        'key': item['Key'],
        'size': item['Size'],
        'ts': "{}".format(item['LastModified'])
    }
