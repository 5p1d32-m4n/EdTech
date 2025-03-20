const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack); // Log the error for debugging.

    // Default error responses
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    // Customize error response based on error type.
    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: 'Validation error', errors: err.errors })
    }
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    if (err.name === 'NotFoundError') {
        return res.status(404).json({ message: 'Resource not found' })
    }
    if (err.name === '23505') {
        return res.status(409).json({ message: 'Duplicate entry', field: err.detail });
    }

    res.status(statusCode).json({ message })
}

module.exports = errorMiddleware