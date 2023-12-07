'use client'
import {
    Navbar as NextUINavbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
} from "@nextui-org/navbar";
import {Link} from "@nextui-org/link";

import {link as linkStyles} from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

import {ThemeSwitch} from "@/components/theme-switch";
import React from "react";
import {useAppSelector} from "@/_app/hooks";
import {selectAuthState, setAuthState} from "@/_app/feature/auth";
import {instance} from "@/config/axiosConfig";
import RsData from "@/types/rsData";
import {useDispatch} from "react-redux";

const navItems = [
    {
        label: "Login",
        href: "/member/login",
        permission:"anonymous"
    },
    {
        label: "Sign Up",
        href: "/member/join",
        permission:"anonymous"
    },
    {
        label: "Sign Out",
        href: "#",
        permission:"auth"
    }
]

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const isLogin = useAppSelector(selectAuthState);
    const dispatch = useDispatch();

    const singOut = () => {
        instance.post("/members/signout").then((res) => {
            const rsData:RsData = res.data;
            if(rsData.success){
                dispatch(setAuthState(false));
            }
        })
    }

    const filteredNavItems = isLogin ? navItems.filter(item => item.permission !== 'anonymous') : navItems.filter(item => item.permission !== 'auth');

    return (
        <NextUINavbar maxWidth="xl" position="sticky" isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand as="li" className="gap-3 max-w-fit">
                    <NextLink className="flex justify-start items-center gap-1" href="/">
                        <p className="font-bold text-inherit">Medium</p>
                    </NextLink>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent
                className="hidden sm:flex basis-1/5 sm:basis-full"
                justify="end"
            >
                <ul className="hidden lg:flex gap-4 justify-start ml-2">
                    {filteredNavItems.map((item) => (
                        <NavbarItem key={item.href}>
                            <NextLink
                                className={clsx(
                                    linkStyles({color: "foreground"}),
                                    "data-[active=true]:text-primary data-[active=true]:font-medium"
                                )}
                                color="foreground"
                                href={item.href}
                                onClick={() => {
                                    if(item.label == "Sign Out") singOut();
                                }}
                            >
                                {item.label}
                            </NextLink>
                        </NavbarItem>
                    ))}
                </ul>
            </NavbarContent>

            <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
                <ThemeSwitch/>
                <NavbarMenuToggle/>
            </NavbarContent>

            <NavbarMenu>
                <div className="mx-4 mt-2 flex flex-col gap-2">
                    {filteredNavItems.map((item, index) => {
                        return (
                            <NavbarMenuItem key={`${item}-${index}`}>
                                <Link
                                    href={item.href}
                                    size="lg"
                                    onClick={() => {
                                        if(item.label == "Sign out") {
                                            singOut();
                                        }
                                        setIsMenuOpen(false)
                                    }}
                                >
                                    {item.label}
                                </Link>
                            </NavbarMenuItem>
                        )})}
                </div>
            </NavbarMenu>
        </NextUINavbar>
    );
};