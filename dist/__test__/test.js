"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const schecma_1 = require("../model/schecma");
dotenv_1.default.config();
const request = supertest_1.default(app_1.default);
const mockUser = {
    email: "john@gmail.com",
    password: "12345",
};
const mockOrg = {
    organization: "Klin Codes",
    products: ["Apps", "web Apps"],
    marketValue: "87%",
    address: "Lagos",
    ceo: "Bosco",
    country: "Nigeria",
    noOfEmployees: 2,
    employees: ["bond David", "pros"],
};
let mongoServer;
let orgId;
let token;
// jest.mock("jsonwebtoken", () => () => ({
//   sign: (payload: object, secret: string) => {},
//   verify: (token: string, secret: string) => {},
// }));
beforeAll(async () => {
    console.log(process.env.OP);
    mongoServer = new mongodb_memory_server_1.MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    console.log('secret :>> ', process.env.secret);
    mongoose_1.default
        .connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
        .then(() => console.log("we are live"))
        .catch((error) => console.log("the error", error));
});
afterAll(async () => {
    await mongoose_1.default.disconnect();
    await mongoServer.stop();
});
describe("Test the User Registration query", () => {
    test("test that Users can signup", async (done) => {
        request
            .post("/graphql")
            .send({
            query: `mutation {
              addUser(email:"john2222@gmail.com", password:"12345"){
                  payload{ email }
                }
              }`,
        })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
            if (err)
                return done(err);
            expect(res.text).toBeDefined();
            expect(JSON.parse(res.text)).toHaveProperty("data");
            done();
        });
    });
});
describe("Test the Login query", () => {
    test("Users can Login", async (done) => {
        request
            .post("/graphql")
            .send({
            query: `mutation {
              login(email:"john2222@gmail.com", password:"12345"){
                payload{ email }
                token
                  
                }}`,
        })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
            if (err)
                return done(err);
            expect(res.text).toBeDefined();
            expect(JSON.parse(res.text).data.login.token).toBeDefined();
            token = JSON.parse(res.text).data.login.token;
            done();
        });
    });
});
describe("Test the addOrganisation Query", () => {
    const query = `mutation {
              addOrganization(organization:"decagon", products:["Apps", "web Apps"],marketValue:"90%",address:"Lagos",ceo:"cn",country:"Nigeria",noOfEmployees:2, employees:["mario", "popo"] ){
                id 
                ceo
                }}`;
    test("doesn't work without token", async (done) => {
        request
            .post("/graphql")
            .send({
            query: query,
        })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
            if (err)
                return done(err);
            expect(res.text).toBeDefined();
            expect(JSON.parse(res.text).errors).toBeDefined();
            expect(JSON.parse(res.text).errors[0].message).toBe("Token is not provided");
            expect(JSON.parse(res.text).data.addOrganization).toBeNull();
            done();
        });
    });
    test("works with token", async (done) => {
        request
            .post("/graphql")
            .send({
            query: query,
        })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .set("x-access-token", token)
            .expect(200)
            .end((err, res) => {
            if (err)
                return done(err);
            expect(res.text).toBeDefined();
            expect(JSON.parse(res.text)).toHaveProperty("data");
            expect(JSON.parse(res.text).data.addOrganization.ceo).toBeDefined();
            orgId = JSON.parse(res.text).data.addOrganization.id;
            done();
        });
    });
});
describe("Test the organization query", () => {
    test("can fetch organization by Id", async (done) => {
        request
            .post("/graphql")
            .send({
            query: ` {
            organization(id: "${orgId}"){
                organization
                country
                ceo
                }}`,
        })
            .set("Accept", "application/json")
            .set("x-access-token", token)
            .expect(200)
            .end((err, res) => {
            if (err)
                return done(err);
            expect(res.text).toBeDefined();
            expect(JSON.parse(res.text).data.organization.country).toBeDefined();
            expect(JSON.parse(res.text).data.organization.country).toBe("Nigeria");
            expect(JSON.parse(res.text).data.organization.ceo).toBeDefined();
            expect(JSON.parse(res.text).data.organization.ceo).toBe("cn");
            done();
        });
    });
});
describe("Test the organizations query", () => {
    test("can fetch all organizations", async (done) => {
        request
            .post("/graphql")
            .send({
            query: ` {
            organizations{
                organization
                country
                ceo
                }}`,
        })
            .set("Accept", "application/json")
            .set("x-access-token", token)
            .expect(200)
            .end((err, res) => {
            if (err)
                return done(err);
            expect(res.text).toBeDefined();
            expect(JSON.parse(res.text).data.organizations).toHaveLength(1);
            expect(JSON.parse(res.text).data.organizations[0].country).toBe("Nigeria");
            expect(JSON.parse(res.text).data.organizations[0].ceo).toBeDefined();
            expect(JSON.parse(res.text).data.organizations[0].ceo).toBe("cn");
            done();
        });
    });
});
describe("Test the updateOrganization query", () => {
    test("organization can be updated", async (done) => {
        request
            .post("/graphql")
            .send({
            query: `mutation {
              updateOrganization(id: "${orgId}", ceo:"Bosco", country:"china"){
                organization
                country
                ceo
                }}`,
        })
            .set("Accept", "application/json")
            .set("x-access-token", token)
            .expect(200)
            .end((err, res) => {
            if (err)
                return done(err);
            expect(res.text).toBeDefined();
            expect(JSON.parse(res.text).data.updateOrganization.country).toBeDefined();
            expect(JSON.parse(res.text).data.updateOrganization.country).toBe("china");
            expect(JSON.parse(res.text).data.updateOrganization.ceo).toBeDefined();
            expect(JSON.parse(res.text).data.updateOrganization.ceo).toBe("Bosco");
            done();
        });
    });
});
describe("Test the removeOrganization query", () => {
    test("organization can be Deleted", async (done) => {
        request
            .post("/graphql")
            .send({
            query: `mutation {
              removeOrganization(id: "${orgId}"){
                organization
                country
                ceo
                }}`,
        })
            .set("Accept", "application/json")
            .set("x-access-token", token)
            .expect(200)
            .end(async (err, res) => {
            if (err)
                return done(err);
            expect(await schecma_1.Organization.find()).toHaveLength(0);
            expect(res.text).toBeDefined();
            expect(JSON.parse(res.text).data.removeOrganization.country).toBeDefined();
            expect(JSON.parse(res.text).data.removeOrganization.country).toBe("china");
            expect(JSON.parse(res.text).data.removeOrganization.ceo).toBeDefined();
            expect(JSON.parse(res.text).data.removeOrganization.ceo).toBe("Bosco");
            done();
        });
    });
});
