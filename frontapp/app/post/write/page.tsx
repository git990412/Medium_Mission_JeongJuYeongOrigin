'use client'
import { accessAuth } from "@/components/PrivateRoute.";
import { instance } from "@/config/axiosConfig";
import RsData from "@/types/rsData";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { useRouter } from "next/navigation";


const Page = () => {
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        instance.post("/post/write", data).then((res) => {
            const rsData: RsData = res.data;
            if (rsData.success) {
                alert("등록되었습니다.");
                router.push("/post/list");
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input name="title" size={"lg"} placeholder={"제목"} variant={"underlined"} />
            <Textarea
                name="body"
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