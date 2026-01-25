const User = require("../model/user");
const URLs = require("../model/urls");
const shortId = require("../utils/shortId");

const generate = async (data) => {
  const { originalUrl } = data.body;
  const newShortId = shortId(8);
  const { _id } = data.user;
  const newUrl = new URLs({
    originalUrl: originalUrl,
    shortId: newShortId,
    createdBy: _id,
  });
  // console.log(data.user._id + " " + data.body.originalUrl)

  await newUrl.save();
  const user = await User.findOneAndUpdate(
    { _id },
    { $push: { urls: newUrl._id } },
    { new: true },
  );
  return { newUrl, user };
};


const redirect = async (data) => {
    const {shortId} = data.params;
    const url = await URLs.findOneAndUpdate(
        {shortId},
        {$inc:{clicks:1}},
        {new : true}
    );
    return url;
}

module.exports = { generate , redirect};
