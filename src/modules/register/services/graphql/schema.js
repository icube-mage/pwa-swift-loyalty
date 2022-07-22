import { gql } from '@apollo/client';

export const register = gql`
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

export const getCustomer = gql`
{
    customer {
      id
      firstname
      email
      phonenumber
      whatsapp_number
    }
  }
`;

export const getCartIdUser = gql`
    {
        customerCart {
            id
        }
    }
`;

export const mergeCart = gql`
mutation mergeCart(
    $sourceCartId: String!,
    $destionationCartId: String!
) {
    mergeCarts(
      source_cart_id:$sourceCartId,
      destination_cart_id: $destionationCartId
    ) {
      id
      total_quantity
    }
  }
`;

export const otpConfig = gql`
    {
        otpConfigLoyalty {
            otp_enable {
                enable_otp_register
            }
        }
    }
`;

export const getGuestCustomer = gql`
  query getGuestCustomer($ids: FilterEqualTypeInput) {
    ordersFilter(filters: {
      ids: $ids
    }){
      data{
        detail{
          customer_firstname
          customer_lastname
          customer_email
        }
      }
    }
  }
`;
export default {
    register,
};
