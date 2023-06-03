module.exports = function (options) {
    //Import the mock data json file
    const mockData = require('./MOCK_DATA.json');

    //Add the patterns and their corresponding functions
    this.add('role:product,cmd:getProductURL', productURL);
    this.add('role:product,cmd:getProductName', productName);


    //add the pattern functions and describe the logic inside the function
    function productURL(msg, respond) {
        if (msg.productId) {
            var res = mockData.find(function (item) {
                return item.product_id == msg.productId;
            });
            respond(null, { result: res.product_url });
        }
        else {
            respond(null, { result: '' });
        }
    }
    function productName(msg, respond) {
        if (msg.productId) {
            var res = mockData.find(function (item) {
                return item.product_id == msg.productId;
            });
            respond(null, { result: res.product_name });
        }
        else {
            respond(null, { result: '' });
        }
    }


}