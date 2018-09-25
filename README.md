<img src="https://camo.githubusercontent.com/0e9fa905efa195d0b39b203519a1fce237145d1d/68747470733a2f2f692e696d6775722e636f6d2f687261713776662e706e67" height="50">

# Billy Coding challenge

### Requirements

- Node v8.11.4
- PostgreSQL 10.5
- **Global Packages**
	- sequelize-cli (for migration/seeding)
	- mocha (for testing)
	- eslint (for code formatting)

## Getting started

### Configurations
- The npm scripts are compatible only with **Windows**, if you are on **Linux/Mac** replace the `./package.json` with the `./AdditionalFiles/Linux-Mac/package.json`. The only difference is that for Linux/Mac, the keyword `SET` along with `&` and `&&` must be removed from commands in order to run successfully.

- You'll need to create the config file by simply renaming `env.sample.json` in `env.json`. Before installing and running the server, make sure that **PostgreSQL** server is started on the port: `5432`. If you want to change the **database** **host**, **port**, **name** or **credentials**, that will be possible in `env.json`.

### 1. Install

The API server can be installed very easily by running the following commands:

```sh
# Install all the packages
$ npm i

# Table migrations 
$ npm run migration:migrate

# (optional) Seed database to match the challange data
$ npm run seeder:seed
```

### 2. Start / Stop
To start or stop the API you can use this commands:
```sh
# Start
$ npm start

# Stop
# To stop the server, you should be using Ctrl + C (twice)
```

---

### 3. Testing

For testing the APIs route you can run:

```sh
$ npm test
```


## Solution
- How many pens does Sebastian have in stock ultimo Jan 11th 2016?
	```
	POST /api/reports/getItemStockQuantity
	
	Request data:
	{
		"itemId": "1",
		"startingFrom": "2016-01-01", // optional
		"upTo": "2016-01-11 23:59" // optional
	}
	
	Result: 275
	```
	
- What is the value of the inventory ultimo Jan 11th 2016?
	```
	POST /api/reports/getItemStockValue
	
	Request data:
	{
		"itemId": "1",
		"startingFrom": "2016-01-01", // optional
		"upTo": "2016-01-11 23:59" // optional
	}
	
	Result: 21750
	```
	
- What are the costs of pen solds ultimo Jan 11th 2016?
	```
	POST /api/reports/getItemSalesCost
	
	Request data:
	{
		"itemId": "1",
		"startingFrom": "2016-01-01", // optional
		"upTo": "2016-01-11 23:59" // optional
	}
	
	Result: 3875
	```
	
## Mentions
 * The code was written with 2 space indentation
 * In 'AdditionalFiles' directory you will find:
    * My Postman Collection (I didn't have time to implement Swagger :D)
    * A simple Database Diagrame (created with Draw.io)
    * A package.json for Linux/Mac

**by David Gamote** for **Billy.dk** 