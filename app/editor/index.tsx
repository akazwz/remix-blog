import type {ChangeEvent} from "react"
import {marked} from 'marked'

export type EditorProps = {
    value: string,
    handleValueChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
    id?: string,
    formName?: string
    placeHolder?: string
}

const Editor = ({value, handleValueChange, id, formName, placeHolder,}: EditorProps) => {
    const previewPlaceHolder = `<div 
                    style="display: flex; 
                    height: 240px;
                    font-weight: lighter;
                    align-items: center; 
                    justify-content: center"
                    >
                    <p>Preview will show here</p> 
                    </div>`
    
    const renderer: any = {
        image(href: string | null, title: string | null): string {
            return `<img
                src=${href} 
                alt=${title} 
                loading='lazy'
                style='
                    height: auto;
                    object-fit: contain;
                    display: block;
                    margin: 1.24rem auto;
                    max-width: 100%; 
                    max-height: calc(50vh + 180px);
                    border-radius: 0.375rem;
                  '
               />`
        }
    }

    marked.use({renderer})

    const htmlVal = marked.parse(value || previewPlaceHolder)
    return (
        <div>
            {/* editor */}
            <textarea
                id={id}
                name={formName}
                placeholder={placeHolder}
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
            {/* preview */}
            <div
                style={{
                    width: '100%',
                    margin: '5px',
                    padding: '12px',
                    borderRadius: '5px',
                    minHeight: '240px',
                    maxHeight: '80vh',
                    background: "palevioletred",
                }}
                dangerouslySetInnerHTML={{__html: `${htmlVal}`}}
            />
        </div>
    )
}

export default Editor