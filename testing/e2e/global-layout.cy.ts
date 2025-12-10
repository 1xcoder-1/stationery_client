describe('Global Layout & Navigation', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should display the Header correctly', () => {
        cy.get('header').within(() => {
            // Logo existence
            cy.get('a[href="/"]').should('exist');

            // Search bar availability
            cy.get('input[type="text"]').should('be.visible').and('have.attr', 'placeholder'); // Adjust mock if specific placeholder

            // Navigation Links
            cy.contains('Shop').should('be.visible');
            cy.contains('Cart').should('exist');
        });
    });

    it('should navigate to main pages via Header', () => {
        cy.get('header').contains('Shop').click();
        cy.url().should('include', '/shop');

        cy.go('back');

        // Test Cart link (assuming icon or text)
        cy.get('a[href="/cart"]').first().click({ force: true });
        cy.url().should('include', '/cart');
    });

    it('should display the Footer correctly', () => {
        cy.scrollTo('bottom');
        cy.get('footer').within(() => {
            cy.contains('Quick Links').should('exist'); // Adjust based on actual footer content
            cy.get('a[href="/contact"]').should('exist');
            cy.get('a[href="/privacy"]').should('exist');
        });
    });

    it('should have working Footer links', () => {
        cy.scrollTo('bottom');
        cy.get('footer a[href="/contact"]').click();
        cy.url().should('include', '/contact');
    });
});
