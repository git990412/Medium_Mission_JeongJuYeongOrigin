'use client'


import { selectUsername } from "@/_app/feature/auth";
import { useAppSelector } from "@/_app/hooks";
import { instance } from "@/config/axiosConfig";
import Post from "@/types/Post";
import { Button, Divider } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Page = ({ params }: { params: { index: string } }) => {
    const username = useAppSelector(selectUsername);

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
            {username === post.member?.username ? <Button className="mt-2 float-right" as={Link} href={`/post/${post.id}/modify`} color="primary">수정</Button> : null}

        </div>
    )
}

export default Page