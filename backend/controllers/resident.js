const router = require("express").Router();
const Resident = require("../models/residents");
const verify = require("../verifyToken");

// ***********************************************************************************************************************
// CREATE resident
// ***********************************************************************************************************************

router.post("/", verify, async (req, res) => {
  try {
    const newResident = await Resident.create(req.body);
    res.status(201).send(newResident);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ***********************************************************************************************************************
// UPDATE resident
// ***********************************************************************************************************************

router.put("/:id", verify, async (req, res) => {
  try {
    const updatedresident = await Resident.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedresident);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ***********************************************************************************************************************
// DELETE resident
// ***********************************************************************************************************************

router.delete("/:id", verify, async (req, res) => {
  try {
    await Resident.findByIdAndDelete(req.params.id);
    res.status(200).json("Resident Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// ***********************************************************************************************************************
// GET SINGLE resident
// ***********************************************************************************************************************

router.get("/find/:id", verify, async (req, res) => {
  try {
    const resident = await Resident.findById(req.params.id);
    res.status(200).json(resident);
  } catch (err) {
    res.status(500).json(err);
  }
});

//--------search-------------------------------------------------------------------------------------------------------------------------------
router.get("/search", verify, async (req, res) => {
  try {
    let term = req.query.s;

    let result = await Resident.find({ $text: { $search: term } })
      .lean()
      .exec();

    return res.status(201).send({ result });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ***********************************************************************************************************************
// GET ALL resident
// ***********************************************************************************************************************

router.get("/", verify, async (req, res) => {
  try {
    const residents = await Resident.find();
    res.status(201).send(residents);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
