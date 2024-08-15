import express from 'express';
import { loginngo,registerngo } from '../controllers/ngouser.js';
import { loginCompany,registercompany } from '../controllers/companyuser.js';
import { createproject, getproject, getprojectbyid } from '../controllers/projects.js';


const router = express.Router();

router.post('/ngoregister',registerngo);
router.post('/ngologin',loginngo);
router.post('/companylogin',loginCompany);
router.post('/companyregister',registercompany);
router.post('/createproject',createproject);
router.get('/getprojects',getproject);
router.get('/getprojectbyid/:id',getprojectbyid);


export default router;