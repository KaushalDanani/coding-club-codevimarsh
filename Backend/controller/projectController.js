const Project = require('../models/project');

exports.getAllProject = async (req, res) => {
    try {

        Project.find({})
            .then((projectinfo) => {
                res.send(projectinfo);
            })

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.addProject = async (req, res) => {
    try {

        const members = req.body.projectteam;
        // console.log("asd");
        var memberDataArray = [];

        for (const memUsername of members) {
            try {
            const userData = await User.find({ username: memUsername });
            if (userData) {
                memberDataArray.push(userData[0]._id);
            }

            res.send({message : "Project uploaded successfully!"});
            } catch (error) {
            console.error(`Error fetching data for userID: ${memUsername}`, error);
            // Handle the error as needed
            }
        }
        // console.log("MemberDataArray:", memberDataArray);

        const newproject = new Project({
            projectName: req.body.projectname,
            description: req.body.projectdescription,
            tags: req.body.projecttags,
            contributors: memberDataArray, //Array of UserCollections
            projectLink: req.body.projectlink,
            projectInfo: req.body.projectinfo,
            image: req.body.projectimage,
            video: req.body.projectvideo,
        });
        await newproject.save();
        // console.log("newproj", newproject);
        res.end();

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteProject = async (req, res) => {
    try {

        await Project.deleteOne({"projectName": req.body.project_name});
        // console.log( req.body.project_name);
        
        res.send({message : 'Project deleted successfully!'});

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};