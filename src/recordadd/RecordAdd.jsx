import React, { useState } from 'react';
import { Paper, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, DialogTitle,Grid } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(10),
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

}));

const RecordSearch = () => {
    const classes = useStyles();

    const [number, setNumber] = useState("");
    const [day, setDay] = useState("");
    const [name, setName] = useState("");
    const [money, setMoney] = useState("");
    const [type, setType] = useState("");
    const [category, setCategory] = useState("");

    const handleChange = e => {
        switch (e.target.name) {
            case 'number':
                setNumber(e.target.value);
                break;
            case 'day':
                setDay(e.target.value);
                break;
            case 'name':
                setName(e.target.value);
                break;
            case 'money':
                setMoney(e.target.value);
                break;
            case 'type':
                setType(e.target.value);
                break;
            case 'category':
                setCategory(e.target.value);
                break;
            default:
                console.log('text not found');
        }
    }

    const handleChange2 = e => {
        if (e.target.value) {
            setDay(e.target.value);
        } else {
            const nowYear = day.slice(0, 4);
            const nowMonth = day.substr(5, 2);
            const nowDate = day.slice(-2);

            if (nowDate !== "01") {
                setDay(`${nowYear}-${nowMonth}-01`);
            }
            else {
                switch (nowMonth) {
                    case "02":
                        if ((nowYear * 1) % 4 === 0) {
                            setDay(`${nowYear}-${nowMonth}-29`);
                        } else {
                            setDay(`${nowYear}-${nowMonth}-28`);
                        }
                        break;
                    case "04":
                    case "06":
                    case "09":
                    case "11":
                        setDay(`${nowYear}-${nowMonth}-30`);
                        break;
                    default:
                        break;
                }
            }
        }
    }

    return (
        <div className={classes.root}>
            <Paper elevation={3} variant="">
                <DialogTitle>
                    <div style={{ display: 'flex' }}>
                        {/* <SearchIcon style={{ fontSize: '25px' }} />
                            <PeopleAltIcon style={{ fontSize: '40px', }} /> */}
                        <Typography style={{ fontSize: '30px' }}>詳細登録</Typography>
                    </div>
                </DialogTitle>

                <div>
                    <form className={classes.container} noValidate>
                        <TextField
                            id="date"
                            label="日付"
                            type="date"

                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </form>
                </div>

                <div>
                    <FormControl variant="outlined" className={classes.formControl1}>
                        <InputLabel id="demo-simple-select-outlined-label">種類</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={type}
                            onChange={handleChange}
                            label="種類"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div>
                    <FormControl variant="outlined" className={classes.formControl2}>
                        <InputLabel id="demo-simple-select-outlined-label">区分</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={category}
                            onChange={handleChange}
                            label="区分"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </Paper>
        </div>
    )
};

export default RecordSearch;