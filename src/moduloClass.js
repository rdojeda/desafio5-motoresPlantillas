const fs = require("fs");

//Start class Contenedor
class Contenedor {
  constructor() {
    }

    saveProducto(producto, file) {
        let newId = this.getNewId(file)     
        producto.id = newId
        const arrayProductos = this.readFunction(file)
        arrayProductos.push(producto)    
        this.writeFunction(arrayProductos, file)
 
  }

    updateProducto(id, producto, file) {
        const arrayProductos = this.readFunction(file)
        let index = arrayProductos.findIndex( producto => producto.id == id)
            if(index >= 0) {
                arrayProductos[index] = producto
                this.writeFunction(arrayProductos, file)
                console.log('Producto actualizado')
            } else {
                console.log('No se encontró el producto')
            }
    }
    

    getNewId(file) {
        let lastId = 0
        let arrayProductos = this.readFunction(file)
        if(arrayProductos.length > 0){
            lastId = arrayProductos[arrayProductos.length - 1].id
            
        }
        return lastId + 1
    }

    readFunction(file) {
        let arrayProductos = []
        try {
            arrayProductos = fs.readFileSync(file, 'utf-8')
            arrayProductos.length > 0
            ?
            arrayProductos = JSON.parse(arrayProductos)
            :           
            arrayProductos = []
            
        } catch (error) {
            console.log('Error al leer el archivo', error)
        }
        return arrayProductos
    }
    
    writeFunction(arrayProductos, file) {
        let fileJson = JSON.stringify(arrayProductos)
        try {
            fs.writeFileSync(file, fileJson)
        } catch (error) {
            console.log('Error en la escritura del archivo', error)
        }
    }


  getById(id, file) {
      let arrayProductos = this.readFunction(file);
      let productoId = arrayProductos.find((e) => e.id === id);
      return productoId ? productoId : null
  
  }

  getAll(file) {
      let arrayProductos = this.readFunction(file)
      return arrayProductos
  }

  deleteById(id, file) {
      let arrayProductos = this.readFunction(file);
      let index = arrayProductos.findIndex(producto => producto.id == id)
      
      if (index >= 0) {
          arrayProductos.splice(index, 1)
          let fileJson = JSON.stringify(arrayProductos)
          try {
              fs.writeFileSync(file, fileJson)
              return id
          } catch (error) {
              console.log('Error al escribir el archivo', error)
          }
      }
  }

  //End class Contenedor
}

module.exports = Contenedor;
