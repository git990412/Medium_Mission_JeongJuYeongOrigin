'use client'
import { accessAuth } from "@/components/PrivateRoute.";
import { instance } from "@/config/axiosConfig";
import Post from "@/types/Post";
import RsData from "@/types/rsData";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Checkbox } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";


const Page = () => {
    const router = useRouter();

    const [post, setPost] = useState<Post>({ published: true } as Post);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.type === "checkbox") {
            setPost({
                ...post,
                [e.target.name]: e.target.checked
            })
            return;
        }
        setPost({
            ...post,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        instance.post("/post/write", post).then((res) => {
            const rsData: RsData = res.data;
            if (rsData.success) {
                alert("등록되었습니다.");
                router.push("/post/list");
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input name="title" size={"lg"} value={post.title} onChange={handleChange} placeholder={"제목"} variant={"underlined"} />
            <Checkbox name="published" isSelected={post.published} onChange={handleChange} className="mt-2" defaultSelected>공개</Checkbox>
            <Textarea
                name="body"
                onChange={handleChange}
                value={post.body}
                className="mt-2"
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

export default accessAuth(Page)