const { getByDataTestId, pause } = require("./utils")

describe('empty spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/activity')
  })

  it('Crear una actividad, editarla y eliminarla', () => {
    pause()

    // Presionar el boton de agregar una actividad para que redirija a la pagina de creacion
    getByDataTestId('add-activity-button').click()

    // Verificar que se redirija a la pagina de edicion
    cy.url().should('include', '/activity/edit')

    pause()
    //-----------------------------------------------------------------------------//

    // LLenar los datos del formulario correctamente
    getByDataTestId('activity-description-label').type('Actividad de prueba')
    getByDataTestId('activity-hora-inicio-label').type('0600A')
    getByDataTestId('activity-hora-final-label').type('0800A')
    getByDataTestId('activity-dificultad-select').click()
    getByDataTestId('activity-dificultad-media').click()
    getByDataTestId('activity-costo-label').type('2000')

    pause()
    //-----------------------------------------------------------------------------//

    // Presionar el boton de guardar
    getByDataTestId('activity-guardar-button').click()

    // Verificar que se redirija a la pagina de actividades
    cy.url().should('include', '/activity')

    cy.wait(250)

    // Verificar que se haya creado la actividad obteniendo todos los elementos con id activity-card-description y verificar si alguno tiene la descripcion que le dimos
    // Deberia ser verdadero
    getByDataTestId('activity-card-description').contains('Actividad de prueba').should('be.visible')

    pause()
    //-----------------------------------------------------------------------------//

    // Presionar el boton de editar la actividad
    getByDataTestId('activity-more-card-button-Actividaddeprueba').click()
    getByDataTestId('activity-edit-button').click()

    cy.wait(250)

    // Verificar que se redirija a la pagina de edicion
    cy.url().should('include', '/activity/edit')

    pause()
    //-----------------------------------------------------------------------------//

    // // LLenar los datos del formulario que se quieran cambiar correctamente
    getByDataTestId('activity-description-label').type(' editada')
    getByDataTestId('activity-costo-label').type('0')

    pause()
    //-----------------------------------------------------------------------------//
    
    // Presionar el boton de guardar
    getByDataTestId('activity-guardar-button').click()

    // Verificar que se redirija a la pagina de actividades
    cy.url().should('include', '/activity')

    // Verificar que se haya editado la actividad
    getByDataTestId('activity-card-description').contains('Actividad de prueba editada')

    pause()
    //-----------------------------------------------------------------------------//

    // // Presionar el boton de eliminar la actividad
    getByDataTestId('activity-more-card-button-Actividaddepruebaeditada').click()
    getByDataTestId('activity-remove-button').click()
  })

})

