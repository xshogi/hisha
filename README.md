# Hisha

Hisha is cross-platform and web-based Postgre SQL Database client.

## Features

This project is inspired from Adminium and pgweb. These projects are cross platform postgres editors. The features are:

1. Cross-platform: Hisha is a web-based application. You can deploy it as a public website so that you can access it any where.
2. Click cell to edit: if you would like to edit/update a cell of a table, all you need to do is simply double click on the cell. The cell will get into editing mode.
3. Enter to save: once you finished your creation, you can simple press return/enter key on keyboard to save the update. Note that this action will commit your update to database if there is no error during update query.
4. No database required for this project: except the database you would like to connect to, there is no database integration required to deploy this project.
5. Schema independent: since there is no database integration in this project, you don't need to defined any schema for deployment.

But Adminium does not open as a public service but only be an add-on of heroku. pgweb is lack of saving data by press enter. Both of them do not provide user management.

## Usage

1. Download bundled source code or `git clone git@github.com:xshogi/hisha.git`.
2. Run `npm install` to install dependent modules.
3. Run `npm start` to run the server.
4. Connect to `localhost:3000` to view the portal for database connection.

![portal](documents/portal.png)

Currently, Hisha only support connections (with TLS/SSL) by manually providing database host, user, password and database name. You can test your connection after you complete form. Once you connect to the database, all the tables of it will be listed.

![tables](documents/tables.png)

## Configure
Add a `.env` file in the root directory to change environment variables:
```shell
SSL=false # To not use SSL (ex: use hisha on localhost)
PORT=3001 # To use another port than 3000
```

## Demo
[Hisha Demo](https://hisha.herokuapp.com)

## Introduction

There are two parts of this client.

1. API: in this part, Hisha defined logic of CRUD operation of Postgres SQL Database.
	- Tables management API	
	- User management API

2. UI: this is a web-base user interface for users to management the database, tables, and users
	- Database management
	- Table management
	- User management

This platform is targeting to provide two methods to manipulate Postgres SQL. One is native SQL string. You can use SQL syntax to do create, update, read and detele of data just like traditional database management softwares. The other way is WYSIWYG editors. For creating table, there is an HTML form for you to add new column into schema and define the type, nullable, default value, and other properties. To update existed data entry, you can go into target table, simply select the cell of entry you would like to edit and double click the cell to edit. It's also easy to save the editing. All you need to do is press enter key or click check button. Then the JavaScript behind this base will make an Ajax request your API backend to finish the update operation.

## Deploy with Docker

1. Build the docker image: `docker build -t <image name> .`
	```shell
	$ docker build -t fbukevin/hisha .
	Sending build context to Docker daemon  6.204MB
	Step 1/7 : FROM node:10
	10: Pulling from library/node
	d660b1f15b9b: Pull complete
	46dde23c37b3: Pull complete
	6ebaeb074589: Pull complete
	e7428f935583: Pull complete
	eda527043444: Pull complete
	f3088daa8887: Pull complete
	80e2dc61b67d: Pull complete
	26d4b3db26a2: Pull complete
	Digest: sha256:bd3e48221d9b9303a6da8469e9052df92e6f562b3345fbab0871784b3960f04a
	Status: Downloaded newer image for node:10
	 ---> 52fe93b8eea7
	Step 2/7 : WORKDIR /usr/src/app
	 ---> Running in 203206809cc6
	Removing intermediate container 203206809cc6
	 ---> d3fb8953c00e
	Step 3/7 : COPY package*.json ./
	 ---> f4013d90daad
	Step 4/7 : RUN npm install
	 ---> Running in a9dd40c6190b
	npm notice created a lockfile as package-lock.json. You should commit this file.
	added 79 packages from 48 contributors and audited 168 packages in 2.916s
	found 2 moderate severity vulnerabilities
	  run `npm audit fix` to fix them, or `npm audit` for details
	Removing intermediate container a9dd40c6190b
	 ---> 4a4cc84b658b
	Step 5/7 : COPY . .
	 ---> cc6c3539fed2
	Step 6/7 : EXPOSE 3000
	 ---> Running in 8fdc6f725df9
	Removing intermediate container 8fdc6f725df9
	 ---> 0ec1b3afe760
	Step 7/7 : CMD [ "npm", "start" ]
	 ---> Running in f5b5c77a757c
	Removing intermediate container f5b5c77a757c
	 ---> 10850246bf3e
	Successfully built 10850246bf3e
	Successfully tagged fbukevin/hisha:latest
	```
2. Check the image: `docker images`
	```shell
	$ docker images
	REPOSITORY          TAG                 IMAGE ID            CREATED             SIZEc321abde574e5c682ad8ee662464febee36410cd202da3d75bcb8c0e571bce57
	fbukevin/hisha      latest              10850246bf3e        3 minutes ago       683MB
	```
3. Run a container: `docker run -p 3000:3000 -d <image name or ID>`
	```shell
	$ docker run -p 3000:3000 -d fbukevin/hisha
	c321abde574e5c682ad8ee662464febee36410cd202da3d75bcb8c0e571bce57
	$ docker ps
	CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS                    NAMES
	c321abde574e        fbukevin/hisha      "npm start"         4 seconds ago       Up 3 seconds        0.0.0.0:3000->3000/tcp   zealous_pare
	```
4. Check container log and connect to server `localhost:3000`
	```shell
	↪ docker logs c32
	> hisha@0.0.0 start /usr/src/app
	> node ./bin/www
	```

## WIP ToDo List
- [ ] User management (create, update and remove user, grant access privillege)
- [ ] Create and drop table
- [ ] Improvement of table rows editing (check mark button for saving update)
- [ ] Table searching
- [ ] Row sorting and searching
- [ ] Testing
- [ ] Connecting via scheme (connection string)
- [ ] SQL execution support

## DevRef

* node-postgres - https://node-postgres.com/
* EJS - http://ejs.co/

## Contributing

Any new feature or improvement or bug fixing is welcome! 
Let's make this project more useful and powerful!

## License

Requesting advise.
