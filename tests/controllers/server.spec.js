import request from "supertest";
import app from "../../index.js";
import closeServer from "../../index.js";
import { generateToken } from "../utils/login";
import { generateFakeId } from "../utils/createid.js";

describe("CRUD operations for cafes", () => {
  it("should return status 200, an array, and length greater than 0", async () => {
    const response = await request(app).get("/cafes");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should create a new cafe and return status 201", async () => {
    let id = generateFakeId();
    const nuevoCafe = {
      id: id,
      nombre: "Cortado",
    };
    const response = await request(app).post("/cafes").send(nuevoCafe);
    expect(response.status).toBe(201);
  });

  it("if trying to update with mismatched IDs", async () => {
    let id = generateFakeId();
    const cafesResponse = await request(app).get("/cafes");
    const cafeToUpdate = cafesResponse.body[0];
    const updatedCafe = {
      id: id,
      nombre: "Guayoyo",
    };
    const response = await request(app)
      .put(`/cafes/${cafeToUpdate.id}`)
      .send(updatedCafe);
    expect(response.statusCode).toBe(400);
  });

  it(" id does not exist delete ", async () => {
    let id = generateFakeId();
    id = id;
    const response = await request(app)
      .delete(`/cafes/${id}`)
      .set("Authorization", generateToken());
    expect(response.statusCode).toBe(404);
  });
});
