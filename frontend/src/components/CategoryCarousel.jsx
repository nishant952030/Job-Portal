import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from './ui/button'

const CategoryCarousel = () => {
    const categories = [
        "FrontEnd Developer",
        "BackEnd Developer",
        "FullStack Developer",
        "UI/UX Designer",
        "DevOps Engineer",
        "Mobile App Developer",
        "Data Scientist",
        "Machine Learning Engineer",
        "Cloud Architect",
        "Cybersecurity Specialist",
        "Database Administrator",
        "Software Engineer",
        "Product Manager",
        "Blockchain Developer",
        "Quality Assurance Engineer",
        "System Analyst",
        "Network Engineer",
        "IT Support Specialist",
        "Game Developer",
        "AI Researcher"
    ]

    return (
        <div className='relative max-w-xl mx-auto py-8'>
            {/* Add gradient on both sides */}
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

            {/* Carousel */}
            <Carousel className="relative z-20">
                <CarouselContent className="flex space-x-4">
                    {categories.map((cat, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg-basis-1/3">
                            <Button variant="outline" className="rounded-full px-6 py-3 text-lg border-2 border-gray-300 hover:border-[#F83002] hover:bg-gray-100 transition">
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious  />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel
