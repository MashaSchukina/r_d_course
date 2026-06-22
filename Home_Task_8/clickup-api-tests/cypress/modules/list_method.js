const { faker } = require('@faker-js/faker');

export function CreateList(listName = "") {

    if (!listName) {
        listName = faker.person.lastName();
    }

    const folderId = Cypress.env('folderID');
    cy.wrap(listName).as('AliaslistName')
    return cy.send_Request('POST', `folder/${folderId}/list`, { "name": listName })
};


export function GetList(listId) {

    return cy.send_Request('GET', `list/${listId}`)
}

export function UpdateList(listId) {
    const listName = faker.person.lastName()
    const listContent = 'Content'
    cy.wrap(listName).as('AliasUpdatelistName')
    cy.wrap(listContent).as('AliasUpdatelistContent')
    return cy.send_Request('PUT', `list/${listId}`, { "name": listName, 'content': listContent })
}

export function DeleteList(listId) {
    return cy.send_Request('DELETE', `list/${listId}`)
}

export function GetLists() {
    const folderId = Cypress.env('folderID')
    return cy.send_Request('GET', `folder/${folderId}/list`)
}

export function GetListsWithoutHeaderToken() {
    const folderId = Cypress.env('folderID')
    return cy.send_Request_without_header_token('GET', `folder/${folderId}/list`)
}

export function GetListsWithInvalidToken() {
    const folderId = Cypress.env('folderID')
    return cy.send_Request_with_invalid_token('GET', `folder/${folderId}/list`)
}

export function CreateListWithoutHeaderToken() {
    const listName = faker.person.lastName();
    const folderId = Cypress.env('folderID');
    return cy.send_Request_without_header_token('POST', `folder/${folderId}/list`, { "name": listName })
};

export function CreateListWithInvalidToken() {
    const listName = faker.person.lastName();
    const folderId = Cypress.env('folderID');
    return cy.send_Request_with_invalid_token('POST', `folder/${folderId}/list`, { "name": listName })
};

export function CreateListWithoutName() {
    const listContent = 'Content';
    const folderId = Cypress.env('folderID');
    return cy.send_Request('POST', `folder/${folderId}/list`, { "content": listContent })
};

export function UpdateListWithoutHeaderToken(listId) {
    const listName = faker.person.lastName();
    return cy.send_Request_without_header_token('PUT', `list/${listId}`, { "name": listName })
}

export function UpdateListWithInvalidToken(listId) {
    const listName = faker.person.lastName();
    return cy.send_Request_with_invalid_token('PUT', `list/${listId}`, { "name": listName })
}

export function GetListWithoutHeaderToken(listId) {
    return cy.send_Request_without_header_token('GET', `list/${listId}`)
}

export function GetListWithInvalidToken(listId) {
    return cy.send_Request_with_invalid_token('GET', `list/${listId}`)
}

export function DeleteListWithoutHeaderToken(listId) {
    return cy.send_Request_without_header_token('DELETE', `list/${listId}`)
}

export function DeleteListWithInvalidToken(listId) {
    return cy.send_Request_with_invalid_token('DELETE', `list/${listId}`)
}
