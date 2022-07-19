/* eslint-disable no-param-reassign, import/extensions */
const requestGraph = require('../request');
const { encrypt } = require('../../../../core/helpers/encryption');

const query = `
    mutation getToken(
        $email: String!,
        $otp: String!,
    ) {
        generateCustomerToken(username: $email, otp: $otp){
        token
        }
    }
`;

const internalGenerateCustomerTokenOtp = async (parent, { email, otp }, context) => {
    const res = await requestGraph(query, { email, otp }, context);
    // context.session.destroy();
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

module.exports = internalGenerateCustomerTokenOtp;
