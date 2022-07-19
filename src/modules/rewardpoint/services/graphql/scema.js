/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const getRewardPoint = gql`
  query getRewardPoint(
  $pageSize: Int,
  $currentPage: Int
  ) {
    customerRewardPointsLoyalty {
      balance
      balanceCurrency
      formatedBalanceCurrency
      formatedSpendRate
      reservedPoints
      spendRate
      transaction_history(pageSize: $pageSize, currentPage: $currentPage) {
        total_count
      }
    }
  }
`;
