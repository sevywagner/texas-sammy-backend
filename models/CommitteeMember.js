const { getDb } = require('./../util/database');
const CouncilMember = require('./CouncilMember');

class CommitteeMember extends CouncilMember {
    constructor (name, position, year, image, email, committee) {
        super(name, position, year, image, email);
        this.committee = committee;
    }

    save() {
        const db = getDb();
        return db.collection('CommitteeMember').insertOne(this);
    }

    static deleteAll() {
        const db = getDb();
        return db.collection('CommitteeMember').deleteMany({});
    }

    static getAllMembers() {
        const db = getDb();
        return db.collection('CommitteeMember').find({}).toArray();
    }
}

module.exports = CommitteeMember;