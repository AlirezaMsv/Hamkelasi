import style from "./userprofile.module.css";
import { useContext, useEffect, useState } from "react";
import { Avatar, Card, ConfigProvider, Skeleton } from "antd";
import { UserContext } from "../../../App";
const { Meta } = Card;

function UserProfile() {
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const [userValue] = user;

  useEffect(() => {
    if (userValue) {
      setLoading(false);
    }
  }, [userValue]);

  return (
    <ConfigProvider
      theme={{
        fontFamily: "VazirBold",
      }}
    >
      <Card
        style={{
          width: "100vh",
          margin: "auto",
          height: 320,
        }}
        loading={loading}
      >
        <Skeleton loading={false} avatar active>
          <Meta avatar={<Avatar src="https://demo2.rrr.co.ir/h2/demo2.rrr.co.ir/tcbxMZa7ff32/c/%5Bw150h175%5D-nody-%D8%B9%DA%A9%D8%B3-%D9%87%D8%A7%DB%8C-full-hd-%D8%A8%D8%B1%D8%A7%DB%8C-%D8%AF%D8%B3%DA%A9%D8%AA%D8%A7%D9%BE-1628751026%20%281%29.jpg" />} title="پروفایل کاربر" />
        </Skeleton>
        <div className={style.informations}>
          <div className={style.box}>
            <p>{`شماره دانش آموز : ${userValue?.studentNo}`}</p>
          </div>
          <div className={style.box}>
            <p></p>
          </div>
          <div className={style.box}>
            <p>{`نام و نام خانوادگی  : ${userValue?.fullName}`}</p>
          </div>
          <div className={style.box}>
            <p>{`نام پدر : ${userValue?.fatherName}`}</p>
          </div>
          <div className={style.box}>
            <p>{`تاریخ تولد : ${userValue?.DOB}`}</p>
          </div>
          <div className={style.box}>
            <p>{`مقطع : ${userValue?.grade}`}</p>
          </div>
          <div className={style.box}>
            <p>{`رشته تحصیلی : ${userValue?.subject}`}</p>
          </div>
          <div className={style.box}>
            <p>{`کلاس : ${userValue?.class}`}</p>
          </div>
        </div>
        <div className={style.date}>
          <p>{`امروز: ${userValue?.today}`}</p>
        </div>
        <div className={style.welcome}>
          <p>{userValue?.welcomeMessage}</p>
        </div>
      </Card>
    </ConfigProvider>
  );
}

export default UserProfile;
