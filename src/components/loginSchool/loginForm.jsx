import style from "./login.module.css";
import logo from "../../assets/images/h-collage.svg";
import Form from "./SchoolSiteForm";

function LoginForm() {

  return (
    <div className={style.main}>
      <div className={style.leftPane}>
        <img alt="logo" src={logo} />
      </div>
      <div className={style.rightPane}>
        <Form />
      </div>
    </div>
  );
}

export default LoginForm;
