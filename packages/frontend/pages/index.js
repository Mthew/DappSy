import React, { useContext } from "react";
import { Layout } from "../components/Layout";
import { Carousel, Progress } from "antd";
import Link from "next/link";

import { ProjectContext } from "../context";

import { ProjectCard } from "../components/Project";
import { Row } from "../components/ui";
import { ROUTES } from "../utils";

const Home = ({}) => {
  const { projects } = useContext(ProjectContext);

  return (
    <div className="">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-5 sm:px-6 lg:max-w-7xl lg:px-8">
        {projects.length > 0 ? (
          <>
            <Carousel afterChange={() => {}}>
              {projects.slice(0, 3).map((project, i) => (
                <div key={i}>
                  {/* className="p-16 backdrop-blur bg-black bg-opacity-5" */}
                  <div
                    style={{
                      backgroundImage: `url(${
                        (project.imgs || ["/2.jpeg"])[0] || "/2.jpeg"
                      })`,
                      backgroundSize: "100%",
                      backgroundPosition: "center",
                    }}
                    className="h-80"
                  >
                    <div className="w-full h-full p-16">
                      <div className="w-2/4 p-8 backdrop-blur-sm bg-white bg-opacity-60 rounded">
                        <h1 className="text-xl">{project.name}</h1>
                        <div className="text-sm mt-3 font-medium">
                          <div className=" flex justify-between ">
                            <p>Volumen:</p>
                            <p className="my-1 text-gray-500">
                              {project.tokenCount}
                            </p>
                          </div>
                          <div className=" flex justify-between ">
                            <p>Valor del token:</p>
                            <p className="my-1 text-gray-500">
                              {project.tokenPrice}%
                            </p>
                          </div>

                          <div className=" flex justify-between ">
                            <p>Vendido:</p>
                            <div className=" text-gray-500 w-2/4 flex justify-between my-1 ">
                              <Progress
                                percent={parseFloat(
                                  project.soldPercentage || 0
                                ).toFixed(2)}
                                strokeColor={"#11CDEF"}
                                showInfo={false}
                                style={{ marginRight: "7px" }}
                              />
                              {parseFloat(project.soldPercentage || 0).toFixed(
                                2
                              )}
                              %
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
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
                    Si desea crear uno, haga clic sobre el botón crear proyecto
                  </h4>

                  <Link
                    href={ROUTES.newProject}
                    className="rounded border-2 border-neutral-50 px-7 pb-[8px] pt-[10px] text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                  >
                    Crear Proyecto
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        <Row className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {projects != null &&
            projects.map((project, i) => (
              <ProjectCard key={i} data={project} />
            ))}
        </Row>
      </div>
    </div>
  );
};

Home.getLayout = (page) => <Layout title={"Home"}>{page}</Layout>;

export default Home;
