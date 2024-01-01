export default async function handler(req, res) {
  console.log("req : ", req.body);
  try {
    const response = await fetch(
      `https://paace-f178cafcae7b.nevacloud.io/api/notes/update/${req.query.id}`,
      {
        method: "PATCH",
        body: req.body,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
