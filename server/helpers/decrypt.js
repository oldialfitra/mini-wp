const bcryptjs = require('bcryptjs')

module.exports = function check(password, hash) {
    return bcryptjs.compareSync(password, hash)
}