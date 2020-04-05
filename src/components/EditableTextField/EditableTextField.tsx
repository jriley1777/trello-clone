import React, { useState } from 'react';
import styled from 'styled-components';
import InputBase from '@material-ui/core/InputBase';

const StyledInputBase = styled(InputBase)`
    color: inherit !important;
    font-family: inherit !important;
    font-size: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
    max-width: inherit !imporant;
    width: inherit !important;
    height: inherit !important;
    background: rgba(0,0,0,0.2);
    border-radius: 5px;
`

interface ETProps {
    name: string,
    value: string,
    onSubmit: (...args: any) => any,
    style?: React.CSSProperties
}

const EditableTextField: React.FC<ETProps> = ({ name, value, onSubmit, style }) => {
    const [editing, setEditing] = useState(false);
    const [ text, setText ] = useState(value);
    const handleBlur = () => {
        onSubmit(text);
        setEditing(!editing);
    }
    const handleChange = (e: any) => {
        setText(e.target.value)
    }

    return !editing ? (
        <StyledInputBase 
            autoFocus
            name={name}
            value={text}
            onChange={handleChange}
            onBlur={handleBlur}
            style={style}
            />
    ) : (
        <span onClick={() => setEditing(!editing)} style={style}>{ value }</span>
    )
};

export default EditableTextField