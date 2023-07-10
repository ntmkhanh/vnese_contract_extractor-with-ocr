import React, { useEffect, useState, useRef }  from "react";
import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom"; 
import "../../styles/about.css"
import Header from "../../components/header";
import Footer from "../../components/footer";

const AboutPage: React.FC = () => {
    const navigate = useNavigate();
    
    return (
        <><Row>
            <Header/>
        </Row>
        <div className="about_content">
            <h1 >About</h1>
            <p>Tại Việt Nam, VNPT đã và đang được viết đến là một doanh nghiệp hàng đầu trong các lĩnh vực tư vấn giải pháp thi công dự án CNTT, cung cấp sản phầm, giải pháp tích hợp, dịch vụ CNTT và phát triển phần mềm…</p>
            
            <p>Với khả năng cung cấp các dịch vụ đa ngành và chuyên ngành, VNPT thực sự đáp ứng được những yêu cầu cung cấp giải pháp tổng thể, từ tư vấn thiết kế, cung cấp sản phẩm dịch vụ đến cung cấp các ứng dụng và đào tạo. Những giải pháp này được phát triển dựa trên những tri thức đã được tích lũy nhiều năm của các chuyên giá đầu ngành trong từng lĩnh vực, kết hợp với những công nghệ tiên tiến nhất của các đối tác công nghệ, cùng khả năng chuyên nghiệp của đội ngũ nhân lực VNPT, đem lại những giá trị sử dụng đích thực cho khách hàng. Giá trị gia tăng cao trong mỗi sản phẩm, ứng dụng và dịch vụ không chỉ đem lại cho khách hàng giải pháp tối ưu nhất mà còn là nền tảng của sự phát triển của VNPT, cũng như sự phát triển của CNTT Việt Nam.</p>

            <p><strong>Các dự án CNTT đã triển khai</strong></p>

            <p>- Cổng thông tin điện tử Chính phủ;</p>

            <p>- Cổng thông tin điều hành Văn phòng Chủ tịch nước.</p>

            <p>- Cổng thông tin điều hành Ban Tuyên giáo Trung Ương.</p>

            <p>- Cổng thông tin Bộ Thông tin và Truyền thông.</p>

            <p>- Trang thông tin đào tạo trực tuyến Bộ NN&amp;PTNT.</p>

            <p>- Trang thông tin phục vụ công tác thanh tra Bộ Nội vụ.</p>
        
            <p>- Trang thông tin phục vụ công tác thanh tra Bộ Nội vụ.</p>

            <p>- Dự án thiết kế và xây dựng mạng INTERNET dùng riêng cho Bộ Ngoại Giao.</p>

            <p>- Xây dựng mạng WAN cho hạ tầng mạng kết nối với cổng giao tiếp điện tử của trung tâm lưu ký chứng khoán Việt Nam.</p>

            <p>- Kết nối mạng WAN cho 105 công ty Chứng Khoán với Trung tâm Lưu ký Chứng Khoán Việt Nam.</p>

            <p>- Kết nối mạng WAN cho 105 công ty Chứng Khoán với Trung tâm Giao dịch chứng khoán Hà Nội.</p>

            <p>- Xây dựng Cổng giao tiếp điện tử Lai Châu.</p>

            <p>- Xây dựng cổng thông tin điện tử tỉnh Quảng Ninh và các cổng thành phần.</p>

            <p>- Xây dựng Cổng thông tin điện tử Tỉnh Lào Cai.</p>

            <p>- Xây dựng Cổng thông tin điện tử thành phố Đà Nẵng.</p>
        </div>
    
      <div className="row gallery">
        <div className="wrapper">
          <img src="../img/1.jpg" alt="" />
          <img src="../img/13.jpg" alt="" />
          <img src="../img/9.jpg" alt="" />
          <img src="../img/12.jpg" alt="" />
          <img src="../img/4.jpg" alt="" />
          <img src="../img/5.jpg" alt=""  />
          <img src="../img/7.jpg" alt="" />
          <img src="../img/6.jpg" alt="" />
          <img src="../img/2.jpg" alt="" />
          <img src="../img/10.jpg" alt="" />
        </div>
      </div>
    
        <Row>
            <Footer/>
        </Row>
      
   
    </>
    );
};

export default AboutPage;
