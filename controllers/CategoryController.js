const { getAllCategories } = require("../services/CategoryService");

module.exports = {
    getAllCategories: async (req,res) => {
        const result = await getAllCategories();
        res.status(result.status).send(result.data);
    },
    getCategoryById: async (req,res) => {
        const result = await getCategoryById(req.body);
        res.status(result.status).send(result.data);
    },
    addCategory: async (req,res) => {
        if (req.user.is_admin) {
            const result = await addCategory(req.body);
            res.status(result.status).send(result.data);
        }
        else {
            res.sendStatus(403);
        }
    },
    editCategory: async (req,res) => {
        if (req.user.is_admin) {
            const data = req.body;
            data.id = req.params.id;
            const result = await addCategory();
            res.status(result.status).send(result.data);
        }
        else {
            res.sendStatus(403);
        }
    },
};