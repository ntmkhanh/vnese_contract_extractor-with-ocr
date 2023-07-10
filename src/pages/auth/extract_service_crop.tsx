import React, { useState, useEffect } from "react";
import { Col, Row, Card, Button, Upload, Switch, Carousel } from "antd";

import { useNavigate } from "react-router-dom";
import "../../styles/extract_service/extract_service.css";
import { InboxOutlined } from "@ant-design/icons";
// import type { UploadProps } from "antd/es/upload";
import MultiCrops from "react-multi-crops";
import axios from "axios";
import Header from "../../components/header";
import ExportButton from "../../components/export";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

const HandExtractPage: React.FC = () => {
    const navigate = useNavigate();
    const { Dragger } = Upload;
    const [currentImage, setCurrentImage] = useState<any>(null);
    const [loadings, setLoadings] = useState<any>([]);
    const [isDisableExtract, setExtractStatus] = useState(false);
    const [coordinates, setCoordinates] = useState([]);
    const [imageList, setImageList] = useState<any>([]);
    const [response, setResponse] = useState<any>([]);
    const [uploadMode, setUploadMode] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentImageList, setCurrentImageList] = useState<any>([]);

    const changeCoordinate = (coordinate: any, index: any, coordinates: any) => {
        setCoordinates(coordinates);
    };

    const deleteCoordinate = (coordinate: any, index: any, coordinates: any) => {
        setCoordinates(coordinates);
    };

    useEffect(() => {
        if (sessionStorage.getItem("isLogin") !== "true") {
            navigate("/login");
        }
    }, []);

    const enterLoading = () => {
        setLoadings(true);
    };

    function rcfile2base64(file: any) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result;
                resolve(base64String);
            };

            reader.onerror = () => {
                reject(new Error("Error reading file"));
            };

            reader.readAsDataURL(file);
        });
    }

    function getBase64(file: any) {
        return new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.onloadend = function () {
                resizeImage_async(reader.result)
                    .then((resizedBase64String) => {
                        resolve(resizedBase64String);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            };
            reader.readAsDataURL(file);
        });
    }

    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as RcFile);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    function resizeImage_async(base64Str: any) {
        return new Promise((resolve, reject) => {
            var img = new Image();
            img.onload = function () {
                var canvas = document.createElement("canvas");
                var MAX_WIDTH = 750;
                var MAX_HEIGHT = 1060;
                var width = img.width;
                var height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                var ctx = canvas.getContext("2d");
                ctx!.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL());
            };

            img.onerror = function (error) {
                reject(error);
            };

            img.src = base64Str;
        });
    }

    const props: UploadProps = {
        name: "file",
        multiple: false,
        showUploadList: false,
        disabled: isDisableExtract,
        onPreview: onPreview,
        directory: uploadMode,
        beforeUpload: (file, fileList) => {
            rcfile2base64(file)
                .then((base64String) => {
                    resizeImage_async(base64String)
                        .then((resizedBase64String) => {
                            setCurrentImageList((currentImageList: any) => [...currentImageList, resizedBase64String]);
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
            getBase64(info.file.originFileObj)
                .then((base64String) => {
                    setCurrentImage(base64String);
                })
                .catch((error) => {
                    // Handle the error
                    console.error(error);
                });
            setExtractStatus(true);
        },
        onDrop(e) {
            setExtractStatus(true);
        },
    };

    return (
        <div>
            <Row>
                <Header />
            </Row>

            <Row style={{ marginTop: 50, marginLeft: 20 }}>
                <Col span={12} id="img-wrapper">
                    <Dragger {...props}>
                        {currentImage !== null && currentImage !== -1 ? (
                            <MultiCrops
                                src={`${currentImage}`}
                                // width={750}
                                // height={1060}
                                coordinates={coordinates}
                                onChange={changeCoordinate}
                                onDelete={deleteCoordinate}
                            />
                        ) : (
                            <div>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text" style={{ color: "aliceblue" }}>
                                    Click or drag file to this area to upload
                                </p>
                                <p className="ant-upload-hint" style={{ color: "aliceblue" }}>
                                    Image format supported: PNG, JPEG
                                </p>
                            </div>
                        )}
                    </Dragger>
                    <div style={{ marginTop: 10 }}>
                        <span style={{ color: "white", fontWeight: "bold" }}>Folder Upload: </span>
                        <Switch
                            checkedChildren="On"
                            unCheckedChildren="Off"
                            style={{ width: 60 }}
                            onChange={(isChecked: boolean) => {
                                if (currentImage !== null) {
                                    setCurrentImage(null);
                                    setExtractStatus(false);
                                }
                                setUploadMode(isChecked);
                            }}
                        />
                        {uploadMode && currentImage !== null ? (
                            <div style={{ width: "100%", textAlign: "center" }}>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        let currentIdx = currentImageIndex - 1;
                                        if (currentIdx < 0) {
                                            setCurrentImage(currentImageList[currentImageList.length - 1]);
                                            setCurrentImageIndex(currentImageList.length - 1);
                                        } else {
                                            setCurrentImage(currentImageList[currentIdx]);
                                            setCurrentImageIndex(currentIdx);
                                        }
                                    }}
                                >
                                    Previous
                                </Button>
                                <Button
                                    type="primary"
                                    style={{ marginLeft: 20 }}
                                    onClick={() => {
                                        let currentIdx = currentImageIndex + 1;
                                        if (currentIdx > currentImageList.length - 1) {
                                            setCurrentImage(currentImageList[0]);
                                            setCurrentImageIndex(0);
                                        } else {
                                            setCurrentImage(currentImageList[currentIdx]);
                                            setCurrentImageIndex(currentIdx);
                                        }
                                    }}
                                >
                                    Next
                                </Button>
                            </div>
                        ) : null}
                    </div>
                </Col>
                <Col span={10} style={{ marginLeft: 80, height: 500 }}>
                    <canvas id="mycanvas" hidden></canvas>
                    <Card
                        title="Your contract information"
                        bordered={false}
                        style={{ width: "100%", textAlign: "center" }}
                    >
                        {response.length > 0 ? (
                            <div className="results" style={{ display: "grid" }}>
                                {response.map((item: any) => {
                                    return <span key={new Date().getTime()}>{item}</span>;
                                    // console.log(item);
                                })}
                            </div>
                        ) : null}
                    </Card>

                    <div
                        style={{
                            marginTop: 20,
                            width: "100%",
                            textAlign: "center",
                        }}
                    >
                        <Button
                            id="extract-btn"
                            type="primary"
                            loading={loadings}
                            onClick={() => {
                                let img_list: any = [];

                                coordinates.forEach(async (cord, idx) => {
                                    const canvas = document.createElement("canvas");
                                    canvas.width = cord["width"];
                                    canvas.height = cord["height"];

                                    const ctx = canvas!.getContext("2d");
                                    var image = new Image();
                                    image.src = currentImage;
                                    image.onload = function () {
                                        ctx!.drawImage(
                                            image,
                                            cord["x"],
                                            cord["y"],
                                            cord["width"],
                                            cord["height"],
                                            0,
                                            0,
                                            cord["width"],
                                            cord["height"]
                                        );
                                        // console.log(canvas.toDataURL());
                                        img_list.push(canvas.toDataURL());
                                    };
                                });
                                // console.log(img_list);
                                setImageList(img_list);
                                console.log(img_list);
                                enterLoading();
                                axios({
                                    method: "post",
                                    baseURL: "http://localhost:5050",
                                    url: `/crop_extract`,
                                    data: { imgs: imageList },
                                })
                                    .then((res) => {
                                        // setCurrentResults(response.data);
                                        // console.log(res.data);
                                        let result = res.data;
                                        setResponse(result);
                                        // console.log(response);
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

                        <ExportButton data={response} />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default HandExtractPage;
