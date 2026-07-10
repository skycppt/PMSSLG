import Publication from "../models/Publication.js";

// CREATE
export const createPublication = async (req, res) => {
  try {

    const publication = await Publication.create(req.body);

    res.status(201).json({
      message: "Publication created successfully",
      publication,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// GET ALL
export const getAllPublications = async (req, res) => {
  try {

    const publications = await Publication.aggregate([
  {
    $lookup: {
      from: "subscriptions",
      let: { publicationId: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$publication", "$$publicationId"],
            },
            status: "Active",
          },
        },
      ],
      as: "activeSubscriptions",
    },
  },
  {
    $addFields: {
      subscriberCount: {
        $size: "$activeSubscriptions",
      },
    },
  },
]);

    res.status(200).json(publications);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// GET BY ID
export const getPublicationById = async (req, res) => {
  try {

    const publication = await Publication.findById(req.params.id);

    if (!publication) {
      return res.status(404).json({
        message: "Publication not found",
      });
    }

    res.status(200).json(publication);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// UPDATE
export const updatePublication = async (req, res) => {
  try {

    const publication = await Publication.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!publication) {
      return res.status(404).json({
        message: "Publication not found",
      });
    }

    res.status(200).json({
      message: "Publication updated successfully",
      publication,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// DELETE
export const deletePublication = async (req, res) => {
  try {

    const publication = await Publication.findByIdAndDelete(
      req.params.id
    );

    if (!publication) {
      return res.status(404).json({
        message: "Publication not found",
      });
    }

    res.status(200).json({
      message: "Publication deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

