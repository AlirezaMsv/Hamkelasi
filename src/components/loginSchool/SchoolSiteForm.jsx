import {
  Button,
  ConfigProvider,
  Checkbox,
  Form,
  Input,
  Modal,
  message,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import style from "./login.module.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";

const SchoolSiteForm = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [schoolName, setSchoolName] = useState(null);
  const [userLogin, setUserLogin] = useState(false);
  const [siteAddress, setSiteAddress] = useState(null);
  const { user, menuSide, menuMain, cookies } = useContext(UserContext);
  const [userValue, setUserValue] = user;
  const [, setMenuSideValue] = menuSide;
  const [, setMenuMainValue] = menuMain;
  const [, setCookieValue] = cookies;
  const navigate = useNavigate();

  const userLoginForm = () => {
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    const login = (values) => {
      const options = {
        method: "POST",
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "1",
          method: "login",
          params: {
            user: values.username,
            pass: values.password,
            stdno: "",
            loadEvents: true,
            loadMenus: true,
            loadDesktopInfo: true,
            loadSchoolInfo: true,
            loadTerms: true,
            loadEduYears: true,
            loadClasses: true,
            loadModulesInfo: true,
            loadUpdateInfo: true,
          },
        }),
      };
      setLoginLoading(true);
      const url = `http://${siteAddress}/holiframework/hsms/mobile/MixedService`;
      fetch(url, options)
        .then((res) => {
          if (!res.ok) {
            error("خطایی رخ داد!");
          } else {
            return res.json();
          }
        })
        .then((data) => {
          localStorage.setItem("token", data.result[0].JSESSIONID);
          setCookieValue("JSESSIONID", data.result[0].JSESSIONID, {
            path: "/",
            sameSite: "none",
            secure: true,
          });
          const userObject = {
            studentNo: data.result[0].desktopResult[0].stdno,
            fullName: data.result[0].desktopResult[0].fullName,
            fatherName: data.result[0].desktopResult[0].fatherName,
            DOB: data.result[0].desktopResult[0].birthDate,
            grade: data.result[0].desktopResult[0].degree,
            subject: data.result[0].desktopResult[0].field,
            class: data.result[0].desktopResult[0].class,
            today: data.result[0].desktopResult[0].today,
            welcomeMessage: data.result[0].desktopResult[0].welcomeMessage,
          };
          setUserValue(userObject);
          const AllMenu = data.result[0].menus;
          const sideObj = AllMenu.filter((m) => m.position === "side");
          const mainObj = AllMenu.filter((m) => m.position === "main").sort(
            (a, b) => a.id - b.id
          );
          setMenuSideValue(sideObj);
          setMenuMainValue(mainObj);
          setLoginLoading(false);
        })
        .catch((err) => {
          error("خطایی رخ داد!");
          setLoginLoading(false);
          console.log(err);
        });
    };

    return (
      <Form
        name="userForm"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={login}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
      >
        <Form.Item
          label="نام کاربری"
          name="username"
          rules={[
            {
              required: true,
              message: "لطفا نام کاربری خود را وارد کنید!",
            },
          ]}
        >
          <Input
            style={{
              direction: "ltr",
            }}
          />
        </Form.Item>

        <Form.Item
          label="رمز عبور"
          name="password"
          rules={[
            {
              required: true,
              message: "لطفا رمز عبور خود را وارد کنید!",
            },
          ]}
        >
          <Input.Password
            style={{
              direction: "ltr",
            }}
          />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>ذخیره رمز عبور</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" loading={loginLoading}>
            ورود
          </Button>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <h5
            onClick={() => warning("پیاده سازی نشده است!")}
            style={{
              fontFamily: "VazirBold",
              color: "#00C4C3",
              cursor: "pointer",
            }}
          >
            فراموشی رمز عبور؟
          </h5>
        </Form.Item>
      </Form>
    );
  };

  useEffect(() => {
    if (userValue !== null && localStorage.getItem("token") !== null) {
      navigate("/dashboard");
    }
  }, [userValue]);

  const success = (text) => {
    messageApi.open({
      type: "success",
      content: text,
      className: style.message,
    });
  };

  const warning = (text) => {
    messageApi.open({
      type: "warning",
      content: text,
      className: style.message,
    });
  };

  const error = (text) => {
    messageApi.open({
      type: "error",
      content: text,
      className: style.message,
    });
  };

  const onFinish = (values) => {
    setLoading(true);

    const options = {
      method: "POST",
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "1",
        method: "getSchoolInfo",
      }),
    };

    const url = `http://${values.siteAddress}/holiframework/hsms/mobile/SchoolService`;
    fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          error("خطایی رخ داد!");
          setLoading(false);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setSchoolName(data.result[0].name);
        setSiteAddress(values.siteAddress);
        localStorage.setItem("siteAddress", values.siteAddress);
        setShowConfirmModal(true);
        setLoading(false);
      })
      .catch((err) => {
        error("خطایی رخ داد!");
        console.log(err);
        setLoading(false);
      });
  };

  const onFinishFailed = (errorInfo) => {
    error("لطفا آدرس سایت مدرسه را وارد کنید!");
  };

  const handleOk = () => {
    setUserLogin(true);
  };

  const handleCancel = () => {
    setUserLogin(false);
    setSchoolName("");
    setShowConfirmModal(false);
  };

  return (
    <div
      style={{
        direction: " rtl",
        fontFamily: "VazirBold",
      }}
    >
      {/* message */}
      {contextHolder}
      {/* confirm modal */}
      <ConfigProvider
        direction="rtl"
        theme={{
          fontFamily: "VazirBold",
        }}
      >
        <Modal
          title={userLogin ? "تایید نام مدرسه" : schoolName}
          open={showConfirmModal}
          footer={
            userLogin
              ? [
                  <Button key="back" onClick={handleCancel}>
                    {userLogin ? "بازگشت" : "خیر"}
                  </Button>,
                ]
              : [
                  <Button key="back" onClick={handleCancel}>
                    {userLogin ? "بازگشت" : "خیر"}
                  </Button>,
                  <Button key="submit" type="primary" onClick={handleOk}>
                    بله
                  </Button>,
                ]
          }
        >
          {userLogin ? (
            userLoginForm()
          ) : (
            <p>{`آیا آدرس وارد شده مربوط به « ${schoolName} » است؟`}</p>
          )}
        </Modal>
      </ConfigProvider>
      {/* tozihat */}
      <div
        style={{
          width: "20rem",
        }}
      >
        <h3>ورود به حساب کاربری</h3>
        <h5>
          لطفا آدرس سایت مدرسه یا آموزشگاه خود را، به صورت کامل و دقیق در این
          قسمت وارد کنید.
        </h5>
      </div>
      {/* form */}
      <div
        style={{
          float: "right",
        }}
      >
        <Form
          name="schoolName"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 20,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
        >
          <Form.Item
            label="آدرس سایت"
            name="siteAddress"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input style={{ direction: "ltr" }} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              type="primary"
              loading={loading}
              htmlType="submit"
              icon={<ArrowLeftOutlined />}
            >
              بعدی
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SchoolSiteForm;
