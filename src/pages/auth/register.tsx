import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Input, Avatar, Badge, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const RegisterPage: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();

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
            url: `/register`,
            data: { name: values.name, username: values.username, password: values.password },
        })
            .then((response) => {
                console.log(response);
                loginNotification("success", "Registered successfully!");
                setTimeout(() => {
                    window.location.href = "/extract";
                }, 1000);
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
                <div style={{ margin: "30px auto" }}>
                    <Badge count={"Welcome"} style={{ fontWeight: "bold"}}>
                        <Avatar size={100} icon={<UserOutlined />} />
                    </Badge>
                </div>

                <Form.Item name="name" rules={[{ required: true, message: "Please input your name!" }]}>
                    <Input placeholder="Your name" />
                </Form.Item>
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
                <Form.Item name="confirm_password" rules={[{ required: true, message: "Please input your Password!" }]}>
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Retype your Password"
                    />
                </Form.Item>

                <Form.Item style={{ textAlign: "center" }}>
                    <Button type="primary" htmlType="submit" loading={loading} className="login-form-button">
                        Register
                    </Button>
                    <br />
                    <div style={{ marginTop: 10 }}>
                        Or
                        <br />
                        <a href="/login">Already had account?</a>
                    </div>
                </Form.Item>
            </Form>
        </>
    );
};

export default RegisterPage;
