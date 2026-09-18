const express = require('express');
const router = express.Router();

const {
    getAllProjects,
    getProjectById,
    getProjectStats,
    createProject,
    updateProject,
    deleteProject,
} = require('../_controllers/projects.controllers');

// Project routes
router.get('/', getAllProjects);
router.get('/stats', getProjectStats);
router.get('/:id', getProjectById);
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

module.exports = router;