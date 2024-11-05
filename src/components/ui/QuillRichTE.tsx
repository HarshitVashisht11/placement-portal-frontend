"use client"
import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { cn } from "@/lib/utils";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

export default function QuillRichTE({ onChange, outerClassName, innerClassName, id }:
    {
        onChange?: any; outerClassName?: string; innerClassName?: string; id: string;
    }) {
    const [content, setContent] = useState("");

    const quillModules = {
        toolbar: [
            ["bold", "italic"],
            [{ list: "ordered" }, { list: "bullet" }],
        ],
    };
    const quillFormats = [
        "bold",
        "italic",
        "underline",
        "list",
        "bullet",
        "link",
    ];

    const handleEditorChange = (newContent: string) => {
        setContent(newContent);
        onChange(newContent);
    };

    return (
        <div className={cn("h-[20rem] lg:h-40", outerClassName)} id={id}>
            <div className={cn("h-[90%] mt-2 rounded-lg", innerClassName)}>
                <QuillEditor
                    value={content}
                    onChange={handleEditorChange}
                    modules={quillModules}
                    formats={quillFormats}
                    className="w-full h-full bg-background rounded"
                />
            </div>
        </div>
    );
}
