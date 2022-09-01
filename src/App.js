import React from "react";
import YearTable from "./components/YearTable";
import SortTable from "./components/SortTable";
import MonthTable from "./components/MonthTable";

function withAggregateList(WrappedComponent, propNameParam) {
  return function (props) {
    const resultList =
      propNameParam === "sort"
        ? [...props.list].sort((a, b) => {
            return a.date.split("-").join("") - b.date.split("-").join("");
          })
        : [...props.list].map((item) => {
            let newProp = "";
            if (propNameParam === "year") {
              newProp = item.date.split("-")[0];
            } else if (propNameParam === "month") {
              newProp = item.date.split("-")[1];
            }
            return { [propNameParam]: newProp, amount: item.amount };
          });

    return <WrappedComponent list={resultList} />;
  };
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      isLoading: false,
    };

    this.WithAggregatedMonthTable = withAggregateList(MonthTable, "month");
    this.WithAggregatedYearTable = withAggregateList(YearTable, "year");
    this.WithAggregatedSortTable = withAggregateList(SortTable, "sort");
  }

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
        <this.WithAggregatedMonthTable list={list} />
        <this.WithAggregatedYearTable list={list} />
        <this.WithAggregatedSortTable list={list} />
      </div>
    );
  }
}
