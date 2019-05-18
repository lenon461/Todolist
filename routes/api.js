const express = require('express');
const router = express.Router();

const Job = require('../schemas/job');

/* GET home page. */
router.get('/job', async (req, res, next) => {
    try{
        const jobs = await Job.find({}).sort('priority');
        res.json(jobs);
    } catch (error){
        console.error(error);
        next(error);

    }
});
router.post('/job', async(req, res) => {
    try{
        if(!req.body.title || !req.body.contents){
            console.log('제목과 내용을 입력해주세요');
            return res.redirect('/list');
        }
        const job = new Job({
            title: req.body.title,
            contents: req.body.contents,
            deadline: req.body.deadline,
            complete: req.body.complete,
            priority: req.body.priority,
        });
        const newjob = await job.save();
        res.status(200).send("success");
    } catch (error){
        console.error(error);
        next(error);
    }
});

router.get('/job/:id', async (req, res, next) => {
    try{
        const job = await Job.findOne({_id: req.params.id });
        if(!job){
            console.log("존재하지 않는 포스트 입니다");
            return res.send(400, 'This post does not exist');
        }
        res.json(job);
    } catch (error) {
        console.error(error);
    }
});
router.put('/job/:id', async (req, res, next) => {
    try{
        const job = await Job.findOne({_id: req.params.id });
        if(!job){
            console.log("존재하지 않는 포스트 입니다");
            return res.send(400, 'This post does not exist');
        }
        var query = { _id: req.params.id };
        
        console.log(req.body);
        await Job.findOneAndUpdate(query, 
            { 
                title : req.body.title,
                contents : req.body.contents,
                deadline : req.body.deadline,
                priority : req.body.priority,
            },
            { useFindAndModify : false }
        );
        res.status(200).send("success");

    } catch (error) {
        console.error(error);
    }
});
router.put('/job/:id/complete', async (req, res, next) => {
    try{
        const job = await Job.findOne({_id: req.params.id });
        if(!job){
            console.log("존재하지 않는 포스트 입니다");
            return res.send(400, 'This post does not exist');
        }
        const iscompleted = job.complete? 0:1
        var query = { _id: req.params.id };
        await Job.findOneAndUpdate(query, 
            { 
                complete : iscompleted
            },
            { useFindAndModify : false }
        );
        res.status(200).send("success");

    } catch (error) {
        console.error(error);
    }
});
router.delete('/job/:id', async (req, res, next) => {
    try{
        await Job.deleteOne({_id: req.params.id });
        res.send("success");
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;
