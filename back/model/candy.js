const db = require("../config/connection")

const getCandy = async () => {
    try {
        const data = await db("tbl_candy").select("*")
            .where("active", true)


        if (data.length > 0) {
            return data

        } else {
            return []

        }

    } catch (error) {
        return false

    }
}

const getCandyById = async (id) => {
    try {
        const data = await db("tbl_candy").select("*")
            .where("id_candy", id).where("active", true)


        if (data.length > 0) {
            return data

        } else {
            return []

        }

    } catch (error) {
        return false

    }
}

const insertCandy = async (candy) => {
    try {
        const data = await db("tbl_candy").insert(
            {
                name: `${candy.name}`,
                quantity: `${candy.quantity}`,
                expiration_date: `${candy.date}`,
                active: true
            }
        )

        if (data.length > 0) {
            return data

        }

    } catch (error) {
        console.log(error)
        return false

    }
}

const updateCandy = async (candy) => {
    try {
        const data = await db("tbl_candy").update(
            {
                name: `${candy.name}`,
                quantity: `${candy.quantity}`,
                expiration_date: `${candy.date}`
            }
        ).where("id_candy", candy.id_candy)

        if (data) {
            return data

        } else {
            return false

        }

    } catch (error) {
        return false

    }
}

const deleteCandy = async (ids) => {
    try {
        const data = await db("tbl_candy").update(
            {
                active: false
            }
        ).where("id_candy", ids.id_candy)

        if (data) {
            return true

        } else {
            return false

        }

    } catch (error) {
        console.log(error)
        return false

    }
}


module.exports = {
    getCandy,
    getCandyById,
    insertCandy,
    updateCandy,
    deleteCandy
}