
const test = require("../index")
function getUserById(id) {
    return test.users().findIndex(user => user.id === Number(id))
}
class TestController {

    async getTotalCount(req, res) {
        try {
            return res.json(test.users().length)
        }
        catch (e) {
            console.log(e)
            return res.json({error: e.message})
        }
    }
    async getUsers(req, res) {
        try {
            const {userId, limit, isForEnd, page} = req.query
            if (page) {
                return res.json(test.users().slice(Number(limit)*Number(page), Number(limit)*(Number(page)+1)))
            }
            if (!userId)  {
                return res.json(test.users().slice(0, Number(limit)))
            }
            // console.log(tt.users()es)
            let array
            let index = getUserById(userId)
            console.log(isForEnd)
            if (isForEnd === "true")
                array = test.users().slice(index+1, (index+1)+Number(limit))
            else
            {
                if (index !== 0)
                {
                    array = test.users().slice(Number(limit) < index? index - Number(limit) : 0 ,index)
                }
                else return res.json([])
            }
            return res.json(array)
        }
        catch (e) {
            console.log(e)
            return res.json({error: e.message})
        }
    }

}
module.exports = new TestController()
