describe("API Automation - Reqres.in", () => {
  const baseUrl = "https://reqres.in/api";
  const apiKey = "reqres-free-v1";

  it("GET list users (page 2)", () => {
    cy.request("GET", `${baseUrl}/users?page=2`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.have.length.greaterThan(0);
    });
  });

  it("GET list users (page 2) with API key", () => {
    cy.request({
      method: "GET",
      url: `${baseUrl}/users?page=2`,
      headers: {
        "X-API-Key": `${apiKey}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.have.length.greaterThan(0);
    });
  });

  it("GET single user not found (id = 23)", () => {
    cy.request({
      method: "GET",
      url: `${baseUrl}/users/23`,
      headers: {
        "X-API-Key": `${apiKey}`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it("GET list resource", () => {
    cy.request({
      method: "GET",
      url: `${baseUrl}/unknown`,
      headers: {
        "X-API-Key": `${apiKey}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.have.length.greaterThan(0);
    });
  });

  it("GET list singkle resource", () => {
    cy.request({
      method: "GET",
      url: `${baseUrl}/unknown/2`,
      headers: {
        "X-API-Key": `${apiKey}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      // expect(response.body.data).to.have.length.greaterThan(0);
    });
  });

  it("GET list singkle resource notfound", () => {
    cy.request({
      method: "GET",
      url: `${baseUrl}/unknown/2`,
      headers: {
        "X-API-Key": `${apiKey}`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("POST create user", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}/users`,
      headers: {
        "X-API-Key": `${apiKey}`,
      },
      body: {
        name: "morpheus",
        job: "leader",
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("name", "morpheus");
      expect(response.body).to.have.property("job", "leader");
    });
  });

  it("PUT update user", () => {
    cy.request({
      method: "PUT",
      url: `${baseUrl}/users/2`,
      headers: {
        "X-API-Key": `${apiKey}`,
      },
      body: {
        name: "morpheus",
        job: "zion resident",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("job", "zion resident");
    });
  });

  it("PATCH update user", () => {
    cy.request(
      {
        method: "PATCH",
        url: `${baseUrl}/users/2`,
        headers: {
          "X-API-Key": `${apiKey}`,
        },
        body: {
          job: "zion warrior",
        },
      },
      {
        job: "zion warrior",
      }
    ).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("job", "zion warrior");
    });
  });

  it("DELETE user", () => {
    cy.request({
      method: "DELETE",
      url: `${baseUrl}/users/2`,
      headers: {
        "X-API-Key": `${apiKey}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
  });

  it("POST register - successful", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}/register`,
      headers: {
        "X-API-Key": `${apiKey}`,
      },
      body: {
        email: "eve.holt@reqres.in",
        password: "pistol",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("token");
    });
  });

  it("POST register - unsuccessful", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}/register`,
      failOnStatusCode: true,
      headers: {
        "X-API-Key": `${apiKey}`,
      },
      body: {
        email: "eve22.holt@reqres.in",
        // password: "pistol",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      // expect(response.body).to.have.property("token");
    });
  });

  it("POST login - successful", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}/login`,
      // failOnStatusCode: true,
      headers: {
        "X-API-Key": `${apiKey}`,
      },
      body: {
        email: "eve.holt@reqres.in",
        password: "cityslicka",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("token");
    });
  });

  it("POST login - unsuccessful", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}/login`,
      failOnStatusCode: false,
      headers: {
        "X-API-Key": `${apiKey}`,
      },
      body: {
        "email ": "eve.holt@reqres.in",
        // password: "cityslicka",
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
      // expect(response.body).to.have.property("token");
    });
  });

  it("GET delay response ", () => {
    cy.request({
      method: "GET",
      url: `${baseUrl}/users?delay=3`,
      headers: {
        "X-API-Key": `${apiKey}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
