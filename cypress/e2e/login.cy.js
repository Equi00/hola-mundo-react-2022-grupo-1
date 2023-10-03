const { getByDataTestId } = require("./utils")

describe('Login spec', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/login')
  })  

  it('Login sin user', () => {
    getByDataTestId('username-input').type('alenava')
    getByDataTestId('submit').click()
    cy.url().should('include', '/login')
    cy.on(getByDataTestId('alert-message'), (txt) => {
      expect(txt).to.contains('Debe ingresar Usuario y Contraseña')
      })
  })

  it('Login sin pass', () => {
    getByDataTestId('password-input').type('ale123')
    getByDataTestId('submit').click()
    cy.url().should('include', '/login')
    cy.on(getByDataTestId('alert-message'), (txt) => {
      expect(txt).to.contains('Debe ingresar Usuario y Contraseña')
      })
  })  

  it('Login con contraseña incorrecta', () => {
    getByDataTestId('username-input').type('alenava')
    getByDataTestId('password-input').type('xxxxx')
    getByDataTestId('submit').click()
    cy.url().should('include', '/login')
    cy.on(getByDataTestId('alert-message'), (txt) => {
      expect(txt).to.contains('Usuario o Contraseña incorrectos')
      })
  })  

  it('Login con user incorrecto', () => {
    getByDataTestId('username-input').type('xxxxx')
    getByDataTestId('password-input').type('ale123')
    getByDataTestId('submit').click()
    cy.url().should('include', '/login')
    cy.on(getByDataTestId('alert-message'), (txt) => {
      expect(txt).to.contains('Usuario o Contraseña incorrectos')
      })
  })    

  it('Login correcto', () => {
    getByDataTestId('username-input').type('alenava')
    getByDataTestId('password-input').type('ale123')
    getByDataTestId('submit').click()
    cy.url().should('include', '/home')
  }) 

})