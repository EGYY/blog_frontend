import { selectByTestId } from 'cypress/helpers/selectByTestId';

import { UserServerResponse } from '../../../src/entities/User';

export const login = (
    email: string = 'test@test.test',
    password: string = '1234567qwerty',
) => {
    return cy
        .request({
            method: 'POST',
            url: 'http://localhost:5000/auth/login',
            body: { email, password },
            failOnStatusCode: false,
        })
        .then((response) => {
            const { accessToken } = response.body;

            cy.setCookie('accessToken', accessToken);
            return cy.wrap(response.body);
        });
};

export const getByTestId = (testId: string) => {
    return cy.get(selectByTestId(testId));
};

declare global {
    namespace Cypress {
        interface Chainable {
            login(
                email?: string,
                password?: string,
            ): Chainable<UserServerResponse>;
            getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
        }
    }
}
