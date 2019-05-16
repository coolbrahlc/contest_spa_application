import style from "../../pages/ContestsPage/ContestPage.module.scss";
import {publicURL} from "../../api/baseURL";
import React from 'react';

const ContestBrief = (props) => {
    const {name, type, file, venture_name, target_customer, type_of_title,
        preferences, industry, id, is_active} = props.contest;
    const {editMode, renderEditButton, renderStatus, renderImage} = props;

    return (
        <div className={style.brief}>
            {
                renderEditButton()
            }
            {!editMode &&
            <>
                <ul>
                    {
                        renderStatus(is_active)
                    }
                    <div >#{id}</div>

                    <li className={style.brief__thin}>
                        <h5>Contest name</h5>

                        <p>{name}</p>
                    </li>
                    <li className={style.brief__thin}>
                        <h5>Contest type</h5>
                        <p>{type}</p>
                    </li>
                    {
                        type_of_title &&
                        <li className={style.brief__thin}>
                            <h5>Type of name</h5>
                            <p>{type_of_title}</p>
                        </li>
                    }
                    {
                        venture_name &&
                        <li className={style.brief__thin}>
                            <h5>Venture name</h5>
                            <p>{venture_name}</p>
                        </li>
                    }
                    <li className={style.brief__thin}>
                        <h5>Industry</h5>
                        <p>{industry}</p>
                    </li>
                    <li className={style.brief__thin}>
                        <h5>Preferences</h5>
                        <p>{preferences}</p>
                    </li>
                    <li className={style.brief__thick}>
                        <h5>Target customers</h5>
                        <p>{target_customer}</p>
                    </li>
                    <li className={style.brief__thick}>
                        <h5 className={style.brief__thick}>Description</h5>
                        <p>{venture_name}</p>
                    </li>
                    {file &&
                    <li className={style.brief__thin}>
                        <h5>File</h5>

                        {(type === 'Logo')?
                            renderImage(file) :

                            <h5 className={style.brief__thick}>
                                <a href={publicURL + file}>{file}</a>
                            </h5>
                        }

                    </li>
                    }

                </ul>
            </>}

        </div>
    );
};

export default ContestBrief
