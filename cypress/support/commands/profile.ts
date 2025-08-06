export const updateProfile = (name: string, bio: string) => {
    cy.getByTestId('profile-card.name').clear().type(name);
    cy.getByTestId('profile-card.bio').clear().type(bio);
    cy.getByTestId('profile-card.save').click();
};

export const resetProfile = () => {
    return cy.getCookie('accessToken').then((accessToken) => {
        return cy.request({
            method: 'PATCH',
            url: `http://localhost:5000/users/profile`,
            headers: { Authorization: `Bearer ${accessToken?.value}` },
            body: {
                name: 'Test',
                bio: '',
            },
        });
    });
};

declare global {
    namespace Cypress {
        interface Chainable {
            updateProfile(firstname: string, lastname: string): Chainable<void>;
            resetProfile(): Chainable<void>;
        }
    }
}
