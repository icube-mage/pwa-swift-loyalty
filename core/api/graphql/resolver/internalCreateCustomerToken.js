/* eslint-disable no-param-reassign */
const requestGraph = require('../request');
const { encrypt } = require('../../../helpers/encryption');

const query = `
    mutation register(
        $firstname: String!,
        $lastname: String,
        $email: String!,
        $password: String!,
    ) {
        createCustomerLoyalty(
            input: {
              firstname: $firstname,
              lastname: $lastname,
              email: $email,
              password: $password,
            }
          ) {
            tokench
            tokenloyalty
        }
    }
`;

const internalCreateCustomerToken = async (parent, args, context) => {
    const variables = {
        firstname: args.input.firstname,
        lastname: args.input.lastname,
        email: args.input.email,
        password: args.input.password,
    };
    const res = await requestGraph(query, variables, context);
    // context.session.destroy();
    if (res.createCustomerLoyalty) {
        context.session.token = encrypt(res.createCustomerLoyalty.token);
        return {
            originalToken: res.createCustomerLoyalty.tokenloyalty,
            token: encrypt(res.createCustomerLoyalty.tokenloyalty),
            message: 'welcome',
        };
    }
    return res;
};

module.exports = internalCreateCustomerToken;
