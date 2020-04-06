import React, { useState } from 'react';
import styled from 'styled-components';
import InputBase from '@material-ui/core/InputBase';

const StyledInputBase = styled(InputBase)`
    font-family: inherit !important;
    font-size: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
    max-width: inherit !imporant;
    width: inherit !important;
    height: inherit !important;
    padding-left: 20px !important;
    background: white;
    color: black;
    border-radius: 5px;
`

const StyledSpan = styled.span`
    padding: 5px 5px 5px 20px;
    &:hover {
      cursor: pointer;
      background: rgba(0,0,0,0.2)
    } 
`;

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

    return editing ? (
        <StyledInputBase 
            autoFocus
            name={name}
            value={text}
            onChange={handleChange}
            onBlur={handleBlur}
            style={style}
            />
    ) : (
        <StyledSpan 
            onClick={() => setEditing(!editing)} 
            style={style}>
            { value }
        </StyledSpan>
    )
};

export default EditableTextField