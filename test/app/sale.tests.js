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

describe('[SALES]', () => {
  before(() => seedData());

  describe('🔑   AS GUEST', () => {
    // CREATE SALE
    describe('🔗   POST /sales', () => {
      it('fail to create a sales with empty data', async () => {
        const requestResponse = await request(server)
          .post('/api/sales')
          .send({});

        expect(requestResponse).to.have.status(400);
        expect(requestResponse.text).to.eq('Required fields are missing');
      });

      it('fail if there is no inverntory for this item', async () => {
        const requestData = {
          itemId: usedData.items.item2.id,
          quantity: 10,
          price: 7,
        };

        const requestResponse = await request(server)
          .post('/api/sales')
          .send(requestData);

        expect(requestResponse).to.have.status(404);
        expect(requestResponse.text).to.eq('There is no inventory for this item');
      });

      it('fail to sell more items then there are in stock', async () => {
        const requestData = {
          itemId: usedData.items.item1.id,
          quantity: 50156,
          price: 59,
        };

        const requestResponse = await request(server)
          .post('/api/sales')
          .send(requestData);

        expect(requestResponse).to.have.status(404);
        expect(requestResponse.text).to.eq('We do not have enough stock');
      });

      it('succeed to create a sale with correct data', async () => {
        const requestData = {
          itemId: usedData.items.item1.id,
          quantity: 100,
          price: 30,
        };

        const requestResponse = await request(server)
          .post('/api/sales')
          .send(requestData);

        expect(requestResponse).to.have.status(200);
        expect(requestResponse.body.done).to.eq(true);
      });
    });

    // GET SALE
    describe('🔗   GET /sales/:saleId', () => {
      it('fail to get a sale that does not exist', async () => {
        const requestResponse = await request(server)
          .get('/api/sales/3768')
          .send({});

        expect(requestResponse).to.have.status(404);
        expect(requestResponse.text).to.eq('Sale not found');
      });

      it('succeed to get a sale that exists', async () => {
        const requestResponse = await request(server)
          .get(`/api/sales/${usedData.sales.sale1.id}`);

        expect(requestResponse).to.have.status(200);
        expect(requestResponse.body.id).to.eq(usedData.sales.sale1.id);
      });
    });

    // GET SALES
    describe('🔗   GET /sales', () => {
      it('succeed to get all sales', async () => {
        const requestResponse = await request(server)
          .get('/api/sales');

        expect(requestResponse).to.have.status(200);
        expect(requestResponse.body).to.be.an('array');
      });
    });

    // DELETE SALES
    describe('🔗   DELETE /sales/:saleId', () => {
      it('fail to delete sale that does not exist', async () => {
        const requestResponse = await request(server)
          .delete('/api/sales/4952');

        expect(requestResponse).to.have.status(404);
        expect(requestResponse.text).to.eq('Sale not found');
      });

      it('succeed to delete existing sale', async () => {
        const requestResponse = await request(server)
          .delete(`/api/sales/${usedData.sales.sale1.id}`);

        expect(requestResponse).to.have.status(200);
        expect(requestResponse.body.done).to.eq(true);
      });
    });
  });


  after(async () => removeData());
});
