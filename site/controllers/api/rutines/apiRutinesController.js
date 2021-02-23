const { Rutine } = require("../../../database/models");
const { detail } = require("../../productController");

const apiRutinesController = {
    rutineList: async (req,res)=>{
        try {        
            //Configuracion variables paginacion
            let rutinesCount = await Rutine.findAll();
            let { page, limit } = req.query;        

            limit = parseInt(limit && limit > 0 && limit <= rutinesCount.length ? limit : "8", 10);
            let offset = parseInt(((page ? page : page = 1) - 1) * limit, 10);
            if(page <= 0 || page > Math.ceil(rutinesCount.length / limit) ){
                return res.json({ TypeOfError: "Pagination", ErrorMessage: "La pagina requerida no existe" });
            }
        
            //Pedido asincronico base de datos rutinas
            let rutines = await Rutine.findAll({ offset: offset, limit: limit });

            //Constructor objeto/propiedad data
            let rutineObj = rutines.map((rutine)=>{
                return { 
                    id: rutine.id,
                    name: rutine.name,
                    description: rutine.description,
                    category: [rutine.category],
                    url: `http://localhost:3000${req.baseUrl}${req.path}${rutine.id}`
                }
            });

            //Constructor objeto respuesta List
            let respuestaListObj =  {
                meta:{
                    status: 200,
                    count: rutines.length,
                    page: parseInt(page, 10),
                    limit: limit,
                    totalPages: Math.ceil(rutinesCount.length / limit),
                    totalRutines: rutinesCount.length,
                    previous: `http://localhost:3000/api/rutines?page=${(parseInt(page, 10) - 1)}&limit=${limit}`,
                    next: `http://localhost:3000/api/rutines?page=${(parseInt(page, 10) + 1)}&limit=${limit}`
                },
                data: rutineObj
            };

            //Validacion de visualizacion de propiedades previous/next segun page
            if(page == Math.ceil(rutinesCount.length / limit)){
                delete respuestaListObj.meta.next;
            }

            if(page == 1){
                delete respuestaListObj.meta.previous;
            }
        
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
                introduction: rutine.introduction,
                price: rutine.price,
                duration: rutine.duration_weeks,
                image: `../../../public/images/rutines/${rutine.image}`,
                url: `http://localhost:3000${req.originalUrl}`
            }
            let respuestaDetail = {
                meta:{
                    status: 200,
                    count: rutine.length
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


