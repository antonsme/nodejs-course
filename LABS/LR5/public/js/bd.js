


const db = [{
    "id": 0,
    "name": "anton",
    "bday": "13"

}]

class DB {
    constructor() {
        this.commitTime = 0
        this.serverInfo = {
            commitCout: 0,
            start: 0,
            end: 0,
            regCount: 0
        }
    }


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

    showServerInfo = () => {
        return this.serverInfo
    }

    commit = () => {
        console.log("state is save")
        this.serverInfo.commitCout++

    }


    startCommitInterval = (time) => {
        this.commitTime = setInterval(() => {
            this.commit()
        }, time * 1000)
    }


    stopCommitInterval = () => {
        clearInterval(this.commitTime)
        this.commitTime = 0
    }


    saveInfoForCurrentTime = (time) => {
        this.serverInfo.start = new Date()
        const end = time * 1000 + this.serverInfo.start
        const intervalForInfo = setInterval(() => {
            if (Date.now() >= end) {
                clearInterval(intervalForInfo)
                this.serverInfo.end = new Date()
            }
        })
    }

    getServerInfo = () => {
        return this.serverInfo
    }


}

module.exports = new DB()