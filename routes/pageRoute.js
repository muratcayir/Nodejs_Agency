const express = require("express");
const pageController = require('../controllers/pageController')

const router = express.Router()


router.route('/').get(pageController.getIndexPage);

router.route("/about").get(pageController.getAboutPage)

router.route("/contact").get(pageController.getContactPage)

router.route("/service").get(pageController.getServicePage)

router.route("/team").get(pageController.getTeamPage)


module.exports=router;