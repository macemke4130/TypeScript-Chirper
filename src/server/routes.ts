import * as express from 'express';

const router = express.Router();
const cs = require('./chirpstore');

router.get('/api/hello', (req, res, next) => {
    res.json('World');
});

router.get('/api/chirps/:id?', (req, res, next) => {
    let id = req.params.id;
    let chirps = id ? cs.GetChirp(id) : cs.GetChirps(); // If id exists, chirps = get one, else chirp = get all --

    if (id) { // Gets one or all depending on if ID exists --
        let singleChirp = {
            id, // implicit --
            user: chirps.user,
            msg: chirps.msg
        };
        res.json(singleChirp);
    } else {
        const parsedChirps = Object.keys(chirps).map(key => {
            return {
                id: Number(key),
                user: chirps[key].user,
                msg: chirps[key].msg
            }
        })
        parsedChirps.pop(); // Removes "nextid" from the end of the new array --
        res.json(parsedChirps);
    }
});

router.put('/api/chirps/:id', (req, res) => {
    let id = req.params.id;
    const updatedChirp = req.body;
    cs.UpdateChirp(id, updatedChirp);
    res.json({ msg: "Editing Chirp: " + id, details: updatedChirp });
});

export default router;