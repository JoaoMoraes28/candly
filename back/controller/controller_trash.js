const trashDAO = require("../model/trash.js")

const DEFAULT_MESSAGES = require("./module_messages/messages.js")

async function selectTrash() {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        const trashRes = await trashDAO.getTrash()

        if (trashRes) {
            MESSAGES.SUCCESS_REQUEST.trash = trashRes
            return MESSAGES.SUCCESS_REQUEST

        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL

        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER

    }
}

async function postCandy(data) {
    const MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    
    try {
        const valide = await valideData(data)

        if (valide) {
            const trashRes = await trashDAO.insertTrash(data)

            if (trashRes) {
                return MESSAGES.SUCCESS_CREATE_ITEM

            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL

            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += valide
            return MESSAGES.ERROR_REQUIRED_FIELDS

        }

    } catch (error) {
        console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER

    }
}

async function valideData(data) {
    if (isNaN(data.id_user) || data.id_user == "" || data.id_user == null || data.id_user == undefined) {
        return '[ID usuário inválido!]'

    } else if (isNaN(data.id_candy) || data.id_candy == "" || data.id_candy == null || data.id_candy == undefined) {
        return '[ID doce inválido!]'

    } else {
        return true

    }
}

module.exports = {
    selectTrash,
    postCandy
}