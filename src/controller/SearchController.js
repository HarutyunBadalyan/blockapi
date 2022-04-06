const SearchService = require('../services/SearchService');

class SearchController {

    static async globalSearch(ctx) {
        const queries = ctx.query.text;
        const tableName = ctx.query.tableName;

        console.log(queries)
            ctx.body = await SearchService.getResultBYQueryParams(queries, tableName);
            ctx.status = 200;


    }
}

module.exports = SearchController