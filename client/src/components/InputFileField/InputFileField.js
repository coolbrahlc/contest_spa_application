import React, {useState} from 'react'
import style from "../CreateEntry/CreateEntry.module.scss";

export const InputFileField = (props) =>{

    const onChange = (e) => {
        const { input: { onChange } } = props;
        onChange(e.target.files[0])
    };
    const { input: { value } } = props;
    //const {input, label, required, meta} = props;
    return(
            <div>
                <input
                    type='file'
                    accept='.jpg, .png, .jpeg'
                    onChange={onChange}
                />
            </div>
    )
};

export const InputImgField = (props) =>{

    const [src, setSrc] = useState(false);

    const onChange = (e) => {
        const { input: { onChange } } = props;
        const fileData = e.target.files[0];
        onChange(e.target.files[0]);

        const reader = new FileReader();
        reader.onloadend = function () {
            const src = reader.result;
            setSrc(src)
        };
        reader.readAsDataURL(fileData);
    };
    const { input: { value } } = props;
    return(
        <div>
            <input
                type='file'
                accept='.jpg, .png, .jpeg'
                onChange={onChange}
            />
            {
                src && <div className={style.img}><img src={src} className="img-fluid" alt={"logo"}/></div>
            }
        </div>
    )
};
