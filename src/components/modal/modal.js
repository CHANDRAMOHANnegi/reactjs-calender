import React, { Component } from 'react';
import './Modal.css';
import { connect } from 'react-redux'
import { addTodo } from "../../actions/postActions";

class Modal extends Component {

    constructor(props) {


        super(props);
        this.state = {
            todo: {
                time: "",
                text: "",
                color: ""
            },
            isAdded: false
        };
    }

    handleChange = (event) => {
        const field = event.target.name;
        const value = event.target.value;
        this.setState({
            ...this.state,
            todo: {
                ...this.state.todo,
                [field]: value
            }
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { reminders } = this.props;
        const { selectedDate } = this.props;
        const newTodo = {
            ...this.state.todo,
            date: selectedDate
        };
        this.props.addTodo(reminders);
        reminders.push(newTodo);
        this.setState({
            ...this.state,
            isAdded: true

        })

        console.log(reminders);
    };

    render() {
        const { selectedDate, toggleAddTodoForm } = this.props;
        return (
            <div className="modal">
                <form onSubmit={e => { this.handleSubmit(e); toggleAddTodoForm(e) }}>
                    {selectedDate}
                    <br />
                    <label htmlFor="time"> Enter todo time</label>
                    <input name="time" type="time" onChange={event => this.handleChange(event)} />
                    <br />
                    <label htmlFor="text">Enter todo</label>
                    <input name="text" type="text" onChange={event => this.handleChange(event)} />
                    <br />
                    <label htmlFor="color">Choose a color:</label>
                    <br />
                    <select name="color" defaultValue="green" onChange={event => this.handleChange(event)}>
                        <option value="red" >red</option>
                        <option value="blue" selected>blue</option>
                        <option value="black">black</option>
                        <option value="green">green</option>
                    </select>
                    <input type="submit" value="submit" />
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        reminders: state.reminders
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTodo: (reminders) => {
            dispatch(addTodo(reminders))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);