
import boto3
import botocore

# helpers related to bucket mangling

BUCKET = 'logpublish'
client = boto3.client('s3')

# generator for daily files in s3 bucket
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

def load_file(key):
    response = client.get_object(
        Bucket=BUCKET,
        Key=key
    )
    data = response['Body'].read().decode('utf-8')
    return data.strip().split('\n')
