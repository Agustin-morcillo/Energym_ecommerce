const { Rutine } = require("../database/models");

const pagination = {
    paginationFunction: (modelName, counter, limit, page)=>{
        limit = parseInt(limit && limit > 0 && limit <= counter.length ? limit : "8", 10);
        let offset = parseInt(((page ? page : page = 1) - 1) * limit, 10);
        if(page <= 0 || page > Math.ceil(counter.length / limit) ){
            return res.json({ TypeOfError: "Pagination", ErrorMessage: "La pagina requerida no existe" });
        }    
        let meta = {
            status: 200,
            count: counter.length,
            page: parseInt(page, 10),
            limit: limit,
            totalPages: Math.ceil(counter.length / limit),
            previous: `http://localhost:3000${modelName}?page=${(parseInt(page, 10) - 1)}&limit=${limit}`,
            next: `http://localhost:3000${modelName}?page=${(parseInt(page, 10) + 1)}&limit=${limit}`
        };

        if(page == Math.ceil(counter.length / limit)){
            delete meta.next;
        }

        if(page == 1){
            delete meta.previous;
        }

        let outputs = {
            limit,
            offset,
            meta
        }
        return outputs;
    }
}

module.exports = pagination;