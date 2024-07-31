import { getRegions } from "./regionsData";
import Link from "next/link";

const RegionsList = async () => {
  const data = await getRegions();
  return (
    <section className="w-9/12">
      <ul role="list" className=" divide-y divide-gray-100 ">
        {data.map((item) => (
          <li
            className="odd:bg-white even:bg-slate-50 hover:bg-slate-200 group/item"
            key={item.code}
          >
            <Link href={`/${item.code}`} className="flex px-2 py-5">
              {item.name}
              <span className="ml-auto invisible group-hover/item:visible">
                icon
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RegionsList;
