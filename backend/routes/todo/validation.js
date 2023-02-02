exports.createSchema = {
  content: {
    in: ["body"],
    errorMessage: "Please provide content.",
    isString: true,
  },
};

exports.deleteSchema = {
  _id: {
    in: ["query"],
    errorMessage: "Please provide valid id to delete",
  },
};

exports.updateSchema = {
  _id: {
    in: "body",
    errorMessage: "please provide valid id",
  },
  isCompleted: {
    in: "body",
    errorMessage: "Please provide status to update.",
    isBoolean: true,
  },
};
