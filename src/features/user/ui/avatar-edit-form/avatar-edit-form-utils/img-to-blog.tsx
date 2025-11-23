import { loadImage } from './load-image'
import { TArea } from '../avatar-edit-form-types'


export async function imgToBlob(imageSrc: string, area: TArea): Promise<Blob> {
    const img = await loadImage(imageSrc)
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    if (!context) {
        throw new Error('Context is not available')
    }

    canvas.width = area.width
    canvas.height = area.height

    context.drawImage(
        img,
        area.x,
        area.y,
        area.width,
        area.height,
        0,
        0,
        area.width,
        area.height,
    )

    return new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (blob) resolve(blob)
            else reject(new Error('Canvas is empty'))
        }, 'image/jpeg')
    })
}
