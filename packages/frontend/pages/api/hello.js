// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import db from "../../utils/db/server";

export default async function handler(req, res) {
  // const entries = await db.collection("user").get();
  // const entriesData = entries.docs.map((entry) => entry.data());

  // const item = { name: "John Doe" };
  // const { id } = await db.collection("user").add({
  //   name: "Marlon",
  //   created: new Date().toISOString(),
  // });

  // console.log("CREATED ===>", id, entriesData);

  res.status(200).json(item);
}
