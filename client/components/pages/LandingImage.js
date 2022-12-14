import { useContext } from "react";
import { Row, Col, Button } from "antd";
import { BookOutlined } from "@ant-design/icons";
import Link from "next/link";
import { AuthContext } from "../../context/auth";

const LandingImage = () => {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  // Show Become an Author button only for Subscribers
  const showButton = () => {
    if (auth?.user?.role != "Admin" && auth?.user?.role != "Author") {
      return (
        <Button type="primary" size="large" icon={<BookOutlined />}>
          Become an author!
        </Button>
      );
    }
  };

  return (
    <>
      {/* Top Column on Homepage */}
      <div>
        <Row>
          <Col
            span={11}
            offset={1}
            style={{ marginTop: 150, textAlign: "center", fontSize: 20 }}
          >
            <h1>Grow your content on social and beyond</h1>
            <h5>
              Analyze, Research and Publish your content with us and help spread
              the knowledge all over the world. Become a value-driven person
              that provides crips, intuitive and latest content for ambitious
              people and teams.
            </h5>
            <Link href="/contact">
              <a>{showButton()}</a>
            </Link>
          </Col>
          <Col
            span={12}
            style={{ marginTop: 50, textAlign: "center", fontSize: 20 }}
          >
            <img
              src="/images/home1.png"
              alt="Content Management"
              style={{
                width: "100%",
                height: "50%",
                overFlow: "hidden",
                objectFit: "cover",
              }}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default LandingImage;
