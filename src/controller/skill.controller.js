const express = require('express');

const route = express.Router();
const { getAllSkills, createSkill, updateSkills, deleteSkills } = require('../service/skill.service')
const { isValidSkills,  isValidDataSkill } = require('../helper/validation')
const buildResponse = require('../helper/buildResponse')

route.get('/', (req, res) => {
    try {
        const data = getAllSkills();
        buildResponse(res,200,data)
    } catch (error) {
        buildResponse(res,404,error.message)
    }

})

route.post('/',  isValidDataSkill,(req, res) => {
    const { title } = req.body;
    const data = createSkill(title);
    buildResponse(res,200,data)
})

route.put('/:id',  isValidDataSkill,isValidSkills, (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body
        res.send(updateSkills(id, title));
    } catch (error) {
        buildResponse(res,404,error.message)
    }

})

route.delete('/:id', isValidSkills,(req, res) => {
    try {
        const { id } = req.params;
        res.status(200).send(deleteSkills(id))
    } catch (error) {
        buildResponse(res,404,error.message)
    }


})

module.exports = route;