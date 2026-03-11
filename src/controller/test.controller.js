import test from "../service/test.service.js";

export const testController = (req, res) => {
  const message = test();

  res.json({
    success: true,
    message,
  });
};