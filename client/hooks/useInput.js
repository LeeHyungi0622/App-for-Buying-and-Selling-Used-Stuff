import { useState } from 'react';

export default (initialValue = '') => {
    const [value, setValue] = useState(initialValue);
    const setter = (e) => {
        setValue(e.target.value);
    }
    return [value, setter];
};