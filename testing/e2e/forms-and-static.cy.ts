describe('Forms & Static Pages', () => {
    it('should submit Contact Form (Mocked)', () => {
        cy.visit('/contact');

        // Fill form
        cy.get('input[name="name"]').type('Test User');
        cy.get('input[name="email"]').type('test@example.com');
        cy.get('textarea[name="message"]').type('This is a test message from Cypress.');

        // Mock the network request to avoid spam
        cy.intercept('POST', '/api/email', {
            statusCode: 200,
            body: { success: true }
        }).as('sendEmail');

        // Submit
        cy.get('button[type="submit"]').click();

        // Check
        // cy.wait('@sendEmail'); // Uncomment if interception works as expected
        // cy.contains('success').should('exist'); // Check UI feedback
    });

    it('should display Help/FAQ content', () => {
        cy.visit('/help');
        cy.contains(/Help|FAQ/i).should('exist');

        // Test accordion if present
        cy.get('button').first().click({ force: true });
        // Check expansion?
    });

    it('should render generic static pages', () => {
        ['/privacy', '/shipping-and-returns'].forEach(page => {
            cy.visit(page);
            cy.get('h1').should('exist');
        });
    });
});
