'use client'

import { accessAuthWithParams } from "@/components/PrivateRoute.";
import { instance } from "@/config/axiosConfig";
import Post from "@/types/Post";
import RsData from "@/types/rsData";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Checkbox } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = ({ params }: { params: { index?: string } }) => {
    const router = useRouter();

    const [post, setPost] = useState({} as Post);

    useEffect(() => {
        instance.get(`/post/${params.index}`).then((res) => {
            const rsData: RsData = res.data;

            setPost(rsData.data);
        })
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        instance.put(`/post/${params.index}/modify`, data).then((res) => {
            const rsData: RsData = res.data;
            if (rsData.success) {
                alert("수정되었습니다.");
                router.push(`/post/${params.index}`);
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input name="title" size={"lg"} onChange={handleChange} value={post.title} placeholder={"제목"} variant={"underlined"} />
            <Checkbox name="isPublished" className="mt-2" defaultSelected>공개</Checkbox>
            <Textarea
                name="body"
                onChange={handleChange}
                className="mt-2"
                value={post.body}
                variant={"underlined"}
                labelPlacement={"inside"}
                placeholder="내용을 입력해주세요."
                maxRows={20}
                size="lg"
            />
            <Button type="submit" className={"w-full mt-2"} color={"primary"}>등록하기</Button>
        </form>
    )
}

export default accessAuthWithParams(Page)
