import IdeaModel from '../models/idea.js';

const getIdeas = async (req, res) => {
    try {
        const ideas = await IdeaModel.find({}).sort('createdAt');
        res.status(200).json({success : true, things, size : ideas.length});
    } catch (error) {
        res.status(500).json({success : false, error : error.message});
    }
}

const createIdea = async (req, res) => {
    try {
        const idea = await IdeaModel.create({...req.body})
        res.status(201).json({success : true, idea, msg : 'Successfully Created'});
    } catch (error) {
        res.status(500).json({success : false, error : error.message});
    }
}

export {createIdea, getIdeas}