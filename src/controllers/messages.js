const Mensaje = require('../models/message');

const getChat = async (req, res) => {

    const myUid = req.uid;
    const messageOf = req.params.of;

    const last30 = await Mensaje.find({
        $or: [{ of: myUid, for: messageOf }, { of: messageOf, for: myUid }]
    })
    .sort({ createdAt: 'desc' })
    .limit(30);

    res.json({
        ok: true,
        msg: last30
    })

}



module.exports = {
    getChat,
}