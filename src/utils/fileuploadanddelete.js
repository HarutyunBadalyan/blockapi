const streamifier = require('streamifier');
const cloudinary = require("cloudinary").v2
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key:  process.env.API_KEY, 
    api_secret:  process.env.API_SECRET 
  });
class PictureFile {
    static  async upload(buffer) {
        return new Promise(function(resolve, reject) {
            let cld_upload_stream = cloudinary.uploader.upload_stream(
                {
                  folder: "foo"
                },
                function(error, result) {
                    //console.log(error,result)
                    if(error){
                        reject(error);
                    }
    
                    resolve(result);
                }
            );
           streamifier.createReadStream(buffer).pipe(cld_upload_stream);
        });
        
    }
    static async delete(public_id) {
        return new Promise(function(resolve, reject) {
            cloudinary.uploader.destroy(public_id, function(error,result) {
                if(error) {
                    reject(error)
                }
                if(result) {
                    resolve(result)
                }
            })
        });

    }

}
module.exports = PictureFile;