import { useRef, useEffect, useState } from "react";
import ListigPageComponent from "./ListigPageComponent";
import axios from "axios";
import { ProductDataLIst } from "../utils/Interfaces";

function ListingPageContainer() {
  const listInnerRef = useRef();
  const [currPage, setCurrPage] = useState(1);
  const [prevPage, setPrevPage] = useState(0);
  const [dataList, setDataList] = useState<ProductDataLIst[]>([]);
  const [lastList, setLastList] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://dummyjson.com/products?limit=10&skip=${currPage * 10}`
      );
      if (!response.data.products.length) {
        setLastList(true);
        return;
      }
      setPrevPage(currPage);
      setDataList([...dataList, ...response.data.products]);
    };
    if (!lastList && prevPage !== currPage) {
      fetchData();
    }
  }, [currPage, lastList, prevPage, dataList]);

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setCurrPage(currPage + 1);
      }
    }
  };

  return (
    <ListigPageComponent
      onScroll={onScroll}
      listInnerRef={listInnerRef}
      userList={dataList}
    />
  );
}

export default ListingPageContainer;
