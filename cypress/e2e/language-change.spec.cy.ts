import { getTestId } from 'cypress/utils/get-test-id'

describe('Language Changes', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('should change language to english', () => {
    cy.get(getTestId('language_button')).click()
    cy.get(getTestId('lan_select_en')).should('be.visible')
    cy.get(getTestId('lan_select_en')).click()
    cy.wait(500)
    cy.get(getTestId('language_button')).should('contain.text', 'Language')
  })

  it('should change language to portuguese', () => {
    cy.get(getTestId('language_button')).click()
    cy.get(getTestId('lan_select_pot-BR')).should('be.visible')
    cy.get(getTestId('lan_select_pot-BR')).click()
    cy.wait(500)
    cy.get(getTestId('language_button')).should('contain.text', 'Idioma')
  })
})
