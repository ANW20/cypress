describe('API Testing on gorest with simplified requests', () => {

        // Test Case 1: GET - Retrieve user details
    it('GET', () => {
        cy.apiRequest('GET', '/users').then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
        });
    });

    // Test Case 2: POST - Create a new user
  let userId;
    it('POST ', () => {
  const userData = {
    name: 'jane Doe',
    email: `test${Math.random().toString(36).substring(2)}@example.com`, 
    gender: 'male',
    status: 'active',
  };

  cy.apiRequest('POST', '/users', { body: userData }).then((response) => {
    expect(response.status).to.eq(201);
    expect(response.body).to.deep.include(userData);
    userId = response.body.id;
  });
});


    // Test Case 3: PUT - Update user details
  it("PUT", () => {
    const updatedData = {
      name: "Jane Doe Updated",
      status: "inactive",
    };

    cy.apiRequest("PUT", `/users/${userId}`, updatedData).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq(updatedData.name);
    });
  });

    // Test Case 4: DELETE - Delete a user
      it("DELETE", () => {
    cy.apiRequest("DELETE", `/users/${userId}`).then((response) => {
      expect(response.status).to.eq(204);
    });
  });
});
