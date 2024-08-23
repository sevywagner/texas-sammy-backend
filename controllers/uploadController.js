const aws = require('aws-sdk');

const CouncilMember = require('../models/CouncilMember');
const CommitteeMember = require('../models/CommitteeMember');

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

exports.postUpdate = (req, res, next) => {
    const type = req.body.type;
    const members = JSON.parse(req.body.members);
    const files = req.files;

    const Member = type === "Council" ? CouncilMember : CommitteeMember;

    Member.deleteAll().then(() => {
        for (let i = 0; i < members.length; i++) {
            const cm = new Member(members[i].name, members[i].position, members[i].year, files[i].originalname, members[i].email || '', members[i].committee);
            cm.save().then((response) => {
                return s3.putObject({
                    Bucket: `texas-sammy-member-pics/${type}`,
                    Key: files[i].originalname,
                    Body: files[i].buffer,
                }).promise();
            }).then(() => {

            }).catch((err) => console.log(err));
        }
    }).catch((err) => {
        console.log(err);
    });
};