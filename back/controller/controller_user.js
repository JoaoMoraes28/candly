const userDAO = require("../model/user.js")

const DEFAULT_MESSAGES = require("./module_messages/messages.js")

async function postUser(user, typeBody) {
    const MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(typeBody).toUpperCase() == "APPLICATION/JSON") {

            const valide = valideData(user)

            if (valide) {
                const userRes = await userDAO.insertUser(user)

                if (userRes) {
                    MESSAGES.SUCCESS_CREATE_ITEM.user = user
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

async function verifyUser(user, typeBody) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(typeBody).toUpperCase() == "APPLICATION/JSON") {

            const valide = valideData(user)

            if (valide) {
                const userRes = await userDAO.authUser(user)

                if (userRes) {
                    MESSAGES.SUCCESS_REQUEST.user = userRes
                    return MESSAGES.SUCCESS_REQUEST

                } else if (!userRes) {
                    MESSAGES.ERROR_INVALID_PASSWORD.message = "Senha ou email incorretos!"
                    return MESSAGES.ERROR_INVALID_PASSWORD

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

async function valideData(user) {
    if (user.name == "" || user.name == undefined || user.name == null || user.name.length > 150) {
        return '[Nome inválido]'

    } else if (user.email == "" || user.name == undefined || user.name == null || user.email.length > 255) {
        return '[Email inválido]'

    } else if (user.password == "" || user.password == undefined || user.password == null || user.password.length > 10) {
        return '[Senha inválida]'

    } else {
        return true

    }

}

module.exports = {
    postUser,
    verifyUser
}