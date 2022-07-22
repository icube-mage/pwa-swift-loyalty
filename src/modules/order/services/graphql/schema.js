/* eslint-disable linebreak-style */
import { gql } from '@apollo/client';

const orderOutput = `
    total_count
    items {
        id
        comments {
          message
          timestamp
        }
        grand_total
        status
        order_number
        created_at
    }
`;

export const getOrder = gql`
    query getCustomerOrder($pageSize: Int, $currentPage: Int) {
        customerOrders(pageSize: $pageSize, currentPage: $currentPage) {
            ${orderOutput}
        }
    }
`;

export const getCustomerOrder = gql`
    query getCustomerOrder($pageSize: Int, $currentPage: Int) {
        customer {
            orders(pageSize: $pageSize, currentPage: $currentPage) {
                ${orderOutput}
            }
        }
    }
`;

export const getCustomerOrderDownloadable = gql`
    query{
        customerDownloadableProducts{
        items{
        date
            download_url
            order_increment_id
            remaining_downloads
            status
            link_title
            title
        }
        }
    }
`;

export const getOrderDetail = gql`
    query getCustomerOrder($order_id: String) {
        customerOrders(filters: { ids: { eq: $order_id } }) {
            ${orderOutput}
        }
    }
`;

export const getCustomerOrderDetail = gql`
    query getCustomerOrder($order_id: String) {
        customer {
            orders(filters: { ids: { eq: $order_id } }) {
                ${orderOutput}
            }
        }
    }
`;

// reorder
export const reOrder = gql`
mutation reOrder($order_id: String!) {
  reorder(input: {order_id: $order_id}) {
    cart_id
  }
}
`;

export const getPaymentInformation = gql`
    query getPaymentInformation($order_id: String!) {
        OrderPaymentInformation(input: {order_id : $order_id}){
            method_title
            method_code
            virtual_account
            due_date
            instructions
            is_virtual_account
            invoice_url
            payment_code
            xendit_retail_outlet
            xendit_qrcode_external_id
            xendit_mode
        }
    }
`;

export const getTrackingOrder = gql`
    query getTrackingOrder($order_id: String) {
        ordersFilter(filters: {ids: { eq: $order_id } }) {
            data {
                id
                order_number
                status
                status_label
                detail {
                    payment {
                        method
                        additional_information
                        payment_additional_info {
                            method_title
                            __typename
                        }
                        __typename
                    }
                    __typename
                    shipping_methods {
                        shipping_description
                        shipping_detail {
                            track_number
                            trackorder_type
                            data_detail
                            __typename
                        }
                        __typename
                    }
                    shipping_address {
                        firstname
                        lastname
                        __typename
                    }
                    items {
                        name
                        __typename
                    }
                    __typename
                }
                grand_total
                __typename
            }
        }
    }
`;

export default {
    getOrder,
};
