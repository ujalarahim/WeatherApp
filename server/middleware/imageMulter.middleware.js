import multer from "multer";

const imageMulter = function(maxSize,allowType){

    const storage = multer.memoryStorage(); // store in the temporary memory
    const limits ={maxSize:maxSize*1024*1024}; // 5mb

    const fileFilter = function(req,file,cb){
        if(allowType.includes(file.mimetype)){
            return cb(null,true);
        }

        cb(new Error("Invalid file type"),false);
    
    }

    return multer({storage,limits,fileFilter})
}

export {imageMulter};