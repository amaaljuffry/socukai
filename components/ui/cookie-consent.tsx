"use client";
import { CookieIcon } from "lucide-react";
import { Button } from "./button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function CookieConsent({
    variant = "default",
    demo = false,
    onAcceptCallback = () => {},
    onDeclineCallback = () => {},
}: {
    variant?: "default" | "small";
    demo?: boolean;
    onAcceptCallback?: () => void;
    onDeclineCallback?: () => void;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [hide, setHide] = useState(false);

    const accept = () => {
        setIsOpen(false);
        document.cookie =
            "cookieConsent=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        setTimeout(() => {
            setHide(true);
        }, 700);
        onAcceptCallback();
    };

    const decline = () => {
        setIsOpen(false);
        setTimeout(() => {
            setHide(true);
        }, 700);
        onDeclineCallback();
    };

    useEffect(() => {
        try {
            setIsOpen(true);
            if (document.cookie.includes("cookieConsent=true")) {
                if (!demo) {
                    setIsOpen(false);
                    setTimeout(() => {
                        setHide(true);
                    }, 700);
                }
            }
        } catch {
            // ignore
        }
    }, [demo]);

    return variant != "small" ? (
        <div
            className={cn(
                "fixed z-[200] bottom-0 left-0 right-0 sm:left-4 sm:bottom-4 w-full sm:max-w-md duration-700",
                !isOpen
                    ? "transition-[opacity,transform] translate-y-8 opacity-0"
                    : "transition-[opacity,transform] translate-y-0 opacity-100",
                hide && "hidden"
            )}
        >
            <div className="dark:bg-card bg-background rounded-md m-3 border border-border shadow-lg">
                <div className="grid gap-2">
                    <div className="border-b border-border h-14 flex items-center justify-between p-4">
                        <h1 className="text-lg font-medium">We use cookies</h1>
                        <CookieIcon className="h-[1.2rem] w-[1.2rem]" />
                    </div>
                    <div className="p-4">
                        <p className="text-sm font-normal text-start">
                            We use cookies to ensure you get the best experience
                            on our website. For more information on how we use
                            cookies, please see our cookie policy.
                            <br />
                            <br />
                            <span className="text-xs">
                                By clicking &quot;
                                <span className="font-medium opacity-80">
                                    Accept
                                </span>
                                &quot;, you agree to our use of cookies.
                            </span>
                            <br />
                            <Link href="/cookie-policy" className="text-xs underline">
                                Learn more.
                            </Link>
                        </p>
                    </div>
                    <div className="flex gap-2 p-4 py-5 border-t border-border dark:bg-background/20">
                        <Button onClick={accept} className="w-full">
                            Accept
                        </Button>
                        <Button
                            onClick={decline}
                            className="w-full"
                            variant="secondary"
                        >
                            Decline
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div
            className={cn(
                "fixed z-[200] bottom-0 left-0 right-0 sm:left-4 sm:bottom-4 w-full sm:max-w-md duration-700",
                !isOpen
                    ? "transition-[opacity,transform] translate-y-8 opacity-0"
                    : "transition-[opacity,transform] translate-y-0 opacity-100",
                hide && "hidden"
            )}
        >
            <div className="m-3 dark:bg-card bg-background border border-border rounded-lg">
                <div className="flex items-center justify-between p-3">
                    <h1 className="text-lg font-medium">We use cookies</h1>
                    <CookieIcon className="h-[1.2rem] w-[1.2rem]" />
                </div>
                <div className="p-3 -mt-2">
                    <p className="text-sm text-left text-muted-foreground">
                        We use cookies to ensure you get the best experience on
                        our website. For more information on how we use cookies,
                        please see our cookie policy.
                    </p>
                </div>
                <div className="p-3 flex items-center gap-2 mt-2 border-t">
                    <Button
                        onClick={accept}
                        className="w-full h-9 rounded-full"
                    >
                        accept
                    </Button>
                    <Button
                        onClick={decline}
                        className="w-full h-9 rounded-full"
                        variant="outline"
                    >
                        decline
                    </Button>
                </div>
            </div>
        </div>
    );
} 