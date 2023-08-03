function validateRequest(req, res, next) {
  try {
    const { value, startTimestamp, endTimestamp } = req.query;

    if (!value) {
      return res.status(400).send('Missing value parameter');
    }

    const startDate = startTimestamp ? new Date(startTimestamp) : undefined;
    const endDate = endTimestamp ? new Date(endTimestamp) : undefined;

    if (startTimestamp && startDate.toString() === 'Invalid Date') {
      return res.status(400).send('Invalid startTimestamp parameter');
    }

    if (endTimestamp && endDate.toString() === 'Invalid Date') {
      return res.status(400).send('Invalid endTimestamp parameter');
    }

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).send('Request failed');
  }
}

module.exports = {
  validateRequest,
};