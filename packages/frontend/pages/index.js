import React, { useContext } from "react";
import { Layout } from "../components/Layout";
import { Carousel, Progress } from "antd";

import { ProjectContext } from "../context";

import { ProjectCard } from "../components/Project";
import { Row } from "../components/ui";

const Home = ({}) => {
  const { projects } = useContext(ProjectContext);

  return (
    <div className="">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-5 sm:px-6 lg:max-w-7xl lg:px-8">
        <Carousel afterChange={() => {}}>
          {projects.map((project, i) => (
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
                            percent={project.soldPercentage}
                            strokeColor={"#11CDEF"}
                            showInfo={false}
                            style={{ marginRight: "7px" }}
                          />
                          {project.soldPercentage}%
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
