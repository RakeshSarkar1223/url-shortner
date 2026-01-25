const { nanoid } = require("nanoid");

const shortId = (length) => nanoid(length);

module.exports = shortId;
