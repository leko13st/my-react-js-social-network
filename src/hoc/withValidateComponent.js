import React from 'react';
import s from './withValidateComponent.module.css'

const Element = Element => ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error;
    return (
      <div className={ s.formControl + " " + (hasError ? s.error : "") }>
        {/* <Element {...input} {...props} /> */}
        <Element {...props} />
        { hasError && <span> { meta.error } </span> }
      </div>
    );
};

export default Element;