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

export const getAllPublications = async (
  req,
  res
) => {
  try {

    const publications =
      await Publication.find({
        isActive: true,
      });

    res.status(200).json(
      publications
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


