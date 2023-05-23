import React, { Component, Fragment } from 'react'

import axios from 'axios';

import { HOST } from '../host';

import { FaStoreAlt } from 'react-icons/fa';

class LogIn extends Component {

    constructor(props) {

        super(props);
        this.state = {
            email: "",
            pass: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.logIn = this.logIn.bind(this);
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
                else{
                    alert('El navegador no soporta ciertas funciones para el despliegue de esta aplicación. Intento con otro.')
                }
                
            })
            .catch(err => {
                // handle error
                alert('Credenciales incorrectos')
            })
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

                <div style={{ textAlign: "right", margin: 20 }}>
                    <h3>
                        Real Market GT <FaStoreAlt></FaStoreAlt>
                    </h3>
                </div>
                <div style={{ textAlign: "center", margin: 20 }}>
                    <h1>
                        Iniciar sesión
                    </h1>
                </div>

                <div className="card card-body" style={{ alignItems: "center", marginBottom: 20 }}>
                    <div style={{ width: "40%" }}>
                        <div className="was-validated">

                            <div className="form-group">
                                <label htmlFor="email">Correo electronico:</label>
                                <input type="email" className="form-control" placeholder="Ingrese correo" name="email" required onChange={this.handleChange} />
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
                            <div className="btn btn-primary" onClick={this.logIn} > Ingresar </div>
                        </div>
                    </div>
                    <a href="/register"> ¿Aun no tienes cuenta? Haz click aqui  </a>
                </div>


            </Fragment>

        )

    }


}


export default LogIn;