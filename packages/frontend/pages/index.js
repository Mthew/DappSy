import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";

export default () => {
  const [data, setData] = useState('JYE');
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/login");
      console.log('RESPONSE ==>', res);
      // const json = await res.json();
      // if (json) {
      //   setData(json);
      // }
    };
    fetchData();
  }, []);
  return (
    <Layout>
      <h1>HOLA</h1>
      <p>{data}</p>
    </Layout>
  );
};
