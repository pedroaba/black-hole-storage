import { getTestId } from 'cypress/utils/get-test-id'

describe('Sign in Button on Header', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/auth/sign-up')
  })

  it('should be able to change to sign in page with sign in button', () => {
    cy.get(getTestId('sign_in_header_button')).click()
    cy.url().should('include', '/auth/sign-in')
  })
})
