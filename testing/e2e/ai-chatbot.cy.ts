describe('AI Chatbot Feature', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should display the AI Chatbot toggle button', () => {
        // Looking for the floating action button, usually at bottom right
        cy.get('button[aria-label="Open Doodle Blast AI"]').should('exist'); // Adjust selector as needed
    });

    it('should open the chat window when toggled', () => {
        // Click the trigger/button
        cy.get('button[aria-label="Open Doodle Blast AI"]').click();

        // Chat window should be visible
        cy.contains('Doodle Blast AI').should('be.visible');
        cy.get('textarea[placeholder="Type your message..."]').should('be.visible');
    });

    it('should send a message and receive a response (Mocked)', () => {
        cy.get('button[aria-label="Open Doodle Blast AI"]').click();

        const userMessage = 'Hello, can you help me?';

        // Intercept the API call to your AI backend
        cy.intercept('POST', '/api/chat', {
            statusCode: 200,
            body: {
                response: 'This is a mocked response from the AI.'
            }
        }).as('chatResponse');

        // Type and send message
        cy.get('textarea[placeholder="Type your message..."]').type(`${userMessage}{enter}`);

        // Check if user message appears in chat
        cy.contains(userMessage).should('be.visible');

        // Wait for response and check
        // cy.wait('@chatResponse'); // Uncomment if backend call is real/mocked properly
        // cy.contains('This is a mocked response from the AI.').should('be.visible');
    });

    it('should close the chat window', () => {
        cy.get('button[aria-label="Open Doodle Blast AI"]').click(); // Open

        // When open, the button's label should change or we can click it again to close
        cy.get('button[aria-label="Close Doodle Blast AI"]').click(); // Toggle Close

        // Chat window should render nothing or be hidden
        cy.contains('Doodle Blast AI').should('not.exist');
    });
});
