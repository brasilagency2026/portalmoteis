'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'

interface ImageCarouselProps {
    images: string[]
    alt: string
}

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0)

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
    }

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    const openImage = () => {
        window.open(images[currentIndex], '_blank')
    }

    if (!images || images.length === 0) return null

    return (
        <div className="relative w-full group">
            {/* Main Image Container */}
            <div className="relative h-[400px] md:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl bg-zinc-100">
                <Image
                    src={images[currentIndex]}
                    alt={`${alt} - Foto ${currentIndex + 1}`}
                    fill
                    className="object-cover transition-all duration-500 ease-in-out"
                    priority
                />

                {/* Overlay with image counter and zoom indicator */}
                <div className="absolute top-4 right-4 flex gap-2">
                    <div className="bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                        {currentIndex + 1} / {images.length}
                    </div>
                    <button
                        onClick={openImage}
                        className="bg-white/90 backdrop-blur-md text-zinc-900 p-2 rounded-full hover:bg-white transition-all shadow-lg hover:scale-110"
                        title="Abrir em tamanho real"
                    >
                        <Maximize2 size={18} />
                    </button>
                </div>

                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={goToPrev}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/90 backdrop-blur-md text-white hover:text-zinc-900 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-xl border border-white/20"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={goToNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/90 backdrop-blur-md text-white hover:text-zinc-900 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-xl border border-white/20"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnails / Indicators */}
            {images.length > 1 && (
                <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                    {images.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={`relative min-w-[80px] h-20 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${currentIndex === i
                                    ? 'border-red-600 scale-105 shadow-md'
                                    : 'border-transparent opacity-60 hover:opacity-100'
                                }`}
                        >
                            <Image
                                src={img}
                                alt={`${alt} thumbnail ${i + 1}`}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
