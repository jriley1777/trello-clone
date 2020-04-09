import React, { useState } from 'react';
import styled from 'styled-components';
import InputBase from '@material-ui/core/InputBase';

const StyledInputBase = styled(InputBase)`
    font-family: inherit !important;
    font-size: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
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
    placeholder?: string,
    style?: React.CSSProperties
}

const EditableTextField: React.FC<ETProps> = ({ name, value, onSubmit, placeholder, style, ...props }) => {
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
                placeholder={placeholder}
                onChange={handleChange}
                onBlur={handleSubmit}
                style={style}
                {...props}
            />
        </form>
    ) : (
        <StyledSpan 
            onClick={() => setEditing(!editing)} 
            style={style}
            {...props}
            >
            { value || placeholder }
        </StyledSpan>
    )
};

export default EditableTextField