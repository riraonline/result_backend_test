const Member = require("../models/memberModel");
const bcrypt = require("bcrypt");

const getMemberData = async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const createMemberData = async (req, res) => {
  try {
    const newMember = new Member(req.body);
    const saveMember = await newMember.save();
    res.status(201).json(saveMember);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateMemberData = async (req, res) => {
  try {
    const member_id = req.params.uuid;
    const { code, name, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const updateMember = await Member.findOneAndUpdate(
      { member_id: member_id },
      { code, name, password: hashedPassword },
      { new: true }
    );

    if (!updateMember) {
      return res.status(404).json({ error: "Member tidak ditemukan" });
    }
    res.json(updateMember);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const deleteMemberData = async (req, res) => {
  try {
    const member_id = req.params.uuid;
    const deleteMember = await Member.findOneAndDelete(member_id);

    if (!deleteMember) {
      return res.status(404).json({ error: "Member tidak ditemukan" });
    }
    res.json({ message: "Member berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports = {
  getMemberData,
  createMemberData,
  updateMemberData,
  deleteMemberData,
};
