import React from 'react';
import "../styles/footer.css"
import { PhoneOutlined } from "@ant-design/icons";
import { EnvironmentOutlined } from "@ant-design/icons";
import { SendOutlined } from "@ant-design/icons";

function Footer(){
    return (
        <>
            <footer className="footer">
            <div className="box-container">
                <div className="box">
                    <h3>Opening Hours</h3>
                    <p>Everyday : 7:30am to 5:00pm</p>
                    <h3>Contact</h3>
                    <p><i className="fas fa-phone"><PhoneOutlined /></i> Phone: 0976038762</p>
                    <p><i className="fas fa-map-marker"><EnvironmentOutlined /></i> Address: Viet Nam</p>
                </div>
    
                 <div className="box">
                    <h3>Quick Links</h3>
                    <i ><a href='/extract' style={{padding:10}}></a><SendOutlined /></i> <i>Extract</i> 
                    <i><a href='/extract_auto' style={{padding:10}}></a><SendOutlined /></i>  <i>Extract Auto</i>
                    <i><a href='/about' style={{padding:10}}></a><SendOutlined /></i>  <i>About</i>
                </div>
    
                {/* <div className="box">
                    <div className="bottom">
                <div className="share">
                    <a href="https://www.facebook.com/" className="" ></a>
                    <a href="https://twitter.com/?lang=en" className=""></a>
                    <a href="https://www.instagram.com/" className=""></a>
                    <a href="https://github.com/" className=""></a>
                </div>
    
                    </div>
                </div>  */}
    
            
            </div> 
        </footer>
        </>
        
      );
    };
    

export default Footer;
