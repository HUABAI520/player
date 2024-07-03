import {PageContainer} from "@ant-design/pro-layout";
import {Outlet} from "umi";
import React from "react";

const Books: React.FC = () => {
    return (
        <PageContainer>
            <Outlet/>
        </PageContainer>
    );
}
export default Books;
