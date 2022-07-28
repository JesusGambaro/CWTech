const request = require("supertest")("http://localhost:3001");
const expect = require("chai").expect;

describe("GET /", () => {
  it("Returns a 200 status code", async () => {
    const response = await request.get("/iecho?text=test");

    expect(response.status).to.eql(200);
    expect(response.body).to.eql({text: "tset"});
  });
  it("Returns a 400 status code", async () => {
    const response = await request.get("/doesntexist");

    expect(response.status).to.eql(400);
    expect(response.body).to.eql({error: "no text"});
  });
});
