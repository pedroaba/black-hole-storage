import { getTestId } from 'cypress/utils/get-test-id'

describe('Sign Up Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/auth/sign-up')
    cy.get(getTestId('language_button')).click()
    cy.get(getTestId('lan_select_en')).click()
    cy.wait(500)
  })

  it('should not be able to sign up with wrong email pattern', () => {
    cy.get(getTestId('email_message')).should('not.exist')
    cy.get(getTestId('name_field')).type('Boe Minion')
    cy.get(getTestId('email_field')).type('boeminion@a')
    cy.get(getTestId('password_field')).type('12345678')
    cy.get(getTestId('confirm_password_field')).type('12345678')
    cy.get(getTestId('confirm_sign_up_button')).click()
    cy.get(getTestId('email_message'))
      .should('exist')
      .should('have.text', 'Type a valid email.')
  })

  it('should not be able to sign up with empty fields', () => {
    cy.get(getTestId('name_message')).should('not.exist')
    cy.get(getTestId('email_message')).should('not.exist')
    cy.get(getTestId('password_message')).should('not.exist')
    cy.get(getTestId('confirm_password_message')).should('not.exist')
    cy.get(getTestId('confirm_sign_up_button')).click()
    cy.get(getTestId('name_message'))
      .should('exist')
      .should('have.text', 'Name is required.')
    cy.get(getTestId('email_message'))
      .should('exist')
      .should('have.text', 'E-mail is required.')
    cy.get(getTestId('password_message'))
      .should('exist')
      .should('have.text', 'Password is required.')
    cy.get(getTestId('confirm_password_message'))
      .should('exist')
      .should('have.text', 'Enter password confirmation')
  })

  it('should not be able to sign up with short name', () => {
    cy.get(getTestId('name_message')).should('not.exist')
    cy.get(getTestId('name_field')).type('Bo')
    cy.get(getTestId('confirm_sign_up_button')).click()
    cy.get(getTestId('name_message'))
      .should('exist')
      .should('have.text', 'You must enter a name with at least 6 characters')
  })

  it('should not be able to sign up with short password', () => {
    cy.get(getTestId('password_message')).should('not.exist')
    cy.get(getTestId('password_field')).type('1234567')
    cy.get(getTestId('confirm_sign_up_button')).click()
    cy.get(getTestId('password_message'))
      .should('exist')
      .should('have.text', 'The password must be at least 8 characters long')
  })

  it('should not be able to sign up with different passwords', () => {
    cy.get(getTestId('password_message')).should('not.exist')
    cy.get(getTestId('name_field')).type('Boe Minion')
    cy.get(getTestId('email_field')).type('boeminion@gmail.com')
    cy.get(getTestId('password_field')).type('12345678')
    cy.get(getTestId('confirm_password_field')).type('12345679')
    cy.get(getTestId('confirm_sign_up_button')).click()
    cy.get(getTestId('password_message'))
      .should('exist')
      .should('have.text', "The password didn't match")
  })

  it('should not be able to sign up with already created profile', () => {
    cy.get(getTestId('name_field')).type('Boe Minion')
    cy.get(getTestId('email_field')).type('boeminion@gmail.com')
    cy.get(getTestId('password_field')).type('12345678')
    cy.get(getTestId('confirm_password_field')).type('12345678')
    cy.get(getTestId('confirm_sign_up_button')).click()
    cy.get('.toaster > .group').should(
      'contain.text',
      'Resource already exists!',
    )
  })

  // TODO: Fix this test when delete user is implemented
  //   it('should be able to sign up succesfuly', () => {
  //     cy.get(getTestId('name_field')).type('Boe Minion 2')
  //     cy.get(getTestId('email_field')).type('boeminion2@gmail.com')
  //     cy.get(getTestId('password_field')).type('12345678')
  //     cy.get(getTestId('confirm_password_field')).type('12345678')
  //     cy.get(getTestId('confirm_sign_up_button')).click()
  //     cy.get('.toaster > .group').should(
  //       'contain.text',
  //       'User created successfully',
  //     )
  //   })

  it('should be able to navigate to sign in page with top button', () => {
    cy.get(getTestId('sign_in_button_top')).click()
    cy.url().should('include', '/auth/sign-in')
  })

  it('should be able to navigate to sign in page with bottom button', () => {
    cy.get(getTestId('sign_in_button_bottom')).click()
    cy.url().should('include', '/auth/sign-in')
  })
})
