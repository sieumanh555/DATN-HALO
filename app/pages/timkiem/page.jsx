// 'use client';
// import { useContext } from 'react';
// import useSWR from 'swr';
// import Product from '../../component/product';
// import { SearchContext } from '../../component/search';

// export default function SearchPage() {
//     const { keyword } = useContext(SearchContext);
//     const fetcher = (url) => fetch(url).then((res) => res.json());
//     const { data, error } = useSWR('http://localhost:3000/products', fetcher, {
//         refreshInterval: 6000,
//     });

//     if (error) return <div>Lỗi load dữ liệu.</div>;
//     if (!data) return <div>Đang tải...</div>;

//     const searchResult = data.filter((item) =>
//         item.name.toLowerCase().includes(keyword.toLowerCase())
//     );

//     return (
//         <div className="container mx-auto">
//             <h1 className="font-bold text-xl">Kết quả tìm kiếm với từ khóa "{keyword}"</h1>
//             <br />
//             <Product data={searchResult} />
//         </div>
//     );
// }
