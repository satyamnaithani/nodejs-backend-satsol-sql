const { execQuery } = require('../lib/commonFunctions');

exports.get_all_sales = (req, res, next) => {
    const query = 'SELECT * FROM purchase_item WHERE quantity > 0;';
    execQuery(query)
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
}

exports.create_sales = () => {
    const query = ''
}