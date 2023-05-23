let chai = require('chai');
let chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);
const url= 'http://34.135.116.57:3200';

describe('Login de usuario: ', () => {
    it('Credenciales correctas', (done) => {
        const usuario = {
                            correo:         "correo1@ejemplo.com",
                            contrasenia:    "contrasenia1"
                        };
        chai.request(url)
            .post('/login')
            .send(usuario)
            .end((err, res) =>{
                res.should.have.status(200);
                res.should.be.a('object');
                res.body.should.have.property('correo').eq(usuario.correo);
                done();
            })
    });
    it('Correo electronico incorrecto', (done) => {
        const usuario = {
                            correo:         "correoincorrecto@ejemplo.com",
                            contrasenia:    "contrasenia1"
                        };
        chai.request(url)
            .post('/login')
            .send(usuario)
            .end((err, res) =>{
                res.should.have.status(500);
                res.text.should.be.eq('false');
                done();
            })
    });
    it('Contraseña incorrecta', (done) => {
        const usuario = {
                            correo:         "correo1@ejemplo.com",
                            contrasenia:    "contraseniaincorrecta"
                        };
        chai.request(url)
            .post('/login')
            .send(usuario)
            .end((err, res) =>{
                res.should.have.status(500);
                res.text.should.be.eq('false');
                done();
            })
    });
    it('Credenciales incorrectas', (done) => {
        const usuario = {
                            correo:         "correoincorrecto@ejemplo.com",
                            contrasenia:    "contraseniaincorrecta"
                        };
        chai.request(url)
            .post('/login')
            .send(usuario)
            .end((err, res) =>{
                res.should.have.status(500);
                res.text.should.be.eq('false');
                done();
            })
    });
});


describe('Registro de usuario: ', () => {
    it('Correo no ha sido registrado', (done) => {
        const usuario = {
                            nombre: "Usuario",
                            apellido: "Prueba",
                            dpi: "2698562620101",
                            correo: "nuevo@ejemplo.com",
                            contrasenia: "123",
                            direccion: "Guatemala" 
                        };
        chai.request(url)
            .post('/registrarUsuario')
            .send(usuario)
            .end((err, res) =>{
                res.should.have.status(200);
                res.text.should.be.eq('true');
                done();
            })
    });
    it('Correo ya ha sido registrado', (done) => {
        const usuario = {
                            nombre: "Usuario",
                            apellido: "Prueba",
                            dpi: "2698562620101",
                            correo: "nuevo@ejemplo.com",
                            contrasenia: "123",
                            direccion: "Guatemala" 
                        };
        chai.request(url)
            .post('/registrarUsuario')
            .send(usuario)
            .end((err, res) =>{
                res.should.have.status(500);
                res.text.should.be.eq('false');
                done();
            })
    });
    it('Falta direccion del usuario', (done) => {
        const usuario = {
                            nombre: "Usuario",
                            apellido: "Prueba",
                            dpi: "2698562620101",
                            correo: "nuevo777@ejemplo.com",
                            contrasenia: "123" 
                        };
        chai.request(url)
            .post('/registrarUsuario')
            .send(usuario)
            .end((err, res) =>{
                res.should.have.status(500);
                res.text.should.be.eq('false');
                done();
            })
    });
    it('Falta nombre del usuario', (done) => {
        const usuario = {
                            apellido: "Usuario",
                            dpi: "2698562620101",
                            correo: "nuevo777@ejemplo.com",
                            contrasenia: "123",
                            direccion: "Guatemala" 
                        };
        chai.request(url)
            .post('/registrarUsuario')
            .send(usuario)
            .end((err, res) =>{
                res.should.have.status(500);
                res.text.should.be.eq('false');
                done();
            })
    });
});



describe('Obtener productos: ', () => {
    it('Obtener productos', (done) => {
        chai.request(url)
            .get('/obtenerProductos')
            .end((err, res) =>{
                res.should.have.status(200);
                res.should.be.a('object');
                done();
            })
    });
});


