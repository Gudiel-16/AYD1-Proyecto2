import { Fragment, useState } from "react"

import { RiHomeSmileFill } from 'react-icons/ri'

import { ImCart } from 'react-icons/im'

import { GoSignOut } from 'react-icons/go';

function NavBar () {

    const [search, setSeach] = useState("");

    return (

        <Fragment>

            <nav className="navbar navbar-expand-sm bg-dark navbar-dark" style={{ flexDirection: 'row', padding: 10, alignItems: 'center', marginBottom: 20 }}>

                <div className="" style={{ alignSelf: 'center', flex: 1 }}>
                    <a class="navbar-brand" href="/"> <RiHomeSmileFill size={20} ></RiHomeSmileFill> Home </a>
                </div>

                <div className="" style={{ alignSelf: 'center', flex: 10, width: "100%" }}>
                    <div className="btn-group" style={{ width: "90%" }} >
                        <input className="form-control" type="text" placeholder="Search" onChange={(e) => { setSeach(e.target.value) }} />
                    </div>
                    <button className="btn btn-success btn-block" type="button" onClick={() => window.location.replace('/search/'+search) } > Search </button>
                </div>

                <div className="" style={{ alignSelf: 'center', flex: 1 }}>
                    <a class="navbar-brand" href={"/cart"} > <ImCart size={20} ></ImCart> Cart </a>
                </div>

                <div className="" style={{ alignSelf: 'center', flex: 1 }}>
                    <div style={{ cursor: "pointer" }} class="navbar-brand" onClick={() => { localStorage.removeItem('user'); window.location.replace('/login'); }} > <GoSignOut size={20} ></GoSignOut> SignOut </div>
                </div>


            </nav>

        </Fragment>

    )



}


export default NavBar;