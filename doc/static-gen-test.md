Test the static file generation.

This test will do what the github action does before committing to the gh-pages branch, updating build/date date directories and files and `build/updated_state.json`.

# Setup

To be done once in the static-gen directory.

## Create virtualenv

```
$ python3.12 -m venv venv
$ source venv/bin/activate
```

## Install prerequisites

```
$ pip install -r requirements.txt
```

## Populate environment

The main entrypoint is in `src/static-gen.py`. Because it reads from S3, it
requires the usual aws creds to be set up. This is one way:

```
$ export AWS_ACCESS_KEY_ID=<your-key-id>
$ export AWS_SECRET_ACCESS_KEY=<your-key>
```

# Run

Run in the static-gen directory.

```
$ python src/static-gen.py
```