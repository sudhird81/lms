import { Layout } from "antd";
import MainFooter from "../component/common/MainFooter";
import Mainheader from "../component/common/Mainheader";
import Sidebar from "../component/common/Sidebar";

const Home = () => {
  return (
    <div>
      <Layout style={{ height: "100vh" }}>
        <Mainheader />
        <Sidebar />
        <MainFooter />
      </Layout>
    </div>
  );
};

export default Home;
