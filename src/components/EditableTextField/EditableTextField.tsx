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
    padding-left: 20px;
    background: white;
    color: black;
    border-radius: 5px;
    white-space: nowrap !important;
`

const StyledSpan = styled.span`
    display: block;
    padding: 5px 20px 5px 20px;
    border-radius: 5px;
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
    const handleSubmit = () => {
        onSubmit(text);
        setEditing(!editing);
    }
    const handleChange = (e: any) => {
        setText(e.target.value)
    }

    return editing ? (
        <form onSubmit={handleSubmit}>
            <StyledInputBase
                autoFocus
                name={name}
                value={text}
                onChange={handleChange}
                onBlur={handleSubmit}
                style={style}
            />
        </form>
    ) : (
        <StyledSpan 
            onClick={() => setEditing(!editing)} 
            style={style}>
            { value }
        </StyledSpan>
    )
};

export default EditableTextField