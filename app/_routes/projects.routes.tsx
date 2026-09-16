const express = require('express');
const router = express.Router();
//const {getAllApplications, getApplicationById, getApplicationStats , createApplications, updateApplications, deleteApplications} = require('../controllers/applications.controllers');
const {getAllProjects} = require('../controllers/projects.controllers');

router.get('/', getAllProjects);


// get all applications
// router.get('/stats', getApplicationStats);


// router.get('/:id', getApplicationById);

// router.post('/', createApplications);

// router.put('/:id', updateApplications);

// router.delete('/:id', deleteApplications);


module.exports = router;