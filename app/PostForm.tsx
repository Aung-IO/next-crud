"use client"
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useRef } from 'react'

export default function PostForm({ createPost }: any) {

    return (
        <Card>
            <CardHeader>
                <CardTitle>TODOs</CardTitle>
                <CardDescription>Create something awesome!</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={createPost}>
                    <Input name="title" placeholder="title" />
                    <Input name="body" placeholder="body" className="mt-2 mb-2" />
                    <Button className="w-full">click</Button>
                </form>
            </CardContent>

        </Card>
    )
}
