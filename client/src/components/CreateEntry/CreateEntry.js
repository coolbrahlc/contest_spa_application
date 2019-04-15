import React, {useState} from "react";
import style from "./CreateEntry.module.scss";
import {connect} from "react-redux";
import {createEntry} from "../../actions/actionCreator";
//import FilePreview from 'react-preview-file';

const CreateEntry = (props) => {

    const [text, setText] = useState("");
    const [originalFile, setFile] = useState(null);

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleSubmit = () => {
        const {contestId, user, createEntry} = props;
        if(contestId && user) {
            if(text || originalFile){
                const fdata = new FormData();
                fdata.append('entryFile', originalFile);
                fdata.append('entry', JSON.stringify({
                    user_id: user.id,
                    contest_id: contestId,
                    answer: text
                }));
                createEntry(fdata);
                //props.history.push('/dashboard');
            }
        }
    };

    const renderTextEntrie = () => {
        return(
            <div>
                <label>Input you idea for contest</label>
                <input type="text" name={"text"} onChange={handleTextChange} value={text}/>
                <input type={"submit"} value={"Send"} onClick={handleSubmit}/>
            </div>
        );
    };

    const handleImageChange = (e) => {
        const fileData = e.target.files[0];
        setFile(fileData);
    };

    // const renderPreview = () => {
    //     if(originalFile){
    //         return <FilePreview file={originalFile}>
    //             {(preview) => <img src={preview} alt={"logo"}/>}
    //         </FilePreview>
    //     }
    // };

    const renderPicEntrie = () => {
        return(
            <div>
                <label>Input you idea for contest</label>
                <input type="file" name={"file"} accept="image/*" onChange={handleImageChange}/>
                <input type={"submit"} value={"Send"} onClick={handleSubmit}/>
                {
                    //renderPreview()
                }
            </div>
        );
    };

    const renderEntrie = () => {
        const {type} = props;
        if(type === 'logo'){
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
