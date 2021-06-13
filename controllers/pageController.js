exports.getIndexPage = (req, res) => 
{
  res.status(200).render("index");
};

exports.getAboutPage = (req, res) => 
{
  res.status(200).render("about");
};

exports.getContactPage = (req, res) => 
{
  res.status(200).render("contact");
};

exports.getServicePage = (req, res) => 
{
  res.status(200).render("service");
};

exports.getTeamPage = (req, res) => 
{
  res.status(200).render("team");
};
