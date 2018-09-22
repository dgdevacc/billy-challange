/* global describe, before, it, after */

// Set up the Chai module
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp); // attach http addon to Chai
const { request, expect } = chai;

const server = require('./../../bin/api-server');

const {
  usedData, seedData, removeData,
} = require('./../seeder');

describe('[ITEMS]', () => {
  before(() => seedData());

  describe('🔑   AS GUEST', () => {
    // CREATE ITEM
    describe('🔗   POST /items', () => {
      it('fail to create an item with empty data', async () => {
        const requestResponse = await request(server)
          .post('/api/items')
          .send({});

        expect(requestResponse).to.have.status(400);
        expect(requestResponse.text).to.eq('Required fields are missing');
      });

      it('fail to create an item with duplicated SKU', async () => {
        const requestResponse = await request(server)
          .post('/api/items')
          .send(usedData.items.item1.toJSON());

        expect(requestResponse).to.have.status(400);
        expect(requestResponse.text).to.eq('Duplicated SKU');
      });

      it('succeed to create an item with correct data', async () => {
        const requestData = {
          name: 'Another product',
          sku: 'anotherProduct01',
        };

        const requestResponse = await request(server)
          .post('/api/items')
          .send(requestData);

        expect(requestResponse).to.have.status(200);
        expect(requestResponse.body.sku).to.eq(requestData.sku);
      });
    });

    // GET ITEM
    describe('🔗   GET /items/:itemId', () => {
      it('fail to get an item that does not exist', async () => {
        const requestResponse = await request(server)
          .get('/api/items/1406')
          .send({});

        expect(requestResponse).to.have.status(404);
        expect(requestResponse.text).to.eq('Item not found');
      });

      it('succeed to get an item that exists', async () => {
        const requestResponse = await request(server)
          .get(`/api/items/${usedData.items.item1.id}`);

        expect(requestResponse).to.have.status(200);
        expect(requestResponse.body.sku).to.eq(usedData.items.item1.sku);
      });
    });

    // GET ITEMS
    describe('🔗   GET /items', () => {
      it('succeed to get all items', async () => {
        const requestResponse = await request(server)
          .get('/api/items');

        expect(requestResponse).to.have.status(200);
        expect(requestResponse.body).to.be.an('array');
      });
    });

    // DELETE ITEMS
    describe('🔗   DELETE /items/:itemId', () => {
      it('fail to delete item that does not exist', async () => {
        const requestResponse = await request(server)
          .delete('/api/items/1680');

        expect(requestResponse).to.have.status(404);
        expect(requestResponse.text).to.eq('Item not found');
      });

      it('succeed to delete existing item', async () => {
        const requestResponse = await request(server)
          .delete(`/api/items/${usedData.items.item1.id}`);

        expect(requestResponse).to.have.status(200);
        expect(requestResponse.body.done).to.eq(true);
      });
    });
  });


  after(async () => removeData());
});
