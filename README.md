# setup

## general
* Have postgres running
* Have following environment variables set
 - DB_PASS
 - DB_USER
* Have created database `conflict-minerals-data` with DB_PASS/DB_USER access

## base env (optional)
$ conda env create
$ source activate conflict-minerals-data

## django server
$ source activate conflict-minerals-data
$ pip install -r requirements.txt
$ python manage.py migrate
$ python manage.py runserver

## frontend
yarn-y, webpacky stuff

# bulk import
http://localhost:8888/companies-bulk/

Paste in things from data files.
Use dropdown type "application/json"
Things get very unhappy when you only have cik - use cik and arbitrary conformed_name and all is well

# To test without postgres
DATABASES = {
    'default': {
        #'ENGINE': 'django.db.backends.postgresql',
        #'NAME': os.environ.get('DB_NAME'),
        #'USER': os.environ.get('DB_USER'),
        #'PASS': os.environ.get('DB_PASS'),
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': 'test.sqlite',
    }
}
