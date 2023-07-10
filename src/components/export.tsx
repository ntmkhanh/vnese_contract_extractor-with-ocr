import React from "react";
import * as XLSX from "xlsx";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

interface ExportButtonProps {
    data: string[];
}

const ExportButton: React.FC<ExportButtonProps> = ({ data }) => {
    const handleExport = () => {
        if (data.length > 0){
            const worksheet = XLSX.utils.aoa_to_sheet([data]);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.sheet_add_aoa(worksheet, [data], { origin: "A1" });
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, "output.xlsx");    
        }
        else{
            window.alert("No data to download!")
        }
        
    };

    return (
        <Button type="primary" icon={<DownloadOutlined />} style={{ marginLeft: 20 }} onClick={handleExport}>
            Export to Excel
        </Button>
    );
};

export default ExportButton;
