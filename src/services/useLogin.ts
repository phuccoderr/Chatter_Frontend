import { graphql } from "@/gql";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

const API_URL = "http://localhost:3001/graphql";

const getUsers: any = graphql(`
  query Users {
    users {
      email
    }
  }
`);

export const useGetUsers = () => {
  useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const data = await request(API_URL, getUsers, { first: 10 });
      return data;
    },
  });
};
