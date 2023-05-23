import React, { Component, Fragment } from 'react'

import axios from 'axios';

import { HOST } from '../host';

import { FaStoreAlt } from 'react-icons/fa';

class Register extends Component {

    constructor(props) {

        super(props);
        this.state = {
            name: "",
            lastName: "",
            dpi: "",
            email: "",
            pass: "",
            address: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.register = this.register.bind(this);
        this.validate = this.validate.bind(this);
    }


    async logIn() {

        //if (typeof (Storage) !== "undefined") {}

        await axios.post(HOST + 'login', {
            correo: this.state.email,
            contrasenia: this.state.pass
        })
            .then(async (res) => {
                // handle success
                //console.log(res.data)
                if (typeof (Storage) !== "undefined") {
                    localStorage.setItem('user', res.data.usuario);
                    window.location.replace('/');
                }
                else {
                    alert('El navegador no soporta ciertas funciones para el despliegue de esta aplicación. Intento con otro.')
                }

            })
            .catch(err => {
                // handle error
                alert('Credenciales incorrectos')
            })
    }


    validate() {

        if (this.state.dpi.length !== 13) {
            alert('DPI no válido')
            return false;
        }

        var regEx = /^([0-9a-zA-Z])+$/i;
        var pass = this.state.pass+"";
        if (!pass.match(regEx)) {
            alert("La constraseña debe tener numeros y letras.");
            return false;
        }

        return true;
    }

    async register(e) {

        e.preventDefault();
        if(this.validate()){

            await axios.post(HOST + 'registrarUsuario', {
                nombre:this.state.name,
                apellido:this.state.lastName,
                dpi:this.state.dpi+"",
                correo:this.state.email,
                contrasenia:this.state.pass,
                direccion:this.state.address
            })
                .then(async (res) => {
                    // handle success
                    if(res.data){
                        alert('Registro exitoso. Sera redirigido al Login.')    
                        window.location.replace('/login')
                    }
                    console.log(res.data)
                    
                })
                .catch(err => {
                    // handle error
                    alert('Error en el registro.')
                })

               await e.preventDefault();
        }
    }



    async handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }


    render() {

        return (
            <Fragment>

                <div style={{ textAlign: "right", margin: 20, cursor:"pointer" }} onClick={()=>window.location.replace('/login')}>
                    <h3>
                        Real Market GT <FaStoreAlt></FaStoreAlt>
                    </h3>
                </div>
                <div style={{ textAlign: "center", margin: 20 }}>
                    <h1>
                        Registro de datos
                    </h1>
                </div>

                <div className="card card-body" style={{ alignItems: "center", marginBottom: 20 }}>
                    <div style={{ width: "40%" }}>

                        <form onSubmit={this.register} className="was-validated">

                            <div className="form-group">
                                <label htmlFor="name">Nombre:</label>
                                <input type="text" className="form-control" placeholder="" name="name" required onChange={this.handleChange} />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Apellido:</label>
                                <input type="text" className="form-control" placeholder="" name="lastName" required onChange={this.handleChange} />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="dpi">DPI:</label>
                                <input type="number" className="form-control" placeholder="" name="dpi" maxLength="13" required onChange={this.handleChange} />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Direccion:</label>
                                <input type="text" className="form-control" placeholder="" name="address" maxLength={13} required onChange={this.handleChange} />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Correo:</label>
                                <input type="email" className="form-control" placeholder="" name="email" required onChange={this.handleChange} />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="pass">Contraseña:</label>
                                <input type="password" className="form-control" placeholder="Contraseña" name="pass" required onChange={this.handleChange} />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>

                            {/*<button type="submit" className="btn btn-success"> enviar </button>*/}
                            <button type="submit" className="btn btn-primary" > Ingresar </button>
                        </form>
                    </div>
                </div>

            </Fragment>

        )

    }


}


export default Register;