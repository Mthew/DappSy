import React from "react";
import Image from "next/image";
import NextLink from "next/link";
import { Progress } from "antd";

function ProjectCard({ data }) {
  if (!data) {
    return <></>;
  }
  const {
    id,
    name,
    href,
    imgs,
    imageAlt,
    tokenCount,
    tokenPrice,
    percentage,
    soldPercentage,
    price,
    color,
  } = data;
  return (
    <NextLink href={`/project/${id}`}>
      <div className="bg-white rounded-lg Open Sans cursor-pointer">
        <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
          <img
            src={(imgs || ["/2.jpeg"])[0] || "/2.jpeg"}
            alt={imageAlt}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="p-3">
          <div>
            <h3 className="text-xl text-gray-700">
              <a href={href}>
                <span aria-hidden="true" className="" />
                {name}
              </a>
            </h3>
          </div>
          <div className="text-sm mt-3 font-medium">
            <div className=" flex justify-between ">
              <p>Volumen:</p>
              <p className="my-1 text-gray-500">{tokenCount}</p>
            </div>
            <div className=" flex justify-between ">
              <p>Valor del token:</p>
              <p className="my-1 text-gray-500">{tokenPrice}%</p>
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
                {soldPercentage}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </NextLink>
  );
}

export default ProjectCard;
