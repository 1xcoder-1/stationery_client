describe('Deals Page', () => {
    beforeEach(() => {
        cy.visit('/deal');
    });

    it('should load the Deals page correctly', () => {
        cy.get('h1').should('contain', 'Deals'); // Or "Start your deal now" from your screenshot context previously
    });

    it('should display discounted products', () => {
        // Check that products listed here actually show a discount or old price
        cy.get('a[href*="/product/"]').first().within(() => {
            // Usually shows "Was: $X" or strikethrough price
            cy.get('.line-through').should('exist'); // Common class for original price
            cy.get('.text-red-500').should('exist'); // Common class for sale price
        });
    });

    it('should have filter/sort options', () => {
        // If Deals page has specific filters
        cy.contains(/Filter|Sort/i).should('exist');
    });
});
