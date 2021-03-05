const { Rutine } = require("../../../database/models");
const { paginationFunction } = require("../../../helpers/pagination.js");

const apiRutinesController = {
    rutineList: async (req,res)=>{
        try {    
            //Configuracion variables paginacion
            const counter = await Rutine.findAll();
            const pagination = paginationFunction(req.baseUrl, counter, req.query.limit, req.query.page); 
            //
            
            //Pedido asincronico base de datos rutinas
            let rutines = await Rutine.findAndCountAll({ 
                offset: pagination.offset, //paginacion 
                limit: pagination.limit //paginacion
            });

            //Constructor objeto/propiedad data
            let rutineObj = rutines.rows.map((rutine)=>{
                return { 
                    id: rutine.id,
                    name: rutine.name,
                    introduction: rutine.introduction,
                    description: rutine.description,
                    price: rutine.price,
                    category: [rutine.category],
                    image: `http://localhost:3000/images/rutines/${rutine.image}`,
                    detail: `http://localhost:3000${req.baseUrl}${req.path}${rutine.id}`,
                    createdAt: rutine.createdAt,
                    updatedAt: rutine.updatedAt
                }
            });

            //Constructor objeto respuesta List
            let respuestaListObj =  {
                meta:pagination.meta, //paginacion
                data:rutineObj
            };
            return res.json(respuestaListObj);
        } catch(error) {
            return res.json({ TypeOfError: "Catch Rutine List Promise Error", ErrorMessage: error })
        }
    },
    rutineDetail: async (req,res)=>{
        try {
            let id = req.params.id;
            let rutine = await Rutine.findByPk(id);
            if(rutine==null){
                return res.json({TypeOfError: "Database", ErrorMessage: "No se ha encontrado la rutina requerida"})
            }
            let rutineObj = { 
                id: rutine.id,
                name: rutine.name,
                description: rutine.description,
                category: [rutine.category],
                introduction: rutine.introduction,
                price: rutine.price,
                duration: rutine.duration_weeks,
                image: `http://localhost:3000/images/rutines/${rutine.image}`,
                url: `http://localhost:3000${req.originalUrl}`,
                createdAt: rutine.createdAt,
                updatedAt: rutine.updatedAt
            }
            let respuestaDetail = {
                meta:{
                    status: 200,
                },
                data: rutineObj
            };
            return res.json(respuestaDetail);
        } catch(error) {
            return res.json({ TypeOfError: "Catch Rutine Detail Promise Error", ErrorMessage: error })
        }
    }
}

module.exports=apiRutinesController;


