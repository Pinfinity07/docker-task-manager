function validate(schema, data) {
  const result = schema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      error: result.error.issues[0].message,
    };
  }

  return {
    success: true,
    data: result.data,
  };
}

module.exports = validate;