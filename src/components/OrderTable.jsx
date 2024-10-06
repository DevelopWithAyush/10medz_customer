import React, { useContext, useEffect } from "react";
import { usePagination, useSortBy, useTable } from "react-table";
import { HandleContext } from "../hooks/HandleState";

const columns = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Prescription",
    accessor: "prescriptionLink",
    Cell: ({ value }) => (
      <img
        src={value}
        alt="Prescription"
        className="w-16 h-16 cursor-pointer"
        onClick={() => window.open(value)}
      />
    ),
  },
  {
    Header: "Bill",
    accessor: "billLink",
    Cell: ({ value }) =>
      value ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View Bill
        </a>
      ) : (
        <span className="text-red-500">Bill not uploaded</span>
      ),
  },
  {
    Header: "Price",
    accessor: "price",
    Cell: ({ value }) =>
      value ? (
        `₹${value}`
      ) : (
        <span className="text-red-500">Price not updated</span>
      ),
  },
  {
    Header: "Order Status",
    accessor: "orderStatus",
  },
  {
    Header: "Order Timing",
    accessor: "createdAt",
    Cell: ({ value }) => {
      const date = new Date(value);
      return date.toLocaleString();
    },
  },
];

const OrderTable = () => {
  const { handleMyOrders, myorder } = useContext(HandleContext);

  useEffect(() => {
    handleMyOrders();
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    prepareRow,
    state: { pageIndex },
    pageCount,
  } = useTable(
    {
      columns,
      data: myorder,
    },
    useSortBy,
    usePagination
  );

  return (
    <div className="container flex flex-col items-center justify-center gap-10 mx-auto max-w-[88rem]">
      <div className="overflow-x-auto w-full scroll">
        <table
          {...getTableProps()}
          className="min-w-full text-left text-sm font-light border"
        >
          <thead className="border-b font-medium dark:border-neutral-500">
            {headerGroups.map((hg) => (
              <tr {...hg.getHeaderGroupProps()}>
                {hg.headers.map((header) => (
                  <th
                    {...header.getHeaderProps(header.getSortByToggleProps())}
                    scope="col"
                    className="px-6 py-4"
                  >
                    {header.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="border-b transition duration-200 ease-in-out hover:bg-[#FE6903]/20"
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="whitespace-nowrap px-6 py-4 font-normal"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex flex-row items-center justify-center w-full gap-5">
        <button
          disabled={!canPreviousPage}
          className="flex flex-col disabled:bg-[#FE6903] disabled:bg-opacity-30 items-center justify-center py-2 px-6 bg-[#FE6903] text-white rounded-lg"
          onClick={previousPage}
        >
          Prev
        </button>
        <span className="text-[16px] font-medium text-gray-900">
          {pageIndex + 1} of {pageCount}
        </span>
        <button
          disabled={!canNextPage}
          className="flex flex-col disabled:bg-[#FE6903] disabled:bg-opacity-30 items-center justify-center py-2 px-6 bg-[#FE6903] text-white rounded-lg"
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrderTable;
