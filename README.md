![alt text](https://i.imgur.com/hraq7vf.png "Billy")

# Billy Coding challenge

**NOTE 1:** The npm scripts are compatible only with Windows, if you are on Linux/Mac replace the **'/package.json'** with the **'/AdditionalFiles/Linux-Mac/package.json**.
The only difference is that for Linux/Mac, the keyword 'SET' along with '&' or '&&' must be removed from commands in order to run successfully.

**NOTE 2:** You'll need to create the config file by simply renaming **'env.sample.json'** in **'env.json'**. Before installing and running the server, make sure that PostgreSQL server is started on the port: **'5432'**. If you want to change the database host, port, name or credentials, that will be possible in **'env.json'**.

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

### 2. Start/Stop
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

After that you will stumble upon:

```

[info] Setting global functions


  [info] Running beforeAll.tests.js
   ℹ️  Connection to database OK
    √ Clean the billy_cc_test before all other tests (386ms)

  [ITEMS]
    🔑   AS GUEST
      🔗   POST /items
        √ fail to create an item with empty data (49ms)
        √ fail to create an item with duplicated SKU
        √ succeed to create an item with correct data
      🔗   GET /items/:itemId
        √ fail to get an item that does not exist
        √ succeed to get an item that exists
      🔗   GET /items
        √ succeed to get all items
      🔗   DELETE /items/:itemId
        √ fail to delete item that does not exist
        √ succeed to delete existing item

  [PURCHASES]
    🔑   AS GUEST
      🔗   POST /purchases
        √ fail to create a purchases with empty data
        √ succeed to create a purchase with correct data
      🔗   GET /purchases/:purchaseId
        √ fail to get a purchase that does not exist
        √ succeed to get a purchase that exists
      🔗   GET /purchases
        √ succeed to get all purchases
      🔗   DELETE /purchases/:purchaseId
        √ fail to delete purchase that does not exist
        √ succeed to delete existing purchase

  [REPORTS]
    🔑   AS GUEST
      🔗   POST /reports/getItemStockQuantity
        √ fail if item does not exist
        √ succeed to get item stock quantity
      🔗   POST /reports/getItemStockValue
        √ fail if item does not exist
        √ succeed to get item stock value
      🔗   POST /reports/getItemSalesCost
        √ fail if item does not exist
        √ succeed to get item stock value

  [SALES]
    🔑   AS GUEST
      🔗   POST /sales
        √ fail to create a sales with empty data
        √ fail if there is no inventory for this item
        √ fail to sell more items then there are in stock
        √ succeed to create a sale with correct data
      🔗   GET /sales/:saleId
        √ fail to get a sale that does not exist
        √ succeed to get a sale that exists
      🔗   GET /sales
        √ succeed to get all sales
      🔗   DELETE /sales/:saleId
        √ fail to delete sale that does not exist
        √ succeed to delete existing sale

  [info] Running afterAll.tests.js
    √ Close the database


  32 passing (1s)
```
---

### <img src="https://image.flaticon.com/icons/svg/685/685815.svg" height="24"> Mentions
 * The code was written with 2 space indentation
 * In 'AdditionalFiles' directory you will find:
    * My Postman Collection (I didn't have time to implement Swagger :D)
    * A simple Database Diagrame (created with Draw.io)
    * A package.json for Linux/Mac
	
**by David Gamote** for **Billy.dk**.