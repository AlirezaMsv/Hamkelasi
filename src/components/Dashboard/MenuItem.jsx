import {
  AlertOutlined,
  BarsOutlined,
  BookOutlined,
  CalendarOutlined,
  CommentOutlined,
  DashboardOutlined,
  ExperimentOutlined,
  FundOutlined,
  GiftOutlined,
  IdcardOutlined,
  PrinterOutlined,
  SendOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import style from "./menuItem.module.css";
import { useNavigate } from "react-router-dom";

const logos = [
  <FundOutlined />,
  <AlertOutlined />,
  <BookOutlined />,
  <CalendarOutlined />,
  <BarsOutlined />,
  <CommentOutlined />,
  <DashboardOutlined />,
  <ExperimentOutlined />,
  <GiftOutlined />,
  <IdcardOutlined />,
  <PrinterOutlined />,
  <SendOutlined />,
  <WalletOutlined />,
];

function LoginForm({ item, id }) {
  const navigate = useNavigate();

  const click = () => {
    switch (id) {
      case 3:
        navigate("/exams");
        break;
    }
  };

  return (
    <div className={style.menuItem} onClick={click}>
      <span className={style.menuLogo}>{logos[id % 13]}</span>
      <p className={style.menuTitle}>{item.title}</p>
    </div>
  );
}

export default LoginForm;
