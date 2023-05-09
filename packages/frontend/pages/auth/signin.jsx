import { getCsrfToken } from "next-auth/react";

import { Logo, LoginButton } from "../../components/ui";
import style from "../../styles/modules/login.module.css";

function SignIn({ csrfToken }) {
  return (
    <>
      <span className={style["dappsy-background-1"]}></span>
      <span className={style["dappsy-background-2"]}></span>
      <div className="container mx-auto h-screen place-items-center">
        <header className="py-5 px-2 bg-none flex justify-between">
          <Logo className="text-white" />
          <LoginButton token={csrfToken} />
        </header>
        <section className="grid h-3/4 place-items-center">
          <div>
            <h1 className="py-2 text-3xl text-slate-200 text-center">
              ¡Bienvenido!
            </h1>
            <h3 className="pb-5 text-lg text-slate-200 text-center">
              Use su billetara para ingresar, y empezar a ser parte de la nueva
              revolución economica
            </h3>
          </div>
          <div className="h-full w-1/4 p-8 rounded-md bg-white shadow-xl grid place-items-center text-center text-slate-300">
            <div className="w-full">
              <p className="text-sm">Sign In</p>
              <Logo />
              <hr />
            </div>
            <div>
              <p className="p-10 text-sm">
                Conecta tu wallet para ingresar a DAPPSY
              </p>
              <LoginButton token={csrfToken} />
            </div>
          </div>
        </section>
        <footer></footer>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const token = (await getCsrfToken(context)) || "";
  console.log("TOKEN", token);
  return {
    props: {
      csrfToken: token,
    },
  };
}

export default SignIn;
