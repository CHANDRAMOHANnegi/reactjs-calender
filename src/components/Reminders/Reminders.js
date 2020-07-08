import React from 'react';
import '../Reminders/Reminders.css'
import Reminder from '../Reminders/Reminder/Reminder';
 class Reminders extends React.Component {

    render() {
        // console.log(this.props);

        return (
            <div className="reminders">
                <ul >
                    <Reminder particularDay={this.props.particularDay} isAdded={this.props.isAdded}> </Reminder>
                </ul>
            </div>
        );
    }
}

export default Reminders;