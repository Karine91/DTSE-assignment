import { getRegions } from "./actions";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getFormattedPrice } from "@/lib/format-price";
import Link from "next/link";
import { TName } from "./types";

const RegionsList = async () => {
  const data = await getRegions();

  return (
    <section className="w-9/12">
      <Table>
        <TableCaption className="text-lg caption-top mb-2">
          Average day-ahead electricity spot market prices at{" "}
          {new Date().toLocaleDateString()}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="w-[120px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, ind) => (
            <TableRow
              key={item.zoneCode}
              className="odd:bg-white even:bg-slate-50 hover:bg-slate-200 group/item"
            >
              <TableCell className="font-medium ">{ind + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell className="text-right">
                {getFormattedPrice(item.price)} {item.unit}
              </TableCell>
              <TableCell>
                <Link
                  href={item.zoneCode}
                  className="hover:underline text-blue-500 p-1.5 text-nowrap"
                >
                  Go to details
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <ul role="list" className="divide-y divide-gray-100 ">
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
      </ul> */}
    </section>
  );
};

export default RegionsList;
