const db = require("../config/connection")

const insertUser = async (user) => {
    try {
        const data = await db("tbl_user").insert(
            {
                name: `${user.name}`,
                email: `${user.email}`,
                password: `${user.password}`
            }
        )

        if (data) {
            return data

        } 

    } catch (error) {
        return false

    }
}

const authUser = async (user) => {
    try {
        const data = await db("tbl_user").select("*")
        .where({
            email: user.email,
            password: user.password
        })

        if (data.length > 0) {
            return data

        } else {
            return false
            
        }

    } catch (error) {
        return "[Model]"

    }
}

module.exports = {
    authUser,
    insertUser
}