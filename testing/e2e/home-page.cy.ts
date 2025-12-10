describe('Home Page Features', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should render the Main Banner section', () => {
        // Assuming banner has a CTA button
        cy.get('section').first().within(() => {
            cy.get('img').should('have.length.at.least', 1);
            // Check for CTA
            cy.get('button').should('exist');
        });
    });

    it('should display Service Features', () => {
        // Look for features like "Free Shipping", "24/7 Support"
        cy.contains(/Free Shipping|Support|Return/i).should('exist');
    });

    it('should display Our Categories carousel', () => {
        cy.contains('h2', 'Our Categories').should('be.visible');
        // Verify carousel items exist
        cy.get('.embla__slide, [role="group"]').should('have.length.greaterThan', 0);
    });

    it('should display New Arrivals with navigation', () => {
        cy.contains('h2', 'New Arrivals').scrollIntoView();
        cy.contains('New Arrivals').should('be.visible');

        // Check navigation buttons exist
        cy.get('button').find('svg.lucide-chevron-right').should('exist');

        // Check products are listed
        cy.get('a[href*="/product/"]').should('have.length.greaterThan', 0);
    });

    it('should display Promo Slider', () => {
        // Identifying promo slider usually by class or position
        cy.get('div').filter((index, element) => {
            return Cypress.$(element).text().includes('Promo') || Cypress.$(element).find('img').length > 0;
        }).should('exist');
    });

    it('should display Latest Blog section', () => {
        cy.contains('h2', 'Latest Blog').scrollIntoView();
        cy.get('a[href*="/blog/"]').should('exist');
    });
});
