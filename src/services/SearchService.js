const Post = require("../db/models/post");

class SearchService {

    static async getResultBYQueryParams(queries, tableName) {
        let value;
        const lowerCaseQueries = queries.toLowerCase()
        if (tableName === "Posts") {

            value = Post.sequelize.query(`SELECT *
            FROM "Posts"
            WHERE  LOWER("title") LIKE '%${lowerCaseQueries}%'
               OR  LOWER("subtitle") LIKE '%${lowerCaseQueries}%'
            GROUP BY "id"`)

        } else {

            value = Post.sequelize.query(`SELECT *
            FROM "Users"
            WHERE 
               LOWER("firstName") LIKE '%${lowerCaseQueries}%' OR
               LOWER("nick_name") LIKE '%${lowerCaseQueries}%' OR
               LOWER("lastName") LIKE '%${lowerCaseQueries}%' 
            GROUP BY "id"`)

        }

        return value;
    };
}

module.exports = SearchService