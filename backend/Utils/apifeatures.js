class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword
            ? {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: "i",
                },
            } : {};

        console.log(keyword);

        this.query = this.query.find({ ...keyword })
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr }
        // console.log(queryCopy);
        // Removing Some Fields for catagory
        const removeFields = ["keyword", "page", "limit"]

        removeFields.forEach(key => delete queryCopy[key])

        // console.log(queryCopy);

        //========= Filter for Price and Ratting ==============
        
        let queryStr = JSON.stringify(queryCopy)    //convert String 
        
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`)  // doller ma replace mate 

        this.query = this.query.find(JSON.parse(queryStr));
        // console.log(queryStr);
        return this;
    }


    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;  //50 - 10

        const skip = resultPerPage * (currentPage - 1);

        this.query.limit(resultPerPage).skip(skip);

        return this;

    }

}

module.exports = ApiFeatures;