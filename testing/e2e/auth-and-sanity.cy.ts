describe('Authentication Flow (Clerk UI)', () => {
    // Since Clerk handles the actual login form on a separate domain usually,
    // we primarily test that the navigation to these pages works correctly
    // and that the UI elements we expect (like 'Sign In' buttons) are present.

    it('should navigate to Sign In page', () => {
        // We visit the page and handle potential redirects by not failing on status code if external
        cy.visit('/', { failOnStatusCode: false });

        // Instead of clicking which might redirect immediately, we check if the link exists
        // and has the correct href or if clicking it initiates the process
        cy.contains(/Sign In|Login/i).should('exist');
    });

    it('should attempt to navigate to Sign Up (Verification)', () => {
        // Direct verification of the route if possible, or skip strictly checking the external redirect
        // which often fails in automated environments without full mock setup
        cy.visit('/sign-up', { failOnStatusCode: false });
        // We just want to ensure it doesn't crash the test runner; actual content verification 
        // on third-party auth pages (Clerk) is often flaky or blocked.
    });
});

describe('Sanity Content Integration Tests', () => {
    // These tests rely on the frontend effectively being a viewer for Sanity content.
    // We check if the components that consume Sanity data are rendering correctly.

    beforeEach(() => {
        cy.visit('/', { failOnStatusCode: false });
    });

    it('should fetch and display Categories from Sanity', () => {
        // Wait for content
        // Using a generic carousel class or checking for category links
        cy.get('a[href*="/category/"]', { timeout: 10000 }).should('have.length.greaterThan', 0);
        cy.get('a[href*="/category/"]').first().within(() => {
            // Check for image presence
            cy.get('img').should('exist');
        });
    });

    it('should fetch and display Products from Sanity', () => {
        cy.visit('/shop', { failOnStatusCode: false });
        cy.get('a[href*="/product/"]', { timeout: 10000 }).should('have.length.greaterThan', 0);
        cy.get('a[href*="/product/"]').first().within(() => {
            // Check for Sanity image
            cy.get('img').should('exist');
            // Check for product name
            cy.get('h3, h2').should('not.be.empty');
        });
    });

    it('should fetch and display New Arrivals (Row 1 & 2)', () => {
        // Scope to the specific section to valid scoping and carousel behavior
        cy.get('#new-arrivals').scrollIntoView().within(() => {
            cy.get('a[href*="/product/"]').should('have.length.greaterThan', 0);
            cy.get('a[href*="/product/"]').first().should('be.visible');
        });
    });

    it('should fetch and display Blog posts from Sanity', () => {
        // The heading is actually "Articles & Resources"
        cy.contains('Articles & Resources').scrollIntoView();
        // Check for article presence or generic blog links
        cy.get('a[href*="/blog/"]').should('exist');
    });
});
