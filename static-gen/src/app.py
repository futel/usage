import s3_util
import updated_state

print("Walking s3 bucket content...")
for s3_key in s3_util.daily_files_gen():
    print(s3_key)
    if updated_state.is_updated(s3_key):
        print("{} already up to date. Skipping.".format(s3_key['key']))
    else:
        print("{} needs updating.".format(s3_key['key']))
        # todo: process file
        updated_state.update(s3_key)

updated_state.flush_write()
