"use strict";

const AxiosMockAdapter = require(
  "axios-mock-adapter");
const axios = require("axios");
const axiosMock = new AxiosMockAdapter(axios);



const {
  shipProduct, SHIPIT_SHIP_URL, SHIPIT_API_KEY
} = require("./shipItApi");


test("shipProduct", async function () {
  // mock out api call so shipProduct() is never actually called 
  axiosMock.onPost(SHIPIT_SHIP_URL)
  .reply(200, {receipt: {
    itemId: 1000,
    name: "Test Tester",
    addr:"100 test st",
    zip: "12345-6789",
    shipId:1001,
    key: SHIPIT_API_KEY}
  })

  const shipId = await shipProduct({
    productId: 1000,
    name: "Test Tester",
    addr: "100 Test St",
    zip: "12345-6789",
  });

  expect(shipId).toEqual(1001);
});
