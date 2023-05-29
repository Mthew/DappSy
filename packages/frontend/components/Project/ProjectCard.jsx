import React, { useContext } from "react";
import NextLink from "next/link";
import { Progress, Avatar, Card } from "antd";

//context
import { ProjectContext } from "../../context";
import { showPercentage } from "../../utils";

const { Meta } = Card;

function ProjectCard({ data, loadData }) {
  const { getProjectById } = useContext(ProjectContext);

  if (!data) {
    return <></>;
  }

  if (data.id && loadData) {
    data = getProjectById(data.id);
  }

  const {
    id,
    name,
    imgs,
    tokenCount,
    tokenCost,
    tokenPercentage,
    soldPercentage,
    owner,
    creationDate,
  } = data;

  return (
    <NextLink href={`/project/${id}`}>
      <div className="bg-white rounded-lg Open Sans cursor-pointer">
        <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
          <img
            src={(imgs || ["/2.jpeg"])[0] || "/2.jpeg"}
            alt={"Project image"}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="p-3">
          <div>
            <h3 className="text-xl text-gray-700">
              <a href={`/project/${id}`}>
                <span aria-hidden="true" className="" />
                {name}
              </a>
            </h3>
          </div>
          <div className="text-sm mt-3 font-medium">
            <div className=" flex justify-between ">
              <p>Volumen:</p>
              <p className="my-1 text-gray-500">
                {`${tokenCount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </p>
            </div>
            <div className=" flex justify-between ">
              <p>Precio del token:</p>
              <p className="my-1 text-gray-500">
                {`$ ${tokenCost}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </p>
            </div>
            <div className=" flex justify-between ">
              <p>% de participacion:</p>
              <p className="my-1 text-gray-500">{`${showPercentage(
                tokenPercentage
              )}`}</p>
            </div>

            <div className=" flex justify-between ">
              <p>Vendido:</p>
              <div className=" text-gray-500 w-2/4 flex justify-between my-1 ">
                <Progress
                  percent={soldPercentage}
                  strokeColor={"#11CDEF"}
                  showInfo={false}
                  style={{ marginRight: "7px" }}
                />
                {showPercentage(soldPercentage)}
              </div>
            </div>

            {owner && (
              <Meta
                avatar={
                  <Avatar
                    src={
                      owner?.img ||
                      "https://xsgames.co/randomusers/avatar.php?g=pixel"
                    }
                  />
                }
                title={owner?.name}
                description={creationDate}
              />
            )}
          </div>
        </div>
      </div>
    </NextLink>
  );
}

export default ProjectCard;
