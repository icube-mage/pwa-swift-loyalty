/* eslint-disable no-else-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in, import/prefer-default-export */

const generateQueriesCustom = (type, variables, sort = 'default') => {
    const ASC = 'ASC';
    const DESC = 'DESC';

    const queryVariables = {
        filter: {},
        sort: {},
    };
    let sortAttribute;

    if (type === 'single_product') {
        return {
            filter: {
                ...variables,
            },
        };
    }

    // prettier-ignore
    switch (sort) {
    case 'default':
        sortAttribute = {}; break;
    case 'alphabetically':
        sortAttribute = { alphabetically: ASC }; break;
    case 'price_low_to_high':
        sortAttribute = { price: ASC }; break;
    case 'price_high_to_low':
        sortAttribute = { price: DESC }; break;
    case 'random':
        sortAttribute = { random: ASC }; break;
    case 'newestfirst':
        sortAttribute = { new_old: DESC }; break;
    case 'oldestfirst':
        sortAttribute = { new_old: ASC }; break;
    case 'new':
        sortAttribute = { new: DESC }; break;
    case 'bestseller':
        sortAttribute = { bestseller: DESC }; break;
    case 'onsale':
        sortAttribute = { onsale: DESC }; break;
    case 'mostviewed':
        sortAttribute = { mostviewed: DESC }; break;
    case 'wishlisttop':
        sortAttribute = { wishlisttop: DESC }; break;
    case 'toprated':
        sortAttribute = { toprated: DESC }; break;
    case 'featured':
        sortAttribute = { featured: DESC }; break;
    case 'free':
        sortAttribute = { free: DESC }; break;

    default:
        sortAttribute = {}; break;
    }
    queryVariables.sort = { ...sortAttribute };

    variables.attributes.forEach((variable) => {
        const { attribute, operator, value } = variable;
        let newValue;
        let filterAttribute;

        if (operator === '<' || operator === '<=') {
            // less than; equals or less than
            newValue = Number(value - 1).toString();
            filterAttribute = { to: operator === '<' ? newValue : value };
        } else if (operator === '>' || operator === '>=') {
            // greater than; equals or greater than
            newValue = Number(value + 1).toString();
            filterAttribute = { from: operator === '>' ? newValue : value };
        } else if (operator === '==') {
            // is
            filterAttribute = { eq: value };
        } else if (operator === '{}') {
            // contains
            filterAttribute = { in: [value] };
        }

        queryVariables.filter[attribute] = {
            ...queryVariables.filter[attribute],
            ...filterAttribute,
        };

        if (attribute === 'price') {
            if (operator === '==') {
                queryVariables.filter.price = { ...queryVariables.filter.price, from: newValue, to: newValue };
            }
        }

        if (attribute === 'category_ids') {
            queryVariables.filter.category_id = { in: queryVariables.filter.category_ids.eq.split(', ') };
            delete queryVariables.filter.category_ids;
        }
    });
    return queryVariables;
};

export { generateQueriesCustom };
