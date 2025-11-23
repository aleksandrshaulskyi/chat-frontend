import { ChangeEvent, ReactElement, useCallback, useEffect, useRef, useState } from 'react'
import Cropper, { Point } from 'react-easy-crop'

import { Button } from '../../../../components/button/button'
import { imgToBlob } from './avatar-edit-form-utils/img-to-blog'
import { resetUserErrorData } from '../../model/user-slice'
import { TAvatarEditFormProps } from './avatar-edit-form-types'
import { updateAvatarThunk } from '../../model/thunks/update-avatar'
import { useAppDispatch, useAppSelector } from '../../../../hooks'

import AvatarEditFormStyling from './avatar-edit-form.module.css'


export function AvatarEditForm(props: TAvatarEditFormProps): ReactElement {
    const dispatch = useAppDispatch()

    const accessToken = useAppSelector(state => state.session.accessToken)
    const {userErrorData, userData} = useAppSelector(state => state.user)
    const previewContainerClassName = userErrorData ? `${AvatarEditFormStyling.errorPreviewContainer}` : `${AvatarEditFormStyling.previewContainer}`

    const [src, setSrc] = useState<any>(props.src)
    const [avatarUrl, setAvatarUrl] = useState<string>('')
    const [crop, setCrop] = useState<Point>({x: 0, y: 0})
    const [zoom, setZoom] = useState<number>(1.1)
    const [croppedArea, setCroppedArea] = useState<any>()
    const avatarInputRef = useRef<HTMLInputElement | null>(null)

    const onCropComplete = useCallback(
        (_: any, croppedArea: any) => {
            setCroppedArea(croppedArea)
        }, []     
    )

    function handleSelectionButtonClick() {
        dispatch(resetUserErrorData())
        avatarInputRef.current?.click()
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const avatar = event.target.files?.[0]

        if (avatar) {
            const avatarUrl = URL.createObjectURL(avatar)

            setAvatarUrl(avatarUrl)
        }
    }

    async function handleButtonClick() {
        dispatch(resetUserErrorData())
        const blob = await imgToBlob(avatarUrl, croppedArea)
        const avatar = new File([blob], 'temporary.jpg', {type: 'image/jpg'})

        if (accessToken) {
            const data = {accessToken: accessToken, avatar: avatar}
            dispatch(updateAvatarThunk(data))
        }
    }

    useEffect(
        () => setSrc(userData?.avatar_url), [userData]
    )

    return (
        <div className={AvatarEditFormStyling.container}>
            <div className={AvatarEditFormStyling.avatarContainer}>
                <img className={AvatarEditFormStyling.avatar} src={src} alt='User avatar'></img>
            </div>
            <div className={AvatarEditFormStyling.selectionButtonContainer}>
                <Button text='Choose file' isActive={true} isLoading={false} onClick={handleSelectionButtonClick}/>
            </div>
            <input className={AvatarEditFormStyling.hiddenInput} type='file' ref={avatarInputRef} onChange={handleChange}></input>
            {
                avatarUrl && (
                    <div className={previewContainerClassName}>
                        <Cropper
                            image={avatarUrl}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            cropShape='round'
                            showGrid={false}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                            objectFit='cover'
                        />
                    </div>
                )
            }
            { userErrorData && (
                <div className={AvatarEditFormStyling.errorContainer}>
                    <p className={AvatarEditFormStyling.errorText}>{userErrorData && String(userErrorData.details?.avatar)}</p>
                </div>
                )
            }
            <div className={AvatarEditFormStyling.buttonContainer}>
                {avatarUrl &&<Button text='Update avatar' isActive={true} isLoading={false} onClick={handleButtonClick}/>}
            </div>
        </div>
    )
}
