# A template to quickly create a blog with nextjs

## Setup guide for Ubuntu 18.04 x64 production server


### Step 1: setup mongodb
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

sudo apt install nodejs

sudo apt install npm

download your_repo

cd your_repo

npm install


### Step 2: setup your .env file

touch .env

vim .env

i

```
# Just an illustration, but these variables should be set
# note: API_URL = (http://localhost:3000 || http://example.com:3000)

API_URL = http://example.com:3000
MONGODB_URI = mongodb://localhost:27017/blog
GOOGLE_ANALYTICS_ID =
HTML_LANG = en
ADMIN_USERNAME = username
ADMIN_PASSWORD = password
```

escape

:wq

enter

### Step 3: ..

