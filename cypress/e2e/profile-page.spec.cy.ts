import { getTestId } from 'cypress/utils/get-test-id'

describe('Profile Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/auth/sign-in')
    cy.get(getTestId('language_button')).click()
    cy.get(getTestId('lan_select_en')).click()
    cy.wait(500)
    cy.get(getTestId('email_field')).type('boeminion@gmail.com')
    cy.get(getTestId('password_field')).type('12345678')
    cy.get(getTestId('login_submit_button')).click()
    cy.get(getTestId('user_profile_menu')).click()
    cy.get(getTestId('profile_page_button')).should('be.visible').click()
    cy.url().should('include', '/profile')
    cy.get('body').type('{esc}')
  })

  it('should open personal information tab', () => {
    cy.get(getTestId('personal_information_tab')).should('be.visible').click()
    cy.get(getTestId('personal_information_tab_content')).should('be.visible')
  })

  it('should open account tab', () => {
    cy.get(getTestId('account_tab')).should('be.visible').click()
    cy.get(getTestId('account_tab_content')).should('be.visible')
  })

  it('should not change password with empty fields', () => {
    cy.get(getTestId('personal_information_tab')).should('be.visible').click()
    cy.get(getTestId('current_password_message')).should('not.exist')
    cy.get(getTestId('new_password_message')).should('not.exist')
    cy.get(getTestId('new_password_confirmation_message')).should('not.exist')
    cy.get(getTestId('change_password_submit_button'))
      .should('be.visible')
      .click()
    cy.get(getTestId('current_password_message'))
      .should('be.visible')
      .should('contain.text', 'Type a valid password.')
    cy.get(getTestId('new_password_message'))
      .should('be.visible')
      .should('contain.text', 'Type a valid password.')
    cy.get(getTestId('new_password_confirmation_message'))
      .should('be.visible')
      .should('contain.text', 'Type a valid password.')
  })

  it('should not change password with invalid current password', () => {
    cy.get(getTestId('personal_information_tab')).should('be.visible').click()
    cy.get(getTestId('current_password_field')).type('123456789')
    cy.get(getTestId('new_password_field')).type('87654321')
    cy.get(getTestId('new_password_confirmation_field')).type('87654321')
    cy.get(getTestId('change_password_submit_button')).click()
    cy.get('.toaster > .group')
      .should('be.visible')
      .should(
        'contain.text',
        'The passwords does not match with current password',
      )
  })

  it('should not change passwords with different new passwords', () => {
    cy.get(getTestId('personal_information_tab')).should('be.visible').click()
    cy.get(getTestId('new_password_confirmation_message')).should('not.exist')
    cy.get(getTestId('current_password_field')).type('12345678')
    cy.get(getTestId('new_password_field')).type('87654321')
    cy.get(getTestId('new_password_confirmation_field')).type('12345679')
    cy.get(getTestId('change_password_submit_button')).click()
    cy.get(getTestId('new_password_confirmation_message'))
      .should('be.visible')
      .should(
        'contain.text',
        'The new password is not the same as the password confirmation',
      )
  })

  it('should change password successfully and change back to original', () => {
    cy.get(getTestId('personal_information_tab')).should('be.visible').click()
    cy.get(getTestId('current_password_field')).type('12345678')
    cy.get(getTestId('new_password_field')).type('87654321')
    cy.get(getTestId('new_password_confirmation_field')).type('87654321')
    cy.get(getTestId('change_password_submit_button')).click()
    cy.get('.toaster > .group')
      .should('be.visible')
      .should('contain.text', 'Password was changed with success')
    cy.wait(5000)
    cy.get(getTestId('current_password_field')).clear().type('87654321')
    cy.get(getTestId('new_password_field')).clear().type('12345678')
    cy.get(getTestId('new_password_confirmation_field'))
      .clear()
      .type('12345678')
    cy.get(getTestId('change_password_submit_button')).click()
    cy.get('.toaster > .group')
      .should('be.visible')
      .should('contain.text', 'Password was changed with success')
  })
})
