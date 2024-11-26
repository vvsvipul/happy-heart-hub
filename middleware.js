const Record=require("./models/record")


module.exports.isLoggedIn= async (req,res,next)=>{
    if(!await req.isAuthenticated())
    {
      req.session.redirectUrl = req.originalUrl;
      req.flash("error","user is not logged in".toLocaleUpperCase())
      return res.redirect("/login")
    }
    next()
}

module.exports.saveRedirectUrl = (req,res,next)=>{
  if(req.session.redirectUrl)
  {
    res.locals.redirectUrl = req.session.redirectUrl
  }
  next();
}

module.exports.isOwner =async(req,res,next)=>{
  let { id } = req.params;
    let record = await Record.findById(id);
    if(!record.owner._id.equals(res.locals.currUser._id))
    {
      req.flash("error","you don't have permission to perform this task");
      return res.redirect(`/listings/${id}`)
    }

    next()
}
