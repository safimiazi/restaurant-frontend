    import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

    export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/v1",
        credentials: "include", // To send cookies along with the requests
    }),
    tagTypes: ["brand"],
    endpoints: () => ({}),
    });
