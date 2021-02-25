const { Product } = require("../../../database/models");
const { detail } = require("../../productController");

const apiProductsController = {
    productList: async (req,res)=>{
        try {        
            //Configuracion variables paginacion
            let productsCount = await Product.findAll();
            let { page, limit } = req.query;        

            limit = parseInt(limit && limit > 0 && limit <= productsCount.length ? limit : "8", 10);
            let offset = parseInt(((page ? page : page = 1) - 1) * limit, 10);
            if(page <= 0 || page > Math.ceil(productsCount.length / limit) ){
                return res.json({ TypeOfError: "Pagination", ErrorMessage: "La pagina requerida no existe" });
            }
        
            //Pedido asincronico base de datos productos
            let products = await Product.findAll({ offset: offset, limit: limit });

            //Constructor objeto/propiedad data
            let productObj = products.map((product)=>{
                return { 
                    id: product.id,
                    name: product.name,
                    introduction: product.introduction,
                    description: product.description,
                    price: product.price,
                    category: [product.category],
                    detail: `http://localhost:3000${req.baseUrl}${req.path}${product.id}`
                }
            });

            //Constructor objeto respuesta List
            let respuestaListObj =  {
                meta:{
                    status: 200,
                    count: products.length,
                    page: parseInt(page, 10),
                    limit: limit,
                    totalPages: Math.ceil(productsCount.length / limit),
                    totalProduts: productsCount.length,
                    previous: `http://localhost:3000/api/products?page=${(parseInt(page, 10) - 1)}&limit=${limit}`,
                    next: `http://localhost:3000/api/products?page=${(parseInt(page, 10) + 1)}&limit=${limit}`
                },
                data: productObj
            };

            //Validacion de visualizacion de propiedades previous/next segun page
            if(page == Math.ceil(productsCount.length / limit)){
                delete respuestaListObj.meta.next;
            }

            if(page == 1){
                delete respuestaListObj.meta.previous;
            }
        
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
                weight: product.weight,
                size: product.size,
                material: product.material,
                homepage: product.homepage,
                image: `http://localhost:3000/images/products/${product.image}`,
                url: `http://localhost:3000${req.originalUrl}`
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


