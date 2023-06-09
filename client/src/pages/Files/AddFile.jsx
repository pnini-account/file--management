import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import QueuePlayNextIcon from '@mui/icons-material/QueuePlayNext';
import { useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';

import Uploader from './file/uploudFile';
import axios from "axios";
export default function AddFile({ onAdd }) {

    const navigate = useNavigate();
    const { id } = useParams();


    const [file, setFile] = useState();

    useEffect(() => {
        console.log("add" + file)
        onAdd(file)
    }, [file])

    const token = sessionStorage.getItem("token");
    const idFolder = id;
    async function addFileToDB(name, file) {
    console.log("idFolder"+idFolder)

        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", name);
        formData.append("idFolder", idFolder);

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        axios.post("http://localhost:3600/api/upload", formData, config).then(({ data }) => {
            if (data?.name) {
                console.log(data.name);
                console.log(data.location);
                onAdd(data)
            }
        }).catch(err => {
            console.log("error");
        });
    }
   
    const [open, setOpen] = React.useState(false);
    const [name, setName] = useState("");
    const [fileToPost, setFileToPost] = useState({});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const fileSelected = (f) => {
        setFileToPost(f)
    }
    const handleClose = () => {
        console.log("add" + file)
        onAdd(file)
        setOpen(false);
    };

    return (

        <>
            <Button variant="outlined" startIcon={<QueuePlayNextIcon />} sx={{ left: "80%" }} onClick={() => { handleClickOpen() }}>
                Add file
            </Button>
            <Dialog open={open} onClose={() => { handleClose() }}>

                <DialogContent>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="name of file"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Uploader onChoose={fileSelected}></Uploader>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => { handleClose(); addFileToDB(name, fileToPost) }}>Save</Button>
                </DialogActions>
            </Dialog>

        </>)
}
