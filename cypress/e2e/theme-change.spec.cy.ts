import { getTestId } from 'cypress/utils/get-test-id'

describe('Theme Changes', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('should change theme to light mode', () => {
    cy.get(getTestId('theme_mode_button')).click()
    cy.get(getTestId('light_mode_button')).should('be.visible').click()
    cy.get(getTestId('light_theme_icon')).should('be.visible')
    cy.get(getTestId('dark_theme_icon')).should('not.be.visible')
  })

  it('should change theme to dark mode', () => {
    cy.get(getTestId('theme_mode_button')).click()
    cy.get(getTestId('dark_mode_button')).should('be.visible').click()
    cy.get(getTestId('dark_theme_icon')).should('be.visible')
    cy.get(getTestId('light_theme_icon')).should('not.be.visible')
  })
})
