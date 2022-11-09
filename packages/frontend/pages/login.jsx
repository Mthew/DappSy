import React from "react";
import { Row, Col, Layout, Typography, Divider } from "antd";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import Logo from "../components/Layout/Logo";

const Login = () => {
  return (
    <div>
      <span class="dappsy-background-1"></span>
      <span class="dappsy-background-2"></span>
      <div className="container mx-auto h-screen place-items-center">
        <header className="py-5 bg-none flex justify-between">
          <Logo className="text-white" />
          <ConnectButton />
        </header>
        <section className="grid h-3/4 place-items-center">
          <div>
            <h1 className="py-2 text-3xl text-slate-200 text-center">
              ¡Bienbenido!
            </h1>
            <h3 className="pb-5 text-lg text-slate-200 text-center">
              Use su billetara para ingresar, y empezar a ser parte de la nueva
              revolución economica
            </h3>
          </div>
          <div className="h-full w-1/4 p-8 rounded-md bg-white shadow-xl grid h-3/4 place-items-center text-center text-slate-300">
            <div className="w-full">
              <p className="text-sm">Sign In</p>
              <Logo />
              <Divider />
            </div>
            <div>
              <p className="p-10 text-sm">
                Conecta tu wallet para ingresar a DAPPSY
              </p>
              <ConnectButton />
            </div>
          </div>
        </section>
        <footer></footer>
      </div>
    </div>
  );
};
export default Login;
