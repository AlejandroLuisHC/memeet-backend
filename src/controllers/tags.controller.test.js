const request = require("supertest");
const { Tag } = require("../models");
const { app } = require("../index");

jest.mock("../models", () => ({
  Tag: {
    find: jest.fn().mockReturnThis(),
    findOne: jest.fn().mockReturnThis(),
    lean: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue([{ name: "tag1" }, { name: "tag2" }]),
    create: jest.fn().mockResolvedValue({ name: "newTag" })
  }
}));

describe("Tags controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("/tags GET returns all tags", async () => {
    const res = await request(app).get("/tags");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      status: "OK",
      data: [{ name: "tag1" }, { name: "tag2" }]
    });
    expect(Tag.find).toHaveBeenCalledWith({});
    expect(Tag.lean).toHaveBeenCalled();
    expect(Tag.exec).toHaveBeenCalled();
  });

  test("/tags POST creates a new tag", async () => {
    const res = await request(app)
      .post("/tags")
      .send({ name: "newTag" });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      status: "Created",
      data: { name: "newTag" }
    });
    expect(Tag.findOne).toHaveBeenCalledWith({ name: "newTag" });
    expect(Tag.create).toHaveBeenCalledWith({ name: "newTag" });
  });
});