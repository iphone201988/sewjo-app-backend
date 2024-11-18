const removeEmptyValues = (obj) => {
  const newObj = {};
  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      if (Array.isArray(obj[key])) {
        newObj[key] = obj[key].filter((value) => value !== null);
      } else {
        newObj[key] = removeEmptyValues(obj[key]);
      }
    } else if (obj[key] !== "" && obj[key] !== null) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};

const validate = (schema) => {
  return async (req, res, next) => {
    try {
      req.body = removeEmptyValues(req.body);
      req.query = removeEmptyValues(req.query);
      req.params = removeEmptyValues(req.params);

      const validationErrors = [];

      const validateField = (field, data) => {
        if (schema[field]) {
          const result = schema[field].validate(data, { abortEarly: false });
          if (result.error) {
            validationErrors.push(
              ...result.error.details.map((error) => error.message)
            );
          }
        }
      };

      validateField("params", req.params);
      validateField("query", req.query);
      validateField("body", req.body);

      if (validationErrors.length > 0) {
        return res.status(400).json({
          success: false,
          message: validationErrors[0],
          details: validationErrors,
        });
      }
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "An unexpected error occurred during validation.",
      });
    }
  };
};

export default validate;
