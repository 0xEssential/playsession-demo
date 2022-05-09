export default async (req, res) => {
  const resp = await fetch(process.env.AUTOTASK_URI, {
    method: 'POST',
    body: req.body,
    headers: { 'Content-Type': 'application/json' },
  });

  return res.send(resp);
};
