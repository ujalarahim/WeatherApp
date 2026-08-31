class ApiFeatures {

    constructor(query, queryStr, allowFields = []) {
        this.query = query;   // this.query = schema.find()
        this.queryStr = queryStr; // url query
        this.allowFields = allowFields; // ['name', 'price']
    }

   filter() {
        const queryObj = {};

        for (let key in this.queryStr) {
            // 1. Extract the base field name (e.g., turns "price[lt]" into "price")
            const baseField = key.split('[')[0]; 

            // 2. Only process fields that are explicitly allowed (Security check)
            if (this.allowFields.includes(baseField)) {
                
                // 3. Check if the key contains a MongoDB operator (gt, gte, lt, lte)
                const operatorMatch = key.match(/\[(gt|gte|lt|lte)\]/);

                if (operatorMatch) {
                    // 4. Format the operator for MongoDB (e.g., "lt" becomes "$lt")
                    const operator = `$${operatorMatch[1]}`;
                    
                    // 5. Initialize the nested object if it doesn't exist yet
                    if (!queryObj[baseField]) {
                        queryObj[baseField] = {};
                    }
                    
                    // 6. Assign the value to the operator (e.g., queryObj.price.$lt = 10)
                    // Note: We cast to Number here assuming price/stock filters are numeric
                    queryObj[baseField][operator] = Number(this.queryStr[key]);
                    
                } else {
                    // 7. If no operator is found, do an exact match (e.g., category = "Sports")
                    queryObj[baseField] = this.queryStr[key];
                }
            }
        }

        // Apply the newly constructed filter object to the database query
        this.query = this.query.find(queryObj);
        
        return this;
    }
    pagination(defaultLimit = 100) {
        const page = parseInt(this.queryStr.page) || 1;
        const limit = parseInt(this.queryStr.limit) || defaultLimit;
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)

        return this;
    }

}

export { ApiFeatures };