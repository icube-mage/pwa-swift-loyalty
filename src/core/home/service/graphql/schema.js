import { gql } from '@apollo/client';
import { features } from '@config';

export const getBannerSlider = gql`
    {
        getHomepageSlider {
            slider_id
            images {
                image_id
                image_url
                mobile_image_url
                thumb_image_url
                url_redirection
            }
        }
    }
`;

export const getFeaturedProducts = gql`
    query($url_key: String!) {
        categoryList(filters: { url_key: { eq: $url_key } }) {
            children {
                id
                name
                path
                image_path
                url_path
                products {
                    items {
                        __typename
                        id
                        name
                        url_key
                        canonical_url
                        small_image {
                            url(width: ${features.imageSize.product.width}, height: ${features.imageSize.product.height}),
                        }
                        price_tiers {
                            discount {
                                amount_off
                                percent_off
                            }
                            final_price {
                                currency
                                value
                            }
                            quantity
                        }
                        price_range {
                            minimum_price {
                                regular_price {
                                    currency
                                    value
                                }
                                final_price {
                                    currency
                                    value
                                }
                            }
                        }
                    }
                }
            }
            children_count
        }
    }
`;

export const getCategoryList = gql`
    query($url_key: String!) {
        categoryList(filters: { url_key: { eq: $url_key } }) {
            children {
                id
                name
                description
                image_path
                url_path
            }
            children_count
        }
    }
`;

export default { getBannerSlider, getCategoryList, getFeaturedProducts };
