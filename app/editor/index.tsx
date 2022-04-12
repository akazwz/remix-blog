import type {ChangeEvent} from "react"
import {marked} from 'marked'
import {FlexBox} from "~/components"

export type EditorProps = {
    value: string,
    handleValueChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

const Editor = ({value, handleValueChange}: EditorProps) => {
    const htmlVal = marked.parse(value || '')
    return (
        <FlexBox>
            {/* editor */}
            <FlexBox
                alignItems="center"
                justifyContent='center'
            >
                <textarea
                    value={value}
                    onChange={handleValueChange}
                    style={{
                        width: ' 100%',
                        height: '240px',
                        margin: '5px',
                        padding: '3px 7px',
                        fontSize: '17px',
                    }}
                    draggable='false'
                />
            </FlexBox>
            {/* preview */}
            <div
                style={{
                    width: '100%',
                    margin: '5px',
                    padding: '12px',
                    borderRadius: '5px',
                    minHeight: '240px',
                    background: "palevioletred",
                }}
                dangerouslySetInnerHTML={{__html: `${htmlVal}`}}
            />
        </FlexBox>
    )
}

export default Editor