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

describe('[REPORTS]', () => {
  before(() => seedData());

  describe('🔑   AS GUEST', () => {
    // GET ITEM STOCK QUANTITY
    describe('🔗   POST /reports/getItemStockQuantity', () => {
      it('fail if item does not exist', async () => {
        const requestData = {
          itemId: 5267,
        };

        const requestResponse = await request(server)
          .post('/api/reports/getItemStockQuantity')
          .send(requestData);

        expect(requestResponse).to.have.status(404);
        expect(requestResponse.text).to.eq('Item not found');
      });

      it('succeed to get item stock quantity', async () => {
        const requestData = {
          itemId: usedData.items.item3.id,
        };

        const requestResponse = await request(server)
          .post('/api/reports/getItemStockQuantity')
          .send(requestData);

        expect(requestResponse).to.have.status(200);
        expect(Number(requestResponse.text)).to.eq(usedData.inventories.inventory4.quantity);
      });
    });

    // GET ITEM STOCK VALUE
    describe('🔗   POST /reports/getItemStockValue', () => {
      it('fail if item does not exist', async () => {
        const requestData = {
          itemId: 8207,
        };

        const requestResponse = await request(server)
          .post('/api/reports/getItemStockValue')
          .send(requestData);

        expect(requestResponse).to.have.status(404);
        expect(requestResponse.text).to.eq('Item not found');
      });

      it('succeed to get item stock value', async () => {
        const requestData = {
          itemId: usedData.items.item3.id,
        };

        const requestResponse = await request(server)
          .post('/api/reports/getItemStockValue')
          .send(requestData);

        expect(requestResponse).to.have.status(200);
        expect(Number(requestResponse.text))
          .to.eq(
            usedData.inventories.inventory4.quantity
            * usedData.inventories.inventory4.costPrice,
          );
      });
    });

    // GET ITEM SALES COST
    describe('🔗   POST /reports/getItemSalesCost', () => {
      it('fail if item does not exist', async () => {
        const requestData = {
          itemId: 6377,
        };

        const requestResponse = await request(server)
          .post('/api/reports/getItemSalesCost')
          .send(requestData);

        expect(requestResponse).to.have.status(404);
        expect(requestResponse.text).to.eq('Item not found');
      });

      it('succeed to get item stock value', async () => {
        const requestData = {
          itemId: usedData.items.item3.id,
        };

        const requestResponse = await request(server)
          .post('/api/reports/getItemSalesCost')
          .send(requestData);

        expect(requestResponse).to.have.status(200);
        expect(Number(requestResponse.text)).to.eq(usedData.inventories.inventory4.costPrice);
      });
    });
  });


  after(async () => removeData());
});
