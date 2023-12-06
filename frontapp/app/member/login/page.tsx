'use client'
import {Input} from "@nextui-org/input";
import PasswordInput from "@/app/member/join/_components/PasswordInput";
import {Button} from "@nextui-org/button";
import React, {ChangeEvent} from "react";

export default function () {
    const [inputVal, setInputVal] = React.useState({
        username: "",
        password: "",
    });

    const [error, setError] = React.useState({
        username: "",
        password: "",
    });

    const handleChange = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        setInputVal({
            ...inputVal,
            [target.name]: target.value,
        });

        setError({
            ...error,
            [target.name]: ""
        })
    }

    return (
        <div className="flex flex-col items-center">
            <div className="font-bold text-6xl mt-10">Login</div>
            <form className="w-3/4 mt-10">
                <Input
                    type="text"
                    variant="bordered"
                    label="Username"
                    name={"username"}
                    onChange={handleChange}
                    value={inputVal.username}
                    isInvalid={error.username !== ""}
                    errorMessage={error.username !== "" ? error.username : undefined}
                />
                <PasswordInput
                    label={"Password"}
                    name={"password"}
                    className={"w-full mt-2"}
                    onChange={handleChange}
                    value={inputVal.password}
                    isInvalid={error.password !== ""}
                    errorMessage={error.password !== "" ? error.password : undefined}
                />
                <Button color="primary" type={"submit"} className="w-full mt-2">
                    로그인
                </Button>
            </form>
        </div>
    )
}