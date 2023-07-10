import React from "react";
import { Button, Col, Row } from "antd";
import { Route, useNavigate } from "react-router-dom"; 
import "../../styles/home.css"
import Footer from "../../components/footer";
import Header from "../../components/header";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function HomePage(): JSX.Element {
    const navigate = useNavigate();

    return (
        // <Row style={{display: "flex", justifyContent: "center", alignItems:"center", height: "100vh"}}>
        //     <Button onClick={() => (navigate("/login"))}>Login</Button>
        //     <Button onClick={() => (navigate("/register"))}>Register</Button>
        // </Row>
        <div>
            <Row>
                <Header/>
            </Row>
            <Row>
                <div className="home-main">
                    <div className="content">WELCOME TO <br></br>
                        <span> MY SITE</span></div>
                    <div className="image">
                        <img src="../img/1.jpg" alt="" className="home-img" />
                    </div>
                </div>
            </Row>
            <Row>
                    <div className="w3-row-padding w3-padding-64 w3-container" style={{ }}>
                    <div className="w3-content" style={{marginLeft:"10%", color:"aliceblue", fontSize:"16px" }}  >
                    <div className="w3-twothird" >
                        <h1>Contract Information Rendering</h1>
                        <p className="w3-text-grey">A web application that helps us to extract information from the service registration contract at the agency. 
                        This application aims to reduce human typing workload and save more time. The application provides extraction functions such as: extract auto, extract crop.</p>
                        <h1 style={{textAlign:"right", marginRight: "15%", color:"rgb(166, 249, 192)"}}>Extract Auto</h1>
                    </div>
                
                    <div className="w3-third w3-center" style={{textAlign:"center", marginRight:"10%"}}>
                        <img src="../img/extract_auto.jpg" width={"90%"} className="id_home" alt="id"/>
                    </div>
                    <h1 style={{textAlign:"left", color:"rgb(166, 249, 192)"}}>Extract Crop</h1>
                    </div>
                    </div>
                    <div>
                        <Tabs>
                            <TabList style={{marginLeft:"10%", marginRight:"10%"}}>
                                <Tab style={{color:"#490"}}>Upload Image</Tab>
                                <Tab style={{color:"#490"}}>Upload Folder</Tab>
                            </TabList>

                            <TabPanel style={{textAlign:"center"}}>
                                <img src="../img/upload_image.jpg" width={"80%"} className="id_home" alt="id"/>
                            </TabPanel>
                            <TabPanel style={{textAlign:"center"}}>
                            <img src="../img/upload_folder.jpg" width={"80%"} className="id_home" alt="id"/>
                            </TabPanel>
                        </Tabs>
                    </div>
                    
            </Row>
            <Row>
                <Footer />
            </Row>
        </div>




    );
}

export default HomePage;
