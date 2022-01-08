let conn = require('../config/dbconn')

class Posts {

    constructor(row) {
        this.row = row;
    }
    get idPost() { return this.row.idPost; }
    get username() {return this.row.username}
    get content() {return this.row.content;}
    get type() {return this.row.type;}
    get tags() {return this.row.tags;}
    get title() {return this.row.title;}
    get multimedia() {return this.row.multimedia;}
    get timestamp() {return this.row.timestamp;}
    get CommentCount() {return this.row.comments;}
    get likesCount() {return this.row.likes;}

    static AddPost(name, passeword, cb) {
        conn.query('INSERT INTO users SET UserNames = ?, Passeworld = ?', [name, passeword], (error, results, fields) => {
            if (error) throw error;
            cb(results);
        });
    }
    static GetPosts(cb) {
        conn.query('SELECT * FROM post natural join user', (error, results, fields) => {
            if (error) throw error;
            cb(results.map(ele => { return new Posts(ele); }));
        });
    }
}

module.exports = Posts