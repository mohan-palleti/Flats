const router = require("express").Router();
const Flat = require("../models/Flats");
const verify = require("../verifyToken");

// ***********************************************************************************************************************
// CREATE flat
// ***********************************************************************************************************************

router.post("/", verify, async (req, res) => {
  try {
    const newFlat = await Flat.create(req.body);
    res.status(201).send(newFlat);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET SINGLE flat
// ***********************************************************************************************************************

router.get("/find/:id", verify, async (req, res) => {
  try {
    const flat = await Flat.findById(req.params.id);
    res.status(200).json(flat);
  } catch (err) {
    res.status(500).json(err);
  }
});
// ***********************************************************************************************************************
// UPDATE flat
// ***********************************************************************************************************************

router.put("/:id", verify, async (req, res) => {
  try {
    const updatedFlat = await Flat.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedFlat);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ***********************************************************************************************************************
// DELETE flat
// ***********************************************************************************************************************

router.delete("/:id", verify, async (req, res) => {
  try {
    await Flat.findByIdAndDelete(req.params.id);
    res.status(200).json("Flat Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// ***********************************************************************************************************************

//--------search-------------------------------------------------------------------------------------------------------------------------------
router.get("/search", verify, async (req, res) => {
  try {
    let term = req.query.s;

    let result = await Flat.find({ $text: { $search: term } })
      .lean()
      .exec();

    return res.status(201).send({ result });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ***********************************************************************************************************************
// GET ALL flat
// ***********************************************************************************************************************

router.get("/", verify, async (req, res) => {
  try {
    const flats = await Flat.find()
      .populate({ path: "residents" })
      .lean()
      .exec();
    res.status(201).send(flats);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
