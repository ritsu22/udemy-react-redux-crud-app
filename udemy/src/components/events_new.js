import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import { postEvent } from '../actions';
import { values } from 'lodash';

class EventsNew extends Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    renderField(field) {
        const { input, label, type, mata: { touched, error } } = field

        return(
            <div>
                <input {...input} placeholder={label} type={type} />
                {touched && error && <span>{error}</span>}
            </div>
        )
    }

    async onSubmit(values) {
        await this.props.postEvent(values)
        this.props.history.push('/')
    }

    render() {
        const { handleSubmit, pristine, submitting, invalid } = this.props

        return(
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <div>
                    <Field label="Title" name="title" type="text" component={this.renderField} />
                    <Field label="Body" name="body" type="text" component={this.renderField} />

                    <div>
                        <input type="submit" value="Submit" disabled={pristine || submitting || invalid} />
                        <Link to="/">Cancel</Link>
                    </div>
                </div>
            </form>
        )
    }
}

const mapDispatchToProps = ({ postEvent })
const validate = valuse => {
    const errors = {}

    if(!values.title) errors.title = 'Enter a title, please'
    if(!values.body) errors.title = 'Enter a body, please'

    return errors
}

export default connect(null, mapDispatchToProps)(
    reduxForm({ validate, form: 'eventNewForm' })(EventsNew)
)