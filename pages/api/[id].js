import { db } from '../../firebase/admin'
export default (req, res) => {
    const { query } = req
    const { id } = query
    const ref = db.ref(`${id}/usfx`);
    ref.once("value", function(snapshot) {
        res.json(snapshot.val())
    });
}