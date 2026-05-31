const candyDAO = require("../model/candy.js")

const DEFAULT_MESSAGES = require("./module_messages/messages.js")

const controlleTrash = require("./controller_trash.js")

async function selectCandy() {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        const candyRes = await candyDAO.getCandy()

        if (candyRes) {
            MESSAGES.SUCCESS_REQUEST.candys = candyRes
            return MESSAGES.SUCCESS_REQUEST

        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL

        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER

    }
}

async function selectCandyById(id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        const candyRes = await candyDAO.getCandyById(id)

        if (candyRes) {
            MESSAGES.SUCCESS_REQUEST.candy = candyRes
            return MESSAGES.SUCCESS_REQUEST

        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL

        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER

    }
}

async function postCandy(candy, typeBody) {
    const MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(typeBody).toUpperCase() == "APPLICATION/JSON") {

            const valide = valideData(candy)

            if (valide) {
                const candyRes = await candyDAO.insertCandy(candy)

                if (candyRes) {
                    return MESSAGES.SUCCESS_CREATE_ITEM

                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL

                }

            } else {
                MESSAGES.ERROR_REQUIRED_FIELDS.message += valide
                return MESSAGES.ERROR_REQUIRED_FIELDS

            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE

        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER

    }
}

async function alterCandy(candy, typeBody, id) {
    const MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(typeBody).toUpperCase() == "APPLICATION/JSON") {

            const valide = valideData(candy)

            if (valide) {
                candy = { ...candy, id: id }
                const candyRes = await candyDAO.updateCandy(candy)

                if (candyRes) {


                    return MESSAGES.SUCCESS_UPDATE_ITEM

                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL

                }

            } else {
                MESSAGES.ERROR_REQUIRED_FIELDS.message += valide
                return MESSAGES.ERROR_REQUIRED_FIELDS

            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE

        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER

    }
}

async function removeCandy(ids) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (ids.id_candy == undefined || ids.id_candy == null || !isNaN(ids.id_candy)
            || ids.id_user == undefined || ids.id_user == null || !isNaN(ids.id_user)
        ) {
            const candyRes = await candyDAO.deleteCandy(ids)

            if (candyRes) {
                const trashRes = await controlleTrash.postCandy(ids)

                if (trashRes) {
                    return MESSAGES.SUCCESS_DELETE_ITEM

                } else {
                    return MESSAGES.ERROR_RELATIONAL_INSERTION
                
                }

            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL

            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += "[ID inválido]"
            return MESSAGES.ERROR_REQUIRED_FIELDS

        }

    } catch (error) {
        console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER

    }
}

async function valideData(candy) {
    if (candy.name == "" || candy.name == undefined || candy.name == null || candy.name.length > 150) {
        return '[Nome inválido]'

    } else if (isNaN(candy.quantity) || candy.quantity == undefined || candy.quantity == null || candy.quantity.length > 3) {
        return '[Quantidade inválida]'

    } else if (candy.date == "" || candy.date == undefined || candy.date == null || new Date(candy.Date)) {
        return '[Data inválida]'

    } else {
        return true

    }

}

module.exports = {
    selectCandy,
    selectCandyById,
    postCandy,
    alterCandy,
    removeCandy
}