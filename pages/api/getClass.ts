import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { sanityClient } from "../../client/sanity";

import { Class } from "../../typings";

const query = groq `
    *[_type == "classes"] {
        ..., 
        modulesReferences[] ->
    }
`
;

type Data = {
    classes: Class[];
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const classes : Class[]= await sanityClient.fetch(query);

    res.status(200).json({ classes })
}