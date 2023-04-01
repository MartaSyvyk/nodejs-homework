const { Contact } = require("../service/schemas/contact");
const createError = require("http-errors");

const getAll = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { page, limit, favorite } = req.query;
    const queryObject = {
      owner: _id,
    };
    if (favorite) {
      queryObject.favorite = favorite;
    }
    const skip = (page - 1) * limit;

    const data = await Contact.find(queryObject, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id name email");
    res.json({
      status: "success",
      code: 200,
      result: data,
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { _id } = req.user;
    const { page, limit } = req.query;
    const skip = (page - 1) * limit;
    if (contactId.match(/^[0-9a-fA-F]{24}$/)) {
      const data = await Contact.findById(contactId, "", {
        skip,
        limit: Number(limit),
      }).populate("owner", "_id name email");
      if (data.owner._id.toString() !== _id.toString()) {
        console.log(data.owner._id.toString(), _id.toString());
        const err = createError(401, "Not authorized");
        throw err;
      }
      res.json({
        status: "success",
        code: 200,
        result: data,
      });
    }

    const err = createError(404, `Contact with id ${contactId} not found`);

    throw err;
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const data = await Contact.create({ ...req.body, owner: _id });
    res.status(201).json({
      status: "success",
      code: 201,
      result: {
        data,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const { _id } = req.user;

    if (contactId.match(/^[0-9a-fA-F]{24}$/)) {
      const data = await Contact.findOneAndRemove({
        _id: contactId,
        owner: _id,
      });

      res.json({
        status: "success",
        code: 200,
        message: "contact deleted",
        result: {
          data,
        },
      });
    }

    const err = createError(404, `Contact with id ${contactId} not found`);

    throw err;
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const { contactId } = req.params;

    if (contactId.match(/^[0-9a-fA-F]{24}$/)) {
      const data = await Contact.findByIdAndUpdate(
        { _id: contactId },
        { ...req.body, owner: _id },
        { new: true }
      );
      res.json({
        status: "success",
        code: 200,
        result: {
          data,
        },
      });
    }

    const err = createError(404, `Contact with id ${contactId} not found`);

    throw err;
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const { contactId } = req.params;

    if (!req.body) {
      const error = new Error("missing field favorite");
      error.status = 400;
      throw error;
    }
    const { favorite } = req.body;
    if (contactId.match(/^[0-9a-fA-F]{24}$/)) {
      const data = await Contact.findByIdAndUpdate(
        { _id: contactId, owner: _id },
        { favorite },
        { new: true }
      );
      res.json({
        status: "success",
        code: 200,
        result: {
          data,
        },
      });
    }

    const err = createError(404, "Not found");

    throw err;
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  update,
  updateStatusContact,
};
