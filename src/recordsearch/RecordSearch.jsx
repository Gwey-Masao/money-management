import React, { useEffect, useState } from 'react';
import { Paper, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, DialogTitle, Grid } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import './RecordSearch.css';
import ListData from './ListData';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0),
            width: '100%',
        },
    },

    type: {
        float: 'left',
        paddingTop: 30,
        marginLeft: theme.spacing(2.5),
        marginTop: theme.spacing(0),
    },

    formControl1: {
        minWidth: 250,
        margin: theme.spacing(1),
        left: theme.spacing(5),
        top: theme.spacing(0.5),
    },

    formControl2: {
        minWidth: 250,
        margin: theme.spacing(1),
        left: theme.spacing(5),
        top: theme.spacing(1),
    },

    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(6),
        marginRight: theme.spacing(1),
        top: theme.spacing(1.5),
        width: 200,
    },

    blockButton: {
        width: '50%',
        marginRight: 'auto',
        marginLeft: 'auto',
      },
    button: {
        left: theme.spacing(8),
        float: 'left',
        marginBottom: 20,
        // top: theme.spacing(-46),
    },
    button_2: {
        left: theme.spacing(10),
        float: 'left',
        marginBottom: 20,
    },

}));

const RecordSearch = () => {
    const classes = useStyles();

    const [type, setType] = useState([]);
    const handleChange1 = (event) => {
        setType(event.target.value);
    };

    const [category, setCategory] = useState([]);
    const handleChange2 = (event) => {
        setCategory(event.target.value);
    };

    const Reset = () => {
        setType('');
        setCategory('');
    }

    const [data, setData] = useState([]);
    useEffect(() => {
        const newValue =
            { type: type, category: category }
        if (data.length === 0) {
            axios
                .post('/api/recordsearch', newValue)
                .then(response => {
                    setData(response.data);
                    console.log([response.data]);
                })
                .catch(() => {
                    console.log('connected error');
                })
        }
    }, []);

    const [getType, setGetType] = useState([]);
    useEffect(() => getTypeData(), []);
    const getTypeData = () => {
        if (getType.length === 0) {
            axios
                .post('/api/recordsearch001')
                .then(response => {
                    setGetType(response.data);
                    console.log([response.data]);
                })
                .catch(() => {
                    console.log('connected error');
                })
        }
    }

    const [getCategory, setGetCategory] = useState([]);
    useEffect(() => getCategoryData(), []);
    const getCategoryData = () => {
        if (getCategory.length === 0) {
            axios
                .post('/api/recordsearch002')
                .then(response => {
                    setGetCategory(response.data);
                    console.log([response.data]);
                })
                .catch(() => {
                    console.log('connected error');
                })
        }
    }

    const clean = getType.filter((x,i,self) => {
        return (self.findIndex((y) => {
            return (x.type === y.type)
        }) === i);
    });
    

    const Search = () => {
        const search = data.filter((data) => {
            return (data.type === type) ||
                    (data.category === category);
        });

        const cleanList = search.filter((data_x, index, self) => {
            return (self.findIndex((data_y) => {
                return (data_x.id === data_y.id)
            }) === index);
        });

        console.log(cleanList);
        ListData.setRecordData(cleanList);
        window.location.href = "/record_result";
    }

    return (
        <div className={classes.root}>
            <Paper elevation={3} variant="">
                <DialogTitle>
                    <div style={{ display: 'flex' }}>
                        <SearchIcon style={{ fontSize: '40px' }} />
                        <Typography style={{ fontSize: '30px' }}>??????????????????</Typography>
                    </div>
                </DialogTitle>

                <div>
                    <Typography className={classes.type} variant="h5" component="h2">
                        ??????
                    </Typography>

                    <FormControl variant="outlined" className={classes.formControl1}>
                        <InputLabel id="demo-simple-select-outlined-label">??????</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={type}
                            onChange={handleChange1}
                            label="??????"
                        >
                            <MenuItem value=""></MenuItem>
                            {clean.map((data) => (
                                <MenuItem key={data.id} value={data.type} >
                                    {data.type}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                <div>
                    <Typography className={classes.type} variant="h5" component="h2">
                        ??????
                    </Typography>

                    <FormControl variant="outlined" className={classes.formControl2}>
                        <InputLabel id="demo-simple-select-outlined-label">??????</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={category}
                            onChange={handleChange2}
                            label="??????"
                        >
                            <MenuItem value=""></MenuItem>
                            {getCategory.map((data) => (
                                <MenuItem key={data.id} value={data.category} >
                                    {data.category}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                {/* <div>
                    <Typography className={classes.type} variant="h5" component="h2">
                        ??????
                    </Typography>
                    <form className={classes.container} noValidate>
                        <TextField
                            id="date"
                            label="??????"
                            type="date"

                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </form>
                </div> */}
                <br className={classes.end} />

                
                <div className={classes.blockButton}>
                    {/* ????????????????????? */}
                    <Button variant="contained" onClick={Reset} className={classes.button}>?????????</Button>
                    {/* ??????????????? */}
                    <Button variant="contained" onClick={Search} className={classes.button_2}>??????</Button>
                </div>

            </Paper>
        </div>
    )
};

export default RecordSearch;