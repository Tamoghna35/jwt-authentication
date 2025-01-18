const asyncHandler = (handlerFunction) => (
    function (req, res, next) {
        Promise.resolve(handlerFunction(req, res, next)).catch((error) => next(error))
    }
)
export default asyncHandler;