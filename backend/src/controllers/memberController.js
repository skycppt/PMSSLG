import Member from "../models/Member.js";

// ==========================
// CREATE MEMBER
// ==========================
export const createMember = async (req, res) => {
  try {

    // Find latest member
    const lastMember = await Member.findOne().sort({ createdAt: -1 });

    let memberId = "SNM000001";

    if (lastMember) {

      const lastNumber = parseInt(
        lastMember.memberId.replace("SNM", "")
      );

      memberId =
        "SNM" +
        String(lastNumber + 1).padStart(6, "0");
    }

    const member = await Member.create({
      memberId,
      fullName: req.body.fullName,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      status: req.body.status || "Active",
      joinedDate: new Date(),
    });

    res.status(201).json({
      message: "Member created successfully",
      member,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ==========================
// GET ALL MEMBERS
// ==========================
export const getAllMembers = async (req, res) => {

  try {

    const members = await Member.find().sort({
      createdAt: -1,
    });

    res.status(200).json(members);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// ==========================
// GET MEMBER BY ID
// ==========================
export const getMemberById = async (req, res) => {

  try {

    const member = await Member.findById(
      req.params.id
    );

    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    res.status(200).json(member);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// ==========================
// UPDATE MEMBER
// ==========================
export const updateMember = async (req, res) => {

  try {

    const member = await Member.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    res.status(200).json({
      message: "Member updated successfully",
      member,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// ==========================
// DELETE MEMBER
// ==========================
export const deleteMember = async (req, res) => {

  try {

    const member = await Member.findByIdAndDelete(
      req.params.id
    );

    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    res.status(200).json({
      message: "Member deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// ==========================
// SEARCH MEMBERS
// ==========================
export const searchMembers = async (req, res) => {

  try {

    const keyword = req.query.keyword || "";

    const members = await Member.find({

      $or: [

        {
          fullName: {
            $regex: keyword,
            $options: "i",
          },
        },

        {
          memberId: {
            $regex: keyword,
            $options: "i",
          },
        },

        {
          phone: {
            $regex: keyword,
            $options: "i",
          },
        },

      ],

    });

    res.status(200).json(members);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};