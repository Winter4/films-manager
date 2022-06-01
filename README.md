# **Halo Lab test task**
The following project is a simple Express app which can response on the only route with provided film data, fetching it from the **Postgres database** (actually, any SQL DB; just needs a little correction to be able to).

## **Overview**
The app consists of:

* Node.JS app
* PostgreSQL database aka main storage
* Redis database aka cache 

As the bare bones app isn't suitable due to 2022 deploy standarts, you'll also find **Docker** here. So that, there are two ways of running it: just bare _Node.JS_ app (let's call it **NPM run**) and complete _Docker-Composed_ deploy (let's call it **Docker run**). Docker run is more prefered, but we will cover both. 
In case if NPM run is your choice - you can actually skip the below configs overviews to the **Installation**. 

There are a few valuable config nodes (not node.js stuff but the project node)

* Node.JS environment variables, `.env` file
* Node app `Dockerfile`
* NGinx config, `nginx.conf` file
* `docker-compose.yml` file

By default, the only one which needs your attention - `.env` file. It has 4 sections: **database config**, **Redis cache config**, **Express.JS config**, **Node logger config**. **Database config** must be present anyway. Using Docker run, **Redis cache** section may be omitted. **Node logger** section may be omitted both cases.

The other configs have default settings which may be common for different launches. For your deeper understanding, let's cover those settings.

### Node app `Dockerfile`
The `ENV` rows are our interest. `REDIS_HOST` & `REDIS_PORT` configure the connection to Redis, running in its container. for now, host is `redis`. As Docker run means using _Docker Compose_, the host name should be the same as Redis service name in the `docker-compose.yml` file. It's named `redis`, actually. Port is set to `6379` by default and its value depends on the exposed Redis service port in the mentioned file.

> Writing this, I realised the env variables could be moved to `docker-compose.yml` and that would be more logic. The reason I've got the things like that - I've tested the container itself, not using Docker Compose at once.

### NGinx `nginx.conf` config
Here we have 3 parameters: listened port, pass URL, server name.
    
1. `listen 0.0.0.0:80;` - listened port **inside** the container.
2. `proxy_pass http://app:8080;` - URL for passing the requests. The host is `app` the same reason the Redis cache host is `redis`. _See Docker Compose docs for more information_. Port should be the same as `SERVER_PORT` value in `.env` file (check below, Installation.3).
3. `server_name localhost;` - your domain name you have your app associated with.

### `docker-compose.yml` file
In the `redis` service the service name should be the same as Node app `REDIS_HOST` env, and the exposed port should be the same as `REDIS_PORT`.

In the `app` service the service name should be the same as `nginx.conf` proxy_pass hostname, and the exposed port should be the same as proxy_pass port.

In the `nginx` service published port (`published : mapped`) is the one you would acess your app on, and mapped port should be the same as `nginx.conf` `listen` port.

> Warning: depending on your system setup, the root user priviliges may be required to acess the ports <= 1024 (1000)


## **Installation**
1. Download the sources from GitHub repository
2. Create `.env` file in the root of the folder (so that `server.js` and created `.env` were the same level). That's your **environment** file - all the variables, defined here, would be added to your `process.env` object during the app runtime 
3. Fill `.env` file with the following data in `'key=value'` format:
    > `.env` note: avoid spaces around the `'='`. The reason is some third-party software like _Docker_ may fail, reading the `'key = value'` formatted data, setting your `key` equal `undefined` or something
    
    > Do `'username=postgres'` instead of `'username = postgres'` or `'username =postgres'` or `'username= postgres'`
    ### Database (Postgres, actually)
    * `DB_HOST`: your **database server hostname**. Set equal either `localhost` in case you have your DB running locally on your computer, or your **host domen name** like `my.db.cloudsql.com` or your **host IP-adress** like `12.13.14.16`. The exact case depends on your situation

    * `DB_PORT` (optional): your **database server port**. Set equal your actual DB config. May be skipped if your connect doesn't require this (connecting to cloud, for example)

    * `DB_USER` (optional): your **database user name**. May be skipped if your DB doesn't require authentication

    * `DB_PASSWORD` (optional): your **database user password**. May be skipped if your DB doesn't require authentication

    * `DB_DATABASE`: your **database actual name** inside of your DB server

    ### Redis cache (non-docker launch)
    * `REDIS_HOST` (non-docker): use this key if you want to run the app **not using** docker. Other way this variable would be overwritten with the `Dockerfile` value. Format's simillar to `DB_HOST`

    * `REDIS_PORT` (non-docker): use this key if you want to run the app **not using** docker. Other way this variable would be overwritten with the `Dockerfile` value. Format's simillar to `DB_PORT`

    ### Express.JS 
    * `SERVER_PORT`: Express.JS server would listen **this** port while running. Depending on whether you are using Docker run, or not, you face the following:

        **Docker run:** this case you will also have **NGinx server** in a container, configured to **reverse proxy** by default, and passing all the requests to `8080` port. So that, setting `SERVER_PORT` equal `8080` is the easiest way. If you want **Express.JS** listen **custom port**, you should also edit corresponding port in the `nginx.conf` file

        **NPM run:** this case this param isn't linked to any other params. Set equal any port you want your app be accessable on (any but busy ports, sure)

    ### Logging

    * `LOG_LEVEL` (optional): by default the logs would be written to files, except the initial launch logs - you'll see them in your console, too. Setting this to `debug` would make the logs appear both in the files and in the console. Debug mode, you know :)

4. (optional) If using NPM run, exec `npm install` in your terminal in the root of the sources. All the dependencies would be fetched and `node_modules` folder would appear.

## **Running**
Congratulations! Setting your environments could seem a little bit tricky, so we will take a look around the whole project just later. Now, you are ready to run the app and have some data returned for your requests. Again, depending on your preferenced way of running, two cases:

* **Docker run:** `docker compose up` in your terminal. Depending on your OS, this may require user priviliges to acess the priviliged `80` port. On success, the app's running on **NGinx**-configured port

* **NPM run:** `npm start` in your terminal. The app's running on `SERVER_PORT` port

## **Testing**
**[Jest](npmjs.org/package/jest)** package is used for unit testing. `npm test` in your terminal to run the tests. 
> Attention: due to author's inexperience, the tests setup may seem confusing. It requires DB & Redis be accessable. Redis may be easy run using Docker - the bare Redis image is enough, any configs aren't required.

## **Conclusion**
After all, the app is running. If the Docker run was used - you have the [NGinx -> Express -> Redis/Postgres] composed setup. Other way, you just have a Node.JS process. Enjoy the music :)
