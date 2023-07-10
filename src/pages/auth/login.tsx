import React, { useState } from "react";
import axios from "axios";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Avatar, message } from "antd";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const loginNotification = (status: any, content: string) => {
        messageApi.open({
            type: status,
            content: content,
        });
    };

    const onFinish = (values: any) => {
        setLoading(true);
    
        axios({
            method: "post",
            baseURL: "http://localhost:5050",
            url: `/login`,
            data: { username: values.username, password: values.password },
        })
            .then((response) => {
                loginNotification("success", "Login successfully!");
                setTimeout(() => {
                    if (response.data === "admin") {
                        navigate("/admin");
                    } else {
                        navigate("/extract");
                    }
                }, 1000);
                console.log(response);
                sessionStorage.setItem("isLogin", "true");
                sessionStorage.setItem("isAdmin", response.data === "admin" ? "true" : "false");
            })
            .catch((error) => {
                let responseData = error.response.data.detail;
                loginNotification("error", responseData);
                console.log(responseData);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    
    return (
        <>
            {contextHolder}
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                style={{
                    width: 300,
                    display: "flex",
                    flexDirection: "column",
                    margin: "0 auto",
                    height: "100vh",
                    justifyContent: "center",
                }}
            >
                <Avatar size={100} icon={<UserOutlined />} style={{ margin: "30px auto" }} />
                <Form.Item name="username" rules={[{ required: true, message: "Please input your Username!" }]}>
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: "Please input your Password!" }]}>
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                </Form.Item>

                <Form.Item style={{ textAlign: "center" }}>
                    <Button type="primary" htmlType="submit" loading={loading} className="login-form-button">
                        Log in
                    </Button>
                    <br />
                    <div style={{ marginTop: 10 }}>
                        Or
                        <br />
                        <a href="/register">Register now</a>
                    </div>
                </Form.Item>
            </Form>
        </>
    );
};

export default LoginPage;
