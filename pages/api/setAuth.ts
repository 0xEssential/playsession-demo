import Firebase from '../../utils/firebase';

export default async (req, res) => {
  const { table, key, obj } = req;
  const firebase = new Firebase();

  await firebase.createIfNotExists(table, key, obj);

  return res.send(JSON.stringify({ success: true }));
};
