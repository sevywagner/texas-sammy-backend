const aws = require('aws-sdk');

const CouncilMember = require('../models/CouncilMember');
const CommitteeMember = require('../models/CommitteeMember');

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

exports.postGetMembers = (req, res, next) => {
    let files = [];
    const type = req.body.type;
    
    const Member = type === 'Council' ? CouncilMember : CommitteeMember;
    Member.getAllMembers().then(async (members) => {

        if (type === 'Council') {
            for (const member of members) {
                const response = await s3.getObject({
                    Key: member.image,
                    Bucket: `texas-sammy-member-pics/${type}`,
                }).promise();
    
                files.push("data:" + "application/json" + ";base64," + Buffer.from(response.Body).toString('base64'));
            }
        }

        res.status(200).json({
            message: 'Success',
            files,
            members
        });
    }).catch((err) => {
        console.log(err);
    });
}