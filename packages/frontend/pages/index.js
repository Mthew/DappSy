import React, { useState, useEffect } from "react";
import Image from "next/image";
import Layout from "../components/Layout";
import { Row, Col } from "antd";
import axios from "axios";

const products = [
  {
    id: 1,
    name: "Apartamento Alameda",
    href: "/project",
    imageSrc: "/1.jpeg",
    imageAlt: "Front of men's Basic Tee in black.",
    tokenCount: 100,
    tokenPrice: 200,
    percentage: 60,
    price: "$35",
    color: "Black",
  },
  {
    id: 2,
    name: "Apartamento Alameda",
    href: "/project",
    imageSrc: "/1.jpeg",
    imageAlt: "Front of men's Basic Tee in black.",
    tokenCount: 100,
    tokenPrice: 200,
    percentage: 60,
    price: "$35",
    color: "Black",
  },
  {
    id: 3,
    name: "Apartamento Alameda",
    href: "/project",
    imageSrc: "/1.jpeg",
    imageAlt: "Front of men's Basic Tee in black.",
    tokenCount: 100,
    tokenPrice: 200,
    percentage: 60,
    price: "$35",
    color: "Black",
  },
  {
    id: 4,
    name: "Apartamento Alameda",
    href: "/project",
    imageSrc: "/1.jpeg",
    imageAlt: "Front of men's Basic Tee in black.",
    tokenCount: 100,
    tokenPrice: 200,
    percentage: 60,
    price: "$35",
    color: "Black",
  },
  {
    id: 4,
    name: "Apartamento Alameda",
    href: "/project",
    imageSrc: "/1.jpeg",
    imageAlt: "Front of men's Basic Tee in black.",
    tokenCount: 100,
    tokenPrice: 200,
    percentage: 60,
    price: "$35",
    color: "Black",
  },
  {
    id: 4,
    name: "Apartamento Alameda",
    href: "/project",
    imageSrc: "/1.jpeg",
    imageAlt: "Front of men's Basic Tee in black.",
    tokenCount: 100,
    tokenPrice: 200,
    percentage: 60,
    price: "$35",
    color: "Black",
  },
  // More products...
];

export default () => {
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
    <Layout>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Customers also purchased
          </h2>

          <Row className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {data != null &&
              data.map((product) => (
                <Col key={product.id} className="group relative">
                  <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                    <img
                      src={product.imageSrc || "/2.jpeg"}
                      alt={product.imageAlt}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href={product.href}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.name}
                        </a>
                      </h3>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {product.price}
                    </p>
                  </div>
                </Col>
              ))}
            {products.map((product) => (
              <Col key={product.id} className="group relative">
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {product.price}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </Layout>
  );
};
