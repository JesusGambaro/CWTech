const request = require("supertest")(
  process.env.API_URL || "http://localhost:3001"
); //create supertest request to API
const expect = require("chai").expect; //import chai expect

describe("GET /", () => {
  //test if status code is 200 and if returned text is "test" reversed
  it("Returns a 200 status code", async () => {
    const response = await request.get("/iecho?text=test");

    expect(response.status).to.eql(200);
    expect(response.body).to.eql({text: "tset"});
  });

  //test if status code is 400 and if returned error is "no text" when url doesn't have text
  it("Returns a 400 status code", async () => {
    const response = await request.get("/doesntexist");

    expect(response.status).to.eql(400);
    expect(response.body).to.eql({error: "no text"});
  });
});
