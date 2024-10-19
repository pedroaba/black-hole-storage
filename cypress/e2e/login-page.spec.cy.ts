import { getTestId } from 'cypress/utils/get-test-id'

describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/auth/sign-in')
  })

  it('should not be able to log in with wrong typed credentials', () => {
    cy.get(getTestId('email_field')).type('esthefano_rosa@gmail.com')
    cy.get(getTestId('password_field')).type('123456')
    cy.get(getTestId('login_submit_button')).click()
    cy.get('.toaster > .group').should('be.visible')
    cy.get('.toaster > .group').should(
      'contain.text',
      'Invalid email or password',
    )
  })

  it('should be able to log in with correct credentials', () => {
    cy.get(getTestId('email_field')).type('marcoshbp71@gmail.com')
    cy.get(getTestId('password_field')).type('123teste321')
    cy.get(getTestId('login_submit_button')).click()
    cy.get('.toaster > .group').should('be.visible')
    cy.get('.toaster > .group').should(
      'contain.text',
      "Welcome to the spaceship, and let's go towards infinity",
    )
  })

  it('should be able to change to sign up page with top button', () => {
    cy.get(getTestId('sign_up_button_up')).click()
    cy.url().should('include', '/auth/sign-up')
  })

  it('should be able to change to sign up page with bottom button', () => {
    cy.get(getTestId('sign_up_button_down')).click()
    cy.url().should('include', '/auth/sign-up')
  })
})
