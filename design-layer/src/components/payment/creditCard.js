import React, { Component, Fragment } from 'react'

import axios from 'axios';

import { HOST } from '../../host';

import { savePDF } from "@progress/kendo-react-pdf";

import { LOCAL } from '../../host';

class CreditCard extends Component {

    constructor(props) {

        super(props);
        this.state = {
            name: "",
            nit: "",
            phone: 0,
            payment: "2",
            card: "",
            email: "",
            showTicket: false,
            sending: false,
            sended: false
        }

        this.pdfExportComponent = React.createRef();

        this.handleChange = this.handleChange.bind(this);
        this.confirmPurchase = this.confirmPurchase.bind(this);
        this.exportPDFWithMethod = this.exportPDFWithMethod.bind(this);
    }

    async handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }


    async confirmPurchase() {

        this.setState({sending:true})

        await axios.post(HOST + 'pagarAhora', {
            usuario: this.props.user,
            nombre: this.state.name,
            nit: this.state.nit,
            telefono: this.state.phone,
            metodo_pago: this.state.payment,
            tarjeta: this.state.card,
            total: Math.round(this.props.total),
            correo: this.state.email
        })
            .then(async (res) => {
                // handle success
                alert('Compra exitosa');
                //console.log(res.data)
                await this.sendEmail(res.data.no_factura)
                window.location.replace("/cart/" + this.props.user);
            })
            .catch(err => {
                // handle error
                alert('Hubo un problema. Intenta luego.')
                //console.log(err);
            })

        //        this.exportPDFWithMethod();

    }


    exportPDFWithMethod() {

        let element = this.pdfExportComponent.current
        savePDF(element, {
            paperSize: "auto",
            margin: 40,
            fileName: `Report for ${new Date().getFullYear()}`,
        });
    }


    async sendEmail(noTicket) {

        var data = {
            service_id: 'service_ym4u9uk',
            template_id: 'template_uklljim',
            user_id: 'user_6ZnAS2BYjo973OiqrBYZp',
            template_params: {
                'buyer': this.state.email,
                'from_name': 'Real Market GT team',
                'message': 'Disfruta de tus productos. Puedes contactarnos a través de nuestro correo electrónico.',
                'to_name': this.state.email,
                'url':LOCAL+'ticket/'+noTicket
            }
        };

        await axios.post("https://api.emailjs.com/api/v1.0/email/send", data)
            .then((res) => {
                //console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }


    render() {

        return (

            <Fragment>

                {
                    !this.state.sending&&

                    <div className="was-validated">

                        <div className="form-group">
                            <label htmlFor="name">Nombre de facturacion:</label>
                            <input type="text" className="form-control" placeholder="Ingrese nombre" name="name" required onChange={this.handleChange} />
                            <div className="valid-feedback">Valid.</div>
                            <div className="invalid-feedback">Please fill out this field.</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="nit">Nit:</label>
                            <input type="text" className="form-control" placeholder="Ingrese el nit" name="nit" required onChange={this.handleChange} />
                            <div className="valid-feedback">Valid.</div>
                            <div className="invalid-feedback">Please fill out this field.</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Telefono:</label>
                            <input type="number" className="form-control" placeholder="Ingrese numero de telefono" name="phone" required onChange={this.handleChange} />
                            <div className="valid-feedback">Valid.</div>
                            <div className="invalid-feedback">Please fill out this field.</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="payment">Método de pago</label>
                            <select className="form-control" name="payment" required onChange={this.handleChange} >
                                <option value="2" > Tarjeta </option>
                                <option value="1" > Efectivo </option>
                            </select>
                        </div>
                        {
                            this.state.payment === "2" &&

                            <div className="form-group">
                                <label htmlFor="card">No de tarjeta:</label>
                                <input type="number" className="form-control" placeholder="Ingrese el numero de tarjeta" name="card" required onChange={this.handleChange} />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        }
                        <div className="form-group">
                            <label htmlFor="email">Correo:</label>
                            <input type="email" className="form-control" placeholder="Ingrese el correo electronico" name="email" required onChange={this.handleChange} />
                            <div className="valid-feedback">Valid.</div>
                            <div className="invalid-feedback">Please fill out this field.</div>
                        </div>

                        {/*<button type="submit" className="btn btn-success"> enviar </button>*/}
                        <div className="btn btn-primary" onClick={this.confirmPurchase} >Confirmar pago</div>
                    </div>

                }

                {

                    this.state.sending &&

                    <h1> Procesando compra... </h1>

                }


            </Fragment>

        )

    }


}


export default CreditCard;