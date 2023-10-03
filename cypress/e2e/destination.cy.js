const { getByDataTestId, pause } = require("./utils")

describe('empty spec', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/destination')
    })

    it('Crear y borrar un destino exitosamente', () => {
        pause()

        // Abrir ventana de nuevo destino
        getByDataTestId('add-destination-button').click()
        
        // Importar los datos del destino
        getByDataTestId('country-select').click()
        getByDataTestId('option-Japon').click()
        getByDataTestId('city-input').type('Tokyo')
        getByDataTestId('cost-input').type('175000')
        getByDataTestId('done-button').click()
        
        cy.wait(250)

        // Borrado de destino nuevo
        getByDataTestId('delete-Japon-Tokyo').click()
    })
})
