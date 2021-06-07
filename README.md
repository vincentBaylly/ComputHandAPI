# mongoexpressapi

API template with express mongo and oauth

## Installation

#### Mongo-DB

https://docs.mongodb.com/manual/administration/install-enterprise/

- Starting and using mongodb
```bash
sudo service mongod start
sudo service mongod stop
sudo service mongod restart
```

- Mongo shell
```bash
mongo
```

#### db-migrate
https://db-migrate.readthedocs.io/en/latest/
```bash
Usage: db-migrate [up|down|reset|create|db] [[dbname/]migrationName|all] [options]
 Down migrations are run in reverse run order, so migrationName is ignored for down migrations.
Use the --count option to control how many down migrations are run (default is 1).
 Options:
  --env, -e                   The environment to run the migrations under.    [default: "dev"]
  --migrations-dir, -m        The directory containing your migration files.  [default: "./migrations"]
  --count, -c                 Max number of migrations to run.
  --dry-run                   Prints the SQL but doesn t run it.              [boolean]
  --verbose, -v               Verbose mode.                                   [default: false]
  --config                    Location of the database.json file.             [default: "./database.json"]
  --force-exit                Call system.exit() after migration run          [default: false]
  --sql-file                  Create sql files for up and down.               [default: false]
  --coffee-file               Create a coffeescript migration file            [default: false]
  --migration-table           Set the name of the migration table.
  --table, --migration-table  
```

#### Mongoose
https://mongoosejs.com/

#### Node.js
https://nodejs.org/en/

## Starting and Run Application

- Download and install application dependencies
```bash
cd backend
npm install
```

- Start Application
```bash
node server.js
```

## ENV file

Create your own environment file to declare your local variable.

See the file ENV.md for list of existing variable to add to your local file.  
Add the documentation in

## dotenv
https://github.com/motdotla/dotenv#readme

## Passport
http://www.passportjs.org/docs/

## Application Architecture

```
.
├── config                  # App configuration files
│   └── ...                 # Other configurations
├── routes                  
│   ├── controllers         # Request managers
│   └── routes.js           # Define routes and middlewares here
├── db                      # Data access stuff  (Sequalize mostly)
│   ├── models              # Models
│   ├── migrations          # Migrations
│   ├── seeds               # Seeds
│   └── index.js            # Sequalize instantiation
├── core                    # Business logic implementation             
│   └── ...                 # Other business logic implementations
├── utils                   # Util libs (formats, validation, etc)
├── tests                   # Testing
├── scripts                 # Standalone scripts for dev uses
├── pm2.js                  # pm2 init
├── shipitfile.js           # deployment automation file
├── package.json           
├── README.md         
└── app.js                  # App starting point
```

> Vue.js

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

## License
[Apache 2.0 License](https://img.shields.io/crates/l/:crate.svg?style=flat)
