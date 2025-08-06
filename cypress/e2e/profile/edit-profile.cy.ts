let userId = '';

describe('User go to profile edit page', () => {
    beforeEach(() => {
        cy.visit('');
        cy.login().then((data) => {
            userId = data.user.id;
            cy.visit('profile/edit');
        });
    });

    afterEach(() => {
        cy.resetProfile();
    });

    it('Profile is displayed correctly', () => {
        cy.getByTestId('profile-card.name').should('have.value', 'Test');
    });
    it('Edit profile', () => {
        const newName = 'new';
        const newBio = 'Test bio for test user';
        cy.updateProfile(newName, newBio);
        cy.getByTestId('profile-card.name').should('have.value', newName);
        cy.getByTestId('profile-card.bio').should('have.value', newBio);
    });
});
