import React from "react";
import YearTable from "./components/YearTable";
import SortTable from "./components/SortTable";
import MonthTable from "./components/MonthTable";
export default class App extends React.Component {
  state = {
    list: [],
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(process.env.REACT_APP_DATA_URL)
      .then((response) => response.json())
      .then((result) =>
        this.setState({
          list: result.list,
          isLoading: false,
        })
      );
  }

  render() {
    const { list, isLoading } = this.state;
    return (
      <div id="app">
        {isLoading && <progress />}
        <MonthTable list={list} />
        <YearTable list={list} />
        <SortTable list={list} />
      </div>
    );
  }
}
