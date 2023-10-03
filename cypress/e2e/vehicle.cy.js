const { getByDataTestId, pause} = require('./utils')

describe('Vehicle testing', () => {
    beforeEach(() => {
        cy.visit('http://localHost:3000/vehicle')
    })

    it('Crear un vehiculo, editarlo y eliminarlo', () => {
        pause()

        getByDataTestId('add-vehicle-button').click()

        cy.url().should('include', '/vehicle/add-vehicle')

        pause()

        getByDataTestId('vehicle-brand-label').type('Honda')
        getByDataTestId('vehicle-type-select').click()
        getByDataTestId('vehicle-car-type').click()
        getByDataTestId('vehicle-model-label').type('Modelo123')
        getByDataTestId('vehicle-year-label').type('2010')
        getByDataTestId('vehicle-day-cost-label').type('600')
        
        pause()

        getByDataTestId('vehicle-share-button').click()

        cy.url().should('include', '/vehicle')

        cy.wait(250)
        getByDataTestId('vehicle-more-card-button-Honda').scrollIntoView()
        getByDataTestId('vehicle-card-brand').contains('Honda').should('be.visible')

        pause()

        getByDataTestId('vehicle-more-card-button-Honda').click()
        getByDataTestId('vehicle-edit-button').click()

        cy.wait(250)

        cy.url().should('include', '/vehicle/add-vehicle')

        pause()

        getByDataTestId('vehicle-brand-label').type(' Editado')
        getByDataTestId('vehicle-model-label').type(' Editado')

        pause()

        getByDataTestId('vehicle-share-button').click()

        cy.url().should('include', '/vehicle')

        getByDataTestId('vehicle-card-brand').contains('Honda Editado')

        pause()

        getByDataTestId('vehicle-more-card-button-HondaEditado').click()
        getByDataTestId('vehicle-delete-button').click()
    })
})