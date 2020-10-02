import React from 'react';
import { useSelector } from "react-redux";
import Users from "./Users";
import Preloader from '../common/Preloader/Preloader';
import { getIsFetching } from '../../Redux/users-selectors';

export const UserPage = () => {

    const isFetching = useSelector(getIsFetching)

    return <>
        { isFetching ? <Preloader /> : undefined }
        <Users />
    </>
}