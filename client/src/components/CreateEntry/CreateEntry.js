import React, {useState} from "react";
import style from "./CreateEntry.module.scss";
import {connect} from "react-redux";
import {createEntry} from "../../actions/actionCreator";
//import FilePreview from 'react-preview-file';

const CreateEntry = (props) => {

    const [text, setText] = useState("");
    const [originalFile, setFile] = useState(false);
    const [src, setSrc] = useState(false);


    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleSubmit = () => {
        const {contestId, user, createEntry, contest} = props;
        const contestCreator = contest.creator_id;
        if(contestId && user) {
            if(text || originalFile){
                const fdata = new FormData();
                console.log(originalFile);
                fdata.append('entryFile', originalFile);
                fdata.append('entry', JSON.stringify({
                    user_id: user.id,
                    contest_id: contestId,
                    answer: text,
                    contestCreator
                }));
                createEntry({
                    fdata,
                    contestCreator
                });
                setSrc(false);
                setFile(false);
                setText('');
            }
        }
    };

    const renderTextEntrie = () => {
        return(
            <div className={style.entryContainer}>
                <label>Input you idea for contest</label>
                <div className={style.inputDefault}>
                    <input type="text" name={"text"} placeholder={"Your idea"} onChange={handleTextChange} value={text}/>
                </div>
                {/*<input type={"submit"} value={"Send"} onClick={handleSubmit}/>*/}
                <div className="btn btn-primary btn" onClick={handleSubmit}>
                    Submit entry
                </div>
            </div>
        );
    };

    const handleImageChange = (e) => {
        const fileData = e.target.files[0];
        setFile(fileData);
        const reader  = new FileReader();
        reader.onloadend = function () {
            const src = reader.result;
            setSrc(src)
        };
        reader.readAsDataURL(fileData);
    };


    const renderPicEntrie = () => {
        return(
            <div className={style.entryContainer}>
                <label>Input you idea for contest</label>
                <input type="file"  name={"file"} accept=".png, .jpg, .jpeg"  onChange={handleImageChange}/>

                {
                    src && <div className={style.img}><img src={src} className="img-fluid" alt={"logo"}/></div>
                }
                <div className="btn btn-primary btn mt-3 mb-3" onClick={handleSubmit}>
                    Submit entry
                </div>
            </div>
        );
    };

    const renderEntrie = () => {
        const {type} = props;
        if(type === 'Logo'){
            return renderPicEntrie()
        }
        else{
            return renderTextEntrie()
        }
    };

    return(
        renderEntrie()
    );
};

const mapStateToProps = (state) => {
    const {user} = state.authReducer;
    return {user};
};

const mapDispatchToProps = (dispatch) => ({
    createEntry: (data) => dispatch(createEntry(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateEntry);
