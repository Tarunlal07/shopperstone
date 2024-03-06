"use client";
import { LogoutOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./homepage.module.css";

export default function HomepageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    token ? setToken(token) : router.push("/");
  }, []);

  const onLogout = () => {
    Cookies.remove("token", { path: "" });
    router.push("/");
  };

  return (
    <div>
      {token ? (
        <div className={styles.navBar}>
          <Button
            type="text"
            onClick={onLogout}
            style={{ color: "red" }}
            size="large"
            icon={<LogoutOutlined />}
          >
            Logout
          </Button>
        </div>
      ) : (
        ""
      )}
      {children}
    </div>
  );
}
