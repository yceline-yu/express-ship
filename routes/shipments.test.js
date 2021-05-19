"use strict";

const shipItApi = require("../shipItApi");
shipItApi.shipProduct = jest.fn();

const request = require("supertest");
const app = require("../app");

/** POST /shipments - send shipment info => {"shipped": shipId } */

describe("POST /", function () {
  test("valid", async function () {
    // mock return value for shipProduct func
    
    shipItApi.shipProduct.mockReturnValue(1001)
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });
    console.log("resp . BODY ===>", resp.body)
    expect(resp.body).toEqual({ shipped: 1001 });
  });

  test("invalid-id-zip", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: "999",
      name: "Test Error",
      addr: "not a real address",
      zip: 12345
    });

    expect(resp.statusCode).toEqual(400);
    // expect(resp.body).toEqual()
  });

  test("invalid-missing values", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: "",
      name: "Test Error",
      addr: "not a real address",
      zip: "12345"
    });

    expect(resp.statusCode).toEqual(400);
  });

});
