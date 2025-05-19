module.exports = function checkOwnership(model, paramId = 'id') {
    return async (req, res, next) => {
        try {
            const resourceId = req.params[paramId];
            const userId = req.user.userId;
    
            const resource = await model.findByPk(resourceId);
    
            if (!resource) {
                return res.status(404).json({ message: `${model.name} not found.` });
            }

            if (resource.userId !== userId) {
                return res.status(403).json({ message: `You are not authorized to access this ${model.name}.` });
            }

            req.resource = resource;
    
            next();
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error.' });
        }
    };
};
