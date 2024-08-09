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

import { NoData } from "../../../components/ui/NoData";

interface IRegionsTableProps {
  data: IRegionsData[];
}

export const RegionsTable = ({ data }: IRegionsTableProps) => {
  if (!data.length) return <NoData />;
  return (
    <Table className="text-sm md:text-base">
      <TableCaption className="text-lg">
        Average day-ahead electricity spot market prices at{" "}
        {new Date().toLocaleDateString()}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[30px] sm:w-[50px]">#</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">
            Price <small>({data[0].unit})</small>
          </TableHead>
          <TableHead className="w-auto sm:w-[120px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow
            key={item.zoneCode}
            className="odd:bg-white even:bg-slate-50 hover:bg-slate-200 group/item"
          >
            <TableCell className="font-medium ">{item.index}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell className="text-right">
              {getFormattedPrice(item.price)}
            </TableCell>
            <TableCell>
              <Link
                href={item.zoneCode}
                className="hover:underline text-blue-500 p-1.5 text-nowrap text-xs sm:text-base"
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
