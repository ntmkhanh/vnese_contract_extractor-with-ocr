import React, {useState} from 'react';
import "../styles/header.css"
import { Button, Col, Row } from "antd";
import internal from 'stream';

interface User{
    name: string;
    isLogin: boolean;
    isAdmin: boolean;
}
const Header: React.FC = () => {

    const[user, setUser] = useState<User>({
        name:"", 
        isLogin: false,
        isAdmin: false,
    })
   
    return (
        <>
         {/* <Row style={{ width: "100%", backgroundColor: "#7393B3", height: 50, display: "grid" }}> */}
                {/* <div style={{marginTop: 20, display: "contents"}}>
                    <img src="../../img/logo-vnpt.jpg" alt="Logo" width={40} />
                </div> */}
                {/* <Col span={24} style={{display:"grid", backgroundColor: "#7393B3", height: 50, textAlign: "right"}}> 
                    <div style={{ marginTop: 20 }}>
                        <li>
                            <a className="btn home" href="/">
                                Home
                            </a>
                        </li>
                        <li>
                            <a className="btn about" href="/about">
                                About
                            </a>
                        </li>
                        <li>
                            <a className="btn extract" href="/extract">
                                Extract
                            </a>
                            <ol className="sub-menu">
                          
                            </ol>
                        </li>
                         <a
                            className="btn login"
                            href="/login"
                            onClick={() => {
                                sessionStorage.setItem("isLogin", "false");
                            } }
                        >
                            Login
                        </a>
                        <a className="btn register" href="/register">
                            Register
                        </a>
                    </div>
                </Col> */}

            <header>
                    <nav className="navegacion">
                        <ul className="menu">
                            <li><a href="/">Home</a></li>
                            <li><a href="/about">About</a></li>
                            <li><a href="#">Extract</a>
                                <ul className="submenu">
                                    <li><a href="/extract">Extract</a></li>
                                    <li><a href="/extract_auto">Extract Auto</a></li>
                                </ul>
                            </li>

                            {sessionStorage.getItem("isAdmin") === "true"? (
                                <li>
                                <a href="/admin">Admin</a>
                                </li>
                            ) : null}

                            <li>
                                {sessionStorage.getItem("isLogin") === "true"? <a
                                    className=""
                                    href="/login"
                                    onClick={() => {
                                        sessionStorage.setItem("isLogin", "false");
                                    } }
                                >
                                    Log out
                                </a>:(
                                    <a href="/login">Log In</a>
                                )}
                                
                            </li>
                            <li>
                            {sessionStorage.getItem("isLogin") === "false"? <a
                                    className=""
                                    href="/register"
                                    onClick={() => {
                                        sessionStorage.setItem("isLogin", "false");
                                    } }
                                >
                                    Register
                                </a>:(
                                    null
                                )}
                            </li>
                            
                            
                        </ul>
                    </nav>
                </header>
            {/* </Row> */}
        </>
        
      );
    };
    

export default Header;
