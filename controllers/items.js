const { generateItemCode, execQuery } = require('../lib/commonFunctions');
exports.get_all_items = (req, res, next) => {
    const query = 'SELECT code, name, category, hsn, gst, uom FROM items;';
    execQuery(query)
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
}

exports.create_item = async (req, res, next) => {
    const { name, hsn, gst, uom, mfg_name } = req.body;
    let { category } = req.body;
    category = category.toUpperCase();
    let code;
    const query1 = `SELECT COUNT(*) AS count FROM items WHERE category = '${category}';`;
    await execQuery(query1).then((result) => code = generateItemCode(result[0].count, category)).catch((err) => console.log(err));
    const query2 = `INSERT INTO items (code, name, category, hsn, gst, uom, mfg_name) VALUES ('${code}', '${name}', '${category}', '${hsn}', '${gst}', '${uom}', '${mfg_name}');`;
    await execQuery(query2).then((result) => res.status(200).json(result)).catch((err) => console.log(err));
}