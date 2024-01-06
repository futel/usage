import s3_util
import fs_util
import updated_state
import spreader

print("Walking s3 bucket content...")
for s3_key in s3_util.daily_files_gen():
    print('Checking {}...'.format(s3_key['key']))
    if updated_state.is_updated(s3_key):
        print("{} already up to date. Skipping.".format(s3_key['key']))
    else:
        print("{} needs updating.".format(s3_key['key']))
        events = s3_util.load_file(s3_key['key'])
        print("Got {} events".format(len(events)))
        spreader.update_all(events)
        updated_state.update(s3_key)

updated_state.flush_write()

buildDir = fs_util.make_build_dir()
with open('{}/{}'.format(buildDir, 'last_updated.txt'), 'w') as outfile:
    outfile.write(updated_state.last_updated())
