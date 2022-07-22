/* eslint-disable no-param-reassign */
const requestGraph = require('../request');
const { encrypt } = require('../../../helpers/encryption');

const query = `
    mutation register(
        $firstname: String!,
        $lastname: String,
        $email: String!,
        $password: String!,
        $phonenumber: String!,
        $whatsapp_number: String!,
    ) {
        createCustomerLoyalty(
            input: {
              firstname: $firstname,
              lastname: $lastname,
              email: $email,
              password: $password,
              whatsapp_number: $whatsapp_number,
              phonenumber: $phonenumber
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
        phonenumber: args.input.phonenumber,
        whatsapp_number: args.input.whatsapp_number,
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
