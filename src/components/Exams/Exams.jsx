import { useEffect, useContext } from "react";
import { UserContext } from "../../App";
import { Tooltip, message } from "antd";
import style from "./exams.module.css";
import { LeftCircleTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Exams = () => {
  const { user } = useContext(UserContext);
  const [userValue] = user;
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

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

  useEffect(() => {
    const options = {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "1",
        method: "getStudentExaminesList",
        params: {
          stdno: userValue.studentNo,
        },
      }),
    };

    const url = `http://${localStorage.getItem(
      "siteAddress"
    )}/holiframework/hsms/mobile/ExamineService`;

    fetch(url, options)
      .then((res) => {
        console.log("vaysa:", res);
        if (!res.ok) {
          error("خطایی رخ داد!");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        console.log("bia: ", data);
      })
      .catch((err) => {
        error("خطایی رخ داد!");
        console.log(err);
      });
  }, []);

  return (
    <div>
      {contextHolder}
      <Tooltip title="بازگشت" placement="right">
        <LeftCircleTwoTone
          onClick={() => {
            navigate("/dashboard");
          }}
          className={style.back}
          style={{ fontSize: "2rem", color: "#08c" }}
        />
      </Tooltip>
    </div>
  );
};

export default Exams;
