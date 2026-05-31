const db = require("../config/connection.js")

const getTrash = async () => {
    try {
        const data = await db("vw_trash").select("*")

        if (data.length > 0) {
            return data

        } else {
            return []

        }

    } catch (error) {
        return false

    }
}

const insertTrash = async (dataBody) => {
    try {
        const data = await db("tbl_trash_candy").insert(
            {
                fk_user: dataBody.id_user,
                fk_candy: dataBody.id_candy
            }
        )

        if (data) {
            return true

        } else {
            return false

        }

    } catch (error) {
        return false

    }
}

module.exports = {
    insertTrash,
    getTrash
}