/// <reference types="cypress" />

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:5000/auth/login',
    body: { email, password },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 200) {
      cy.setCookie('accessToken', response.body.accessToken);
      cy.log('Login successful');
    } else {
      throw new Error(`Failed to login with status ${response.status}`);
    }
  });
});

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
    }
  }
}

export {};
