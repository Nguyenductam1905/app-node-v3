"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCreateUser = exports.getCreateUserPage = exports.getHomePage = void 0;
const user_services_1 = require("../services/user.services");
const getHomePage = (req, res) => {
    res.render('home.ejs', { name: 'Tam', age: 21 });
};
exports.getHomePage = getHomePage;
const getCreateUserPage = (req, res) => {
    res.render("create-user");
};
exports.getCreateUserPage = getCreateUserPage;
const postCreateUser = (req, res) => {
    const info = req.body;
    const { name, email, address } = info;
    (0, user_services_1.handleCreateUser)(name, email, address);
    res.redirect("/");
};
exports.postCreateUser = postCreateUser;
//# sourceMappingURL=user.controller.js.map