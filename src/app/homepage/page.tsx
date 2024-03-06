"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { sortingOrderHandler } from "./constants";
import { Diamond } from "../types/types";
import Search from "antd/es/input/Search";
import { debounce } from "lodash";

const HomePage = () => {
  const router = useRouter();
  const [resData, setResData] = useState<Diamond[]>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading,setIsLoading] = useState(true)
  const columns = useMemo<MRT_ColumnDef<Diamond>[]>(
    () => [
      {
        accessorKey: "lot_id",
        header: "Lot_ID",
        size: 150,
        muiTableHeadCellProps: {
          align: "center",
          sx:{
            fontSize:'16px'
          }
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "color",
        header: "Color",
        size: 150,
        muiTableHeadCellProps: {
          align: "center",
          sx:{
            fontSize:'16px'
          }
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "shape",
        header: "Shape",
        size: 150,
        muiTableHeadCellProps: {
          align: "center",
          sx:{
            fontSize:'16px'
          }
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        sortingFn: (rowA, rowB, columnId) => {
          return sortingOrderHandler(rowA, rowB, columnId);
        },
      },
      {
        accessorKey: "clarity",
        header: "Clarity",
        size: 200,
        muiTableHeadCellProps: {
          align: "center",
          sx:{
            fontSize:'16px'
          }
        },
        muiTableBodyCellProps: {
          align: "center",
          
        },
        sortingFn: (rowA, rowB, columnId) => {
          return sortingOrderHandler(rowA, rowB, columnId);
        },
      },
      {
        accessorKey: "cut",
        header: "Cut",
        size: 150,
        muiTableHeadCellProps: {
          align: "center",
          sx:{
            fontSize:'16px'
          }
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        sortingFn: (rowA, rowB, columnId) => {
          return sortingOrderHandler(rowA, rowB, columnId);
        },
      },
      {
        accessorKey: "polish",
        header: "Polish",
        size: 150,
        muiTableHeadCellProps: {
          align: "center",
          sx:{
            fontSize:'16px'
          }
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        sortingFn: (rowA, rowB, columnId) => {
          return sortingOrderHandler(rowA, rowB, columnId);
        },
      },
      {
        accessorKey: "symmetry",
        header: "Symmetry",
        size: 150,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        sortingFn: (rowA, rowB, columnId) => {
          return sortingOrderHandler(rowA, rowB, columnId);
        },
      },
      {
        accessorKey: "fluorescence",
        header: "Fluorescence",
        size: 150,
        muiTableHeadCellProps: {
          align: "center",
          sx:{
            fontSize:'16px'
          }
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        sortingFn: (rowA, rowB, columnId) => {
          return sortingOrderHandler(rowA, rowB, columnId);
        },
      },
      {
        accessorKey: "lab",
        accessorFn: (row) => (row.lab ? row.lab : "-"),
        header: "Lab",
        size: 150,
        muiTableHeadCellProps: {
          align: "center",
          sx:{
            fontSize:'16px'
          }
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        sortingFn: (rowA, rowB, columnId) => {
          return sortingOrderHandler(rowA, rowB, columnId);
        },
      },
      {
        accessorKey: "location",
        accessorFn: (row) => (row.location ? row.location : "-"),
        header: "Location",
        size: 150,
        muiTableHeadCellProps: {
          align: "center",
          sx:{
            fontSize:'16px'
          }
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        sortingFn: (rowA, rowB, columnId) => {
          return sortingOrderHandler(rowA, rowB, columnId);
        },
      },
      {
        accessorKey: "carats",
        header: "Carats",
        size: 150,
        muiTableHeadCellProps: {
          align: "center",
          sx:{
            fontSize:'16px'
          }
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "price_per_carat",
        header: "Price per Carat",
        size: 150,
        muiTableHeadCellProps: {
          align: "center",
          sx:{
            fontSize:'16px'
          }
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "total_price",
        accessorFn: (row) =>
          parseFloat((row.carats * row.price_per_carat).toFixed(2)),
        header: "Total Price",
        size: 150,
        muiTableHeadCellProps: {
          align: "center",
          sx:{
            fontSize:'16px'
          }
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "certificate_number",
        accessorFn: (row) =>
          row.certificate_number ? row.certificate_number : "-",
        header: "Certificate Number",
        size: 150,
        muiTableHeadCellProps: {
          align: "center",
          sx:{
            fontSize:'16px'
          }
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
    ],
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("token");

        const response = await axios.post(
          "https://mock.kgkit.net/store/listAllStones",
          {
            auth: token,
          }
        );
        setIsLoading(false)
        setResData(response.data.data);
      } catch (error) {
        if (error?.response?.data?.message === "Unauthorized") router.push("/");
      }
    };
    if (!resData) {
      fetchData();
    }
  }, []);

  const handleSearch = debounce((value: string) => {
    setSearchQuery(value);
  }, 300);

  const filteredData = resData
    ? resData.filter((diamond) =>
        diamond.lot_id.toString().includes(searchQuery)
      )
    : [];

  const table = useMaterialReactTable({
    columns,
    data: filteredData ? filteredData : [],
    state:{
      isLoading:isLoading
    },
    enablePagination: false,
    enableBottomToolbar: false,
    enableColumnResizing: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableColumnActions: false,
    enableFilters:false,
    enableRowSelection:true
  });
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Search
          placeholder="Search"
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: 400,paddingTop:20 }}
        />

        <MaterialReactTable table={table} />
      </div>
    </>
  );
};

export default HomePage;
