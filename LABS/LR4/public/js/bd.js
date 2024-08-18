


const db = [{
    "id": 0,
    "name": "anton",
    "bday": "13"

}]

class DB {


    select = () => {
        return db
    }

    insert = (info) => {

        db.push(info)

    }

    delete = (index) => {
        db.splice(index, 1)
    }

    update = (index, info) => {
        db[index] = info
    }

    show = (index) => {
        return db[index]
    }





}

module.exports = new DB()