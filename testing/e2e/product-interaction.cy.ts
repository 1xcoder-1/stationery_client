describe('Product Interaction', () => {
    it('should view product details', () => {
        cy.visit('/shop');
        // Store url of first product to compare later?
        cy.get('a[href*="/product/"]').first().click();

        // Assertions on Product Detail Page
        cy.get('h1, h2').should('not.be.empty'); // Title
        cy.contains(/Rs|Price|\$/).should('exist'); // Price
        cy.contains(/Description|Overview/i).should('exist'); // Description
    });

    it('should interact with gallery (thumbnails)', () => {
        cy.visit('/shop');
        cy.get('a[href*="/product/"]').first().click();

        // Check if main image exists
        cy.get('img').should('be.visible');

        // If thumbnails exist, click one
        cy.get('body').then(($body) => {
            if ($body.find('img').length > 1) {
                // It has multiple images, try interacting
                // Just ensuring no errors on click
                cy.get('img').eq(1).click({ force: true });
            }
        });
    });

    it('should increase/decrease quantity', () => {
        cy.visit('/shop');
        cy.get('a[href*="/product/"]').first().click();

        // Assuming standard +/- buttons
        cy.contains('+').click();
        cy.contains('2').should('exist'); // Assuming quantity display updates
        cy.contains('-').click();
        cy.contains('1').should('exist');
    });

    it('should attempt to Add to Cart (Guest)', () => {
        cy.visit('/shop');
        cy.get('a[href*="/product/"]').first().click();

        // If guest, it might redirect to login OR add to cart depending on logic
        // We check for button existence mostly
        cy.contains(/Add to Cart|Login to Add/i).should('exist').click();

        // Check for toast or cart update
        // cy.contains('added to cart').should('exist'); 
    });
});
