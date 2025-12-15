import { toast as sonneToast } from "sonner";
import { CSSProperties, ReactNode } from "react";

export const toastCustom = {
    error: (title: string, message: string | ReactNode) => sonneToast.error(title, {
        description: (
            <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
                <code>{message}</code>
            </pre>
        ),
        position: "bottom-right",
        classNames: {
            content: "flex flex-col gap-2",
        },
        style: {
            "--border-radius": "calc(var(--radius) + 4px)",
        } as CSSProperties,
    }),
    success: (title: string, message: string | ReactNode) => sonneToast.success(title, {
        description: (
            <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
                <code>{message}</code>
            </pre>
        ),
        position: "bottom-right",
        classNames: {
            content: "flex flex-col gap-2",
        },
        style: {
            "--border-radius": "calc(var(--radius) + 4px)",
        } as CSSProperties,
    }),
    info: (title: string, message: string | ReactNode) => sonneToast.info(title, {
        description: (
            <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
                <code>{message}</code>
            </pre>
        ),
        position: "bottom-right",
        classNames: {
            content: "flex flex-col gap-2",
        },
        style: {
            "--border-radius": "calc(var(--radius) + 4px)",
        } as CSSProperties,
    }),
    warning: (title: string, message: string | ReactNode) => sonneToast.warning(title, {
        description: (
            <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
                <code>{message}</code>
            </pre>
        ),
        position: "bottom-right",
        classNames: {
            content: "flex flex-col gap-2",
        },
        style: {
            "--border-radius": "calc(var(--radius) + 4px)",
        } as CSSProperties,
    })
}
