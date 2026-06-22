/// <reference types="cypress" />
const { faker } = require('@faker-js/faker');
const { CreateList, GetList, UpdateList, DeleteList, GetLists, GetListsWithoutHeaderToken, GetListsWithInvalidToken, CreateListWithoutHeaderToken, CreateListWithInvalidToken, CreateListWithoutName, GetListWithoutHeaderToken, GetListWithInvalidToken, UpdateListWithoutHeaderToken, UpdateListWithInvalidToken, DeleteListWithoutHeaderToken, DeleteListWithInvalidToken } = require('../../modules/list_method')


describe('Tests for Lists API for ClickUp', () => {


    it('Get Lists with valid authorization header', () => {
        CreateList().then((createResponse) => {
            const listId = createResponse.body.id;
            cy.fixture('get_lists_schema').then((listsSchema) => {
                GetLists().then((getResponse) => {
                    cy.validateSchema(listsSchema, getResponse.body);
                    expect(getResponse.body).to.not.be.empty;
                    expect(getResponse.headers['content-type']).to.include('application/json')
                    DeleteList(listId)
                })
            })

        })
    })

    it('Get Lists  without authorization header', () => {
        CreateList().then((createResponse) => {
            const listId = createResponse.body.id
            GetListsWithoutHeaderToken()
                .then((getResponse) => {
                    expect(getResponse.status).to.eq(400);
                    expect(getResponse.body).to.deep.equal({
                        "err": "Authorization header required",
                        "ECODE": "OAUTH_017"
                    })
                })
            DeleteList(listId);
        })
    })


    it('Get Lists  with invalid authorization header', () => {
        CreateList()
            .then((createResponse) => {
                const listId = createResponse.body.id
                GetListsWithInvalidToken()
                    .then((createResponse) => {
                        expect(createResponse.status).to.eq(401);
                        expect(createResponse.body).to.deep.equal({
                            "err": "Token invalid",
                            "ECODE": "OAUTH_025"
                        })
                    })
                DeleteList(listId);
            })
    })


    it('Create Lists with valid authorization header and valid body', () => {
        cy.fixture('create_list_schema').then((listsSchema) => {
            CreateList().then((createResponse) => {
                expect(createResponse.status).to.eq(200);
                expect(createResponse.body).to.not.be.empty;
                expect(createResponse.headers['content-type']).to.include('application/json')
                cy.validateSchema(listsSchema, createResponse.body);

                const listId = createResponse.body.id;
                expect(listId).to.not.be.empty;
                expect(createResponse.body.folder.id).to.eq(Cypress.env('folderID'));

                cy.get('@AliaslistName').then((listName) => {
                    expect(createResponse.body.name).to.eq(listName);

                    GetList(listId).then((getResponse) => {
                        expect(getResponse.status).to.eq(200);
                        expect(getResponse.body).to.not.be.empty;
                        expect(getResponse.body.id).to.eq(listId);
                        expect(getResponse.body.name).to.eq(listName);
                        DeleteList(listId);
                    })

                })

            })
        })
    })


    it('Create List  without authorization header', () => {
        CreateListWithoutHeaderToken()
            .then((createResponse) => {
                expect(createResponse.status).to.eq(400);
                expect(createResponse.body).to.deep.equal({
                    "err": "Authorization header required",
                    "ECODE": "OAUTH_017"
                });
            })
    })

    it('Create List  with invalid authorization header', () => {
        CreateListWithInvalidToken()
            .then((createResponse) => {
                expect(createResponse.status).to.eq(401);
                expect(createResponse.body).to.deep.equal({
                    "err": "Token invalid",
                    "ECODE": "OAUTH_025"
                });
            })
    })

    it('Create List  without required name', () => {
        CreateListWithoutName()
            .then((createResponse) => {
                expect(createResponse.status).to.eq(400);
                expect(createResponse.body).to.deep.equal({
                    "err": "List Name Invalid",
                    "ECODE": "SUBCAT_020"
                });
            })
    })

    it('Should not allow creating a list with a duplicate name', () => {

        CreateList().then((createResponse) => {
            const listId = createResponse.body.id;
            CreateList(createResponse.body.name).then((createResponseNew) => {
                expect(createResponseNew.status).to.eq(400);
                expect(createResponseNew.body).to.deep.equal({
                    "err": "List name taken",
                    "ECODE": "SUBCAT_016"
                });
                
                DeleteList(listId);
            })
        })
    })

    it('Get Lists with valid authorization header and valid body', () => {
        CreateList().then((createResponse) => {
            const listId = createResponse.body.id;
            const listName = createResponse.body.name;
            cy.fixture('get_list_byID_schema').then((listsSchema) => {
                GetList(listId).then((getResponse) => {
                    expect(getResponse.status).to.eq(200);
                    expect(getResponse.body).to.not.be.empty;
                    cy.validateSchema(listsSchema, getResponse.body);
                    expect(listId).to.not.be.empty;
                    expect(getResponse.body.id).to.eq(listId);
                    expect(getResponse.body.folder.id).to.eq(Cypress.env('folderID'));
                    expect(getResponse.body.name).to.eq(listName);

                    DeleteList(listId)

                })
            })
        })
    })

    it('Get Lists without  authorization header', () => {
        CreateList().then((createResponse) => {
            const listId = createResponse.body.id

            GetListWithoutHeaderToken(listId).then((getResponse) => {
                expect(getResponse.status).to.eq(400);
                expect(getResponse.body).to.deep.equal({
                    "err": "Authorization header required",
                    "ECODE": "OAUTH_017"
                })
                DeleteList(listId)


            })
        })
    })

    it('Get Lists with invalid  authorization header', () => {
        CreateList().then((createResponse) => {
            const listId = createResponse.body.id

            GetListWithInvalidToken(listId).then((getResponse) => {
                expect(getResponse.status).to.eq(401);
                expect(getResponse.body).to.deep.equal({
                    "err": "Token invalid",
                    "ECODE": "OAUTH_025"
                })
                DeleteList(listId)


            })
        })
    })



    it('Update Lists with valid authorization header and valid body', () => {
        CreateList().then((createResponse) => {
            const listId = createResponse.body.id;
            expect(listId).to.not.be.empty;
            const createdName = createResponse.body.name;
            cy.fixture('update_list_schema').then((listsSchema) => {
                UpdateList(listId).then((updatedResponse) => {
                    expect(updatedResponse.status).to.eq(200);
                    expect(updatedResponse.body).to.not.be.empty;
                    expect(updatedResponse.body.id).to.eq(listId);
                    expect(updatedResponse.headers['content-type']).to.include('application/json');
                    expect(updatedResponse.body.folder.id).to.eq(Cypress.env('folderID'));
                    cy.validateSchema(listsSchema, updatedResponse.body);
                    cy.get('@AliasUpdatelistName').then((listName) => {
                        expect(updatedResponse.body.name).to.eq(listName);
                        expect(listName).to.not.eq(createdName);

                        GetList(listId).then((getResponse) => {
                            expect(getResponse.status).to.eq(200);
                            expect(getResponse.body.name).to.eq(listName);
                            expect(getResponse.body.id).to.eq(listId);
                            cy.get('@AliasUpdatelistContent').then((listContent) => {
                                expect(getResponse.body.content).to.eq(listContent);
                                DeleteList(listId)
                            })
                        })
                    })
                })
            })
        })
    })

    it('Update Lists  without authorization header', () => {
        CreateList().then((createResponse) => {
            const listId = createResponse.body.id
            UpdateListWithoutHeaderToken(listId)
                .then((updatedResponse) => {
                    expect(updatedResponse.status).to.eq(400);
                    expect(updatedResponse.body).to.deep.equal({
                        "err": "Authorization header required",
                        "ECODE": "OAUTH_017"
                    })
                    DeleteList(listId)
                })
        })
    })


    it('Update List  with invalid authorization header', () => {
        CreateList().then((createResponse) => {
            const listId = createResponse.body.id
            UpdateListWithInvalidToken(listId).then((updatedResponse) => {
                expect(updatedResponse.status).to.eq(401);
                expect(updatedResponse.body).to.deep.equal({
                    "err": "Token invalid",
                    "ECODE": "OAUTH_025"
                })
                DeleteList(listId)
            })
        })
    })


    it('Delete List with valid authorization header', () => {
        CreateList().then((createResponse) => {
            const listId = createResponse.body.id
            DeleteList(listId).then((deletedResponse) => {
                expect(200).to.eq(deletedResponse.status)
                GetList(listId).then((getResponse) => {
                    expect(getResponse.status).to.eq(200);
                    expect(getResponse.body.id).to.eq(listId);
                    expect(getResponse.body.deleted).to.eq(true)
                })
            })
        })
    })

    it('Delete List without authorization header', () => {
        CreateList().then((createResponse) => {
            const listId = createResponse.body.id
            DeleteListWithoutHeaderToken(listId).then((deletedResponse) => {
                expect(deletedResponse.status).to.eq(400);
                expect(deletedResponse.body).to.deep.equal({
                    "err": "Authorization header required",
                    "ECODE": "OAUTH_017"
                })
                DeleteList(listId)
            })
        })
    })

    it('Delete List  with invalid authorization header', () => {
        CreateList().then((createResponse) => {
            const listId = createResponse.body.id
            DeleteListWithInvalidToken(listId).then((deletedResponse) => {
                expect(deletedResponse.status).to.eq(401);
                expect(deletedResponse.body).to.deep.equal({
                    "err": "Token invalid",
                    "ECODE": "OAUTH_025"
                })
                DeleteList(listId)
            })
        })
    })




})
