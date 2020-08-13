const FE_URL = 'http://localhost:4200/'

describe('July Table Tests', () => {
    const loadMoreButtonText = 'Load More'

    beforeEach(() => {
        cy.visit(FE_URL)
        cy.contains(loadMoreButtonText)
    })


    it('Can search for text', () => {
        cy.get('#tbxSearch').should('be.visible')
        cy
            .get('.handsontable table.htCore tbody tr')
            .its('length')
            .should('be.eq', 5 * 2) // includes clone records
        cy
            .get('#tbxSearch')
            .type('black')
            .type('{enter}')
        cy
            .get('.handsontable table.htCore tbody tr')
            .its('length')
            .should('be.eq', 2 * 2) // includes clone records
        // and clear the search box
        cy
            .get('#btnClear')
            .click()
        cy
            .get('.handsontable table.htCore tbody tr')
            .its('length')
            .should('be.eq', 5 * 2) // includes clone records
    })


    it('Can sort by multiple columns', () => {
        // load some more results to make it easier to discern two-column sorting
        cy
            .get('#btnLoadMore')
            .click()
            .click()
        cy
            .get('.handsontable table.htCore tbody tr')
            .its('length')
            .should('be.eq', 14 * 2) // includes clone records

        // click Date column first (remember, always dealing with clone, sigh)
        // in ASC order
        cy
            .get('.colHeader.columnSorting.sortAction.descending.sort-2')
            .last()
            .click()
            .click()

        // HOLD COMMAND and click the Middle (album name) column
        cy
            .get('body')
            .type('{command}', { force: true, release: false })
            .contains('Photo Album Name')
            .click({ force: true })

        // so we want to confirm:
        // ✔️ first row, last column = 2013
        // ✔️ last row, last colum = 2020
        // ✔️ first 2020 row, middle column = black android smartphone on brown wooden table
        // ✔️ last 2020 row, middle colum = white and blue apple keyboard
        cy
            .get('.handsontable table.htCore tbody tr')
            .first()
            .find('td')
            .last()
            .contains('2013')
        cy
            .get('.handsontable table.htCore tbody tr:nth-child(14)')
            .find('td')
            .last()
            .contains('2020')
        cy
            .get('.handsontable table.htCore tbody tr:nth-child(9)')
            .find('td:nth-child(3)')
            .contains('black android smartphone on brown wooden table')
        cy
            .get('.handsontable table.htCore tbody tr:nth-child(14)')
            .find('td:nth-child(3)')
            .contains('white and blue apple keyboard')

    })

    it('Sorting persists after refresh', () => {
        cy.clearCookies()
        cy.visit(FE_URL)

        // initial state
        cy
            .get('.handsontable table.htCore tbody tr:nth-child(1)')
            .find('td:nth-child(3)')
            .contains('person using MacBook Pro')

        // sort by album name
        cy
            .get('body')
            .contains('Photo Album Name')
            .click({ force: true })
        // confirm that 'green and black audio mixer' is in the first row
        cy
            .get('.handsontable table.htCore tbody tr:nth-child(1)')
            .find('td:nth-child(3)')
            .contains('green and black audio mixer')

        // DO not clear cookies, and hard refresh, and confirm first row still as expected
        cy.visit(FE_URL)
        cy
            .get('.handsontable table.htCore tbody tr:nth-child(1)')
            .find('td:nth-child(3)')
            .contains('green and black audio mixer')
    })

    it('Paging is supported and updates the URL', () => {
        // fresh start
        cy.clearCookies()
        cy.visit(FE_URL)
        cy
            .get('#btnLoadMore')
            .click()
        cy
            .url()
            .should('eq', 'http://localhost:4200/?page=2')
        cy
            .get('#btnLoadMore')
            .click()
        cy
            .url()
            .should('eq', 'http://localhost:4200/?page=3')
    })


})