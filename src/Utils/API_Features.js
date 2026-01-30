class API_Features {
    constructor(query, queryStr) {
        this.query = query
        this.quryStr = queryStr
    }

    search() {
        let email = this.quryStr.email ? {
            name: { $regex: this.quryStr.email, $options: "i" }
        } : {}
        this.query.find({ ...email })
        return this
    }
}


module.exports = API_Features