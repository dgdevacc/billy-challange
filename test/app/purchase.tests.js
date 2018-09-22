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

describe('[PURCHASES]', () => {
  before(() => seedData());

  describe('🔑   AS GUEST', () => {
    // CREATE PURCHASE
    describe('🔗   POST /purchases', () => {
      it('fail to create a purchases with empty data', async () => {
        const requestResponse = await request(server)
          .post('/api/purchases')
          .send({});

        expect(requestResponse).to.have.status(400);
        expect(requestResponse.text).to.eq('Required fields are missing');
      });

      it('succeed to create a purchase with correct data', async () => {
        const requestData = {
          itemId: usedData.items.item1.id,
          quantity: 210,
          price: 17,
        };

        const requestResponse = await request(server)
          .post('/api/purchases')
          .send(requestData);

        expect(requestResponse).to.have.status(200);
        expect(requestResponse.body.done).to.eq(true);
      });
    });

    // GET PURCHASE
    describe('🔗   GET /purchases/:purchaseId', () => {
      it('fail to get a purchase that does not exist', async () => {
        const requestResponse = await request(server)
          .get('/api/purchases/5096')
          .send({});

        expect(requestResponse).to.have.status(404);
        expect(requestResponse.text).to.eq('Purchase not found');
      });

      it('succeed to get a purchase that exists', async () => {
        const requestResponse = await request(server)
          .get(`/api/purchases/${usedData.purchases.purchase1.id}`);

        expect(requestResponse).to.have.status(200);
        expect(requestResponse.body.id).to.eq(usedData.purchases.purchase1.id);
      });
    });

    // GET PURCHASES
    describe('🔗   GET /purchases', () => {
      it('succeed to get all purchases', async () => {
        const requestResponse = await request(server)
          .get('/api/purchases');

        expect(requestResponse).to.have.status(200);
        expect(requestResponse.body).to.be.an('array');
      });
    });

    // DELETE PURCHASES
    describe('🔗   DELETE /purchases/:purchaseId', () => {
      it('fail to delete purchase that does not exist', async () => {
        const requestResponse = await request(server)
          .delete('/api/purchases/1680');

        expect(requestResponse).to.have.status(404);
        expect(requestResponse.text).to.eq('Purchase not found');
      });

      it('succeed to delete existing purchase', async () => {
        const requestResponse = await request(server)
          .delete(`/api/purchases/${usedData.purchases.purchase1.id}`);

        expect(requestResponse).to.have.status(200);
        expect(requestResponse.body.done).to.eq(true);
      });
    });
  });


  after(async () => removeData());
});
