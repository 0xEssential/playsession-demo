export default async (req, res) => {
  const resp = await fetch(process.env.AUTOTASK_URI, {
    method: 'POST',
    body: JSON.stringify(req.body),
    headers: { 'Content-Type': 'application/json' },
  }).then((resp) => resp.json());

  return res.send(JSON.stringify(resp));
};
