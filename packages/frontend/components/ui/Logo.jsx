import Link from "next/link";
import { Spin } from "antd";
import { ROUTES } from "../../utils";

const Logo = ({ redirectToHome = true, loading, ...props }) => {
  return loading ? (
    <div className="mx-10">
      <Spin />
    </div>
  ) : (
    <div className="cursor-pointer">
      <Link href={ROUTES.home}>
        <h1 style={{ textAlign: "center", padding: "10px 20px" }} {...props}>
          D A P P S Y
        </h1>
      </Link>
    </div>
  );
};
export default Logo;
