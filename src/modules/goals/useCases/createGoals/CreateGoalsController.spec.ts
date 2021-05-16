import { Connection } from 'typeorm'
import request from "supertest";

import { app } from "../../../../app"
import createConnection from "@database/index"

let connection: Connection;
describe("Create Goals Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a new goal", async () => {
    const response = await request(app)
      .post("/goals")
      .send({
        country: "Brazil",
        local: "Uba",
        meta: "04/2023"
      });

    expect(response.status).toBe(201);
  });

  it("should not be able to create a new goals that already exists", async () => {
    const response = await request(app)
      .post("/goals")
      .send({
        country: "Brazil",
        local: "Uba",
        meta: "04/2023"
      });

    expect(response.status).toBe(400);
  });

})