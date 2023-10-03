const { getByDataTestId } = require("./utils")

describe('Home Testing', () => {

  it('passes', () => {
    cy.visit('http://localhost:3000/home')
  })

  it('Not logged in user should get error alert', () => {
    cy.visit('http://localhost:3000/home')
    cy.on(getByDataTestId("alert-message"), (txt) => {
      expect(txt).to.contains('Debe iniciar sesion')
    })
  })

  it("Logged in user should get home information", () => {
    cy.visit('http://localhost:3000/login')
    getByDataTestId('username-input').type('dmartin')
    getByDataTestId('password-input').type('denise123')
    getByDataTestId('submit').click()
    cy.url().should('include', '/home') 
    cy.on(getByDataTestId("card-quantity"), (txt) => {
      expect(txt).to.contains(/^[0-9]*$/)
    })
  })
})