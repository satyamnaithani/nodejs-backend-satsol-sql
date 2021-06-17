const { connection } = require('../models/connection.js');

exports.get_all_purchases = (req, res, next) => {
    const query = `
    SELECT p.bill_no, p.bill_date, p.receive_date, v.name AS vendor, v.city,
    GROUP_CONCAT(CONCAT('{"code":"', i.code, '", "name":"',i.name,'", "lot":"',pt.lot_no,'", "exp":"',pt.exp,'", "gst":"',i.gst,'"}')) item_list
    FROM purchase p
    INNER JOIN purchase_item pt
    ON p._id=pt.purchase_id
    INNER JOIN items i
    ON pt.item_id=i._id
    INNER JOIN vendors v
    ON p.vendor_id=v._id
    GROUP BY p.bill_no, p.bill_date
    `;
    connection.query(query, (err, result) => {
        if (err) res.status(500).json(err);
        return res.status(200).json(result);
    });
}

exports.create_purchase = async (req, res, next) => {
    const { vendor_id, bill_no, bill_date, receive_date, items } = req.body;
    connection.getConnection(function(err, con) {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
        console.log('connected as id ' + con.threadId);
        con.beginTransaction((err) => {
            if (err) {
                res.status(500).json(err);
                throw err;
            }; 
            const q1 = `INSERT INTO purchase (vendor_id, bill_no, bill_date, receive_date) VALUES ('${vendor_id}', '${bill_no}', '${bill_date}', '${receive_date}');`;
            con.query(q1,(err, result) => {
                if (err) con.rollback(() => {throw err});
                let purchase_id = result.insertId;
                let str = "";
                items.forEach(({lot_no, exp, item_id, quantity, rate}) => str += `('${lot_no}', '${exp}', '${item_id}', '${purchase_id}', '${quantity}', '${quantity}', '${rate}'),`)
                str = str.substring(0, str.length - 1);
                const q2 = `INSERT INTO purchase_item (lot_no, exp, item_id, purchase_id, initial_quantity, quantity, rate) VALUES ${str}`;
                con.query(q2, (err, result) => {
                    if (err) con.rollback(() => {throw err});
                    con.commit((err) => {
                        if (err) con.rollback(() => {throw err;});
                        console.log('Purchase Transaction Complete.');
                        res.status(201).json(result);
                        con.release();
                    });
                });
            });
        });
    });
}