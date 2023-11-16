import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import { Row, Col, Carousel, Progress, Empty, Result, Button } from "antd";
import axios from "axios";
import { ProjectCard } from "../components/Project";

const Home = ({}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/project/get");
      console.log("RESPONSE ==>", res);
      const json = res.data;
      console.log("RESPONSE ==>", json);
      if (json) {
        setData(json);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-5 sm:px-6 lg:max-w-7xl lg:px-8">
        <Carousel afterChange={() => {}}>
          {data.length > 0 ? (
            <>
              {data.map((product, i) => (
                <div key={i}>
                  {/* className="p-16 backdrop-blur bg-black bg-opacity-5" */}
                  <div
                    style={{
                      backgroundImage: `url(${
                        (product.imgs || ["/2.jpeg"])[0] || "/2.jpeg"
                      })`,
                      backgroundSize: "100%",
                      backgroundPosition: "center",
                    }}
                    className="h-80"
                  >
                    <div className="w-full h-full p-16">
                      <div className="w-2/4 p-8 backdrop-blur-sm bg-white bg-opacity-60 rounded">
                        <h1 className="text-xl">{product.name}</h1>
                        <div className="text-sm mt-3 font-medium">
                          <div className=" flex justify-between ">
                            <p>Volumen:</p>
                            <p className="my-1 text-gray-500">
                              {product.tokenCount}
                            </p>
                          </div>
                          <div className=" flex justify-between ">
                            <p>Valor del token:</p>
                            <p className="my-1 text-gray-500">
                              {product.tokenPrice}%
                            </p>
                          </div>

                          <div className=" flex justify-between ">
                            <p>Vendido:</p>
                            <div className=" text-gray-500 w-2/4 flex justify-between my-1 ">
                              <Progress
                                percent={product.soldPercentage}
                                strokeColor={"#11CDEF"}
                                showInfo={false}
                                style={{ marginRight: "7px" }}
                              />
                              {product.soldPercentage}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <h2 className="my-6 text-2xl font-bold tracking-tight text-gray-900">
                Proyectos en venta
              </h2>
            </>
          ) : (
            <div className="relative overflow-hidden rounded-lg bg-cover bg-no-repeat p-12 text-center h-screen bg-[#1890ff69]">
              <div className="bg-[rgba(0, 0, 0, 0.6)] absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed">
                <div className="flex h-full items-center justify-center">
                  <div className="text-white">
                    <h2 className="mb-4 text-4xl font-semibold">
                      No hay proyectos disponibles
                    </h2>
                    <h4 className="mb-6 text-xl font-semibold">
                      Si desea creaar uno haga clic sobre el botón crear
                      proyecto
                    </h4>
                    <button
                      type="button"
                      className="rounded border-2 border-neutral-50 px-7 pb-[8px] pt-[10px] text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                    >
                      Crear Proyecto
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Carousel>

        <Row className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data != null &&
            data.map((product, i) => <ProjectCard key={i} data={product} />)}
        </Row>
      </div>
    </div>
  );
};

Home.getLayout = (page) => <Layout title={"Home"}>{page}</Layout>;

export default Home;
