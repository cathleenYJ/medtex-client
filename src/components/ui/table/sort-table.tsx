import { useEffect, useState } from "react";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import { ObjectId } from "@/utils/objectid";
import { Td, Th, Tr } from "./basic";
import clsx from "clsx";

export type ColsProps = Record<string, { label: string; sort?: boolean; width?: string }>;
type RowProps<ColsKey> = {
  index: number;
  row: {
    [key in keyof ColsKey]: React.ReactNode;
  };
};
type DataProps<ColsKey extends ColsProps> = {
  cols: ColsKey;
  rows: RowProps<ColsKey>[];
};

export const SortTable = <T extends ColsProps>({
  cols,
  data,
}: {
  cols: T;
  data: Record<keyof T, React.ReactNode>[];
}) => {
  const [tableId, setTableId] = useState<string>(ObjectId);
  const [tableData, setTableData] = useState<DataProps<typeof cols> | null>(
    null
  );
  const sortCol = (col: keyof T, asc: boolean) => {
    setTableData((prev) => {
      if (!prev) return prev;
      const sortedRows = prev.rows.toSorted((a, b) => {
        const aVal = a.row[col],
          bVal = b.row[col];
        if (
          !aVal ||
          !bVal ||
          !["string", "number"].includes(typeof aVal) ||
          !["string", "number"].includes(typeof bVal)
        )
          return 0;
        return (aVal < bVal ? 1 : aVal > bVal ? -1 : 0) * (asc ? 1 : -1);
      });
      return { ...prev, rows: sortedRows };
    });
  };

  useEffect(() => {
    setTableData({
      cols,
      rows: data.map((row, index) => ({ index, row })),
    });
    setTableId(ObjectId());
  }, [data, cols]);
  return (
    tableData && (
      <>
        <Thead tableId={tableId} cols={tableData.cols} sortCol={sortCol} />
        <Tbody<typeof cols>
          tableId={tableId}
          rows={tableData.rows}
          cols={tableData.cols}
          className="text-black/80"
        />
      </>
    )
  );
};

const Thead = <T extends ColsProps>({
  tableId,
  cols,
  sortCol,
  ...props
}: {
  tableId: string;
  cols: T;
  sortCol: (col: keyof T, asc: boolean) => void;
} & React.ComponentPropsWithoutRef<"thead">) => {
  return (
    <thead {...props}>
      <Tr>
        {Object.entries(cols).map(([col, { label, sort, width }]) => (
          <SortTh
            key={`${tableId}-col-${col}`}
            sort={Boolean(sort)}
            col={col}
            label={label}
            width={width}
            sortCol={sortCol}
          />
        ))}
      </Tr>
    </thead>
  );
};
const SortTh: React.FC<{
  sort: boolean;
  col: string;
  label: string;
  width?: string;
  sortCol: (col: string, asc: boolean) => void;
}> = ({ sort, col, label, width, sortCol }) => {
  const [asc, setAsc] = useState<boolean>(true);
  return (
    <Th
      onClick={() => {
        sort && sortCol(col, asc);
        setAsc((prev) => !prev);
      }}
      className={clsx(
        sort && "cursor-pointer",
        "py-3 min-w-max select-none"
      )}
      style={{
        '--tw-border-opacity': '1',
        width: width,
      } as React.CSSProperties}
    >
      <div className="px-4 flex items-center gap-2.5">
        <span className="block min-w-max">{label}</span>
        {sort && <ArrowsRightLeftIcon className="size-4 rotate-90" />}
      </div>
    </Th>
  );
};

const Tbody = <T extends ColsProps>({
  tableId,
  rows,
  cols,
  ...props
}: {
  tableId: string;
  rows: DataProps<T>["rows"];
  cols: T;
} & React.ComponentPropsWithoutRef<"tbody">) => {
  return (
    <tbody {...props}>
      {rows.map(({ index, row }) => (
        <Tr key={`${tableId}-row-${index}`}>
          {Object.entries(row).map(([col, value]) => {
            const colConfig = cols[col];
            const width = colConfig?.width;
            return (
              <Td
                key={`${row.index}-${col}`}
                className="py-3 bg-white first:rounded-l-md last:rounded-r-md last:[&>div]:border-r-0"
                style={{ width }}
              >
                <div className="px-4 flex items-center justify-center gap-2.5 border-r border-medtex-lv1">
                  <span className="block min-w-max">{value}</span>
                </div>
              </Td>
            );
          })}
        </Tr>
      ))}
    </tbody>
  );
};
