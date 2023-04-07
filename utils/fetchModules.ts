import { ModuleReference } from "../typings";

export const fetchModules = async() => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getModules`);

    const data = await res.json();
    const modules : ModuleReference[] = data.classes;

    return modules;
}