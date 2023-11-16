import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";

const data = [
    {
      Date: "2010-01",
      scales: 1998,
    },
    {
      Date: "2010-02",
      scales: 1850,
    },
    {
      Date: "2010-03",
      scales: 1720,
    },
    {
      Date: "2010-04",
      scales: 1818,
    },
  ];

export const SalehistoryChart = () => (
  <LineChart
    width={500}
    height={300}
    data={data}
    margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    className="bg-primary text-white"
  >
    <Line type="monotone" dataKey="scales" stroke="#8884d8" />
    {/* <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> */}
    <XAxis dataKey="Date" color="white"/>
    <YAxis dataKey="scales" color="#ffffff"/>
    <Tooltip />
    <Legend />
  </LineChart>
);
