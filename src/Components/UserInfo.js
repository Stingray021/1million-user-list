import React, {memo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {applyChange, changeSelected} from "../storage/userReducer";

const UserInfo = memo(() => {
    const selectedUser = useSelector(state => state.users.selectedUser)
    console.log(selectedUser)
    const dispatch = useDispatch()
    const changeUserParam = () => {
        selectedUser.jobTiile = document.getElementById("jobTitle").value
        selectedUser.department = document.getElementById("department").value
        selectedUser.company = document.getElementById("company").value
    }

    if (Object.keys(selectedUser).length === 0)
        return (<div>Выбирите пользователя</div>)
    else return (
        <div style={{ padding: '10px'}}>
            <div>
                {selectedUser.name && selectedUser.name}</div>
            <div>
                <div><img alt={"avatar"}/></div>
                <div style={{display:"flex", flexDirection: "column"}}>
                    <label>Компания</label>
                    <input id={"company"} type={"text"}
                           value={selectedUser.company && selectedUser.company}
                           onChange={(e) => dispatch(changeSelected({value: e.target.value, name: "company"}))}
                    />

                    <label>Отдел</label>
                    <input id={"department"} type={"text"}
                           value={selectedUser.department && selectedUser.department}
                           onChange={(e) => dispatch(changeSelected({value: e.target.value, name: "department"}))}
                    />
                    <label>Должность</label>
                    <input id={"jobTitle"} type={"text"}
                           value={selectedUser.jobTitle && selectedUser.jobTitle}
                           onChange={(e) => dispatch(changeSelected({value: e.target.value, name: "jobTitle"}))}

                    />
                    <input type={"button"} value={"Изменить"} onClick={() => dispatch(applyChange())}/>
                </div>
            </div>
        </div>
    );
});

export default UserInfo;