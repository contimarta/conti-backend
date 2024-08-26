import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server.js";
import User from "../models/User.js";
import { expect } from "chai";
import testData from "./testData/testData.js";
import StringLength from "../models/StringLength.js";
const testUsers = testData.users;
const testStringLengths = testData.stringlengths;
chai.use(chaiHttp);
const testServer = chai.request(app).keepOpen();
beforeEach(async () => {
    try {
        await User.insertMany(testUsers);
        console.log(`Database populated with testUsers`);
        await StringLength.insertMany(testStringLengths);
        console.log(`Database populated with testStringLengths`);
    }
    catch (error) {
        throw new Error();
    }
});
afterEach(async () => {
    try {
        await StringLength.deleteMany();
        await User.deleteMany();
        console.log(`Database cleared`);
    }
    catch (error) {
        console.log(`Error clearing`);
        throw new Error();
    }
});
describe("API", () => {
    describe("GET /nonexistent", () => {
        it("should return a 404 status for a nonexistent route", async () => {
            const res = await testServer.get("/nonexistent");
            expect(res).to.have.status(404);
        });
    });
    describe("GET /api/average", () => {
        it("should return average string length ", async () => {
            const userCredentials = {
                username: "martaconti",
                password: "password",
            };
            const loginResponse = await testServer
                .post("/users/login")
                .send(userCredentials);
            const token = loginResponse.body.token;
            const userId = loginResponse.body.user._id;
            const res = await testServer
                .get("/api/average")
                .set("Authorization", `Bearer ${token}`)
                .send({ userId });
            expect(res).to.have.status(201);
            expect(res.body).to.be.a("object");
            expect(res.body.message).to.equal("7.00");
        });
    });
    describe("POST /api/submit", () => {
        it("should return string length ", async () => {
            const string = {
                text: "string",
            };
            const res = await testServer.post("/api/submit").send(string);
            expect(res).to.have.status(201);
            expect(res.body).to.be.a("object");
            expect(res.body.message).to.equal(6);
        });
    });
});
describe("Users", () => {
    describe("POST /users/login", () => {
        it("should authenticate an existing user ", async () => {
            const credentials = {
                username: "martaconti",
                password: "password",
            };
            const res = await testServer.post("/users/login").send(credentials);
            expect(res).to.have.status(200);
            expect(res.body).to.be.a("object");
            expect(res.body.token).to.be.a("string");
        });
        it("should not authenticate a user with invalid credentials", async () => {
            const invalidCredentials = {
                email: "marta@chitter.com",
                password: "wrongpassword",
            };
            const res = await testServer
                .post("/users/login")
                .send(invalidCredentials);
            expect(res).to.have.status(500);
        });
    });
    describe("POST /users/register", () => {
        it("should create a new user ", async () => {
            const newUser = {
                username: "testuser",
                password: "testpassword",
            };
            const res = await testServer.post("/users/register").send(newUser);
            expect(res).to.have.status(201);
            expect(res.body).to.be.a("object");
            expect(res.body.username).to.equal(newUser.username);
        });
    });
});
