const { connection } = require('../models/connection');

const generateCode = (count, code) => {
    count++;
    if(count < 10) {
        code += `00${count}`; 
    } else if(count >= 10 && count <= 99) {
        code += `0${count}`;
    } else {
        code += `${count}`;
    }
    return code;
}
const generateItemCode = (count, category) => {
    category = category.toUpperCase();
    if(category === 'CONSUMABLES') return generateCode(count, 'CM');
    let code;
    const stringArr = category.split(" ");
    if(stringArr.length === 1) {
        code =  category.substring(0, 2);
    } else {
        code = stringArr[0].substring(0, 1) + stringArr[1].substring(0, 1);
    }
    return generateCode(count, code);
}
const execQuery = (query) => {
    return new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
            if (err) return reject(err)
            return resolve(result);
        })
    })
}

exports.generateCode = generateCode;
exports.generateItemCode = generateItemCode;
exports.execQuery = execQuery;