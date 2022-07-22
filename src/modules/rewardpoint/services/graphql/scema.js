/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const getRewardPoint = gql`
query getRewardPoint(
  $pageSize: Int,
  $currentPage: Int
) {
  customerRewardPoints {
    balance
    balanceCurrency
    formatedBalanceCurrency
    formatedSpendRate
    spendRate
    transaction_history(
      pageSize: $pageSize, 
      currentPage: $currentPage
    ) {
      total_count
      page_info{
        current_page
        page_size
        total_pages
      }
      __typename
      items{
        balance
        points
        transactionId
        transactionDate
      }
    }
    __typename
  }
}

`;
