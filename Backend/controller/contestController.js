const Contest = require('../models/contest');

exports.getPastContest = async (req, res) => {
    try {

        Contest.find({})
            .then((contestinfo) => {
                contestinfo = contestinfo.filter((data) => {
                    var d =  new Date();
                    return data.endDate.getTime() < d.getTime();
                })
                
                res.send(contestinfo);
            })

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getCurrentContest = async (req, res) => {
    try {

        Contest.find({})
            .then((contestinfo) => {
                contestinfo = contestinfo.filter((data) => {
                    var d =  new Date();
                    return (data.startDate.getTime() <= d.getTime() && data.endDate.getTime() > d.getTime());
                })

                res.send(contestinfo);
            })

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getUpcomingContest = async (req, res) => {
    try {

        Contest.find()
            .then((contestinfo) => {
                contestinfo = contestinfo.filter((data) => {
                    var d =  new Date();
                    return data.startDate.getTime() >= d.getTime();
                })

                res.send(contestinfo);
            })

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.registerContest = async (req, res) => {
    try {

        const data = req.body;
        // console.log(data);
        var start = new Date(0);
        start.setFullYear(parseInt(data.startDate.substring(0, 4)));
        start.setMonth(parseInt(data.startDate.substring(5, 7)) - 1);
        start.setDate(parseInt(data.startDate.substring(8, 10)));
        start.setHours(parseInt(data.startTime.substring(0, 2)));
        start.setMinutes(parseInt(data.startTime.substring(3, 5)));
        
        var end = new Date(0);
        end.setFullYear(parseInt(data.endDate.substring(0, 4)));
        end.setMonth(parseInt(data.endDate.substring(5, 7)) - 1);
        end.setDate(parseInt(data.endDate.substring(8, 10)));
        end.setHours(parseInt(data.endTime.substring(0, 2)));
        end.setMinutes(parseInt(data.endTime.substring(3, 5)));
        // console.log(start);
        // console.log(end);
        const newContest = Contest({
            name : data.name,
            type : data.type,
            startDate : start,
            endDate : end,
            contestLink : data.cLink,
            resultLink : data.rLink,
            solutionLink : data.sLink
        })

        await newContest.save();
        res.send({message : "Contest Registered successfully!"});

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getPastContest = async (req, res) => {
    try {

        Contest.find({})
            .then((contestinfo) => {
                contestinfo = contestinfo.filter((data) => {
                    var d =  new Date();
                    return data.endDate.getTime() < d.getTime();
                })
                
                res.send(contestinfo);
            })

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
