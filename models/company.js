import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema({
    name : {type:String , required:true, unique:true},
    email : {type:String , required:true, unique:true},
    password: {type:String, required:true},
    projects: [{type:mongoose.Schema.Types.ObjectId,
               ref: 'Project'
    }]
})

const Company = mongoose.model('Company', CompanySchema);

export default Company;