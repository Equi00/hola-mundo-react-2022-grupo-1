export const getByDataTestId = 
    (dataTestId) => cy.get(`[data-testid="${dataTestId}"]`)

export const pauseFlag = false
export const pause = () => {
    if(pauseFlag)
        cy.pause()
}