import Publication from "../models/Publication.js";

export const createPublication = async (
  req,
  res
) => {
  try {

    const publication =
      await Publication.create(req.body);

    res.status(201).json({
      message:
        "Publication created successfully",
      publication,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};