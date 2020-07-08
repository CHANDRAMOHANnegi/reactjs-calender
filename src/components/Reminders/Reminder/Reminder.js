import React from 'react';
import Hoc from '../../../hoc/Hoc';
import {connect} from 'react-redux';
import '../Reminder/Reminder.css';
import {deleteTodo, editTodo} from '../../../actions/postActions'

class Reminder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            isAdded: false
        };
    }

    removeTodo = (id) => {
        const {reminders} = this.props;
        let newTodo = reminders.filter((todo, index) => index !== id)
        this.props.deleteTodo(newTodo);
    };

    showTextEditer = () => {
        this.setState({
            isEditing: true
        });
    };

    onTextChange = (e, index) => {
        const {reminders} = this.props;
        reminders[index].text = e.target.value;
        this.props.editTodo(reminders)
    };

    onKeyUpTextChange = (e) => {
        if (e.which === 13 || e.which === 27) {

            this.setState({
                isEditing: false
            })
        }
    };
 
    render() {

        const {reminders, particularDay} = this.props;
        const {isEditing} = this.state;

        let list = reminders.filter((e, i) => {
            return e.date === particularDay
        });

        let todoList = list.map((a) => {
            var styles = {
                color: a.color
            };

            let index = "";
            reminders.forEach((element, i) => {
                if (element === a) {
                    index = i;
                }
            });
            // console.log(a);

            return (
                !this.state.isEditing ?
                    <li style={styles} key={index}>
                        <span onClick={() => this.setState({isEditing: !isEditing})}
                        ><i className="fa fa-edit"></i></span>
                        <span
                            onDoubleClick={() => {
                                this.showTextEditer()
                            }}>
                            {a.time + " : " + a.text}
                        </span>
                        <span onClick={() => {
                            this.removeTodo(index)
                        }}><i className="fa fa-trash"></i></span>
                    </li> :
                    <input defaultValue={a.text}
                           onChange={e => this.onTextChange(e, index)}
                           onKeyUp={(e) => this.onKeyUpTextChange(e)}
                           type="text"
                    />
            )
        });

        return (
            <Hoc>
                {todoList}
            </Hoc>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        reminders: state.reminders
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTodo: (newTodo) => {
            dispatch(deleteTodo(newTodo))
        }
        , editTodo: (reminders) => {
            dispatch(editTodo(reminders))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Reminder);
