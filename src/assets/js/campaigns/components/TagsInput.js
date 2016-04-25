import React, { Component } from 'react';
import joid from 'joid';
import TagsInputCore from 'react-tagsinput';
import classNames from 'classnames';

class TagsInput extends Component {
  render() {
    return (
      <fieldset className="form-group">
        <label htmlFor={joid.link(true, 'input')}>Add Tags</label>
        <TagsInputCore
          value={this.props.value || []}
          renderInput={(props) => {
            const {onChange, value, className, ...other} = props;
            return (
              <input
                type="text"
                id={joid.link(false, 'input')}
                className={classNames(className, 'form-control')}
                placeholder="#example"
                onChange={onChange}
                value={value}
                {...other}/>
            );
          }}
          renderLayout={(tagComponents, inputComponent) => {
            return (
              <span>
                {inputComponent}
                {tagComponents}
              </span>
            )
          }}
          onChange={this.props.onChange} />
      </fieldset>
    );
  }
};

export default TagsInput;
