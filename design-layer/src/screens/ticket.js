import React, { Component, Fragment } from 'react'

import axios from 'axios';

import { HOST } from '../host';

import { savePDF } from "@progress/kendo-react-pdf";

import { FaStoreAlt } from 'react-icons/fa';

class Ticket extends Component {

    constructor(props) {

        super(props);
        this.state = {
            ticket: null
        }

        this.pdfExportComponent = React.createRef();

        this.exportPDFWithMethod = this.exportPDFWithMethod.bind(this);
        this.getTotal = this.getTotal.bind(this);
    }

    async componentDidMount() {

        await axios.get(HOST + 'factura/' + this.props.match.params.idTicket)
            .then((res) => {
                // handle success
                //console.log(res.data)
                this.setState({ ticket: res.data })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

    }


    async exportPDFWithMethod() {

        let element = this.pdfExportComponent.current
        const doc = await savePDF(element, {
            paperSize: "auto",
            margin: 40,
            fileName: `Factura electrónica`,
        });

    }


    getTotal() {

        var total = 0;

        this.state.ticket.detalle.forEach(p => {
            total += p.cantidad * p.precioUnitario
        });

        return Math.round(total);
    }


    render() {

        return (

            <Fragment>

                {
                    this.state.ticket === null &&

                    <div style={{ alignContent: "center", textAlign: "center" }} >
                        <h1>Cargando ...</h1>
                    </div>
                }

                {
                    this.state.ticket !== null &&

                    <div style={{ alignContent: "center", textAlign: "center", padding: 30, paddingLeft: 200, paddingRight: 200, backgroundColor:"#fff", color:"black" }} >

                        <div ref={this.pdfExportComponent} style={{ borderWidth: 5, borderColor: "black", borderStyle: "solid" }}>

                            <div className="row">
                                <div className="col-8">
                                    <h3 style={{ marginTop: 10 }} > <FaStoreAlt size={40} ></FaStoreAlt> <strong> Real Market GT</strong></h3>
                                </div>
                                <div className="col-4">
                                    <h2>No. {this.state.ticket.no_factura} </h2>
                                </div>
                            </div>

                            <div className="row" style={{ alignContent: 'flex-start', alignItems: 'flex-start', textAlign: "left", padding: 10 }}>
                                <h6>Ciudad de Guatemala, Guatemala</h6>
                                <h6> Tel: (+502) 0000-0000 </h6>
                                <h6> Correo: realmarketgt@gmail.com </h6>
                            </div>

                            <div className="row" style={{ marginBottom: 20 }}>
                                <h3>Datos de la compra</h3>
                                <p>A continuacion se muestran los productos comprados:</p>
                                <table class="table-responsive-sm">
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Nit</th>
                                            <th>Fecha</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td> {this.state.ticket.nombre} </td>
                                            <td> {this.state.ticket.nit} </td>
                                            <td> {this.state.ticket.fecha} </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="row" style={{ marginBottom: 20 }}>
                                <table class="table-responsive-sm">
                                    <thead>
                                        <tr style={{ backgroundColor: "#4F4C4C" }}>
                                            <th style={{ color: "antiquewhite" }} >Producto</th>
                                            <th style={{ color: "antiquewhite" }} >Unidades</th>
                                            <th style={{ color: "antiquewhite" }} >Precio</th>
                                            <th style={{ color: "antiquewhite" }} >Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.ticket.detalle.map((p, i) => {
                                                return (
                                                    <tr>
                                                        <td> {p.nombreDeProducto} </td>
                                                        <td> {p.cantidad} </td>
                                                        <td> {p.precioUnitario} </td>
                                                        <td> {p.precioUnitario * p.cantidad} </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>

                            </div>
                            <div className="row bg-danger" style={{ marginBottom: 20 }}>
                                <div className="col-10">
                                    <h6 style={{ color: "#fff" }} > <strong>TOTAL</strong> </h6>
                                </div>
                                <div className="col-2">
                                    <div className="col-10">
                                        <h6 style={{ color: "#fff" }} > <strong>{this.getTotal()}.00 </strong> </h6>
                                    </div>
                                </div>
                            </div>


                        </div>

                        <div className="btn btn-success" onClick={this.exportPDFWithMethod} style={{marginTop:10}}>
                            Descargar DPF
                        </div>
                    </div>

                }


            </Fragment>

        )

    }


}


export default Ticket;