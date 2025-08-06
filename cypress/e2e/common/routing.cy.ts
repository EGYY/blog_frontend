describe('Routing', () => {
    describe('User not logged in', () => {
        it('open main page', () => {
            cy.visit('/');
            cy.get('[data-testid=main-page]').should('exist');
        });
        it('redirects to main page if url is private', () => {
            cy.visit('/profile/edit');
            cy.get('[data-testid=main-page]').should('exist');
        });
        it('redirects to not found page if url is non existing', () => {
            cy.visit('/test-non-existing-url');
            cy.get('[data-testid=not-found-page]').should('exist');
        });
    });
    describe('User logged in', () => {
        beforeEach(() => {
            cy.login('test@test.test', '1234567qwerty');
        });
        it('open profile page', () => {
            cy.visit('/profile/edit');
            cy.get('[data-testid=profile-page]').should('exist');
        });
    });
});
