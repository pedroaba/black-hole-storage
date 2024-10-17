describe('Language Changes', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('should change language to english', () => {
    cy.get('[data-testId="language_button"]').click()
    cy.get('[data-testId="lan_select_en"]').should('be.visible')
    cy.get('[data-testId="lan_select_en"]').click()
    cy.wait(500)
    cy.get('[data-testId="language_button"]').should('contain.text', 'Language')
  })

  it('should change language to portuguese', () => {
    cy.get('[data-testId="language_button"]').click()
    cy.get('[data-testId="lan_select_pot-BR"]').should('be.visible')
    cy.get('[data-testId="lan_select_pot-BR"]').click()
    cy.wait(500)
    cy.get('[data-testId="language_button"]').should('contain.text', 'Idioma')
  })
})
