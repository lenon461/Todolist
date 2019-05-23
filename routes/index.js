const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const Job = require('../schemas/job');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.user);
  res.render('form', { user: req.user, loginError: req.flash('loginError') });
});
router.get('/join', function(req, res, next) {
  res.render('join', { title: '회원가입' , user: req.user, joinError: req.flash('joinError'),
  });
});
router.get('/list', isLoggedIn, async (req, res, next) => {
    try{
        const jobs = await Job.find({}).sort({'deadline':1, 'priority':-1});
        res.render('main', {jobs, user: req.user, title: 'Expxxress' });
    } catch (error){
        console.error(error);
        next(error);

    }
});
router.post('/job', async(req, res, next) => {
    try{
        if(!req.body.title || !req.body.contents){
            res.status(400).send("제목과 내용을 입력하세요");
        }
        const job = new Job({
            title: req.body.title,
            contents: req.body.contents,
            deadline: req.body.deadline,
            complete: req.body.complete,
            priority: req.body.priority,
        });
        const newjob = await job.save();
        res.redirect(302, `/list`);
    } catch (error){
        console.error(error);
        next(error);
    }
});

router.put('/job/:id', async (req, res, next) => {
    try{
        const job = await Job.findOne({_id: req.params.id });
        if(!job){
            res.status(400).send("제목과 내용을 입력하세요");
        }
        else if(!req.body.title || !req.body.contents || req.body.title == ""){
            res.status(400).send("제목과 내용을 입력하세요");
        }
        else {
                var query = { _id: req.params.id };
                console.log("#2");
            
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
            res.send(302,"수정에 성공하였습니다.");
           // res.redirect(302,`/list`);
        }

    } catch (error) {
        console.error(error);
        next(error);
    }
});
router.put('/job/:id/complete', async (req, res, next) => {
    try{
        const job = await Job.findOne({_id: req.params.id });
        if(!job){
            res.send(302,"완료되었습니다");
        }
        const iscompleted = job.complete? 0:1
        var query = { _id: req.params.id };
        await Job.findOneAndUpdate(query, 
            { 
                complete : iscompleted
            },
            { useFindAndModify : false }
        );
        res.redirect(302, `/list`);

    } catch (error) {
        console.error(error);
        next(error);
    }
});
router.delete('/job/:id', async (req, res, next) => {
    try{
        await Job.deleteOne({_id: req.params.id });
        res.redirect(302, `/list`);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
