import { Profile } from "../model/Profile.js";


export const profile = async (req,res) => {
    try {

        const {name,email,phone,location,summary,Experience,Education, Skills} = req.body;

        if(!name || !email || !phone || !location || !summary || !Experience || !Education || !Skills) {
            return res.status(401).json({
                success:false,
                message:"All fields are required"
            })
        }


        const userDetail = await Profile.create({
            name:name,
            email:email,
            phone:phone,

            location:location,
            summary:summary,
            Experience:Experience,
            Education:Education,
            Skills:Skills

            
        })

        return res.status(201).json({
            success:true,
            message:"Resume created",
            userDetail
            
        })
 

        
    } catch (error) {
        console.log(error)

        return res.status(401).json({
            success:false,
            message:error.message
        })
        
    }
}