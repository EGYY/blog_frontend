describe('Routing', () => {
    describe('User not logged in', () => {
        it('open main page', () => {
            cy.visit('/');
            cy.getByTestId('main-page').should('exist');
        });
        it('redirects to main page if url is private', () => {
            cy.visit('/profile/edit');
            cy.getByTestId('main-page').should('exist');
        });
        it('redirects to not found page if url is non existing', () => {
            cy.visit('/test-non-existing-url');
            cy.getByTestId('not-found-page').should('exist');
        });
    });
    describe('User logged in', () => {
        beforeEach(() => {
            cy.login().then(() => {
                cy.visit('/profile/edit');
            });
        });
        it('open profile page', () => {
            cy.getByTestId('profile-page').should('exist');
        });
    });
});
