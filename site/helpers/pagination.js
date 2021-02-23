const { Rutine } = require("../../../database/models");

const pagination = (model, arrayDataResults)=>{
    let counter = await model.findAll();
    let { page, limit } = req.query;        

    limit = parseInt(limit && limit > 0 && limit <= counter.length ? limit : "8", 10);
    let offset = parseInt(((page ? page : page = 1) - 1) * limit, 10);
    if(page <= 0 || page > Math.ceil(counter.length / limit) ){
        return res.json({ TypeOfError: "Pagination", ErrorMessage: "La pagina requerida no existe" });
    }

    let limitOffset = { limit: limit, offset: offset };
    let meta = {
        status: 200,
        count: arrayDataResults.length,
        page: parseInt(page, 10),
        limit: limit,
        totalPages: Math.ceil(counter.length / limit),
        totalRutines: counter.length,
        previous: "http://localhost:3000/api/rutines?page=" + (parseInt(page, 10) - 1) + "&limit=" + limit,
        next: "http://localhost:3000/api/rutines?page=" + (parseInt(page, 10) + 1) + "&limit=" + limit
    };

    if(page == Math.ceil(counter.length / limit)){
        delete meta.next;
    }

    if(page == 1){
        delete meta.previous;
    }

    let outputs = {
        limitOffset,
        meta
    }
    return outputs;
} 

module.exports = pagination;
