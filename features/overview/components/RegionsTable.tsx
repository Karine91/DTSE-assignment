import Link from "next/link";

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

import { IRegionsData } from "../types";

import { NoData } from "./NoData";

interface IRegionsTableProps {
  data: IRegionsData[];
}

export const RegionsTable = ({ data }: IRegionsTableProps) => {
  if (!data.length) return <NoData />;
  return (
    <Table>
      <TableCaption className="text-lg">
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
  );
};
