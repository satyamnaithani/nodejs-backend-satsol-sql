const { generateCode, execQuery } = require('../lib/commonFunctions');
exports.get_all_customers = (req, res, next) => {
    execQuery('select code, name, address, city, state, zip, gst, dl, contact, person from customers;')
    .then((result) => res.status(200).json(parseData(result)))
    .catch((err) => console.log(err));
}

exports.create_customer = (req, res, next) => {
    const query1 = `SELECT COUNT(*) AS count FROM customers;`;
    execQuery(query1).then((result) => {
        const { name, address, city, state, zip, gst, dl, contact, person } = req.body;
        const code = generateCode(result[0].count, 'CR');
        const query2 = `INSERT INTO customers (code, name, address, city, state, zip, gst, dl, contact, person) VALUES ('${code}', '${name}', '${address}', '${city}', '${state}', '${zip}', '${gst}', '${dl}', '${contact}', '${person}');`;
        execQuery(query2)
        .then((result) => res.status(200).json(result))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
    
}

const parseData = (result) => {
    let arr=[];
        result.forEach((result) => {
            const { code, name, address, city, state, zip, gst, dl, contact, person} = JSON.parse(JSON.stringify(result));
            const customer = {
                code: code,
                name: name,
                address: `${address}, ${state}, ${city}-${zip}`,
                gst: gst,
                dl: dl,
                contact: contact,
                person: person 
            }
            arr.push(customer);
        });
    return arr;
}