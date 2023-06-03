module.exports = function (options) {
    //Import the mock data json file
    const mockData = require('./MOCK_DATA.json');
    //Add the patterns and their corresponding functions
    this.add('role:product,cmd:getProductPrice', productPrice);

    //add the pattern functions and describe the logic inside the function
    function productPrice(msg, respond) {
        if (msg.productId) {
            var res = mockData.find(function (item) {
                return item.product_id == msg.productId;
            });
            respond(null, { result: res.product_price });
        }
        else {
            respond(null, { result: '' });
        }
    }
}