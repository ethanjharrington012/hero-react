import react, { useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { chooseComic, chooseDescription, chooseName, chooseSuper } from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents/Input';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks/FetchData';

interface HeroFormProps {
    id?:string;
    data?:{}
}

interface HeroState {
    name: string;

}

export const HeroForm = (props:HeroFormProps) => {
    const dispatch = useDispatch();
    let { heroData, getData } = useGetData();
    const store = useStore()
    const name = useSelector<HeroState>(state => state.name)
    console.log(name)
    const { register, handleSubmit } = useForm({})

    const onSubmit = async (data:any, event:any) => {
        console.log(props.id)

        if( props.id!){
            await serverCalls.update(props.id!, data)
            console.log(`Updated:${data} ${props.id}`)
            window.location.reload()
            event.target.reset();

        } else {
            dispatch(chooseName(data.name))
            dispatch(chooseDescription(data.description))
            dispatch(chooseComic(data.comic_in))
            dispatch(chooseSuper(data.super_power))
            console.log(store.getState())
            await serverCalls.create(store.getState())
            window.location.reload()
        }
    }
    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Hero Name</label>
                    <Input {...register('name')} name="name" placeholder='Name' />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <Input {...register('description')} name="description" placeholder='Description' />
                </div>
                <div>
                    <label htmlFor="comic_in">comic in</label>
                    <Input {...register('comic_in')} name="comic_in" placeholder='comic_in' />
                </div>
                <div>
                    <label htmlFor="super_power">super power</label>
                    <Input {...register('super_power')} name="super_power" placeholder='super power' />
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
    
}


