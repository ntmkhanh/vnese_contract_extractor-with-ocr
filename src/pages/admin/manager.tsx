import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/admin/menu";
import UserTable from "../../components/admin/usertable";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ExtractPage from "../auth/extract_service";
function AdminPage() {
    const [userList, setUserList] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (sessionStorage.getItem("isAdmin") !== "true") {
            navigate("/login");
        }
        axios.get("http://localhost:5050/users").then((response) => {
            setUserList(response.data);
        });
    }, []);
    return (
        <>
            <AdminMenu setUserList={setUserList} content={<UserTable userList={userList} setUserList={setUserList} />} />

        </>
    );
}

export default AdminPage;
