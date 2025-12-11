"use client"

import { useEffect, useRef, } from "react"
import { AnimatePresence, motion } from "motion/react"

interface SlidingDigitProps {
    digit: string
    className?: string
}

function SlidingDigit({ digit, className = "" }: SlidingDigitProps) {
    return (
        <div className={`relative h-[1em] w-[0.6em] overflow-hidden ${className}`}>
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                    key={digit}
                    initial={{ y: "-100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "100%" }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    {digit}
                </motion.span>
            </AnimatePresence>
        </div>
    )
}

interface SlidingCounterProps {
    value: number
    className?: string
    digitClassName?: string
    prefix?: string
    suffix?: string
}

export function SlidingCounter({
    value,
    className = "",
    digitClassName = "",
    prefix = "",
    suffix = "",
}: SlidingCounterProps) {
    // const [displayDigits, setDisplayDigits] = useState<string[]>([])
    const previousValue = useRef(value)

    useEffect(() => {
        // const valueStr = Math.abs(value).toString()
        // setDisplayDigits(valueStr.split(""))
        previousValue.current = value
    }, [value])

    return (
        <span className={`inline-flex items-center tabular-nums ${className}`}>
            {prefix && <span>{prefix}</span>}
            {value < 0 && <span>-</span>}
            {value.toString().split('').map((digit, index) => (
                <SlidingDigit key={`${index}-${value}`} digit={digit} className={digitClassName} />
            ))}
            {suffix && <span>{suffix}</span>}
        </span>
    )
}
