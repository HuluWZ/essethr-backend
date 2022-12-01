const { LeaveAllowanceDAO, LeaveDAO } = require("../dao/leaveDAO");

class LeaveController {
  static async apiAllocateAllowance(req, res) {
    const leaveAllowanceInfo = req.body;
    const result = await LeaveAllowanceDAO.allocateAllowance(
      leaveAllowanceInfo
    );
    if (result.error) {
      return res
        .status(500)
        .json({ success: false, error: "Internal error, try again later." });
    }
    return res.status(201).json({
      success: true,
      message: "Leave allowance allocated",
    });
  }

  static async apiUseAllowance(req, res) {
    const useDetails = req.body;
    const result = await LeaveAllowanceDAO.updateAllowance(useDetails);
    if (result.error) {
      return res
        .status(500)
        .json({ success: false, error: "Internal error, try again later." });
    }
    return res.status(201).json({
      success: true,
      message: "Allowance used",
    });
  }

  static async apiGetAllowances(req, res) {
    console.log("Entering allowances handler...");
    const result = await LeaveAllowanceDAO.getAllowances();
    console.log("Entered allowances handler...");
    if (result.error) {
      return res
        .status(500)
        .json({ success: false, error: "Internal error, try again later." });
    }
    return res.status(201).json({
      success: true,
      allowances: result,
    });
  }

  static async apiGetLeaves(req, res) {
    const result = await LeaveDAO.getLeaves({ ...req.query, org: req.org });

    if (result.error) {
      return res.status(result.server ? 500 : 400).json({
        success: false,
        error: result.server
          ? "Internal error, try again later."
          : result.error,
      });
    }

    return res.status(200).json({
      success: true,
      leaves: result,
    });
  }

  static async apiGetLeaveById(req, res) {
    const result = await LeaveDAO.getLeaveById(req.params.id);

    if (result.error) {
      return res.status(result.server ? 500 : 400).json({
        success: false,
        error: result.server
          ? "Internal error, try again later."
          : result.error,
      });
    }

    return res.status(200).json({
      success: true,
      leave: result,
    });
  }

  static async apiAddLeave(req, res) {
    const result = await LeaveDAO.addLeave({ org: req.org, ...req.body });

    if (result.error) {
      return res.status(result.server ? 500 : 400).json({
        success: false,
        error: result.server
          ? "Internal error, try again later."
          : result.error,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Leave request added",
    });
  }

  static async apiApproveLeaves(req, res) {
    const result = await LeaveDAO.approveLeaves({
      ...req.body,
    });

    if (result.error) {
      return res.status(result.server ? 500 : 400).json({
        success: false,
        error: result.server
          ? "Internal error, try again later."
          : result.error,
      });
    }

    return res.status(200).json({
      success: result.upsertedCount > 0,
      message: `${
        result.modifiedCount === 0
          ? "Leave could not be approved"
          : result.modifiedCount > 1
          ? result.modifiedCount + " leaves approved"
          : "Leave approved"
      }`,
    });
  }

  static async apiUpdateLeave(req, res) {
    const result = await LeaveDAO.updateLeave({
      ...req.body,
      _id: req.params.id,
    });

    if (result.error) {
      return res.status(result.server ? 500 : 400).json({
        success: false,
        error: result.server
          ? "Internal error, try again later."
          : result.error,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Leave updated",
    });
  }

  static async apiDeleteLeave(req, res) {
    const result = await LeaveDAO.deleteLeave(req.params.id);

    if (result.error) {
      return res.status(result.server ? 500 : 400).json({
        success: false,
        error: result.server
          ? "Internal error, try again later."
          : result.error,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Leave deleted",
    });
  }

  static async apiGetReport(req, res) {
    const result = await LeaveDAO.getReport({ org: req.org, ...req.query });

    if (result.error) {
      return res.status(result.server ? 500 : 400).json({
        success: false,
        error: result.server ? "Something went wrong" : result.error,
      });
    }

    return res.json({
      success: true,
      report: result,
    });
  }
}

module.exports = LeaveController;
