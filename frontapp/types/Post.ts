import Member from "@/types/Member";

export default interface Post {
    id: number;
    title: string;
    body: string;
    createDate: Date;
    modifyDate: Date;
    member: Member;
}