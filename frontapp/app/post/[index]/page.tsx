'use client'

import { instance } from "@/config/axiosConfig";
import Post from "@/types/Post";
import { Divider } from "@nextui-org/react";
import { useEffect, useState } from "react";

const Page = ({ params }: { params: { index: string } }) => {

    useEffect(() => {
        instance.get(`/post/${params.index}`).then((res) => {
            const rsData = res.data;
            setPost(rsData.data);
        })
    }, [])

    const [post, setPost] = useState({} as Post);

    return (
        <div>
            <h1 className="font-bold text-2xl">{post.title}</h1>
            <Divider className="mt-2" />
            <div className="mt-2">{post.body}</div>
        </div>
    )
}

export default Page