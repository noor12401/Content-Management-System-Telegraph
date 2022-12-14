import { useState, useContext, useEffect } from "react";
import { Form, Input, Button, Tooltip, Col, Row } from "antd";
import { CopyOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/auth";
import { useRouter } from "next/router";

function Signin() {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  // state
  const [loading, setLoading] = useState(false);
  // hooks
  const router = useRouter();
  // const [form] = Form.useForm();

  useEffect(() => {
    if (auth?.token) {
      //router.push("/");
    }
  }, [auth]);

  const onFinish = async (values) => {
    // console.log("values => ", values);
    try {
      setLoading(true);
      const { data } = await axios.post("/signin", values);
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        // console.log("signin response => ", data);
        // save user and token to context
        setAuth(data);
        // save user and token to local storage
        localStorage.setItem("auth", JSON.stringify(data));
        toast.success("Successfully signed in");
        // redirect user
        if (data?.user?.role === "Admin") {
          router.push("/admin");
        } else if (data?.user?.role === "Author") {
          router.push("/author");
        } else {
          router.push("/subscriber");
        }
        // form.resetFields();
      }
    } catch (err) {
      console.log("err => ", err);
      setLoading(false);
      toast.error("Signin failed. Try again.");
    }
  };

  return (
    <Row>
      <Col span={8} offset={8}>
        <h1 style={{ paddingTop: "100px" }}>Signin</h1>

        <div
          style={{
            border: "2px dashed",
            marginBottom: 24,
            padding: "10px 10px 0px",
            borderRadius: 10,
          }}
        >
          <span
            class="ant-typography ant-typography-disabled"
            style={{ paddingBottom: 10 }}
          >
            Login as Author (email/password)
          </span>

          <p>
            author@telegraph.com
            <Tooltip title="Copy Email">
              <Button
                style={{ border: 0 }}
                icon={<CopyOutlined />}
                onClick={() =>
                  navigator.clipboard.writeText("author@telegraph.com")
                }
              />
            </Tooltip>
          </p>

          <p style={{ marginTop: -20 }}>
            Author
            <Tooltip title="Copy Password">
              <Button
                style={{ border: 0 }}
                icon={<CopyOutlined />}
                onClick={() => navigator.clipboard.writeText("Author")}
              />
            </Tooltip>
          </p>

          <hr
            style={{ border: "1px dashed", marginTop: 10, marginBottom: 10 }}
          ></hr>

          <span
            class="ant-typography ant-typography-disabled"
            style={{ paddingBottom: 10 }}
          >
            Login as Subscriber (email/password)
          </span>

          <p>
            subscriber@telegraph.com
            <Tooltip title="Copy Email">
              <Button
                style={{ border: 0 }}
                icon={<CopyOutlined />}
                onClick={() =>
                  navigator.clipboard.writeText("subscriber@telegraph.com")
                }
              />
            </Tooltip>
          </p>

          <p style={{ marginTop: -20 }}>
            Subscriber
            <Tooltip title="Copy Password">
              <Button
                style={{ border: 0 }}
                icon={<CopyOutlined />}
                onClick={() => navigator.clipboard.writeText("Subscriber")}
              />
            </Tooltip>
          </p>
        </div>

        <Form
          // form={form}
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
            email: "admin@telegraph.com",
            password: "Admin",
          }}
          onFinish={onFinish}
        >
          {/* email */}
          <Form.Item name="email" rules={[{ type: "email" }]}>
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          {/* password */}
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Link href="/forgot-password">
            <a>Forgot Password</a>
          </Link>
          <br />
          <br />

          <Form.Item>
            <Button
              type="primary"
              id="loginbutton"
              htmlType="submit"
              className="login-form-button"
            >
              Login
            </Button>
            <br />
            Or{" "}
            <Link href="/signup">
              <a>Register now!</a>
            </Link>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default Signin;