describe('Obtener producto: ', () => {
    it('Producto existente', (done) => {
        const idProducto = 1;
        chai.request(url)
            .get('/obtenerProducto/' + idProducto )
            .end((err, res) =>{
                res.should.have.status(200);
                res.should.be.a('object');
                done();
            })
    });
    it('Producto no existente', (done) => {
        const idProducto = 5000;
        chai.request(url)
            .get('/obtenerProducto/' + idProducto )
            .end((err, res) =>{
                res.should.have.status(200);
                res.should.be.a('object');
                done();
            })
    });
    it('Se envia una cadena de caracteres como idProducto', (done) => {
        const idProducto = 'cadena';
        chai.request(url)
            .get('/obtenerProducto/' + idProducto )
            .end((err, res) =>{
                res.should.have.status(200);
                res.should.be.a('object');
                done();
            })
    });
});



describe('Añadir al carrito: ', () => {
    it('Producto no está en carrito  - existencia suficiente', (done) => {
        const carrito = {
                            "producto": 1,
                            "usuario": 1,
                            "cantidad": 3
                        };
        chai.request(url)
            .post('/agregarProductoCarrito')
            .send(carrito)
            .end((err, res) =>{
                res.should.have.status(200);
                res.text.should.be.eq('agregado');
                done();
            })
    });
    it('Producto no está en carrito  - existencia suficiente', (done) => {
        const carrito = {
                            "producto": 2,
                            "usuario": 1,
                            "cantidad": 3
                        };
        chai.request(url)
            .post('/agregarProductoCarrito')
            .send(carrito)
            .end((err, res) =>{
                res.should.have.status(200);
                res.text.should.be.eq('agregado');
                done();
            })
    });
    it('Producto no está en carrito  - existencia insuficiente', (done) => {
        const carrito = {
                            "producto": 2,
                            "usuario": 1,
                            "cantidad": 30000
                        };
        chai.request(url)
            .post('/agregarProductoCarrito')
            .send(carrito)
            .end((err, res) =>{
                res.should.have.status(500);
                res.text.should.be.eq('false');
                done();
            })
    });
    it('Producto está en carrito - existencia suficiente', (done) => {
        const carrito = {
                            "producto": 1,
                            "usuario": 1,
                            "cantidad": 8
                        };
        chai.request(url)
            .post('/agregarProductoCarrito')
            .send(carrito)
            .end((err, res) =>{
                res.should.have.status(200);
                res.text.should.be.eq('agregado');
                done();
            })
    });
    it('Producto está en carrito - existencia insuficiente', (done) => {
        const carrito = {
                            "producto": 1,
                            "usuario": 1,
                            "cantidad": 80000
                        };
        chai.request(url)
            .post('/agregarProductoCarrito')
            .send(carrito)
            .end((err, res) =>{
                res.should.have.status(500);
                res.text.should.be.eq('false');
                done();
            })
    });
    it('Producto inexistente', (done) => {
        const carrito = {
                            "producto": 1789,
                            "usuario": 1,
                            "cantidad": 1
                        };
        chai.request(url)
            .post('/agregarProductoCarrito')
            .send(carrito)
            .end((err, res) =>{
                res.should.have.status(500);
                res.text.should.be.eq('false');
                done();
            })
    });
});


