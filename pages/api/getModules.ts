import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { sanityClient } from "../../client/sanity";

import { ModuleReference } from "../../typings";

const query = groq `
    *[_type == "modules"] {
        ..., 
        lessonsReferences[] ->
    }
`
;

type Data = {
    modules: ModuleReference[];
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const modules : ModuleReference[]= await sanityClient.fetch(query);

    res.status(200).json({ modules })
}