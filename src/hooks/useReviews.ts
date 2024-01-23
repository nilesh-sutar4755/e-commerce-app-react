import useData from "./useData";

const useReviews = (id: string) => useData<any>({ url: `https://dummyjson.com/comments/post/${id}` });

export default useReviews;