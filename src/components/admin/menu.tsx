import React, { ReactNode, useState } from "react";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    ReloadOutlined,
    LockOutlined,
    UserAddOutlined,
    EditOutlined,
    ArrowLeftOutlined,
    SettingOutlined,
    ScanOutlined,
    DragOutlined,
} from "@ant-design/icons";
import axios from "axios";
import {
    Layout,
    Menu,
    Button,
    theme,
    Input,
    DatePicker,
    Breadcrumb,
    Modal,
    Form,
    Select,
    message,
    Avatar,
    Card,
    Popover,
} from "antd";
import { useNavigate } from "react-router-dom";
import extract_service_crop from "../../pages/auth/extract_service_crop";

const { Header, Sider, Content } = Layout;
const { Search } = Input;
const { RangePicker } = DatePicker;
const { Meta } = Card;

interface AdminMenuProps {
    content: any;
    setUserList: (_: any) => void;
}

const AdminMenu: React.FC<AdminMenuProps> = ({ content, setUserList }: AdminMenuProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const notification = (status: any, content: string) => {
        messageApi.open({
            type: status,
            content: content,
        });
    };

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        setLoading(true);
        axios({
            method: "post",
            baseURL: "http://localhost:5050",
            url: `/register`,
            data: {
                name: form.getFieldValue("name"),
                username: form.getFieldValue("username"),
                password: form.getFieldValue("password"),
                usertype: form.getFieldValue("usertype") === "user" ? 1 : 0,
            },
        })
            .then((response) => {
                axios.get("http://localhost:5050/users").then((response) => {
                    setUserList(response.data);
                });
                // console.log(response.data);
            })
            .catch((error) => {})
            .finally(() => {
                form.resetFields();
                setLoading(false);
            });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const userSetting: any = (
        <Card
            style={{ width: 300, marginTop: 16 }}
            actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <ArrowLeftOutlined
                    key="logout"
                    onClick={() => {
                        navigate("/login");
                    }}
                />,
            ]}
        >
            <Meta
                avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />}
                title="WELCOME!"
                description="Administrator"
                style={{
                    fontFamily: "sans-serif",
                }}
            />
        </Card>
    );

    return (
        <>
            {contextHolder}
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="logo" />
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: "16px",
                            width: 64,
                            height: 64,
                            color: "white",
                            textAlign: "center",
                        }}
                    />
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={["1"]}
                        items={[
                            {
                                key: "1",
                                icon: <UserOutlined />,
                                label: "User Manager",
                            },
                            {
                                key: "2",
                                icon: <DragOutlined />,
                                label: "Extract Crop",
                                onClick: () => {
                                    navigate("../extract"); // Điều hướng đến trang "Extract Crop" khi menu được nhấp
                                },
                            },
                            {
                                key: "3",
                                icon: <ScanOutlined />,
                                label: "Extract Auto",
                                onClick: () => {
                                    navigate("../extract_auto"); // Điều hướng đến trang "Extract Crop" khi menu được nhấp
                                },
                            },
                        ]}
                    />
                </Sider>
                <Layout style={{ minHeight: "100vh" }}>
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "end", margin: "0 30px" }}>
                            <Popover placement="bottomRight" trigger="click" content={userSetting}>
                                <Avatar size={48} icon={<UserOutlined />} />
                            </Popover>
                        </div>
                    </Header>
                    <Breadcrumb style={{ marginLeft: 16, marginTop: 24 }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        style={{
                            margin: "24px 16px",
                            padding: 24,
                            // minHeight: "100vh",
                            background: colorBgContainer,
                        }}
                    >
                        <div style={{ marginBottom: 30 }}>
                            <Search placeholder="Search Name" style={{ width: 200 }} />
                            <RangePicker style={{ margin: "0 30px" }} />
                            <Button
                                type="primary"
                                icon={<ReloadOutlined />}
                                style={{ background: "#1890ff" }}
                                onClick={() => {
                                    axios.get("http://localhost:5050/users").then((response) => {
                                        setUserList(response.data);
                                        notification("success", "Data has been updated");
                                    });
                                }}
                            >
                                Refresh
                            </Button>
                            <Button style={{ margin: "0 30px" }} onClick={showModal} icon={<UserAddOutlined />}>
                                Create
                            </Button>
                            <Modal
                                title="Create user"
                                open={isModalOpen}
                                onOk={handleOk}
                                onCancel={handleCancel}
                                footer={[
                                    <Button key="back" onClick={handleCancel}>
                                        Cancel
                                    </Button>,
                                    <Button key="submit" type="primary" loading={isLoading} onClick={handleOk}>
                                        Create
                                    </Button>,
                                ]}
                            >
                                <Form
                                    name="normal_login"
                                    className="login-form"
                                    form={form}
                                    // labelCol={{ span: }}
                                    initialValues={{ remember: true }}
                                    // onFinish={}
                                    style={{
                                        marginTop: 50,
                                        width: 300,
                                        display: "flex",
                                        flexDirection: "column",
                                        margin: "0 auto",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Form.Item
                                        name="name"
                                        label="Name"
                                        rules={[{ required: true, message: "Please input your name!" }]}
                                    >
                                        <Input placeholder="Give a name" />
                                    </Form.Item>
                                    <Form.Item
                                        name="username"
                                        label="Username"
                                        rules={[{ required: true, message: "Please input your Username!" }]}
                                    >
                                        <Input
                                            prefix={<UserOutlined className="site-form-item-icon" />}
                                            placeholder="Username"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="password"
                                        label="Password"
                                        rules={[{ required: true, message: "Please input your Password!" }]}
                                    >
                                        <Input.Password
                                            prefix={<LockOutlined className="site-form-item-icon" />}
                                            type="password"
                                            placeholder="Password"
                                        />
                                    </Form.Item>
                                    <Form.Item label="Account type" name="usertype">
                                        <Select
                                            // onChange={handleChange}
                                            placeholder="Select account type"
                                            options={[
                                                { value: "user", label: "User" },
                                                { value: "admin", label: "Admin" },
                                            ]}
                                        />
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </div>
                        {content}
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

export default AdminMenu;
