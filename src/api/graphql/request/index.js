/* eslint-disable no-console, import/extensions */
/* eslint-disable no-nested-ternary */
const { GraphQLClient } = require('graphql-request');
const { graphqlEndpoint, storeCode } = require('../../../../swift.config');

const { decrypt } = require('../../../../core/helpers/encryption');
const { getAppEnv } = require('../../../../core/helpers/env');

function requestGraph(query, variables = {}, context = {}, config = {}) {
    let token = '';
    if (config.token) {
        token = `Bearer ${config.token}`;
    } else if (context.session || context.headers) {
        token = context.session.token ? `Bearer ${decrypt(context.session.token)}`
            : context.headers.authorization ? context.headers.authorization : '';
    }
    return new Promise((resolve) => {
        const additionalHeader = storeCode ? { store: storeCode } : {};
        if (token && token !== '') {
            additionalHeader.Authorization = token;
        }
        const headers = {
            ...additionalHeader,
        };
        const appEnv = getAppEnv();
        const client = new GraphQLClient(`${graphqlEndpoint[appEnv] || graphqlEndpoint.prod}`, {
            headers,
        });

        // console.log("headers", headers, context)
        client.request(query, variables).then((data) => resolve(data)).catch((err) => resolve(err));
    });
}

module.exports = requestGraph;