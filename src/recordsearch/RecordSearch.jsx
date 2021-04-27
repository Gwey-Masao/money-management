import React, { useState } from 'react';
import { Paper, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, DialogTitle } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
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
        left: theme.spacing(-35),
        float: 'left',
        marginBottom: 20,
        // top: theme.spacing(-46),
      },
      button_2: {
        left: theme.spacing(27),
        float: 'left',
        marginBottom: 20,
        // top: theme.spacing(-46),
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

    const Reset = () =>{
        setType('');
        setCategory('');
    }

    return (
        <div className={classes.root}>
            <Paper elevation={3} variant="">
                <DialogTitle>
                    <div style={{ display: 'flex' }}>
                        <SearchIcon style={{ fontSize: '40px' }} />
                        <Typography style={{ fontSize: '30px' }}>絞り込み検索</Typography>
                    </div>
                </DialogTitle>

                <div>
                    <Typography className={classes.type} variant="h5" component="h2">
                        種類
                    </Typography>

                    <FormControl variant="outlined" className={classes.formControl1}>
                        <InputLabel id="demo-simple-select-outlined-label">種類</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={type}
                            onChange={handleChange1}
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
                    <Typography className={classes.type} variant="h5" component="h2">
                        区分
                    </Typography>

                    <FormControl variant="outlined" className={classes.formControl2}>
                        <InputLabel id="demo-simple-select-outlined-label">区分</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={category}
                            onChange={handleChange2}
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

                <div>
                    <Typography className={classes.type} variant="h5" component="h2">
                        日付
                    </Typography>
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
                <br className={classes.end} />
        <div className={classes.blockButton}>
          {/* リセットボタン */}
          <Button variant="contained" onClick={Reset} className={classes.button}>クリア</Button>
          {/* 検索ボタン */}
          {/* <Button variant="contained" onClick={Search} className={classes.button_2}>検索</Button> */}
        </div>
            </Paper>
        </div>
    )
};

export default RecordSearch;