module.exports = (err, req, res, next) => {
  console.error('ERROR:', err);
  if (err.stack) console.error('STACK:', err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    details: err.stack || err
  });
};
