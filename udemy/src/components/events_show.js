import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import { getEvent, deleteEvent, putEvent } from '../actions';
import { values } from 'lodash';

class EventsShow extends Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
        this.onDeleteClick = this.onDeleteClick.bind(this)
    }

    componentDidMount() {
        const { id } = this.props.match.params
        if (id) this.props.getEvent()
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

    async onDeleteClick() {
        const {id} = this.props.match.params
        await this.props.deleteEvent(id)
        this.props.history.push('/')
    }

    async onSubmit(values) {
        await this.props.putEvent(values)
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
                        <Link to="/" onClick={this.onDeleteClick}>Delete</Link>
                    </div>
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const event = state.event[ownProps.match.params.id]
    return { initialValues: event, state }
}

const mapDispatchToProps = ({ deleteEvent, getEvent, putEvent })

const validate = valuse => {
    const errors = {}

    if(!values.title) errors.title = 'Enter a title, please'
    if(!values.body) errors.title = 'Enter a body, please'

    return errors
}

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({ validate, form: 'eventShowForm', enableReinitialize: true })(EventsShow)
)