"use client";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { Typography } from "antd";
import styles from "./login.module.css";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AxiosError } from "../../Types/types";
import { getData } from "@/service/apiService";

const { Title } = Typography;

const Login = () => {
  useEffect(() => {
    const token = Cookies.get("token");
    token ? router.push("/homepage") : router.push("/");
  }, []);

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const LoginHandler = async (username: string, password: string) => {
    try {
      setLoading(true);
      const checkUser = await getData(
        "https://mock.kgkit.net/auth/login",
        "post",
        {
          username: process.env.NEXT_PUBLIC_USERNAME,
          password: process.env.NEXT_PUBLIC_PASSWORD,
        }
      );
      if (checkUser.status === 200) {
        const { token } = checkUser.data;
        Cookies.set("token", token, { expires: 1 });
        router.push("/homepage");
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError?.response) {
        if (axiosError?.response.status === 401) {
          message.error("Invalid username or password.");
        } else {
          message.error("Server error. Please try again later.");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const onFinish = (values: { username: string; password: string }) => {
    LoginHandler(values.username, values.password);
  };

  return (
    <div className={styles.loginContainer}>
      <Form
        name="login"
        className={styles.loginForm}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
        onFinish={onFinish}
      >
        <div className={styles.loginContent}>
          <Title level={2} className={styles.loginTitle}>
            Login
          </Title>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Log in
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default Login;
