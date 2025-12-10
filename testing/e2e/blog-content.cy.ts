describe('Blog Content', () => {
    it('should display blog list on Blog Page', () => {
        // Assuming /blog is the route, or home has it
        cy.visit('/'); // Since home has latest blog
        cy.contains('Articles & Resources').scrollIntoView();

        // Click a blog post
        cy.get('a[href*="/blog/"]').first().click();

        // Verify Single Blog Page
        cy.url().should('include', '/blog/');
        cy.get('h1').should('not.be.empty'); // Title
        cy.get('.prose').should('exist'); // Content body
    });
});