describe('Actualizar carrito: ', () => {
    it('Producto no esta en el carrito del cliente', (done) => {
        const carrito = {
                            "producto": 10,
                            "usuario": 1,
                            "cantidad": 3
                        };
        chai.request(url)
            .post('/actualizarCarrito')
            .send(carrito)
            .end((err, res) =>{
                res.should.have.status(500); 
                res.text.should.be.eq('false');
                done();
            })
    });
    it('Agregar producto - existencia suficiente', (done) => {
        const carrito = {
                            "producto": 1,
                            "usuario": 1,
                            "cantidad": 20
                        };
        chai.request(url)
            .post('/actualizarCarrito')
            .send(carrito)
            .end((err, res) =>{
                res.should.have.status(200); 
                res.text.should.be.eq('true');
                done();
            })
    });
    it('Agregar producto - existencia insuficiente', (done) => {
        const carrito = {
                            "producto": 1,
                            "usuario": 1,
                            "cantidad": 30000
                        };
        chai.request(url)
            .post('/actualizarCarrito')
            .send(carrito)
            .end((err, res) =>{
                res.should.have.status(500); 
                res.text.should.be.eq('false');
                done();
            })
    });
    it('Disminuir producto', (done) => {
        const carrito = {
                            "producto": 1,
                            "usuario": 1,
                            "cantidad": 1
                        };
        chai.request(url)
            .post('/actualizarCarrito')
            .send(carrito)
            .end((err, res) =>{
                res.should.have.status(200); 
                res.text.should.be.eq('true');
                done();
            })
    });
    it('Cantidad igual a la existente en el carrito ', (done) => {
        const carrito = {
                            "producto": 1,
                            "usuario": 1,
                            "cantidad": 1
                        };
        chai.request(url)
            .post('/actualizarCarrito')
            .send(carrito)
            .end((err, res) =>{
                res.should.have.status(200); 
                res.text.should.be.eq('true');
                done();
            })
    });
});



describe('Eliminar un producto del carrito: ', () => {
    it('Producto inexistente', (done) => {
        const carrito = {
                            "producto": 111,
                            "usuario": 1
                        };
        chai.request(url)
            .delete('/eliminarProductoCarrito')
            .send(carrito)
            .end((err, res) =>{
                res.should.have.status(500); 
                res.text.should.be.eq('false');
                done();
            })
    });
    it('Producto no esta en el carrito', (done) => {
        const carrito = {
                            "producto": 8,
                            "usuario": 1
                        };
        chai.request(url)
            .delete('/eliminarProductoCarrito')
            .send(carrito)
            .end((err, res) =>{
                res.should.have.status(500); 
                res.text.should.be.eq('false');
                done();
            })
    });
    it('Producto esta en el carrito', (done) => {
        const carrito = {
                            "producto": 2,
                            "usuario": 1
                        };
        chai.request(url)
            .delete('/eliminarProductoCarrito')
            .send(carrito)
            .end((err, res) =>{
                res.should.have.status(200); 
                res.text.should.be.eq('true');
                done();
            })
    });
});

describe('Leer carrito: ', () => {
    it('Usuario no tiene productos en carrito', (done) => {
        const idUsuario = 3;
        chai.request(url)
            .get('/leerCarrito/' + idUsuario)
            .end((err, res) =>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.not.have.property('productos');
                done();
            })
    });
    it('Usuario tiene productos en carrito', (done) => {
        const idUsuario = 1;
        chai.request(url)
            .get('/leerCarrito/' + idUsuario)
            .end((err, res) =>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('productos');
                done();
            })
    });
});



describe('Limpiar carrito: ', () => {
    it('Usuario no tiene productos en carrito', (done) => {
        const idUsuario = 3;
        chai.request(url)
            .delete('/limpiarCarrito/' + idUsuario)
            .end((err, res) =>{
                res.should.have.status(200);
                res.text.should.be.eq('true'); 
                done();
            })
    });
    /*it('Usuario tiene productos en carrito', (done) => {
        const idUsuario = 2;
        chai.request(url)
            .delete('/limpiarCarrito/' + idUsuario)
            .end((err, res) =>{
                res.should.have.status(200);
                res.text.should.be.eq('true'); 
                done();
            })
    });*/
});


