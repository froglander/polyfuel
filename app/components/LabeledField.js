// Switching to ES6 (trying to) because so many examples are written that way
import React from 'react';

var LabeledField = function (props) {

    return (
        <div className="form-group">
            <label htmlFor={props.labelId} className="col-sm-3 control-label">{props.title}</label>
            <div className="col-sm-9">
                <input type={props.inputType} value={props.val}
                       className="form-control"
                       id={props.labelId} onChange={props.handleChange}/>
            </div>
        </div>
    )
};

module.exports = LabeledField;