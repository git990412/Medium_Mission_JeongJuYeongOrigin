'use client'

import { accessAuthWithParams } from "@/components/PrivateRoute.";
import { instance } from "@/config/axiosConfig";
import "@/styles/quillStyle.css";
import Post from "@/types/Post";
import RsData from "@/types/rsData";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Checkbox } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Page = ({ params }: { params: { index?: string } }) => {
    const router = useRouter();

    useEffect(() => {
        instance.get(`/post/${params.index}`).then((res) => {
            const rsData: RsData = res.data;

            setPost(rsData.data);
        })
    }, [])

    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    ["bold", "italic", "underline", "strike"],
                    ["blockquote", "code-block"],

                    [{ header: 1 }, { header: 2 }],
                    [{ list: "ordered" }, { list: "bullet" }],
                    [{ script: "sub" }, { script: "super" }],
                    [{ indent: "-1" }, { indent: "+1" }],
                    [{ direction: "rtl" }],

                    [{ size: ["small", false, "large", "huge"] }],
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],

                    [{ color: [] }, { background: [] }],
                    [{ font: [] }],
                    [{ align: [] }],

                    ["clean"],
                    ["image"],
                ],
            },
        }),
        []
    );

    const onSubmit = () => {
        instance.post("/post/write", post).then((res) => {
            const rsData: RsData = res.data;
            if (rsData.success) {
                alert("등록되었습니다.");
                router.push("/post/list");
            }
        })
    }

    const [post, setPost] = useState<Post>({ published: true } as Post);

    return (
        <div>
            <Input type="text"
                classNames={{
                    input: ["text-2xl"],
                    inputWrapper: ["mb-2"]
                }}
                placeholder='제목을 입력해주세요'
                variant={"underlined"}
                value={post.title}
                onChange={(e) => {
                    setPost({ ...post, title: e.target.value })
                }}
            />
            <Checkbox name="published" isSelected={post.published} onChange={(e) => {
                setPost({ ...post, published: e.target.checked })
            }} defaultSelected>공개</Checkbox>
            <ReactQuill className="mt-2"
                value={post.body}
                modules={modules} theme="snow" onChange={(v) => {
                    setPost({ ...post, body: v })
                }} />
            <Button className="w-full mt-2" onClick={onSubmit} color="primary">등록하기</Button>
        </div>
    )
}

export default accessAuthWithParams(Page)
