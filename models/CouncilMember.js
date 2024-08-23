const { getDb } = require('./../util/database');

class CouncilMember {
    constructor (name, position, year, image, email) {
        this.name = name;
        this.position = position;
        this.year = year;
        this.image = image;
        this.email = email || '';
    }

    save() {
        const db = getDb();
        return db.collection('CouncilMember').insertOne(this);
    }

    static deleteAll() {
        const db = getDb();
        return db.collection('CouncilMember').deleteMany({});
    }

    static getAllMembers() {
        const db = getDb();
        return db.collection('CouncilMember').find({}).toArray();
    }
}

module.exports = CouncilMember;