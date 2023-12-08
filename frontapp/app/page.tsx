'use client'
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";
import {useEffect, useState} from "react";
import {instance} from "@/config/axiosConfig";
import RsData from "@/types/rsData";
import Post from "@/types/Post";
import formatDate from "@/util/formatDate";


export default function Home() {
    useEffect(() => {
        instance.get('/post/latest').then((res) => {
            const rsData: RsData = res.data;
            setPosts(rsData.data.content);
        });
    }, []);

    const [posts, setPosts] = useState<Post[]>([]);

    return (
        <div className={"flex flex-col items-center"}>
            <h1 className={"font-bold text-4xl"}>최신 글</h1>
            <Table aria-label="Example static collection table" className={"mt-5"}>
                <TableHeader>
                    <TableColumn>제목</TableColumn>
                    <TableColumn>작성일</TableColumn>
                </TableHeader>
                <TableBody>
                    {posts.map((post) =>
                        <TableRow key={post.id}>
                            <TableCell>{post.title}</TableCell>
                            <TableCell>{formatDate(new Date(post.createDate))}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
