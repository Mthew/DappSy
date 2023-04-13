import { useRouter } from "next/router";
import { Spin } from "antd";

export default ({ redirectToHome = false, loading, ...props }) => {
  const { push } = useRouter();
  const onclick = () => {
    redirectToHome && push("/");
  };
  return loading ? (
    <div className="mx-10">
      <Spin />
    </div>
  ) : (
    <div onclick={onclick}>
      <h1 style={{ textAlign: "center", padding: "10px 20px" }} {...props}>
        D A P P S Y
      </h1>
    </div>  
  );
};
