import React, {memo, useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addEnd, addStart, deleteEnd, deleteStart, setChunk, setTotalCount, setSelected} from "../storage/userReducer";
import UserInfo from "../Components/UserInfo";

const Users = memo(() => {
    const [fetching,setFetching] = useState(false)
    const [loading, setLoading] = useState(true)
    const users = useSelector(state => state.users.users)
    const totalCount = useSelector(state => state.users.totalCount)
    const dispatch = useDispatch()
    const [currentPoint, setCurrentPoint] = useState(0)
    const [start, setStart] = useState(0);
    const [loadedPoints, setLoadedPoints] = useState({})
    const [timeOut, setTimeOut] = useState(false)
    const rowHeight=20
    const visibleRows= 25
    const limit = 1000

    function getTopHeight() {
        return rowHeight * start;
    }
    function getBottomHeight() {
        return rowHeight * (totalCount - (start + visibleRows + 1));
    }

    useEffect(() => {
        if (!(currentPoint in loadedPoints))
        {
            console.log("Триггер")
            setFetching(true)
        }
    }, [currentPoint])
    const onScroll =  (e) => {
        setCurrentPoint(Math.floor((document.getElementById("list").offsetHeight + e.target.scrollTop)/(rowHeight*limit)))
        setStart(Math.min(
            totalCount - visibleRows - 1,
            Math.floor(e.target.scrollTop / rowHeight)
        ));
    }

    useEffect(() => {
        fetch(`http://localhost:8080/api/test/get-total`)
            .then(res => res.json())
            .then(data => {
                dispatch(setTotalCount(data))

            })
            .then(() =>
                fetch(`http://localhost:8080/api/test/get-users?limit=${limit}&isForEnd=true`)
                    .then(res => res.json())
                    .then(data => {
                        dispatch(setChunk([currentPoint*limit, limit, data]))
                        loadedPoints[currentPoint] = true
                        setLoading(false)
                    })
            )
    }, []);

    useEffect(() => {
        if (fetching)
        {
            // const id = users[users.length-1].id
            fetch(`http://localhost:8080/api/test/get-users?page=${currentPoint}&limit=${limit}&isForEnd=true`)
                .then(res => res.json())
                .then(data => {
                    dispatch(setChunk([currentPoint*limit, limit, data]))
                    // users.length > maxSize && dispatch(deleteStart(users.length - maxSize))
                })
                .finally(() =>  {
                    loadedPoints[currentPoint] = true
                    setFetching(false)

                })
        }
    }, [currentPoint, dispatch, fetching, loadedPoints]);
    
    if (loading)
        return (<div>Loading...</div>)
    else
        return (
            <div style={{display: "flex", justifyContent: 'center'}}>
                <div style={{ height: rowHeight * visibleRows + 1, overflow: 'auto', width: "30%"}}
                    onScroll={onScroll}
                >
                    <div style={{ height: getTopHeight()}} />
                    <div id={"list"}
                        style={{width: '100%', overflow: "hidden"}}
                    >
                        {users.slice(start, start + visibleRows + 1).map((row, rowIndex) => (
                            <div
                                style={{ height: rowHeight}}
                                key={row.id}
                                onClick={()=> dispatch((setSelected(rowIndex+start)))}
                            >{row.name}</div>
                        ))}
                    </div>
                    <div style={{ height: getBottomHeight()}}/>
                </div>
            <UserInfo></UserInfo>
            </div>
        );
});

export default Users;