import React, { useState } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';


interface ETProps {
    name: string,
    value: string,
    onSubmit: (...args: any) => any,
    style?: React.CSSProperties
}

const EditableTextField: React.FC<ETProps> = ({ name, value, onSubmit }) => {
    const [editing, setEditing] = useState(false);
    const [ text, setText ] = useState(value);
    const handleBlur = () => {
        onSubmit(text);
        setEditing(!editing);
    }
    const handleChange = (e: any) => {
        setText(e.target.value)
    }

    return editing ? (
        <TextField 
            size="small"
            autoFocus
            name={name}
            value={text}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ color: 'inherit !important'}}
            />
    ) : (
        <span onClick={() => setEditing(!editing)}>{ value }</span>
    )
};

export default EditableTextField