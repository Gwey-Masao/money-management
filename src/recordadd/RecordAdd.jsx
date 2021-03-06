import React, { useEffect, useState } from 'react';
import { Paper, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, DialogTitle, Grid } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import axios from 'axios';
import './RecordAdd.css';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0),
            width: '100%',
        },
    },

    content: {
        width: '250px',
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

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            isNumericString
            maxLength="11"
        />
    );
}
NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const RecordAdd = () => {
    const classes = useStyles();

    const [number, setNumber] = useState("");
    const [day, setDay] = useState("");
    const [name, setName] = useState("");
    const [money, setMoney] = useState("");
    const [type, setType] = useState("");
    const [category, setCategory] = useState([]);

    const handleChange2 = (e) => {
        setDay(e.target.value);
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

    const Reset = () => {
        setNumber('');
        setDay('');
        setName('');
        setMoney('');
        setType('');
        setCategory('');
    }

    const submit = () => {
        const newValue = {id:number, registrationdate:day, name:name, money:money, type:type, category_id:category};

        if ((number.length === 0) || (day.length === 0) || (name.length === 0) ||
            (money.length === 0) || (type.length === 0) || (category.length === 0)) {
            window.alert('?????????????????????????????????\n*????????????????????????');
        } else {

            axios
                .post('/api/recordadd', newValue)
                .then(response => {
                    console.log(response.data);
                    window.alert("?????????????????????")
                })
                .catch(() => {
                    console.log('submit error');
                    window.alert("??????????????????????????????")
                })
        }
    }

    const [getCategory, setGetCategory] = useState([]);

    useEffect(() => getCategoryData(), []);
    const getCategoryData = () => {
        if (getCategory.length === 0) {
            axios
                .get('/api/recordadd002')
                .then(response => {
                    setGetCategory(response.data);
                    console.log([response.data]);
                })
                .catch(() => {
                    console.log('connected error');
                })
        }
    }

    return (
        <div className={classes.root}>
            <Paper elevation={3} variant="">
                <DialogTitle>
                    <div style={{ display: 'flex' }}>
                        {/* <SearchIcon style={{ fontSize: '25px' }} />
                            <PeopleAltIcon style={{ fontSize: '40px', }} /> */}
                        <AddIcon style={{ fontSize: '40px', }}/>
                        <Typography style={{ fontSize: '30px' }}>????????????</Typography>
                    </div>
                </DialogTitle>

                <Grid container spacing={3} className="form">
                    <Grid item xs={4}>
                        <TextField
                            required
                            variant="outlined"
                            name="number"
                            label="????????????"
                            value={number}
                            onChange={handleChange}
                            className={classes.content}
                            InputProps={{ inputComponent: NumberFormatCustom }} />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                            required
                            type="date"
                            inputProps={{ max: "9999-12-31" }}
                            name="Registrationdate"
                            label="??????"
                            defaultValue="2021-01-01"
                            value={day}
                            onChange={handleChange2}
                            className={classes.content}
                            InputLabelProps={{
                                shrink: true,
                            }} />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField required variant="outlined" name="name" value={name} label="?????????" onChange={handleChange} className={classes.content} />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                            required
                            // type="number"
                            name="money"
                            label="??????"
                            value={money}
                            onChange={handleChange}
                            InputProps={{
                                // maxlength:20, 
                                inputComponent: NumberFormatCustom,
                            }}
                            variant="outlined"
                            className={classes.content}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField required variant="outlined" name="type" value={type} label="??????" onChange={handleChange} className={classes.content} />
                    </Grid>

                    <Grid item xs={4}>
                        <FormControl variant="outlined" className={classes.content}>
                            <InputLabel>???????????????*</InputLabel>
                            <Select required
                                name="category"
                                value={category}
                                onChange={handleChange}
                            >
                                <MenuItem value=""></MenuItem>
                                {getCategory.map((data) => (
                                    <MenuItem key={data.category_id} value={data.category_id} >
                                        {data.category}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>


                    <Grid container spacing={5} justify="flex-end" className={classes.form}>
                        <Grid item xs={4}>
                            <Button onClick={Reset} className={classes.button} variant="contained">
                                ?????????
                            </Button>
                            <Button onClick={submit} className={classes.button2} variant="contained">
                                ??????
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
};

export default RecordAdd;