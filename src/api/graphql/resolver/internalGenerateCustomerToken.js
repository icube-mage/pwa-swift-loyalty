/* eslint-disable no-param-reassign, import/extensions */
const requestGraph = require('../request');
const { encrypt } = require('../../../../core/helpers/encryption');

const query = `
    mutation getToken(
        $email: String!,
        $password: String!,
    ) {
        generateCustomerToken(email: $email, password: $password){
        token
        }
    }
`;

const internalGenerateCustomerToken = async (parent, { email, password }, context) => {
    const res = await requestGraph(query, { email, password }, context);
    // context.session.destroy();
    console.log('non custom', res.generateCustomerToken);
    if (res.generateCustomerToken) {
        context.session.token = encrypt(res.generateCustomerToken.token);
        return {
            originalToken: res.generateCustomerToken.token,
            token: encrypt(res.generateCustomerToken.token),
            message: 'welcome',
        };
    }
    return res;
};

module.exports = internalGenerateCustomerToken;
