import React from "react";
import YearTable from "./components/YearTable";
import SortTable from "./components/SortTable";
import MonthTable from "./components/MonthTable";

// TODO:
// 1. Загрузите данные с помощью fetch: https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hoc/aggregation/data/data.json
// 2. Не забудьте вынести URL в переменные окружения (не хардкодьте их здесь)
// 3. Положите их в state
export default class App extends React.Component {
  state = {
    list: [],
  };

  render() {
    const { list } = this.state;
    return (
      <div id="app">
        <MonthTable list={list} />
        <YearTable list={list} />
        <SortTable list={list} />
      </div>
    );
  }
}