describe('Pagar ahora: ', () => {
    it('Usuario inexistente', (done) => {
        const pago = {
                        "usuario": 89,
                        "nombre":"Nombre Facturacion",
                        "telefono": 40078522,
                        "nit":"CF",
                        "metodo_pago": 2,
                        "tarjeta":"4391241715489562",
                        "total": 12255,
                        "correo": "correofactura@gmail.com"
                    };
        chai.request(url)
            .post('/pagarAhora')
            .send(pago)
            .end((err, res) =>{
                res.should.have.status(500);
                res.text.should.be.eq('no existe usuario'); 
                done();
            })
    });
    it('No se especifico nit', (done) => {
        const pago = {
                        "usuario": 1,
                        "nombre":"Nombre Facturacion",
                        "telefono": 40078522,
                        "metodo_pago": 2,
                        "tarjeta":"4391241715489562",
                        "total": 12255,
                        "correo": "correofactura@gmail.com"
                    };
        chai.request(url)
            .post('/pagarAhora')
            .send(pago)
            .end((err, res) =>{
                res.should.have.status(500);
                res.text.should.be.eq('false'); 
                done();
            })
    });
    it('No se especifico correo', (done) => {
        const pago = {
                        "usuario": 1,
                        "nombre":"Nombre Facturacion",
                        "telefono": 40078522,
                        "nit":"CF",
                        "metodo_pago": 2,
                        "tarjeta":"4391241715489562",
                        "total": 12255
                    };
        chai.request(url)
            .post('/pagarAhora')
            .send(pago)
            .end((err, res) =>{
                res.should.have.status(500);
                res.text.should.be.eq('false'); 
                done();
            })
    });
    it('No se especifico telefono', (done) => {
        const pago = {
                        "usuario": 1,
                        "nombre":"Nombre Facturacion",
                        "nit":"CF",
                        "metodo_pago": 2,
                        "tarjeta":"4391241715489562",
                        "total": 12255,
                        "correo": "correofactura@gmail.com"
                    };
        chai.request(url)
            .post('/pagarAhora')
            .send(pago)
            .end((err, res) =>{
                res.should.have.status(500);
                res.text.should.be.eq('false'); 
                done();
            })
    });
    it('Datos correctos', (done) => {
        const pago = {
                        "usuario": 1,
                        "nombre":"Nombre Facturacion",
                        "telefono": 40078522,
                        "nit":"CF",
                        "metodo_pago": 2,
                        "tarjeta":"4391241715489562",
                        "total": 12255,
                        "correo": "correofactura@gmail.com"
                    };
        chai.request(url)
            .post('/pagarAhora')
            .send(pago)
            .end((err, res) =>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('nombre');
                res.body.should.have.property('nit');
                res.body.should.have.property('telefono');
                res.body.should.have.property('correo');
                res.body.should.have.property('total');
                res.body.should.have.property('metodo_pago');
                res.body.should.have.property('no_factura');
                res.body.should.have.property('detalle');
                done();
            })
    });
});


describe('Filtro por categoria: ', () => {
    it('Categoria correcta', (done) => {
        const categoria = 1;
        chai.request(url)
            .get('/filtroCategoria/' + categoria)
            .end((err, res) =>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('productos');
                done();
            })
    });
    it('Categoria inexistente', (done) => {
        const categoria = 100;
        chai.request(url)
            .get('/filtroCategoria/' + categoria)
            .end((err, res) =>{
                res.should.have.status(500);
                res.text.should.be.eq('no existe categoria'); 
                done();
            })
    });
});


describe('Ver categorias : ', () => {
    it('Existen categorias', (done) => {
        chai.request(url)
            .get('/categorias')
            .end((err, res) =>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            })
    });
});

describe('Ver informacion de factura : ', () => {
    it('La factura indicada existe', (done) => {
        const factura = 1;
        chai.request(url)
            .get('/factura/' + factura)
            .end((err, res) =>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('nombre');
                res.body.should.have.property('nit');
                res.body.should.have.property('fecha');
                res.body.should.have.property('no_factura');
                done();
            })
    });
    it('La factura indicada no existe', (done) => {
        const factura = 1000;
        chai.request(url)
            .get('/factura/' + factura)
            .end((err, res) =>{
                res.should.have.status(500);
                res.text.should.be.eq('false');
                done();
            })
    });
});


describe('Reiniciar valores: ', () => {
    it('Reiniciar valores para pruebas unitarias', (done) => {
        chai.request(url)
            .get('/reset')
            .end((err, res) =>{
                res.should.have.status(200);
                res.text.should.be.eq('true');
                done();
            })
    });
});