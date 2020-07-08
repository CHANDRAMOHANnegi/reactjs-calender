import React from 'react';
import { Link } from 'react-router-dom'
import moment from 'moment';
import Modal from '../modal/Modal';
import './Calendar.css';
import Reminders from '../Reminders/Reminders';

class Calendar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            today: moment(),
            showMonthPopup: false,
            showYearPopup: false,
            selectedDay: moment().format("D"),
            selectedMonth: null,
            selectedYear: null,
            showTodoForm: false,
            isAdded: false
        }
    }

    weekdays = moment.weekdays(); //["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    weekdaysShort = moment.weekdaysShort(); // ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    months = moment.months();

    year = () => {
        return this.state.today.format("Y");
    };
    month = () => {
        return this.state.today.format("MMMM");
    };
    daysInMonth = () => {
        return this.state.today.daysInMonth();
    };
    currentDate = () => {
        return this.state.today.get("date");
    };
    currentDay = () => {
        return this.state.today.format("D");
    };

    firstDayOfMonth = () => {
        let today = this.state.today;
        let firstDay = moment(today).startOf('month').format('d'); // Day of week 0...1..5...6
        return firstDay;
    };

    setMonth = (month) => {
        console.log("inside set month: " + month);
        let monthNo = this.months.indexOf(month);
        let today = Object.assign({}, this.state.today);
        let particularMonthdateContext = moment(today).set({ 'year': this.props.match.params.year, 'month': month });


        this.setState({
            today: particularMonthdateContext,
            selectedMonth: month,
            selectedYear: particularMonthdateContext.format("YYYY")
        });
    };

    nextMonth = () => {
        let today = Object.assign({}, this.state.today);
        let particularMonthdateContext = moment(today).add(1, "month");

        this.setState({
            today: particularMonthdateContext
        });
    };

    prevMonth = () => {
        let today = Object.assign({}, this.state.today);
        let particularMonthdateContext = moment(today).subtract(1, "month");

        console.log(this.props);

        this.setState({
            today: particularMonthdateContext
        });
    };

    onMonthSelectChange = (data) => {
        this.setMonth(data);
    };

    SelectList = (props) => {
        let popup = props.month.map((month) => {
            return (
                <div key={month}>
                    <Link to={"/" + moment(this.state.today).format("YYYY") + "/" + month}
                        onClick={() => this.onMonthSelectChange(month)}>
                        {month}
                    </Link>
                </div>
            );
        });
        return (
            <div className="month-popup">
                {popup}
            </div>
        );
    };

    onChangeMonth = (month) => {
        this.setState({
            showMonthPopup: !this.state.showMonthPopup,
            selectedMonth: month
        });
    };

    MonthNav = () => {
        return (
            <span className="label-month"
                onClick={() => {
                    this.onChangeMonth(this.month())
                }}>
                {this.month()}
                {this.state.showMonthPopup &&
                    <this.SelectList month={this.months} />}
            </span>
        );
    };

    showYearEditor = () => {
        this.setState({
            showYearNav: true
        });
    };


    setYear = (year) => {


        let today = Object.assign({}, this.state.today);

        let particularYearContext = moment(today).set({ 'year': year, 'month': this.props.match.params.month });

        console.log(this.props.match.params.year)
        this.setState({
            today: particularYearContext,
            selectedYear: particularYearContext.format("YYYY")
        });


    };

    onYearChange = (e) => {
        this.setYear(e.target.value);
    };

    onKeyUpYear = (e) => {
        if (e.which === 13 || e.which === 27) {
            this.setYear(e.target.value);
            this.setState({
                showYearNav: false
            });
            this.props.history.push("/" + moment(this.state.today).format("YYYY") + "/" + moment(this.state.today).format("MMMM"));
        }
    };

    YearNav = () => {
        return (
            this.state.showYearNav ?
                <input
                    defaultValue={this.year()}
                    className="editor-year"
                    ref={(yearInput) => {
                        this.yearInput = yearInput
                    }}
                    onKeyUp={(e) => this.onKeyUpYear(e)}
                    onChange={(e) => this.onYearChange(e)}
                    type="number"
                    placeholder="year" />
                :
                <span
                    className="label-year"
                    onDoubleClick={() => {
                        this.showYearEditor()
                    }}>
                    {this.year()}
                </span>
        );
    };

    onDayClick = (e, day) => {
        this.setState({
            selectedDay: day,
        });
        this.props.onDayClick && this.props.onDayClick(e, day);
    };

    toggleAddTodoForm = (e) => {
        this.setState({
            showTodoForm: !this.state.showTodoForm
        })
    };

    isadded = (isAdded) => {
        this.setState({
            isAdded: isAdded
        })
    };


    componentWillMount() {
        console.log(this.props.match.params)

        const { month, year } = this.props.match.params;
        console.log(month, year)
        this.setYear(year);
        this.setMonth(month);
    }


    render() {



        const selectedDate = this.state.selectedDay + "/" +
            this.state.today.format("M") + "/" + this.state.today.format("Y");
        let particularDay = "";
        let weekdays = this.weekdaysShort.map((day) => {
            return (
                <td key={day} className="week-day">{day}</td>
            )
        });

        let blanks = [];
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(
                <td key={i * 80} className="emptySlot">
                    {"#"}
                </td>
            );
        }

        let daysInMonth = [];
        for (let d = 1; d <= this.daysInMonth(); d++) {
            let className = (d === this.currentDay() ? "day current-day" : "day");
            let selectedClass = (d === this.state.selectedDay ? " selected-day " : "")

            particularDay = d + "/" + this.state.today.format("M") + "/" + this.state.today.format("Y");

            daysInMonth.push(
                <td key={d} className={className + selectedClass}>
                    <span className="addTodoSign"
                        onClick={e => {
                            this.onDayClick(e, d);
                            this.toggleAddTodoForm(e);
                        }}>+
                        </span>
                    <span onClick={(e) => {
                        this.onDayClick(e, d)
                    }}>
                        {d}
                    </span>
                    <Reminders particularDay={particularDay} isAdded={() => this.isadded} />
                </td>
            );
        }

        var totalSlots = [...blanks, ...daysInMonth];
        let rows = [];
        let cells = [];

        totalSlots.forEach((date, i) => {

            if ((i % 7) !== 0) {
                cells.push(date);
            } else {
                let insertRow = cells.slice();
                rows.push(insertRow);
                cells = [];
                cells.push(date);
            }
            if (i === totalSlots.length - 1) {
                let insertRow = cells.slice();
                rows.push(insertRow);
            }
        });

        let trElems = rows.map((d, i) => {
            return (
                <tr key={i * 100}>
                    {d}
                </tr>
            );
        });

        return (
            <div className="calendar-container">
                <table className="calendar">
                    <thead>
                        <tr className="calendar-header">
                            <td colSpan="1">
                                <Link
                                    to={"/" + moment(this.state.today).format("YYYY") + "/" + moment(this.state.today).subtract(1, "month").format("MMMM")}>
                                    <i
                                        className="prev fa fa-fw fa-chevron-left"
                                        onClick={(e) => {
                                            this.prevMonth()
                                        }}
                                    >
                                    </i></Link>
                            </td>
                            <td colSpan="6">
                                <this.MonthNav />
                                {" "}
                                <this.YearNav />
                            </td>
                            <td colSpan="1">
                                <Link
                                    to={"/" + moment(this.state.today).format("YYYY") + "/" + moment(this.state.today).add(1, "month").format("MMMM")}>
                                    <i
                                        className="prev fa fa-fw fa-chevron-right"
                                        onClick={(e) => {
                                            this.nextMonth()
                                        }}>
                                    </i>
                                </Link>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {weekdays}
                        </tr>
                        {trElems}
                    </tbody>
                </table>
                {this.state.showTodoForm &&
                    <Modal selectedDate={selectedDate} toggleAddTodoForm={this.toggleAddTodoForm} />
                }
            </div>
        );
    }
}

export default Calendar;
