import Firebase from '../../utils/firebase';

export default async (req, res) => {
  const { table, obj } = JSON.parse(req.body);
  const firebase = new Firebase();

  const item = await firebase.readRecordFromFirebase(table, obj);

  return res.send(JSON.stringify(item));
};
