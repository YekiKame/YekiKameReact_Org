import { gql } from "@apollo/client";

export const GET_FAQS = gql`
  query GetFAQs {
    faqs {
      id
      question
      answer
    }
  }
`;