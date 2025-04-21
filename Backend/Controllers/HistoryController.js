const History = require("../Models/HistoryModel.js");


const GetHistory = async (req, res) => {
    try {
      const email = req.user?.Email;
  
      const userHistory = await History.findOne({ userEmail: email });
  
      if (!userHistory || userHistory.history.length === 0) {
        return res.status(200).json({ Msg: "No history found", Data: [] });
      }
  
      return res.status(200).json({ Msg: "History found", Data: userHistory.history });
    } catch (err) {
      console.error("Error in GetHistory:", err);
      res.status(500).json({ error: "Something went wrong" });
    }
  };
  
const HistoryController = async (req, res) => {
  try {
    const email = req.user?.Email;

    let { Resume_Degree, JD_Degree, Resume_CGPA, JD_CGPA, Suggestions, Score } = req.body;

    console.log("Incoming body:", req.body);

    if (Array.isArray(Suggestions)) {
      Suggestions = Suggestions.join(', '); 
    }

    let userHistory = await History.findOne({ userEmail: email });

    const newEntry = {
      Resume_Degree,
      JD_Degree,
      Resume_CGPA,
      JD_CGPA,
      Suggestions,
      Score,
    };

    if (userHistory) {
      userHistory.history.push(newEntry);
      await userHistory.save();
    } else {
      userHistory = new History({
        userEmail: email,
        history: [newEntry],
      });
      await userHistory.save();
    }

    res.status(200).json({ message: "History updated successfully", data: userHistory.history });

  } catch (err) {
    console.error("Error in HistoryController:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { HistoryController,GetHistory};
