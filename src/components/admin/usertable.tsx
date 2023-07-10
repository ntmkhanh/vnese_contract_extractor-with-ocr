import React, { useState } from "react";
import { Space, Table, Tag, Popconfirm, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";

interface DataType {
    id: number;
    username: string;
    name: number;
    registerd_date: string;
    usertype: number;
}

interface UserTableProps {
    userList: any;
    setUserList: (_: any) => void;
}

const UserTable: React.FC<UserTableProps> = ({ userList, setUserList }: UserTableProps) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [editingKey, setEditingKey] = useState("");
    // const [isLoading, setLoading] = useState(true);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log(newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const columns: ColumnsType<DataType> = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (text) => <a>{text}</a>,
            filterDropdown: () => {
                return <Input></Input>;
            },
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "User type",
            key: "user_type",
            dataIndex: "user_type",
            render: (_, obj, __) => {
                let color, utype;
                if (obj.usertype === 1) {
                    color = "cyan";
                    utype = "user";
                } else {
                    color = "magenta";
                    utype = "admin";
                }
                return <Tag color={color}>{utype.toUpperCase()}</Tag>;
            },
        },
        {
            title: "Registered date",
            key: "registered_date",
            dataIndex: "registered_date",
        },
        {
            title: "Status",
            key: "status",
            dataIndex: "status",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <a>Update</a>
                    <Popconfirm
                        title="Delete"
                        description="Are you sure to delete this user?"
                        onConfirm={() => {
                            axios.delete(`http://localhost:5050/users/delete/${record.id}`).then((response) => {
                                let updatedUserList = userList.filter((obj: any) => obj.id !== record.id);
                                setUserList(updatedUserList);
                            });
                        }}
                        // onCancel={}
                        okText="Yes"
                        cancelText="No"
                    >
                        <a>Delete</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    // if (isLoading) {
    //     return <Spin style={{ display: "flex", justifyContent: "center", height: "100vh", alignItems: "center" }} />;
    // }
    return <Table rowSelection={rowSelection} columns={columns} dataSource={userList} rowKey={(record) => record.id} />;
};

export default UserTable;
