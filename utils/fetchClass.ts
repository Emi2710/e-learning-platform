import { Class } from "../typings";

export const fetchClass = async() => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getClass`);

    const data = await res.json();
    const classes : Class[] = data.classes;

    return classes;
}