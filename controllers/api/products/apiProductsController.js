const { Product } = require("../../../database/models");
const { paginationFunction } = require("../../../helpers/pagination.js");

const apiProductsController = {
    productList: async (req,res)=>{
        try {        
            //Configuracion variables paginacion
            const counter = await Product.findAll();
            const pagination = paginationFunction(req.baseUrl, counter, req.query.limit, req.query.page); 
            //

            //Pedido asincronico base de datos productos
            let products = await Product.findAll({ offset: pagination.offset, limit: pagination.limit  }); //paginacion

            //Constructor objeto/propiedad data
            let productObj = products.map((product)=>{
                return { 
                    id: product.id,
                    name: product.name,
                    introduction: product.introduction,
                    description: product.description,
                    price: product.price,
                    category: [product.category],
                    image: `http://localhost:3000/images/products/${product.image}`,
                    detail: `http://localhost:3000${req.baseUrl}${req.path}${product.id}`,
                    createdAt: product.createdAt,
                    updatedAt: product.updatedAt
                }
            });

            //Constructor objeto respuesta List
            let respuestaListObj =  {
                meta: pagination.meta, //paginacion
                data: productObj
            };

            return res.json(respuestaListObj);
        } catch(error) {
            return res.json({ TypeOfError: "Catch Product List Promise Error", ErrorMessage: error })
        }
    },
    productDetail: async (req,res)=>{
        try {
            let id = req.params.id;
            let product = await Product.findByPk(id);
            if(product==null){
                return res.json({TypeOfError: "Database", ErrorMessage: "No se ha encontrado el producto requerido"})
            }
            let productObj = { 
                id: product.id,
                name: product.name,
                introduction: product.introduction,
                description: product.description,
                price: product.price,
                category: [product.category],
                weight: product.weightKg,
                size: product.size,
                material: product.material,
                homepage: product.homepage,
                image: `http://localhost:3000/images/products/${product.image}`,
                url: `http://localhost:3000${req.originalUrl}`,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt
            }
            let respuestaDetail = {
                meta:{
                    status: 200,
                    count: product.length
                },
                data: productObj
            };
            return res.json(respuestaDetail);
        } catch(error) {
            return res.json({ TypeOfError: "Catch Product Detail Promise Error", ErrorMessage: error })
        }
    }
}

module.exports=apiProductsController;


