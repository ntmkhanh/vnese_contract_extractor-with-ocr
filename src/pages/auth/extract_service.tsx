import React, { useState, useEffect } from "react";
import { Col, Row, Card, Button, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import { saveAs } from 'file-saver';
import * as XLSX from "xlsx";
import "../../styles/extract_service/extract_service.css";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd/es/upload";
import axios from "axios";
import Header from "../../components/header";
import { DownloadOutlined } from "@ant-design/icons"; 

const ExtractPage: React.FC = () => {
    const navigate = useNavigate();
    const { Dragger } = Upload;
    const [currentImage, setCurrentImage] = useState<any>(null);
    const [currentResults, setCurrentResults] = useState<any>(null);
    const [loadings, setLoadings] = useState<any>([]);

    useEffect(() => {
        if (sessionStorage.getItem("isLogin") !== "true") {
            navigate("/login");
        }
    }, []);

    const enterLoading = () => {
        setLoadings(true);
    };

    function getBase64(file: any) {
        var reader = new FileReader();
        reader.onloadend = function () {
            setCurrentImage(reader.result);
        };
        reader.readAsDataURL(file);
    }

    const props: UploadProps = {
        name: "file",
        multiple: false,
        showUploadList: false,
        onChange(info) {
            getBase64(info.file.originFileObj);
        },
        onDrop(e) {
            console.log("Dropped files", e.dataTransfer.files);
        },
    };

    const exportToExcel = () => {
        if (currentResults!==null) {
            const worksheet = XLSX.utils.json_to_sheet([currentResults]);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(data, 'data.xlsx');  
        }
        else{
            window.alert("No data to download!")
        }
    };

    return (
        <div>
            <Row>
                <Header/>
            </Row>

            <Row style={{ marginTop: 50 }}>
                <Col span={12} style={{ height: 370 }}>
                    <Dragger {...props}>
                        {currentImage !== null ? (
                            <img src={`${currentImage}`} alt="user-img" style={{ maxHeight: 300 }} />
                        ) : (
                            <div>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text" style={{color: "aliceblue"}}>Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint" style={{color: "aliceblue"}}>Image format supported: PNG, JPEG</p>
                            </div>
                        )}
                    </Dragger>
                </Col>
                <Col span={12} style={{ height: 500 }}>
                    <Card title="Your contract information" bordered={false} style={{ width: "100%" }}>
                        <p>Họ và tên khách hàng: {currentResults !== null ? currentResults["TenKhachHang"] : null}</p>
                        <p>Giới tính: {currentResults !== null ? currentResults["GioiTinh"] : null}</p>
                        <p>Ngày sinh: {currentResults !== null ? currentResults["NgaySinh"] : null}</p>
                        <p>Số CCCD: {currentResults !== null ? currentResults["CCCD"] : null}</p>
                        <p>Địa chỉ thường trú: {currentResults !== null ? currentResults["DiaChi"] : null}</p>
                        <p>Số thuê bao: {currentResults !== null ? currentResults["SoThueBao"] : null}</p>
                        <p>Số serial SIM: {currentResults !== null ? currentResults["serialSIM"] : null}</p>
                        
                    </Card>
                    <Button icon={<DownloadOutlined />} onClick={exportToExcel} style={{marginTop:12, marginLeft:"80%"}}>Export to Excel</Button>
                </Col>
            </Row>
            <Row style={{ marginTop: -120, textAlign: "right" }}>
                <Col span={12}>
                    <Button
                        type="primary"
                        loading={loadings}
                        onClick={() => {
                            enterLoading();
                            axios({
                                method: "post",
                                baseURL: "http://localhost:5050",
                                url: `/extract`,
                                data: { img: currentImage },
                            })
                                .then((response) => {
                                    setCurrentResults(response.data);
                                    console.log(response.data);
                                })
                                .catch((error) => {
                                    console.log(error);
                                })
                                .finally(() => {
                                    setLoadings(false);
                                });
                        }}
                    >
                        {" "}
                        Extract
                    </Button>
                    
                </Col>
            </Row>
        </div>
    );
};

export default ExtractPage;
