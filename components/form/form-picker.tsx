'use client'

import { useEffect, useState } from "react"
import { useFormStatus } from "react-dom"

import { unsplash } from "@/lib/unsplash"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface FormPickerProps {
    id : string,
    errors ?: Record<string, string[] | undefined>
}

export const FormPicker = ({
    id,
    errors
} : FormPickerProps ) => {

    const { pending } = useFormStatus();

    const [images, setImages ] = useState<Array<Record<string, any>>>([])
    const [isLoading, setIsLoading] = useState(false)
    const [ selectedImageId, setSelectedImageId] = useState(null)

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const result = await unsplash.photos.getRandom({
                    collectionIds : ['317099'],
                    count : 9
                })

                if(result && result.response) {
                    const newImages = (result.response as Array<Record<string, any>>)
                    setImages(newImages)
                } else {
                    console.log('Failed to get images');
                    
                }
            } catch (error) {
                console.log(error);   
                setImages([])
            }  finally {
                setIsLoading(false)
            }
        }

        fetchImages()
    }, [])

    if(isLoading) {
        return (
            <div className="p-6 flex items-center justify-center">
              <Loader2 className="h-6 w-6 text-sky-700 animate-spin"/>
            </div>
        )
    }

    return (
        <div className="relative">
          <div className="grid grid-cols-3 gap-3 mb-2">
            {images.map((image) => (
                <div 
                 className={cn('cursor-pointer relative aspect-video hover:opacity-75 transition group bg-muted', pending && 'opacity-50 cursor-auto hover:opacity-50')}
                 onClick={() => {
                    if(pending) return
                    setSelectedImageId(image.id)
                 }}
                >
                  <Image 
                   fill 
                   src={image.urls.thumb}
                   alt="Unsplash image" 
                   className="object-cover rounded-sm"
                  />
                </div>
            ))}
          </div>
        </div>

    )
}
    