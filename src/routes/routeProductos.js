const { Router } = require("express");
const router = Router();
const Contenedor = require("../moduloClass");
const file = "./productos.txt";
const contenedorProductos = new Contenedor();
const multer = require("multer");


// Multer subir archivos.
// 'image' campo en el formulario para subir imagen.
const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, 'src/public/uploads');
   
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
router.use(multer({ storage }).single('image'));


router.get('/', (req, res) => {
  res.render("index", {
    title: "WebStore",
    items: contenedorProductos.getAll(file)
  })
})
 
  
  router.post('/productos', (req, res, next) => {
    const body = req.body
    const image = req.file
    console.log(req)
    body.thumbnail = image.filename
    contenedorProductos.saveProducto(body, file)
   // res.json({ message: "Producto guardado", producto: body })
    res.redirect('/')
  })

  /*
  //Get - Traer todos los productos 
  router.get("/", (req, res) => {
    res.json(contenedorProductos.getAll(file));
  });
  
  //Get - Traer un producto determinado
  router.get("/:id", (req, res) => {
    const { id } = req.params;
    const producto = contenedorProductos.getById(parseInt(id), file);
    producto
      ? res.json({ productoId: id, producto: producto })
      : res.json({ message: "Producto no encontrado. Id: " + id });
  });
  
  //Pos - Dar de alta un nuevo Producto 
  router.post("/", (req, res) => {
    const body = req.body;
    const image = req.file;
    console.log(req)
    body.thumbnail = image.filename;
    contenedorProductos.saveProducto(body, file);
    res.json({ message: "Producto guardado", producto: body });
  });
  
  //Put - Modificar datos de un producto determinado
  router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const producto = contenedorProductos.getById(parseInt(id), file);
    producto ? contenedorProductos.updateProducto(id, body, file) : res.json(
      {message: "Producto no encontrado. Id: " + id });
      res.json({ message: "Producto actualizado", producto: body });
  });
  
  //Delete - Eliminar producto de un Id determinado
  router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const producto = contenedorProductos.deleteById(parseInt(id), file);
    producto
      ? res.json({ message: "Producto eliminado", id: id })
      : res.json({ message: "Producto no encontrado. Id: " + id });
  });
  */
 
module.exports = router
